import * as express from 'express';
import {userModel} from './models/usermodel';
import {courseModel} from './models/courseModel';
import * as bodyParser from 'body-parser';
import { professorModel } from './models/professorModel';
import { lectureModel } from './models/lectureModel';
import {studentModel} from './models/studentModel';
import { attendanceModel } from './models/attendanceModel';

// setting up endpoints

class App {
    public expressApp = express.Application;
    public Users:userModel;
    public Courses:courseModel;
    public Professors: professorModel;
    public Lectures: lectureModel;
    public Students: studentModel;
    public Attendances: attendanceModel;


    constructor() {
        this.expressApp = express();
        this.middleware();
        this.routes();

        this.Users = new userModel();
        this.Courses = new courseModel();
        this.Professors = new professorModel();
        this.Lectures = new lectureModel();
        this.Students = new studentModel();
        this.Attendances = new attendanceModel();
    }

    private middleware(): void {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        let router = express.Router();

        // Add a new user
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
        });

        // Get all the users
        router.get('/users', (req, res) => {
            this.Users.retrieveUserLists(res);
        });

        // Get a user by id
        router.get('/users/:id', (req, res) => {
            var id = req.params.id;
            console.log('Getting a user with id : ' + id);
            this.Users.retrieveASingleUser(res, {id});
        });

        // Add a new course
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
        });

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
        });

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
        });

        //Get all students
        router.get('/students', (req, res) => {
            this.Students.retrieveStudentLists(res);
        });

        //Get a student by id
        router.get('/students/:id', (req, res) => {
            var id = req.params.id;
            console.log('Getting a student with id : ' + id);
            this.Students.retrieveASingleStudent(res, {studentId:id});
        });

        //Add a new attendance record 
        router.post('/attendances', (req, res) => {
            var attendance = req.body
            let attendanceList = new this.Attendances.model(attendance);
            attendanceList.save().then(() => {
                console.log(attendanceList)
                res.send(attendanceList)
            }).catch((error) => {
                res.status(400)
                res.send(error)
            })
        });

        //Get all attendances
        router.get('/attendances', (req, res) => {
            this.Attendances.retrieveAttendanceLists(res);
        });

        //Get an attendance by student id
        router.get('/attendances/:id', (req, res) => {
            var id = req.params.id;
            console.log('Getting a attendance with id : ' + id);
            this.Attendances.retrieveASingleAttendance(res, {studentId:id});
        });

        this.expressApp.use('/', router);
        this.expressApp.use('/', express.static("../public"));
    }
}

export {App};
