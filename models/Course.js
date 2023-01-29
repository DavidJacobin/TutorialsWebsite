const { Schema, model, Types } = require('mongoose');

const URL_REGX = /https?:\/\/./i;

const courseSchema = new Schema({
    title: { type: String, minlength: [4, 'Course name must be at least 4 characters long!'] },
    description: {
        type: String,
        minlength: [20, 'Description must be at least 20 characters long!'],
        maxlength: [50, 'Description can be up to 50 characters long!'],
        
    },
    imageUrl: {
        type: String, required: true, validate: {
            validator: (value) => URL_REGX.test(value),
            message: 'Invalid URL!'
        }
    },
    duration: { type: String, required: true },
    createdAt: { type: String, required: true, default: () => (new Date()).toISOString().slice(0,10) },
    users: { type: [Types.ObjectId], ref: 'User', default: [] },
    owner: { type: Types.ObjectId, ref: 'User'}
});

courseSchema.index({title: 1},{
    collation:{
        locale: 'en',
        strength: 2
    }
});

const Course = model('Course', courseSchema);

module.exports = Course;
