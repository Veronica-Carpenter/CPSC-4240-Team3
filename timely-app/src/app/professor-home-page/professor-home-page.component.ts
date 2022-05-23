import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { TimelyAPIService } from '../timely-api.service';

@Component({
  selector: 'app-professor-home-page',
  templateUrl: './professor-home-page.component.html',
  styleUrls: ['./professor-home-page.component.css']
})
export class ProfessorHomePageComponent implements OnInit {
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