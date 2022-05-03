let mongoose = require('mongoose')
const validator = require('validator')

const Course = mongoose.model('course', {
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
})


module.exports = Course