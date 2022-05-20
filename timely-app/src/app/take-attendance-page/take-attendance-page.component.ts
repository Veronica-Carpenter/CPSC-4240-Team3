import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-take-attendance-page',
  templateUrl: './take-attendance-page.component.html',
  styleUrls: ['./take-attendance-page.component.css']
})
export class TakeAttendancePageComponent implements OnInit {

  studentID: number = 0;
  code: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  getStudentId(val: string){
    //check if student id is number
    if(!isNaN(Number(val))){
      this.studentID = parseInt(val);
      console.log("Student ID: " + this.studentID);
    }
    else(
      console.log("Student ID need to be number")
    )
  }

  getCode(val: string){
    //check if code is number
    if(!isNaN(Number(val))){
      this.code = parseInt(val);
      console.log("Session code: " + this.code);
    }
    else(
      console.log("Session code need to be number")
    )
  }

  submitButton(){
    console.log("student id: " + this.studentID + "; session code: "+this.code);
  }

  

}
