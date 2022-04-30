const express = require('express')

const app = express()

app.get('', (req, res) => {
    res.send('Home Page')
})

app.get('/page2', (req, res) => {
    res.send('<h1>Sample HTML text</h1>')
})

app.get('/page3', (req, res) => {
    res.send({
        Name: 'Shipra',
        Title: 'Sample JSON',
        Description: 'Attendance Tracker App'
    })
})

app.listen(8080, () => {
    console.log('App is running at port 8080')
})