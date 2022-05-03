var mongoose = require('mongoose');
var validator = require('validator');
var Course = mongoose.model('course', {
    courseId: {
        type: Number,
        required: true,
        trim: true
    },
    courseName: {
        type: String,
        required: true,
        trim: true
    }
});
module.exports = Course;
