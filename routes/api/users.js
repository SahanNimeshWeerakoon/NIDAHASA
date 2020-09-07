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
    const {name, contact, username, password, password_conf} = req.body;

    if(!name || !contact || !username || !password || !password_conf) {
        const prop = !name ? "name" : !contact ? "contact" : !username ? "username" : !password ? "password" : !password_conf ? "password_conf" : "";
        return res.status(400).json({ success: false, type: porp, msg: `Hey babes... You forgot to enter ${porp} field...` });
    }
    if(password !== password_conf) {
        return res.status(400).json({ success: false, type: 'password_conf', msg: 'Passward and confirmation password does not match sweetie...' });
    }
    User.find({ username })
        .then(data => {
            if(data.length !== 0) return res.status(400).json({ success: false, type: 'username', msg: 'A fellow traveller is using this username. Please change it honey...' });

            const newUser = new User({ name, contact, username, password });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    newUser.password = hash;

                    newUser.save()
                        .then(user => {
                            return res.json({
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    contact: user.contact,
                                    username: user.username,
                                }
                            });
                        })
                        .catch(err => {
                            if(err) return res.status(500).json(err);
                        })
                });
            });
        })
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