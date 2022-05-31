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

  authentication(){
    return this.http.get(this.hostURL + 'auth');
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
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', 'ya29.a0ARrdaM-uF-JExrIVbCJeX4sArxKU_Ww1z6IGQg4wWxcdPmFm1z67yV7NdKixXUW2fsTW2PxstW7eyWFq_OebuzQLl7TFNY0bzOApYQ8pwd7zFG5VGcry4sYNAOV73H-1Ba_VxLXWRWJ4d_JXyImuPhZstnMr')
    return this.http.get<Course>(this.hostURL + 'courses', {headers});
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

  courseObjIdByCourseId(courseId: number) {
    return this.http.get<Course>(this.hostURL + 'courses/obj/' + courseId);
  }

  mapCourseToStudent(content: any) {
    return this.http.post(this.hostURL + 'mapCourseToStudent' , content);
  }

  getLectureByDate(date: string, courseId: number){
    return this.http.get<LectureClass>(this.hostURL + 'lectures/date/' + date + '/courseId/' +courseId);
  }

  updateStudentInfo(studentId: number, studentData: any) {
    return this.http.patch<Student>(this.hostURL + 'students/update?studentId=' + studentId, studentData);
  }

}
