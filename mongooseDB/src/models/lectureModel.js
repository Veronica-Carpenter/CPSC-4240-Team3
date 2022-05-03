var mongoose = require('mongoose');
var validator = require('validator');
var lectureModel = mongoose.model('lecture', {
    lectureId: {
        type: Number,
        required: true,
        trim: true
    },
    courseId: {
        type: Number,
        required: true,
        trim: true
    },
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    secureCode: {
        type: Number,
        required: true,
        trim: true
    }
});
module.exports = lectureModel;
