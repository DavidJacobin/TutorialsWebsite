const homeController = require('express').Router();
const {getAllByDate, getRecent} = require('../services/courseService')

homeController.get('/', async (req,res)=>{
    let view;
    let courses = []

    if(req.user){
        view = 'user-home';
        courses = await getAllByDate();
    }else{
        view = 'guest-home';
        courses = await getRecent();
    };

    res.render(view,
    {courses}
    );
});

module.exports = homeController;