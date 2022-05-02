var mongoose = require('mongoose');
var validator = require('validator');
var professorModel = mongoose.model('professor', {
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
