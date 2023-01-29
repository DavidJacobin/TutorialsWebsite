const { createCourse } = require('../services/courseService');
const { errorParser } = require('../util/errorParser');

const courseController = require('express').Router();


courseController.get('/create', (req, res) =>{
    res.render('create')
});

courseController.post('/create', async(req, res) =>{
    const course = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
        owner: req.user._id
    }


    try {
        
        await createCourse(course)
        res.redirect('/')
    } catch (err) {
        res.render('create', {
            body: course,
            errors: errorParser(err)
        });
    }
});



module.exports = courseController;