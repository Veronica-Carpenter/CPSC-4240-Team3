import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { TimelyAPIService } from '../timely-api.service';

@Component({
  selector: 'app-course-list-page',
  templateUrl: './course-list-page.component.html',
  styleUrls: ['./course-list-page.component.css']
})
export class CourseListPage implements OnInit {
  public courses : [Course]
  constructor(private apiService: TimelyAPIService) { 
  }
  ngOnInit(): void {
    this.apiService.getAllCourses().toPromise().then((result : any) => {
      this.courses = result
      console.log(result)
    })
  }

}