import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { TimelyAPIService } from '../timely-api.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../course';
import { Attendance } from '../attendance';
import { LectureClass } from '../lecture-class';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {
  public students : Student[] = [];
  public attendanceDict: any = {}
  private courseId: number;
  secureCode: number;

  codeDisplay = false;
  constructor(private apiService: TimelyAPIService, private activatedRoute: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.forEach((route) => this.courseId = route["courseId"])
    var r = []
    this.apiService.getAllStudents().toPromise().then((result : any) => {
      console.log(result)
      // gets all students
      this.students = filterStudentsByCourse(result, this.courseId)
      // gets all the lectures of the studentts
      this.apiService.getAllAttendance().toPromise().then((result : any) => {
        console.log(result)
        for(let student of this.students) {
          let studentId = student.studentId
        let studentAttendance = result.filter((attendance : any) => attendance.Student.studentId == studentId )
        for(let attendance of studentAttendance) {
            let lectureId = attendance.lectureId
            this.apiService.getLecturesByCourse(this.courseId).toPromise().then((result : any) => {
             let courseLectures = result.map((res : LectureClass) => res.lectureId)
             if(courseLectures.includes(lectureId)) {
             this.attendanceDict[studentId] = this.attendanceDict[studentId]? [...this.attendanceDict[studentId], lectureId] : [lectureId]
             }
            })
        }

        }
      })
      console.log("dict")
      console.log(this.attendanceDict)
    })
    const filterStudentsByCourse = (students : [Student], courseId: number) : Student[] => {
      var arr : Student[] = [];
      for(let student of students) {
        let studentCourses  = student.courseList;
        if(studentCourses) {
        for(let course of studentCourses) {
          if(course.courseId == courseId) {
            arr.push(student)
          }
        }
      }
    }
      return arr
    }
  } 

  generateCodeClick(){
    //The today date 
    let todayDate = new Date();

    let lectureObject={
      "courseId" :this.courseId,
      "date": todayDate
    }
    
    //Call POST API to add new lecture 
    this.apiService.addLecture(lectureObject).subscribe((result:any)=>{
      console.log("Lecture Result: "+ JSON.stringify(result));
      this.secureCode = result?.secureCode;
      this.codeDisplay = true;
    });

  }
}
