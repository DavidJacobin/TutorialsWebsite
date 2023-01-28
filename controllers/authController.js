const { body, validationResult } = require('express-validator');
const { register, login } = require('../services/userService');
const { errorParser } = require('../util/errorParser');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    res.render('register');
});

authController.post('/register',
    body('username')
        .isLength({ min: 5 }).withMessage("Username must be at least 5 characters long!")
        .isAlphanumeric().withMessage('Username must contain only letters and numbers!'),
    body('password')
        .isAlphanumeric().withMessage('Password must contain only letters and numbers!')
        .isLength({ min: 5 }).withMessage("Password must be at least 5 characters long!")
    , async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors
            };

            if (req.body.password != req.body.repassword) {
                throw new Error('Passwords don\'t match!')
            };

            const token = await register(req.body.username, req.body.password);

            res.cookie('token', token);

            res.redirect('/');

        } catch (err) {
            const errors = errorParser(err)

            res.render('register', {
                errors,
                body: { username: req.body.username }
            });

        };

    });

authController.get('/login', (req, res) => {
    res.render('login');
});

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        const errors = errorParser(err);
        res.render('login', {
            errors,
            body: { username: req.body.username }
        })
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController;