const mongoose = require('mongoose');

module.exports = async (app) => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/tutorialsDB', {
            useNewUrlParser: true
        });

        console.log('DB connected!');

    } catch (err) {
        console.error(err.message);
        process.exit();
    }
};