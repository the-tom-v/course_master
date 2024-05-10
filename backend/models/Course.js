const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    duration: {
        type: String,
        required: true,
    },
    introVideo: {
        type: String,
    },
    fee: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
