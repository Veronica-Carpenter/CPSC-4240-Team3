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
  courseId: number = 0;
  fname: string;
  lname: string;
  email: string;
  studentId: number = 1;
  courseList: Course[];
  constructor(private apiService: TimelyAPIService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.params.forEach((route) => this.studentId = route["studentId"]);
    this.apiService.getStudentByStudentId(this.studentId).subscribe((result: any) => {
      this.fname = result.fname;
      this.lname = result.lname;
      this.email = result.email;
      this.courseList = result.courseList;
      console.log("Student Information: " + JSON.stringify(result));
    })
  }
  RemoveStudentFromCourseClick(){
    let courseName: string = '';
    for(var i = this.courseList.length - 1; i >= 0; i--) {
      if(this.courseList[i].courseId === this.courseId) {
        courseName = this.courseList[i].courseName;
        this.courseList.splice(i, 1);
      }
    }
    // Call PATCH API to remove a student from the course
    this.apiService.updateStudentInfo(this.studentId, this.courseList).subscribe((result:any)=>{
      console.log(this.fname + " " + this.lname + "(" + this.studentId + ") was removed from " + courseName);
    })
  }
}
