const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../../validators/register');
const validateLoginInput = require('../../validators/login');
//const findOneByEmail = require('../../services/user/user');
//const findOneByName = require('../../services/user/user');
const userService = require('../../services/user/user');
const registerUserDTO = require('../../dtos/user/register');
const loginUserDTO = require('../../dtos/user/login');


router.post('/register', async function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return await res.status(400).json(errors);
    }

    await userService.findOneByEmail(req.body.email)
        .then(async user => {
            if(user){
                return await res.status(400).json({
                    email:'Email already exists'
                });
            }
            else {
                const newUser = registerUserDTO(req.body);
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) console.error('There was an error', err);
                    else {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) console.error('There was an error', err);
                            else {
                                newUser.password = hash;
                                newUser
                                    .save()
                                    .then(user => {
                                        res.json(user)
                                }); 
                            }
                        });
                    }
                });
            }
        });
});

router.post('/login', async (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return await res.status(400).json(errors);
    }
    const loginUser = loginUserDTO(req.body);
    await userService.findOneByName(loginUser.name)
        .then(async user => {
            if(!user) {
                errors.name = 'User not found'
                return await res.status(404).json(errors);
            }
            bcrypt.compare(loginUser.password, user.password)
                    .then(async isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name,
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return await res.status(400).json(errors);
                        }
                    });
        });
});

router.get('/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
    return await res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;