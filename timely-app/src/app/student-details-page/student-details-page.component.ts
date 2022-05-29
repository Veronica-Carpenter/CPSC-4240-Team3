import { Component, OnInit } from '@angular/core';
import { StudentClass } from '../student-class';
import { Course } from '../course';
import { ActivatedRoute } from '@angular/router';
import { TimelyAPIService } from '../timely-api.service';

@Component({
  selector: 'app-student-details-page',
  templateUrl: './student-details-page.component.html',
  styleUrls: ['./student-details-page.component.css']
})
export class StudentDetailsPageComponent implements OnInit {
  fname: string;
  lname: string;
  email: string;
  studentId: number = 1;
  courseList: Course[];
  radioClicked: boolean = false;

  constructor(private apiService: TimelyAPIService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.forEach((route) => this.studentId = route["studentId"]);
    this.apiService.getStudentByStudentId(this.studentId).subscribe((result: any) => {
      this.fname = result.fname;
      this.lname = result.lname;
      this.email = result.email;
      //this.courseList = result.courseList;

      /* for(var i = result.courseList.length - 1; i >= 0; i--) {
        this.apiService.getCourseObjByObjId(result.courseList[i]).subscribe((result: any) => {
          //this.courseList[i] = 
        })
      } */

      console.log("Student Information: " + JSON.stringify(result));
    })
  }

  RemoveStudentFromCourseClick(){
    let courseID = 1;

    /* for(var i = this.courseList.length - 1; i >= 0; i--) {
      if(this.courseList[i].courseId === courseID) {
        this.courseList.splice(i, 1);
      }
    }

    // Call PATCH API to remove a student from the course
    this.apiService.removeStudentFromCourse(this.studentId, this.courseList).subscribe((result:any)=>{
      console.log(this.fname + " " + this.lname + "(" + courseID + ") was removed from course " + courseID);
    }) */

  }
}