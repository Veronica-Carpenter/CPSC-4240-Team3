var express = require('express');
require('./db/mongoose');
var User = require('./models/user');
var app = express();
app.use(express.json());
app.post('/users', function (req, res) {
    var user = new User(req.body);
    user.save().then(function () {
        res.send(user);
    })["catch"](function (error) {
        res.status(400);
        res.send(error);
    });
});
app.listen(8080, function () {
    console.log('app is up and running on port 8080');
});
