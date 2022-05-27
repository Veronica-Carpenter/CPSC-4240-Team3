import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student';
import { TimelyAPIService } from '../timely-api.service';

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

  formDisplay = true;
  successfulMessageDisplay = false;
  invalidStudentIdMessageDisplay = false;
  invalidStudentnameMessageDisplay = false;
  invalidStudentemailMessageDisplay = false;

  constructor(private apiService: TimelyAPIService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
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

    //check if student id is number
    if(typeof val == 'string' || val instanceof String) {
      this.invalidStudentnameMessageDisplay = false;
      this.studentfname = val;
      console.log('studentfname: ' + this.studentfname);
    }
    else {
      this.invalidStudentnameMessageDisplay = true;
    }
  }

  getStudentlname(val: any){

    //check if student id is number
    if(typeof val == 'string' || val instanceof String) {
      this.studentlname = val;
      console.log('studentlname: ' + this.studentlname);
    }
    else {
      this.invalidStudentnameMessageDisplay = true;
    }
  }

  getStudentemail(val: any){

    //check if student id is number
    if(typeof val == 'string' || val instanceof String) {
      this.invalidStudentemailMessageDisplay = false;
      this.studentemail = val;
      console.log('studentemail: ' + this.studentemail);
    }
    else {
      this.invalidStudentemailMessageDisplay = true;
    }
  }

  reloadPage(){
    window.location.reload();
  }

  submitButton() {

    let studentObjId :any; 
    let courseObjId: any;

    this.studentData = {
      "studentId": this.studentID,
      "fname": this.studentfname,
      "lname": this.studentlname,
      "email": this.studentemail
    }
   
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
}

