import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TimelyAPIService {

  hostURL: string = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }
}
