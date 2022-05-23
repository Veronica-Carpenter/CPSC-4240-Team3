import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { LectureClass } from './lecture-class';
@Injectable({
  providedIn: 'root'
})
export class TimelyAPIService {

  hostURL: string = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }

  getLectureByCode(code:number){
    return this.http.get<LectureClass>(this.hostURL + 'lectures/code/' + code);
  }

  addAttendanceRecord(content:any){
    return this.http.post(this.hostURL + 'attendances', content);
  }
}
