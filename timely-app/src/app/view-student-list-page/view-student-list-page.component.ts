import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { TimelyAPIService } from '../timely-api.service';

@Component({
  selector: 'app-view-student-list-page',
  templateUrl: './view-student-list-page.component.html',
  styleUrls: ['./view-student-list-page.component.css']
})
export class ViewStudentListPageComponent implements OnInit {

  public students : [Student]
  constructor(private apiService: TimelyAPIService) { 
    
  }
  ngOnInit(): void {
    this.apiService.getAllStudents().toPromise().then((result : any) => {
      this.students = result
      console.log(result)
    })
  }
}
