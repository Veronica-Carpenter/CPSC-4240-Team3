var express = require('express');
require('./db/mongoose');
var User = require('./models/user');
var Professor = require('./models/professorModel');
var app = express();
app.use(express.json());
app.post('/users', function (req, res) {
    console.log(req.body);
    var user = new User(req.body);
    user.save().then(function () {
        res.send(user);
    })["catch"](function (error) {
        console.log(error);
        res.status(400);
        res.send(error);
    });
});
app.get('/users', function (req, res) {
    User.find({}).then(function (users) {
        console.log(users);
        res.send(users);
    })["catch"](function (error) {
        res.status(500);
        res.send(error);
    });
});
app.get('/users/:id', function (req, res) {
    var _id = req.params.id;
    User.findById({ _id: _id }).then(function (user) {
        if (!user) {
            res.status(404);
            return res.send();
        }
        res.send(user);
    })["catch"](function (error) {
        res.status(500);
        res.send(error);
    });
});
app.post('/professors', function (req, res) {
    console.log(req.body);
    var professor = new Professor(req.body);
    professor.save().then(function () {
        res.send(professor);
    })["catch"](function (error) {
        console.log(error);
        res.status(400);
        res.send(error);
    });
});
app.listen(8080, function () {
    console.log('app is up and running on port 8080');
});
