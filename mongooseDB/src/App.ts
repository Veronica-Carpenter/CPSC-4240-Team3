import * as express from 'express';
import {courseModel} from './models/courseModel';
import * as bodyParser from 'body-parser';
import { professorModel } from './models/professorModel';
import { lectureModel } from './models/lectureModel';
import { studentModel } from './models/studentModel';
import { attendanceModel } from './models/attendanceModel';
import GooglePassportObj from './GooglePassport';
var expressSession = require('express-session');
import * as passport from 'passport';
let cors = require('cors');
import {AuthMiddleWare} from "./middleware-auth";
const MongoStore = require('connect-mongo');
let cookieParser = require('cookie-parser');


// setting up endpoints

class App {
    public expressApp: express.Application;
    public Courses:courseModel;
    public Professors: professorModel;
    public Lectures: lectureModel;
    public Students: studentModel;
    public Attendances: attendanceModel;
    public googlePassportObj: GooglePassportObj;

    constructor() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.googlePassportObj = new GooglePassportObj();

        this.Courses = new courseModel();
        this.Professors = new professorModel();
        this.Lectures = new lectureModel();
        this.Students = new studentModel();
        this.Attendances = new attendanceModel();
    }

    private middleware(): void {
        this.expressApp.use(cors());

        // required for passport session
        this.expressApp.use(expressSession({
        secret: 'My Express App',
        saveUninitialized: true,
        resave: true,
        store: MongoStore.create({
            mongoUrl: "mongodb://127.0.0.1:27017/attendance-tracker",
            collection: 'sessions'
            })
        }));

        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));

        //This will allow CORS permission for localhost:4200
        this.expressApp.use(function(req, res, next){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
        // this.expressApp.use(cookieSession({
        //     name: 'google-auth-session',
        //     keys: ['key1', 'key2']
        // }))
    }

    private routes(): void {
        let router = express.Router();

        router.get('/auth', passport.authenticate('google', { scope: ['profile', 'email'] }));
        router.get('/auth/error', (req, res) => res.send('Unknown Error'));
        router.get('/api/account/google', passport.authenticate('google', { failureRedirect: '/auth/error' }),
        function(req, res) {
            var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
            responseHTML = responseHTML.replace('%value%', JSON.stringify({
                user: req.user
            }));
            res.status(200).send(responseHTML);
        }
        );
        

        //   router.get('/logout', (req, res) => {
        //     session = null,
        //     req.logout();
        //     res.send('logged out');
        //   });

        //create professor
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
            this.Professors.retrieveASingleProfessor(res, {id});
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
            this.Students.retrieveAStudentById(res, {id});
        });

        //Get a student by student id
        router.get('/students/studentId/:studentId', (req, res) => {
            var studentId = req.params.studentId;
            console.log('Getting a student withs studentId: ' + studentId);
            this.Students.retrieveASingleStudenteByStudentId(res, {studentId: studentId});
        });

        // Get Students By Course
        router.route("/find/:courseId").get((req, res) => {
            var courseId = req.params.courseId;
            var findResult = this.Students.model.find({}).populate('courseList')
            findResult.exec( (err, studentsList) => {
                res.json(studentsList.filter((student) => student.courseList.filter((course) => course.courseId == courseId).length > 0))
            });
        });

        // Delete a student by student Id
        router.delete('/students/', async (req, res) => {
            var id = req.query.studentId;
            console.log('Deleting a student by Student ID: ' + id);
            try {
                const student = await this.Students.model.remove({studentId: id})
                if (!student) {
                    return res.status(404).send()
                }
                console.log('Student deleted!')
                res.status(200).send('Student deleted!')
            } catch(error) {
                res.status(500).send()
            }
        });

        // Delete a student by its Id
        router.delete('/students/:id', async (req, res) => {
            var id = req.params.id;
            console.log('Deleting a student by ID: ' + id);
            try {
                const student = await this.Students.model.findByIdAndDelete(id)
                
                if (!student) {
                    return res.status(404).send()
                }
                res.status(200).send(student)
            } catch(error) {
                res.status(500).send()
            }
        });

        //Update a student by its student Id
        router.patch('/students/update', async (req, res) => {
            var id = req.query.studentId;
            console.log('Updating a student by its ID: ' + id);
            try {
                const student = await this.Students.model.update({studentId: id}, req.body, { new: true, runValidators: true})
                if (!student) {
                    return res.status(404).send()                
                }
                console.log(student)
                res.status(200).send(student)
            } catch(e) {
                res.status(400).send(e);
            }
        });

        //Update a student by its Id
        router.patch('/students/:id', async (req, res) => {
            var id = req.params.id;
            console.log('Updating a student by its ID: ' + id);
            try {
                const student = await this.Students.model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true})
                if (!student) {
                    return res.status(404).send()                
                }
                console.log(student)
                res.status(200).send(student)
            } catch(e) {
                res.status(400).send(e);
            }
        });

        // map courses to professors
        router.post('/mapCourseToProfessor', async (req, res) => {
            let { courseId, professorId } = req.body
            
            let course = await this.Courses.model.findById(courseId)
            let professor = await this.Professors.model.findById(professorId)
            
            course.Professor = professorId
            professor.courseList.push(courseId)

            try 
            {
                await this.Courses.model.findByIdAndUpdate({_id:  courseId}, course, { new: true, runValidators: true})
                await this.Professors.model.findByIdAndUpdate({_id: professorId}, professor, { new: true, runValidators: true})
                res.status(200).send("Mapped")
            } catch(e) {
                res.status(400).send(e);
            }
        });

        // map courses to students
        router.post('/mapCourseToStudent', async (req, res) => {
            let { courseId, studentId } = req.body
            let course = await this.Courses.model.findById(courseId)
            let student = await this.Students.model.findById(studentId)
            student.courseList  = [...student.courseList, course]
            
            try 
            {
                await this.Students.model.findByIdAndUpdate({_id: studentId}, student, { new: true, runValidators: true})
                res.status(200).json( {
                 "result"  : "Mapped Successfully"
                })
            } catch(e) {
                res.status(400).send(e);
            }
        });

        // map attendances to students
        router.post('/mapStudenttoAttendance', async (req, res) => {
            let { attendanceId, studentId } = req.body
            
            let attendance = await this.Attendances.model.findById(attendanceId)
            let student = await this.Students.model.findById(studentId)
            
            attendance.Student = studentId
            student.attendanceList.push(attendanceId)

            try 
            {
                await this.Attendances.model.findByIdAndUpdate({_id:  attendanceId}, attendance, { new: true, runValidators: true})
                await this.Students.model.findByIdAndUpdate({_id: studentId}, student, { new: true, runValidators: true})
                //res.status(200).send("Mapped")
                res.status(201).json({
                    message: 'Mapped',
                })
                
            } catch(e) {
                res.status(400).send(e);
            }
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

        //Get all courses
        router.get('/courses', (req, res) => {
            console.log("authenticating..")
            console.log(req.isAuthenticated())
            this.Courses.retrieveCourseLists(res);
        });

        // Get a course by id
        router.get('/courses/:id', (req, res) => {
            var id = req.params.id;
            console.log('Getting a course with id : ' + id);
            this.Courses.retrieveASingleCourse(res, {id});
        });

        //Get a courseobjId by course id
        router.get('/courses/obj/:courseId', (req, res) => {
            var courseId = req.params.courseId;
            var findResult = this.Courses.model.find({courseId});
            findResult.exec( (err, courseObjId) => {
                res.json(courseObjId);
            });
        });

        router.route("/find/:courseId").get((req, res) => {
            var courseId = req.params.courseId;
            var findResult = this.Students.model.find({}).populate('courseList')
            findResult.exec( (err, studentsList) => {
                res.json(studentsList.filter((student) => student.courseList.filter((course) => course.courseId == courseId).length > 0))
            });
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
            this.Lectures.retrieveASingleLecture(res, {id});
        });


        //Get a student by first name
        router.get('/students/studentFName/:fName', (req, res) => {
            var fName = req.params.fName;
            console.log('Getting a student with first name : ' + fName);
            this.Students.retrieveStudentByfname(res, fName);
        });

        //Get a lecture by date
        router.get('/lectures/date/:date/courseId/:courseId', (req, res) => {
            var date = req.params.date;
            var courseId = req.params.courseId;
            console.log('Getting a lecture with date : ' + date);
            var temp = [date, courseId];
            console.log("temp" +temp)
            this.Lectures.retrieveLecturesByDate(res, [date, courseId]);
        });

        //Get a lecture by secure code
        router.get('/lectures/code/:secureCode', (req, res) => {
            var code = req.params.secureCode;
            console.log('Getting a lecture with secure code: ' + code);
            this.Lectures.retrieveASingleLectureByCode(res, {secureCode: code});
        });

        // Get lectures by course Id
        router.get('/lectures/course/:courseId', (req, res) => {
            var courseId = req.params.courseId;
            this.Lectures.retrieveLecturesByCourse(res, {courseId : courseId});
        })
        
        // get lectuers for a course and student id

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
            this.Attendances.retrieveASingleAttendance(res, {id});
        });
        
        this.expressApp.use('/', router);
        this.expressApp.use('/', express.static("../public"));
    }
}

export {App};
