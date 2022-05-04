const express = require('express')
// const Professor = require('./models/professorModel')
import {userModel} from './models/usermodel';
import {courseModel} from './models/courseModel';
// const Lecture = require('./models/lectureModel')
import * as bodyParser from 'body-parser';
import { professorModel } from './models/professorModel';
import { lectureModel } from './models/lectureModel';
import {studentModel} from './models/studentModel'
// setting up endpoints

class App {
    public expressApp = express.Application;
    public Users:userModel;
    public Courses:courseModel;
    public Professors: professorModel;
    public Lectures: lectureModel;
    public Students: studentModel;


    constructor() {
        this.expressApp = express();
        this.middleware();
        this.routes();

        this.Users = new userModel();
        this.Courses = new courseModel();
        this.Professors = new professorModel();
        this.Lectures = new lectureModel();
        this.Students = new studentModel();
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

        //Add a new professor
        router.post('/professors', (req, res) => {
            var professor = req.body
            let professorList = new this.Professors.model(professor);
            professorList.save().then(() => {
                console.log(professorList)
                res.send(professorList)
            }).catch((error) => {
                res.status(400)
                res.send(error)
            })
        })

        //Get all professors
        router.get('/professors', (req, res) => {
            this.Professors.retrieveProfessorLists(res);
        });

        //Get a professor by id
        router.get('/professors/:id', (req, res) => {
            var id = req.params.id;
            console.log('Getting a professor with id : ' + id);
            this.Professors.retrieveASingleProfessor(res, {professorId:id});
        });


         //Add a new lecture
         router.post('/lectures', (req, res) => {
            var lecture = req.body
            let lectureList = new this.Lectures.model(lecture);
            lectureList.save().then(() => {
                console.log(lectureList)
                res.send(lectureList)
            }).catch((error) => {
                res.status(400)
                res.send(error)
            })
        })

        //Get all lectures
        router.get('/lectures', (req, res) => {
            this.Lectures.retrieveLectureLists(res);
        });

        //Get a lecture by id
        router.get('/lectures/:id', (req, res) => {
            var id = req.params.id;
            console.log('Getting a lecture with id : ' + id);
            this.Lectures.retrieveASingleLecture(res, {lectureId:id});
        });

        //Add a new student
        router.post('/students', (req, res) => {
            var student = req.body
            let studentList = new this.Students.model(student);
            studentList.save().then(() => {
                console.log(studentList)
                res.send(studentList)
            }).catch((error) => {
                res.status(400)
                res.send(error)
            })
        })

        //Get all students
        router.get('/students', (req, res) => {
            this.Students.retrieveStudentLists(res);
        });
        this.expressApp.use('/', router);

        //Get a student by id
        router.get('/students/:id', (req, res) => {
            var id = req.params.id;
            console.log('Getting a student with id : ' + id);
            this.Students.retrieveASingleStudent(res, {studentId:id});
        });
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