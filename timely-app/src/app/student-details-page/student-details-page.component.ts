import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { ActivatedRoute } from '@angular/router';
import { TimelyAPIService } from '../timely-api.service';
import { CookieService } from '../cookie.service';
import { Student } from '../student';

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
  studentId: string;
  courseList: Course[];
  student : Student;
  displaydeleteconfirmation = false;

  public name: string;
  public userId: string;
  public useremail: string;

  constructor(private apiService: TimelyAPIService, private activatedRoute: ActivatedRoute, public cookie: CookieService) { }

  ngOnInit(): void {

    this.name = this.cookie.getCookie('timelyAppfullNameCookie');
    this.userId = this.cookie.getCookie('timelyAppUserIdCookie');
    this.useremail = this.cookie.getCookie('timelyAppemailCookie');

    this.activatedRoute.params.forEach((route) => this.studentId = route["studentId"]);
    this.activatedRoute.params.forEach((route) => this.courseId = route["courseID"] );

    this.apiService.getStudentByStudentId(this.studentId).subscribe((result: any) => {
      this.fname = result.fname;
      this.lname = result.lname;
      this.email = result.email;
      this.courseList = result.courseList;
      this.student = result
      console.log("Student Information: " + JSON.stringify(result));
    })
  }

  RemoveStudentFromCourseClick(){
    let courseName: string = '';
    let newCourseList : Course[]= this.courseList.filter((course) => {
     return course.courseId!=this.courseId
    })

    this.student.courseList = newCourseList

    // Call PATCH API to remove a student from the course
    this.apiService.updateStudentInfo(this.studentId, this.student).subscribe((result:any)=>{
      console.log(this.fname + " " + this .lname + "(" + this.studentId + ") was removed from " + courseName);
    });
    this.displaydeleteconfirmation = true;
  }
}
