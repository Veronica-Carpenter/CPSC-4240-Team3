import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CookieService } from '../cookie.service';
import { LectureClass } from '../lecture-class';
import { Student } from '../student';
import { TimelyAPIService } from '../timely-api.service';

@Component({
  selector: 'app-take-attendance-page',
  templateUrl: './take-attendance-page.component.html',
  styleUrls: ['./take-attendance-page.component.css']
})
export class TakeAttendancePageComponent implements OnInit {

  studentID: string;
  code: number = 0;
  lectureResult: LectureClass;
  studentResult: Student;
  lectureDate: number = 0;
  attendanceRecord: any;
  attendanceResult: any;
  mapAttendancetoStudentContent: any;

  public studentname: string;
  public studentuserId: string;
  public studentemail: string;

  formDisplay = true;
  successfulMessageDisplay = false;
  invalidCodeMessageDisplay = false;
  invalidStudentIdMessageDisplay = false;
  deniedSubmissionDisplay = false;
  duplicateAttendanceDisplay = false;

  constructor(private apiService: TimelyAPIService, public cookie: CookieService) { 
  }

  ngOnInit() {
    this.studentname = this.cookie.getCookie('timelyAppfullNameCookie');
    this.studentuserId = this.cookie.getCookie('timelyAppUserIdCookie');
    this.studentemail = this.cookie.getCookie('timelyAppemailCookie');

    console.log('student Id: ' + this.studentuserId);
  }

  getCode(val: string){
    //check if code is number
    if(!isNaN(Number(val))){
      this.code = parseInt(val);
      //console.log("Session code: " + this.code);
    }
    else(
      console.log("Session code need to be number")
    )
  }
  reloadPage(){
    window.location.reload();
  }

  formatDate (date: string){
    let tempDate = new Date(date);
      return tempDate.toDateString();
  }

  submitButton(){ 
    let studentObjId :any ; 
    let attendanceObjId;

    //Turn off all error message
    this.invalidCodeMessageDisplay = false;
    this.invalidStudentIdMessageDisplay = false;

    //The current date that student take attendance
    let takenDate = new Date();
    let takenDt = takenDate.getDate();
    let takenMonth = takenDate.getMonth() + 1;
    let takenYear = takenDate.getFullYear();
    console.log("Date: " + takenDate);
    console.log("Taken Date: " + takenDt);
    console.log("Taken Month: " + takenMonth);
    console.log("Taken Year: " + takenYear);

    //The lecture date
    let lectureDt;
    let lectureMonth;
    let lectureYear;

    //Validating student id by getting student object by id
    this.apiService.getStudentByStudentId(this.studentuserId).subscribe((result: any)=>{
      this.studentResult = result;
      //let studentJSON = JSON.stringify(this.studentResult);
      console.log('this student id is: ');
      console.log(this.studentResult);
      
      if(result != null){
        studentObjId = result?._id;
        console.log("OBject id: " + studentObjId);

        //Validating secure code by getting the lecture for this specific secure code
        this.apiService.getLectureByCode(this.code).subscribe((result:any)=>
        {
          this.invalidCodeMessageDisplay = false;
          this.lectureResult = result;
          
          if(result != null)
          {
            let lectureId = this.lectureResult?.lectureId;
            let takenDate = new Date (this.lectureResult?.date);

            lectureDt = takenDate.getDate();
            lectureMonth = takenDate.getMonth() + 1;
            lectureYear = takenDate.getFullYear();

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
                "status": "Present"
              }

              //Check to not allow to take attendance twice for same lecture Id and same student id
              this.apiService.getAttendanceByLectureIdAndStudentObjId(lectureId,studentObjId).subscribe((result: any)=>{
                console.log("take attendance twice's result: " + JSON.stringify(result));
                if(result.length == 0){
                  console.log("add new lecture");
                  //Call post API to add attendance record
                  this.apiService.addAttendanceRecord(this.attendanceRecord).subscribe((result: any) =>{
                    attendanceObjId = result?._id;
                    this.attendanceResult = result;
                    console.log("Attendance Obj ID: "+ attendanceObjId);
                    console.log("successfully add attendance");
                    this.mapAttendancetoStudentContent = {
                      "attendanceId" : attendanceObjId,
                      "studentId" : studentObjId
                    }
                    console.log(this.mapAttendancetoStudentContent);

                    //Call post API to map attendance to student
                    this.apiService.mapAttendanceToStudent(this.mapAttendancetoStudentContent).subscribe((result:any) =>{
                      console.log("Mapped succesfully");
                      this.formDisplay = false;
                      this.successfulMessageDisplay = true;
                    });
                  
                  });
                }
                else{
                  console.log("Not add new lecture");
                  this.formDisplay = false;
                  this.duplicateAttendanceDisplay = true;
                }
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
