import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { ActivatedRoute } from '@angular/router';
import { TimelyAPIService } from '../timely-api.service';

@Component({
  selector: 'app-view-student-list-page',
  templateUrl: './view-student-list-page.component.html',
  styleUrls: ['./view-student-list-page.component.css']
})

export class ViewStudentListPageComponent implements OnInit {

  studentId: number;
  courseId: number = 0;
  studentLists: Student[];
  radioClicked: boolean = false;

  constructor(private apiService: TimelyAPIService, private activatedRoute: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.forEach((route) => {
      this.courseId = route["courseId"]
    });
    console.log("courseID is: " + this.courseId);

    this.apiService.getStudentsByCourse(this.courseId).subscribe((result: any) => {
      this.studentLists = result;
      console.log("Student List fetched by course ID: " + JSON.stringify(this.studentLists));
    });
  }

  radioButtonClick(studentId: number){
    this.studentId = studentId;
    this.radioClicked = true;
  }

  link() {
    return "/StudentDetailsPageComponent/StudentId/" + this.studentId;
  }

}
