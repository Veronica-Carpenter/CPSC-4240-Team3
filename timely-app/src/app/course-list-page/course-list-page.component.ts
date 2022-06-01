import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { TimelyAPIService } from '../timely-api.service';
import { CookieService } from '../cookie.service';
import { Professor } from '../professor';

@Component({
  selector: 'app-course-list-page',
  templateUrl: './course-list-page.component.html',
  styleUrls: ['./course-list-page.component.css']
})
export class CourseListPage implements OnInit {

  public courses : any
  public name = ""
  public userId = ""
  public email = ""
  professorResult: Professor;

  constructor(private apiService: TimelyAPIService, public cookie: CookieService) { 
  }

  ngOnInit(): void {
    this.name = this.cookie.getCookie('timelyAppfullNameCookie');
    this.userId = this.cookie.getCookie('timelyAppUserIdCookie');
    this.email = this.cookie.getCookie('timelyAppemailCookie');

    this.apiService.getProfessorByProfessorId(this.userId).subscribe((result: any) => {
      this.professorResult = result;
      this.courses = this.professorResult.courseList;
      console.log(this.courses);
    });
  }
}