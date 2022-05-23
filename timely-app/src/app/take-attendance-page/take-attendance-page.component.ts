import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { LectureClass } from '../lecture-class';
import { StudentClass } from '../student-class';
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
  studentResult: StudentClass;
  lectureDate: number = 0;
  attendanceRecord: any;

  formDisplay = true;
  successfulMessageDisplay = false;
  invalidCodeMessageDisplay = false;
  invalidStudentIdMessageDisplay = false;
  deniedSubmissionDisplay = false;


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
    //The current date that student take attendance
    let takenDate = new Date();
    let takenDt = takenDate.getDate();
    let takenMonth = takenDate.getMonth() + 1;
    let takenYear = takenDate.getFullYear();
    console.log("Taken Date: " + takenDt);
    console.log("Taken Month: " + takenMonth);
    console.log("Taken Year: " + takenYear);

    //The lecture date
    let lectureDt;
    let lectureMonth;
    let lectureYear;

    //Validating student id by getting student object by id
    this.apiService.getStudentByStudentId(this.studentID).toPromise().then((result: any)=>{
      this.studentResult = result;
      //let studentJSON = JSON.stringify(this.studentResult);
      console.log(this.studentResult)
      

      if(result != null){

        //Validating secure code by getting the lecture for this specific code
        this.apiService.getLectureByCode(this.code).toPromise().then((result:any)=>
        {
          this.invalidCodeMessageDisplay = false;
          this.lectureResult = result;
          
          if(result != null)
          {
            let lectureId = this.lectureResult?.lectureId;
            let takenDate = new Date (this.lectureResult?.date);
            
            
            lectureDt = takenDate.getUTCDate();
            lectureMonth = takenDate.getUTCMonth() + 1;
            lectureYear = takenDate.getUTCFullYear();


            console.log("lecture date: " + lectureDt);
            console.log("lecture month : " + lectureMonth);
            console.log("lecture year : " + lectureYear);
            console.log("list results: " + JSON.stringify(result));

            if (lectureYear == takenYear && lectureMonth == takenMonth && lectureDt == takenDt){
              console.log("Taken date == lecture date");
              this.attendanceRecord = {
                "Student": this.studentResult,
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
              this.formDisplay = false;
              this.deniedSubmissionDisplay = true;
            }
          }

          else{
            //show message if secure code is wrong
            this.invalidCodeMessageDisplay = true;
          }
          
        });
      }

      else {
        this.invalidStudentIdMessageDisplay = true;
      }
      

    });
  }

  

}
