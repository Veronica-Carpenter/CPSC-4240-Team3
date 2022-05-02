const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Professor = require('./models/professorModel')

const app = express()

app.use(express.json())

app.post('/users', (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user)
    }).catch((error) => {
        console.log(error)
        res.status(400)
        res.send(error)
    })
})

app.post('/professors', (req, res) => {
    console.log(req.body)
    const professor = new Professor(req.body)
    professor.save().then(() => {
        res.send(professor)
    }).catch((error) => {
        console.log(error)
        res.status(400)
        res.send(error)
    })
})

app.listen(8080, () => {
    console.log('app is up and running on port 8080')
}) 