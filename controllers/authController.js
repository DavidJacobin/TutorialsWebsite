const { register } = require('../services/userService');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    res.render('register');
});

authController.post('/register', async (req, res) =>{
    const token = await register(req.body.username, req.body.password)

    res.redirect('/auth/register')
});


module.exports = authController;