const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'tj54u389tyy8t'


async function register(username, password){
    const existing = User.findOne({username}).collation({locale: 'en', strength: 2});

    if (existing){
        throw new Error('Username is taken!')
    };

    const hashedPassword = bcrypt.hash(password,10);

    const user = await User.create({
        username, 
        hashedPassword
    });

    const token = createSession(user);

    return token;
};

async function login(username, password){

};

function createSession({_id, username}){
    const payload = {
        _id,
        username
    }

    const token = jwt.sign(payload,JWT_SECRET);

    return token;
};


module.exports = {
    register,
    login
};