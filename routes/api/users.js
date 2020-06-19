const express = require('express'),
    router = express.Router(),
    User = require('../../models/User'),
    bcrypt = require('bcryptjs'),
    config = require('config'),
    jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    User.find()
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('test');
});

router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.remove()
                .then(data => res.json(data))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log(err));

});

module.exports = router;