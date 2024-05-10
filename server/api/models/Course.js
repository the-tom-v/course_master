const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    },
    duration: {
        type: Number,
        required: true,
    },
    video: {
        type: String,
    },
    fee: {
        type: Number,
    }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
