const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const path = require('path');
const fs = require('fs');


const Place = require('../../models/Place');

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

router.get('/place/:id', (req, res) => {
    const placeId = req.params.id;
    if(placeId) {
        Place
            .findOne({ _id: placeId })
            .then(place => {
                res.json(place);
            })
            .catch(err => {
                res.status(400).json({"msg": "Wrong Id"});
            });
    }
});

router.put('/:id', (req, res) => {
    const id = req.params.id;

    if(req.body.hasOwnProperty('fields')) {
        const { userId, imagesCount, oldImages } = JSON.parse(req.body.fields);
        var images = [];
        var imageNames = [];

        // putting images in an array to save later
        for(var i=0; i<imagesCount; i++) {
            images.push(req.files[`image${i}`]);
        }

        if(images.length !== 0) {
            // iterating through image obj arrays
            images.forEach( (image, index) => {
                // Generating unique name
                let name = image.name;
                name = name.split('.');
                name = name[0]+'-'+Math.round(Math.random()*10000000000)+'.'+name[1];
                // Moving to a path
                image.mv(path.join(`${__dirname}`, `../../client/dist/images/places/${name}`), err => {
                    if(err) {
                        console.log(err);
                    }
                });
                // imagesNames is to save the name in db
                imageNames.push(name);
            } );
        }

        Place
            .findById(id)
            .then(place => {
                var prevImgs = place.images.replace(/\"/g, "").split(",");
                prevImgs.forEach((prevImg, index) => {
                    if(!oldImages.includes(prevImg)) {
                        fs.unlinkSync(path.join(`${__dirname}`, `../../client/dist/images/places/${prevImg}`));
                    }
                });

                const finalImgArr = oldImages.concat(imageNames);

                Place
                    .findOneAndUpdate({ _id: id }, {"images": finalImgArr.join(",")}, { new: true, useFindAndModify: false })
                    .then(place => res.json(place));

            });

    } else {
        Place
            .findOneAndUpdate({ _id: id }, req.body, { new: true, useFindAndModify: false })
            .then(place => res.json(place));
    }
});

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