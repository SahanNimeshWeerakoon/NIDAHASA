const express = require('express'),
    router = express.Router(),
    User = require('../../models/User'),
    bcrypt = require('bcryptjs'),
    config = require('config'),
    jwt = require('jsonwebtoken');

// @route       GET /api/users
// @desc        Get all users
// @access      public
router.get('/', (req, res) => {
    User.find()
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

// @route       DELETE /api/users/:id
// @desc        Delete a user
// @access      public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.remove()
                .then(data => res.json(data))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

// @route       GET /api/users
// @desc        Get a user
// @access      public
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log(err));

});

module.exports = router;