const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Professor = require('./models/professorModel')

const app = express()

app.use(express.json())

// setting up endpoints

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

app.get('/users', (req,res) => {
    User.find({}).then((users) => {
        console.log(users)
        res.send(users)
    }).catch((error) => {
        res.status(500)
        res.send(error)
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findById({_id}).then((user) => {
        if (!user) {
            res.status(404)
            return res.send()
        }
        res.send(user)
    }).catch((error) => {
        res.status(500)
        res.send(error)
    })
})

app.patch('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findByIdAndUpdate({_id}, req.body, {
        new: true,
        runValidators: true
    }).then((user) => {
        if (!user) {
            res.status(404)
            return res.send()
        }
        console.log('user updated: ')
        console.log(user)
        res.send(user)
    }).catch((error) => {
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