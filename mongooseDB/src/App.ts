const express = require('express')
// const Professor = require('./models/professorModel')
import {userModel} from './models/usermodel';
import {courseModel} from './models/courseModel';
// const Lecture = require('./models/lectureModel')
import * as bodyParser from 'body-parser';

// setting up endpoints

class App {
    public expressApp = express.Application;
    public Users:userModel;
    public Courses:courseModel;

    constructor() {
        this.expressApp = express();
        this.middleware();
        this.routes();

        this.Users = new userModel();
        this.Courses = new courseModel();
    }

    private middleware(): void {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        let router = express.Router();

        router.post('/users', (req, res) => {
            var user = req.body
            let userList = new this.Users.model(user);
            userList.save().then(() => {
                console.log(userList)
                res.send(userList)
            }).catch((error) => {
                res.status(400)
                res.send(error)
            })
        })

        router.get('/users', (req, res) => {
            this.Users.retrieveUserLists(res);
        });

        router.get('/users/:id', (req, res) => {
            var id = req.params.id;
            console.log('Getting a user with id : ' + id);
            this.Users.retrieveASingleUser(res, {id});
        });

        router.post('/courses', (req, res) => {
            var course = req.body
            let courseList = new this.Courses.model(course);
            courseList.save().then(() => {
                console.log(courseList)
                res.send(courseList)
            }).catch((error) => {
                res.status(400)
                res.send(error)
            })
        });

        this.expressApp.use('/', router);
    }
}

export {App};



// app.get('/users/:id', (req, res) => {
//     const _id = req.params.id
//     User.findById({_id}).then((user) => {
//         if (!user) {
//             res.status(404)
//             return res.send()
//         }
//         console.log("user fetched by Id: " + user)
//         res.send(user)
//     }).catch((error) => {
//         res.status(500)
//         res.send(error)
//     })
// })

// app.patch('/users/:id', (req, res) => {
//     const _id = req.params.id
//     User.findByIdAndUpdate({_id}, req.body, {
//         new: true,
//         runValidators: true
//     }).then((user) => {
//         if (!user) {
//             res.status(404)
//             return res.send()
//         }
//         console.log('user updated: ')
//         console.log(user)
//         res.send(user)
//     }).catch((error) => {
//         res.status(400)
//         res.send(error)
//     })
// })

// app.post('/professors', (req, res) => {
//     console.log(req.body)
//     const professor = new Professor(req.body)
//     professor.save().then(() => {
//         res.send(professor)
//     }).catch((error) => {
//         console.log(error)
//         res.status(400)
//         res.send(error)
//     })
// })



// app.post("/lectures", (req, res)=>{
//     console.log(req.body)
//     const lecture = new Lecture (req.body)
//     lecture.save().then(()=>{
//         res.send(lecture)
//     }).catch((error) => {
//         console.log(error)
//         res.status(400)
//         res.send(error)
//     })
// })