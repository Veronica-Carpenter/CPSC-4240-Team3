var path = require('path');
var express = require('express');
var hbs = require('hbs');
var app = express();
// define paths for express config
var publicDirectoryPath = path.join(__dirname, '../public');
var viewsPath = path.join(__dirname, '../templates/views');
// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
// setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.get('', function (req, res) {
    res.render('index', {
        name: 'Shipra',
        title: 'Index dynamic page',
        description: 'Index dynamic page'
    });
});
// express routes
app.get('/page2', function (req, res) {
    res.send({
        name: 'Shipra',
        title: 'Another title',
        description: 'Attendance Tracker App'
    });
});
app.get('/page3', function (req, res) {
    res.send({
        name: 'Shipra',
        title: 'Sample JSON',
        description: 'Attendance Tracker App'
    });
});
app.listen(8080, function () {
    console.log('App is running at port 8080');
});
