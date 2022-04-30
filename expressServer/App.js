var express = require('express');
var app = express();
app.get('', function (req, res) {
    res.send('Home Page');
});
app.get('/page2', function (req, res) {
    res.send('<h1>Sample HTML text</h1>');
});
app.get('/page3', function (req, res) {
    res.send({
        Name: 'Shipra',
        Title: 'Sample JSON',
        Description: 'Attendance Tracker App'
    });
});
app.listen(8080, function () {
    console.log('App is running at port 8080');
});
