var mongoose = require('mongoose');
var validator = require('validator');
var professorModel = mongoose.model('professor', {
    professorId: {
        type: Number,
        required: true,
        trim: true
    },
    fname: {
        type: String,
        trim: true
    },
    lname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: function (value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    courseList: [
        {
            courseId: {
                type: Number,
                required: true,
                trim: true
            },
            courseName: {
                type: String,
                trim: true
            }
        }
    ]
});
module.exports = professorModel;
