import { Component, OnInit } from '@angular/core';
import { Attendance } from '../attendance';
import { Student } from '../student';
import { TimelyAPIService } from '../timely-api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-lecture-attendance-page',
  templateUrl: './lecture-attendance-page.component.html',
  styleUrls: ['./lecture-attendance-page.component.css']
})
export class LectureAttendancePageComponent implements OnInit {
  lectureDate: Date
  lectureId: number
  attendances: Attendance[];
  studentObjList: Array<Student> = new Array();
  constructor(private apiService: TimelyAPIService, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.activatedRoute.params.forEach((route) => this.lectureId = route["lectureId"]);
    console.log("lectureID: " + this.lectureId);
    this.apiService.getAttendancesByLectureId(this.lectureId).subscribe((result: any) => {
      this.attendances = result;
      console.log(this.attendances);
      this.lectureDate = new Date (this.attendances[0].date);
      for (var i = 0; i < this.attendances.length; i++) {
        this.apiService.getStudentByObjecId(this.attendances[i].Student).subscribe((result: any) => {
          if(result) {
          console.log("Student object: " + result);
          this.studentObjList.push(result);
          }
        });
      }
    })
  }
}
