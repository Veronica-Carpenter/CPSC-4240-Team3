import { Component, OnInit } from '@angular/core';
// import { type } from 'os';
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

  formDisplay = true;
  successfulMessageDisplay = false;
  invalidStudentIdMessageDisplay = false;
  deniedSubmissionDisplay = false;

  constructor(private apiService: TimelyAPIService) {
  }

  ngOnInit(): void {
  }

  getStudentId(val: string){

    //check if student id is number
    if(!isNaN(Number(val))){
      this.studentID = parseInt(val);
      console.log('studentId: ' + this.studentID);
    }
    else(
      console.log("Student ID should be a number")
    )
  }
  
  getStudentfname(val: any){

    //check if student id is number
    if(typeof val == 'string' || val instanceof String) {
      this.studentfname = val;
      console.log('studentfname: ' + this.studentfname);
    }
    else(
      console.log("Student first name should be a string")
    )
  }

  getStudentlname(val: any){

    //check if student id is number
    if(typeof val == 'string' || val instanceof String) {
      this.studentlname = val;
      console.log('studentlname: ' + this.studentlname);
    }
    else(
      console.log("Student last name should be a string")
    )
  }

  getStudentemail(val: any){

    //check if student id is number
    if(typeof val == 'string' || val instanceof String) {
      this.studentemail = val;
      console.log('studentemail: ' + this.studentemail);
    }
    else(
      console.log("Student email should be a string")
    )
  }

  reloadPage(){
    window.location.reload();
  }

  submitButton() {

    this.invalidStudentIdMessageDisplay = false;
    this.studentData = {
      "studentId": this.studentID,
      "fname": this.studentfname,
      "lname": this.studentlname,
      "email": this.studentemail
    }
   
    this.apiService.createAStudent(this.studentData).subscribe((result: any) => {
      console.log('student data:' + this.studentData);
      console.log("student added succesfully!")
    });
  }
}

