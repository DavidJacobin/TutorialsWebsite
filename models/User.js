const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {type: String,  required: true, unique: true, minlength: [5, 'Username must be at least 5 characters!']},
    hashedPassword: {type: String, required: true}
});

const User = model('User', userSchema);

module.exports = User;