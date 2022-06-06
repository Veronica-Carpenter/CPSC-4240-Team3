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

  public studentID: string;;
  studentfname: String;
  studentlname: String;
  studentemail: String;
  studentResult: Student;
  studentData: any;
  courseId: number;
  mapCourseToStudentObject: any;
  public name = ""
  public userId = ""
  public email = ""

  formDisplay = true;
  successfulMessageDisplay = false;
  errorMessage = false;

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

  getStudentId(val: any){

    this.studentID = val;
      console.log('studentid is: ' + this.studentID);
  }
  
  reloadPage(){
    window.location.reload();
  }

  submitButton() {

    let studentObjId :any; 
    let courseObjId: any;

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
            this.errorMessage = false;
            this.successfulMessageDisplay = true;
          });
        });
      }

      // if student doesn't exist already

      else {
        
        this.formDisplay = true;
        this.errorMessage = true;
        console.log('student ID does not exist!!!');
      }
    })
  }
}

