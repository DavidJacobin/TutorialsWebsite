const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {type: String,  required: true, unique: true, minlength: [3, 'Username must be at least 3 characters!']},
    hashedPassword: {type: String, required: true}
});

const User = model('User', userSchema);

module.exports = User;