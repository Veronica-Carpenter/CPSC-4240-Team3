let mongoose = require('mongoose')
const validator = require('validator')

const professorModel = mongoose.model('professor', {
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
})

module.exports = professorModel