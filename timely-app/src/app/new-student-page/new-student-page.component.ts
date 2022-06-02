import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student';
import { TimelyAPIService } from '../timely-api.service';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-new-student-page',
  templateUrl: './new-student-page.component.html',
  styleUrls: ['./new-student-page.component.css']
})
export class NewStudentPageComponent implements OnInit {

  studentID: number = 0;
  studentfname: String = '';
  studentlname: String = '';
  studentemail: String = '';
  studentResult: Student;
  studentData: any;
  courseId: number;
  mapCourseToStudentObject: any;
  public name = ""
  public userId = ""
  public email = ""

  formDisplay = true;
  successfulMessageDisplay = false;
  studentIdExistsMessageDisplay = false;
  invalidStudentIdMessageDisplay = false;
  invalidStudentnameMessageDisplay = false;
  invalidStudentemailMessageDisplay = false;

  constructor(private apiService: TimelyAPIService, private activatedRoute: ActivatedRoute, public cookie: CookieService) {
  }

  ngOnInit(): void {
    
    this.name = this.cookie.getCookie('timelyAppfullNameCookie');
    this.userId = this.cookie.getCookie('timelyAppUserIdCookie');
    this.email = this.cookie.getCookie('timelyAppemailCookie');

    this.activatedRoute.params.forEach((route) => {
      this.courseId = route["courseId"]
    });
  }

  getStudentId(val: string){

    //check if student id is number
    if(!isNaN(Number(val))){
      this.invalidStudentIdMessageDisplay = false;
      this.studentID = parseInt(val);
      console.log('studentId: ' + this.studentID);
    }
    else {
      this.invalidStudentIdMessageDisplay = true;
    }
  }
  
  getStudentfname(val: any){
    
    if(!isNaN(Number(val))) {
      console.log('Enter a string!')
      this.invalidStudentnameMessageDisplay = true;
    }
    //check if student fname is a string
    else if(typeof val == 'string' || val instanceof String) {
      this.invalidStudentnameMessageDisplay = false;
      this.studentfname = val;
      console.log('studentfname: ' + this.studentfname);
    }
  }

  getStudentlname(val: any){
 
    if(!isNaN(Number(val))) {
      console.log('Enter a string!')
      this.invalidStudentnameMessageDisplay = true;
    }
    //check if student lname is string
    else if(typeof val == 'string' || val instanceof String) {
      this.invalidStudentnameMessageDisplay = false;
      this.studentlname = val;
      console.log('studentlname: ' + this.studentlname);
    }
  }

  getStudentemail(val: any){
      this.studentemail = val;
      console.log('studentemail: ' + this.studentemail);
  }

  reloadPage(){
    window.location.reload();
  }

  ValidateEmail(val: any) 
  {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val))
    {
      this.studentemail = val;
      console.log('studentemail: ' + this.studentemail);
      return (true)
    }
    console.log('Enter a email!')
    this.invalidStudentemailMessageDisplay = true;
    return (false)
}

  submitButton() {

    let returnVal = this.ValidateEmail(this.studentemail)
    if (!returnVal) {
      return;
    }
    let studentObjId :any; 
    let courseObjId: any;

    this.studentData = {
      "studentId": this.studentID,
      "fname": this.studentfname,
      "lname": this.studentlname,
      "email": this.studentemail
    }

    // validating if student exists by calling get student by studentID API
    this.apiService.getStudentByStudentId(this.studentID).subscribe((result: any) => {

      this.studentResult = result;
      console.log(this.studentResult);

      // if student exists already
      if (result != null) {
        studentObjId = result?._id;

        // call course model to get course object id on the basis of courseId
        this.apiService.courseObjIdByCourseId(this.courseId).subscribe((result: any) => {
          console.log(result);
          courseObjId = result[0]?._id;

          console.log('student object id: ' + studentObjId);
          console.log('course object id: ' + courseObjId);
  
          this.mapCourseToStudentObject = {
            "courseId" : courseObjId,
            "studentId" : studentObjId
          }
  
          console.log(this.mapCourseToStudentObject);
  
          // Post API to map newly created student to the course
          this.apiService.mapCourseToStudent(this.mapCourseToStudentObject).subscribe((result: any) => {
            console.log("Mapped succesfully");
            this.formDisplay = false;
            this.successfulMessageDisplay = true;
          });
        });
      }

      // if student doesn't exist already

      else {
        
        // Post API to create a new student 
      this.apiService.createAStudent(this.studentData).subscribe((result: any) => {
        studentObjId = result?._id;
        console.log('student object id: ' + studentObjId);
        this.formDisplay = false;
        this.successfulMessageDisplay = true;

        // call course model to get course object id on the basis of courseId
        this.apiService.courseObjIdByCourseId(this.courseId).subscribe((result: any) => {
          console.log(result);
          courseObjId = result[0]?._id;
          console.log('course object id: ' + courseObjId);

          this.mapCourseToStudentObject = {
            "courseId" : courseObjId,
            "studentId" : studentObjId
          }

          console.log(this.mapCourseToStudentObject);

          // Post API to map newly created student to the course
          this.apiService.mapCourseToStudent(this.mapCourseToStudentObject).subscribe((result: any) => {
            console.log("Mapped succesfully");
          });
        });
      });
      }
    })
  }
}

