const { Schema, model, Types } = require('mongoose');

const URL_REGX = /https?:\/\/./i;

const courseSchema = new Schema({
    title: { type: String, required: true, minlength: [4, 'Course name must be at least 4 characters long!'] },
    description: {
        type: String, required: true,
        minlength: [20, 'Description must be at least 20 characters long!'],
        maxlength: [50, 'Description can be up to 50 characters long!']
    },
    imageUrl: {
        type: String, required: true, validate: {
            validator: (value) => URL_REGX.test(value),
            message: 'Invalid URL!'
        }
    },
    duration: { type: String, required: true },
    createdAt: { type: String, required: true },
    users: { types: [Types.ObjectId], ref: 'User', default: [] }
});

const Course = model('Course', courseSchema);

module.exports = Course;
