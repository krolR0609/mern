const { Router } = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = Router();

const MIN_PASSWORD_LENGTH = 6;

router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password').isLength({ min: MIN_PASSWORD_LENGTH }),
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Validation errors"
            });    
        }

        const { email, password } = req.body;
        const lowerEmail = email.toLowerCase();

        const candidate = await User.findOne({ email: lowerEmail });
        if (candidate) {
            return res.status(400).json({ message: 'This email already in user' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 1);
        const user = new User({ email: lowerEmail, password: hashedPassword });
        const createdUser = await user.save();
        if (!createdUser) {
            return res.status(400).json({ message: "Something went wrong, try again" });
        }

        return res.status(201).json({ message: "User has been created" });

    } catch (err) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

router.post(
    '/login',
    [
        check('email', 'Enter correct email').isEmail(),
        check('password', 'Incorrect password length').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Errors on login"
                });
            }

            const { email, password } = req.body;
            const lowerEmail = email.toLowerCase();

            const user = await User.findOne({ email: lowerEmail });
            if (!user) {
                return res.status(400).json({ message: "User does not exist" });
            }

            const isMatched = await bcrypt.compare(password, user.password);
            if (!isMatched) {
                return res.status(400).json({ message: "Login has failed" });
            }

            const token = jwt.sign(
                {
                    userId: user.id,
                },
                config.get('jwtSecret'),
                {
                    expiresIn: config.get('expiresIn') || "1h"
                }
            );

            return res.status(200).json({ token, userId: user.id });

        } catch (err) {
            res.status(500).json({ message: 'Something went wrong, try again' });
        }
    }
);

module.exports = router;