var mongoose = require('mongoose');
var validator = require('validator');
var User = mongoose.model('user', {
    userId: {
        type: Number,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        required: true,
        type: String,
        trim: true,
        minlength: 7,
        validate: function (value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password" ');
            }
        }
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
    userCategory: {
        type: String,
        trim: true
    }
});
module.exports = User;
