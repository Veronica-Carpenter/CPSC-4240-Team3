var Mongoose = require('mongoose');
Mongoose.connect('mongodb://127.0.0.1:27017/attendance-tracker', {
    useNewUrlParser: true
});