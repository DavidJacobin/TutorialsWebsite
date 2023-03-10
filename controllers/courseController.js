const { createCourse, getById, deleteById, updateById, enrollUser } = require('../services/courseService');
const { errorParser } = require('../util/errorParser');

const courseController = require('express').Router();


courseController.get('/create', (req, res) => {
    res.render('create')
});


courseController.get('/:id', async (req, res) => {
    const course = await getById(req.params.id);
    
    if (req.user) {
        if (course.owner.toString() == req.user._id.toString()) {
            course.isOwner = true
        }
    };

    course.enrolled = course.users.map(x => x.toString()).includes(req.user._id.toString());
    
    res.render('details', {
        course
    });
    
});


courseController.get('/:id/edit', async (req, res) => {
    const course = await getById(req.params.id);
    
    res.render('edit', {
        course
    })

});

courseController.get('/:id/delete',async (req, res) => {
    const course = await getById(req.params.id);
    if (req.user) {
        
        if (course.owner.toString() != req.user._id.toString()) {
            res.redirect('/')
        }
    };

    deleteById(req.params.id)
    res.redirect('/')
});


courseController.get('/:id/enroll', async(req, res) =>{
    const course = await getById(req.params.id);

    if(course.owner.toString() != req.user._id.toString() 
    && course.users.map(x => x.toString()).includes(req.user._id.toString() == false)){
        await enrollUser(req.params.id, req.user._id)
    }

    await enrollUser(req.params.id, req.user._id)
    res.redirect(`/course/${req.params.id}`)
});




courseController.post('/create', async (req, res) => {
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

courseController.post('/:id/edit', async (req, res) => {
    const course = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
        owner: String(req.user._id),
    };
    
    if (req.user) {
        
        if (course.owner.toString() != req.user._id.toString()) {
            res.redirect('/')
        }
    };
    
    try {
        await updateById(req.params.id,course)
        res.redirect(`/course/${req.params.id}`)
    } catch (err) {
        res.render('edit', {
            body: course,
            errors: errorParser(err)
        })
    }
    
    
});




module.exports = courseController;