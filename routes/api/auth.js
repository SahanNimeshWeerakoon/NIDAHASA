const express = require('express'),
    router = express.Router(),
    User = require('../../models/User'),
    bcrypt = require('bcryptjs'),
    config = require('config'),
    jwt = require('jsonwebtoken'),
    auth = require('../../middleware/auth');

// @route       POST /api/auth
// @desc        Authenticate user
// @access      public
router.post('/', (req, res) => {
    const { username, password } = req.body;

    /**
     * validation
     *  */
    // is request empty
    if(!username || !password) {
        const porp = !username ? "username" : !password ? "password" : "";
        return res.status(400).json({ success: false, type: porp, msg: `Hey babes... You forgot to enter ${porp} field...` });
    }

    User.findOne({ username })
        .then(user => {
            if(!user) {
                return res.status(400).json({ success: false, type: 'username', msg: 'Hey I think you misspelled your username. This user name is incorrect...' });
            }

            // validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ success: false, type: 'password', msg: 'Password is incorrect babes... Make visible the password when you type, so you won\'t miss spell it.' });

                    jwt.sign(
                        { id: user._id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user,
                            });
                        }
                    );
                });
        })
        .catch(err => console.log(err));
});

// @route       GET api/auth/user
// @desc        Get user data
// @access      Private
router.get('/user',auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router