const homeController = require('express').Router();

homeController.get('/', (req,res)=>{

    if(req.user){
        res.render('user-home');
    }else{
        res.render('guest-home');
    }
});

module.exports = homeController;