import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { LectureClass } from '../lecture-class';
import { TimelyAPIService } from '../timely-api.service';

@Component({
  selector: 'app-take-attendance-page',
  templateUrl: './take-attendance-page.component.html',
  styleUrls: ['./take-attendance-page.component.css']
})
export class TakeAttendancePageComponent implements OnInit {

  studentID: number = 0;
  code: number = 0;
  
  lectureResult: LectureClass;
  lectureDate: number = 0;

  formDisplay = true;
  successfulMessageDisplay = false;
  attendanceRecord: any;

  constructor(private apiService: TimelyAPIService) { }

  ngOnInit() {
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
    console.log("student id: " + this.studentID + "; session code: "+ this.code);
    
    //The current date that student take attendance
    let takenDate = new Date();
    let takenDt = takenDate.getDate();
    let takenMonth = takenDate.getMonth() + 1;
    let takenYear = takenDate.getFullYear();
    console.log("Taken Date: " + takenDt);
    console.log("Taken Month: " + takenMonth);
    console.log("Taken Year: " + takenYear);

    let lectureDt;
    let lectureMonth;
    let lectureYear;

    this.apiService.getLectureByCode(this.code).toPromise().then((result:any)=>
    {
      this.lectureResult = result;
      let lectureId = this.lectureResult?.lectureId;
      let takenDate = new Date (this.lectureResult?.date);
      
      
      lectureDt = takenDate.getUTCDate();
      lectureMonth = takenDate.getUTCMonth() + 1;
      lectureYear = takenDate.getUTCFullYear();


      console.log("lecture date: " + lectureDt);
      console.log("lecture month : " + lectureMonth);
      console.log("lecture year : " + lectureYear);
      console.log("list results: " + JSON.stringify(result));

      
      //console.log("lecture date : " + this.lectureDate);
      if (lectureYear == takenYear && lectureMonth == takenMonth && lectureDt == takenDt){
        console.log("Taken date == lecture date");
        this.attendanceRecord = {
          "studentId": this.studentID,
          "date": takenDate,
          "lectureId": lectureId,
          "status": "ontime"
        }

        //Call post API to add attendance record
        this.apiService.addAttendanceRecord(this.attendanceRecord).toPromise().then((result: any) =>{
          console.log("successfully add attendance");
          this.formDisplay = false;
          this.successfulMessageDisplay = true;
        });
      }
      else{
        console.log("taken date != lecture date");
      }
    }
    );
    
    
 
  }

  

}
