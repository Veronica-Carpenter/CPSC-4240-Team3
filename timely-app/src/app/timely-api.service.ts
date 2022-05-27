import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { LectureClass } from './lecture-class';
import { StudentClass } from './student-class';
import { Student } from './student';
import { Course } from './course';
import { Attendance } from './attendance';
import {HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TimelyAPIService {

  hostURL: string = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }

  getLectureByCode(code:number){
    return this.http.get<LectureClass>(this.hostURL + 'lectures/code/' + code);
  }

  getStudentByStudentId(studentId: number){
    return this.http.get<StudentClass>(this.hostURL + 'students/studentId/' + studentId);
  }

  addAttendanceRecord(content:any){
    return this.http.post(this.hostURL + 'attendances', content);
  }

  mapAttendanceToStudent(content:any){
    return this.http.post(this.hostURL + 'mapStudenttoAttendance', content);
  }

  addLecture(content: any){
    return this.http.post(this.hostURL + 'lectures', content);
  }
  getAllStudents() {
    return this.http.get<Student>(this.hostURL + 'students');
  }
  getAllCourses() {
    return this.http.get<Course>(this.hostURL + 'courses');
  }
  getAllAttendance() {
    return this.http.get<Attendance>(this.hostURL + "attendances")
  }
  getLecturesByCourse(courseId : number) {
    return this.http.get<LectureClass[]>(this.hostURL + 'lectures/course/' + courseId)
  }

  getStudentsByCourse(courseId: number) {
    return this.http.get<Student[]>(this.hostURL + 'find/' + courseId)
  }

  createAStudent(studentData: any) {
    return this.http.post<Student>(this.hostURL + 'students', studentData);
  }
}
