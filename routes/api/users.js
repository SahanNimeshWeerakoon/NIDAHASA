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

// @route       POST /api/users
// @desc        Register a user
// @access      public
router.post('/', (req, res) => {
    const { name, contact, username, password, password_conf } = req.body;
    /**
     * validation
     *  */
    // is request empty
    if(!name || !contact || !username || !password || !password_conf) {
        const porp = !name ? "name" : !contact ? "contact" : !username ? "username" : !password ? "password" : !password_conf ? "password_conf" : "";
        return res.status(400).json({ success: false, type: porp, msg: `Hey babes... You forgot to enter ${porp} field...` });
    } else if(password !== password_conf) {
        return res.status(400).json({ success: false, type: "password_conf", msg: `This is not the same as the above password sexy...` });
    }
    // is username repeats
    User.findOne({username})
        .then(data => {
            if(data) {
                return res.status(400).json({ success: false, type: 'username', msg: 'Try to use another username. This one\'s taken' });
            }
            
            const newUser = new User({ name, contact, username, password });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user._id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;

                                    return res.json({ success: true, type: 'all', msg: 'Welcome to Nidahasa gorgeous...', user, token });
                                }
                            );
                        })
                        .catch(err => {
                            return res.status(500).json({ success: false, type: 'all', msg: 'This error is with me. Please contact me if this occurs again and again.' });
                        });
                });
            });
        })
        .catch(err => {
            return res.status(500).json({ success: false, type: 'all', msg: 'This error is with me. Please contact me if this occurs again and again.' });
        });


});

module.exports = router;