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
  invalidStudentnameMessageDisplay = false;
  invalidStudentemailMessageDisplay = false;

  constructor(private apiService: TimelyAPIService) {
  }

  ngOnInit(): void {
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

    this.studentData = {
      "studentId": this.studentID,
      "fname": this.studentfname,
      "lname": this.studentlname,
      "email": this.studentemail
    }
   
    this.apiService.createAStudent(this.studentData).subscribe((result: any) => {
      this.formDisplay = false;
      this.successfulMessageDisplay = true;
      console.log('student data:' + this.studentData);
      console.log("student added succesfully!")
    });
  }
}

