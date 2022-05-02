const express = require('express')
require('./db/mongoose')
const User = require('./models/user')

const app = express()

app.use(express.json())

app.post('/users', (req, res) => {

    const user = new User(req.body)
    user.save().then(() => {
        res.send(user)
    }).catch((error) => {
        res.status(400)
        res.send(error)
    })
})

app.listen(8080, () => {
    console.log('app is up and running on port 8080')
})