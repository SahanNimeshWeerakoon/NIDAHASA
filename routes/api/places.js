const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Place = require('../../models/Place');

// @route       GET /api/placesd
// @desc        Get all the places
// @access      public
router.get('/', (req, res) => {
    Place.find()
        .sort({ created_date: -1 })
        .then(places => res.json(places));
});

// @route       POST /api/place
// @desc        Save a new place
// @access      public
router.post('/new', auth, (req, res) => {
    const { title, description, location, user_id, shared_count, images } = req.body;
    if(!title || !description || !location || !user_id) {
        const prop = !title ? "title" : !description ? "description" : !location ? "location" : !user_id ? "user id" : "";
        return res.status(400).json({ success: false, type: prop, msg: `Please fill the ${prop} field` });
    }

    const newPlace = new Place({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        likes_count: req.body.likes_count,
        user_id: req.body.user_id,
        shared_count: req.body.shared_count,
        images: req.body.images
    });

    newPlace
        .save()
        .then(place => res.json(place))
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