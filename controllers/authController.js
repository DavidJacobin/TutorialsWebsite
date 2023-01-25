const { register } = require('../services/userService');
const { errorParser } = require('../util/errorParser');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    res.render('register');
});

authController.post('/register', async (req, res) =>{
    try {

        if(req.body.username == "" || req.body.password == ""){
            throw new Error('All feilds are required!')
        };

        if(req.body.password != req.body.repassword){
            throw new Error('Passwords don\'t match!')
        };

        const token = await register(req.body.username, req.body.password);
    
        res.cookie('token', token);
    
        res.redirect('/auth/register');
        
    } catch (err) {
        const error = errorParser(err)

        res.render('register',{
            error,
            body:{username: req.body.username}
        });
        
    };

});


module.exports = authController;