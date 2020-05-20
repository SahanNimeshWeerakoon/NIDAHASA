const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const path = require('path');


const Place = require('../../models/Place');

// @route       GET /api/placesd
// @desc        Get all the places
// @access      public
router.get('/:id?', (req, res) => {
    const userId = req.params.id;
    if(userId) {
        Place.find({ user_id: userId })
            .sort({ created_date: -1 })
            .then(places => res.json(places));
    } else {
        Place.find()
            .sort({ created_date: -1 })
            .then(places => res.json(places));
    }
});

// @route       POST /api/place
// @desc        Save a new place
// @access      public
router.post('/new', auth, (req, res) => {
    const { title, description, location, userId, imagesCount } = JSON.parse(req.body.fields);
    var images = [];
    let imageNames = [];

    for(var i=0; i<imagesCount; i++) {
        images.push(req.files[`image${i}`]);
    }

    if(!title || !description || !location) {
        const prop = !title ? "title" : !description ? "description" : !location ? "location" : !user_id ? "user id" : "";
        return res.status(400).json({ success: false, type: prop, msg: `Please fill the ${prop} field` });
    }

    if(images.length !== 0) {
        images.forEach((image, index) => {
            
            let name = image.name;
            name = name.split('.');
            name = name[0]+'-'+Math.round(Math.random()*10000000000)+'.'+name[1];

            image.mv(path.join(`${__dirname}`, `../../client/dist/images/places/${name}`), err => {
                if(err) {
                    console.log(err);
                }
            });
            imageNames.push(name);
        });
    } else {
        console.log('no images');
    }

    imageNames = imageNames.join(",").replace("\"", "");

    const newPlace = new Place({
        title: title,
        description: description,
        location: location,
        likes_count: 0,
        user_id: userId,
        shared_count: 0,
        images: JSON.stringify(imageNames)
    });

    newPlace
        .save()
        .then(place => {
            res.json(place);
        })
        .catch(err => res.json(err));
});

// @route       DELETE /api/place
// @desc        Delete a place
// @access      public
router.delete('/:id', auth, (req, res) => {
    Place
        .findById(req.params.id)
        .then(place => {
            place
                .remove()
                .then(delPlace => res.json(delPlace))
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
});

// @route       POST /api/place/uploadplace
// @desc        Upload images of the places
// @access      public
router.post('/uploadplace', auth, (req, res) => {
    if(req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }

    const file = req.files.file;
    
    file.mv(`${__dirname}/../../../client/dist/images/places/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).json(err);
        }

        res.json({ fileName: file.name, filePath: `/places/${file.name}` });
    });
});

module.exports = router;