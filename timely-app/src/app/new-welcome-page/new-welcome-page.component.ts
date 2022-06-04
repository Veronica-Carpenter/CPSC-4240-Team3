import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimelyAPIService } from '../timely-api.service';
import { CookieService } from '../cookie.service';
import { Professor } from '../professor';
import { Student } from '../student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-welcome-page',
  templateUrl: './new-welcome-page.component.html',
  styleUrls: ['./new-welcome-page.component.css']
})

export class NewWelcomePageComponent implements OnInit {
  public loggedInUserId: string;
  public fullName: string;
  public firstName: string;
  public lastName: string;
  public userEmail: string;

  public studentfullName: string;
  public studentfirstName: string;
  public studentlastName: string;
  public studentuserEmail: string;
  public studentloggenInUserId: string;

  professorData: any;
  formDisplay = true;
  sameStudentIdExistsMessage = false;
  sameProfessorIdExistsMessage = false;
  professorResult: Professor;
  studentResult: Student;
  studentData: any;

  constructor(private apiService: TimelyAPIService, private activatedRoute: ActivatedRoute, public cookie: CookieService, private router: Router) {
  }
  
  ngOnInit(): void {
    if(this.getLoggedIn()) {
      if(this.cookie.getCookie("timelyAppUserType") == "P") {
        this.router.navigate(['/CourseListPage']);
      }
      if(this.cookie.getCookie("timelyAppUserType") == "S") {
        this.router.navigate(['/takeAttendance']);
      }
    }
  }

  getLoggedIn() {
    if (this.cookie.getCookie('timelyAppfullNameCookie') && this.cookie.getCookie('timelyAppUserIdCookie')){
      return true;
    }
    return false;
  }

  // login as a professor
  LoginAsAProfessor(){
    window.open('http://localhost:8080/auth',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
    let listener = window.addEventListener('message', (message) => {

     //message will contain logged in user and details
      console.log(message)
      if (message) {
        this.fullName = message.data.user.displayName
        this.firstName = message.data.user.name.givenName
        this.lastName = message.data.user.name.familyName
        this.loggedInUserId = message.data.user.id
        this.userEmail = message.data.user.emails[0].value

        this.cookie.setCookie({
          'name': 'timelyAppfullNameCookie',
          'value': this.fullName
         });

         this.cookie.setCookie({
          'name': 'timelyAppUserIdCookie',
          'value': this.loggedInUserId
        });

        this.cookie.setCookie({
          'name': 'timelyAppemailCookie',
          'value': this.userEmail
        });

        this.cookie.setCookie({
          'name': 'timelyAppUserType',
          'value': "P"
        });

        this.apiService.getStudentByStudentId(this.loggedInUserId).subscribe((result: any) => {
          console.log('in same mesage API call');
          this.sameProfessorIdExistsMessage = false;

          if (result != null) {
            this.sameStudentIdExistsMessage = true;

            this.cookie.deleteCookie('timelyAppfullNameCookie');
            this.cookie.deleteCookie('timelyAppUserIdCookie');
            this.cookie.deleteCookie('timelyAppemailCookie');
            this.cookie.deleteCookie('timelyAppUserType');

          } else {
            console.log('going to check a professor' + this.loggedInUserId); 

            this.apiService.getProfessorByProfessorId(this.loggedInUserId).subscribe((result: any) => {
              this.professorResult = result;
              
              if (result != null) {
                console.log('in if');
                console.log('Professor is already registered')
              } 
              else {
                console.log('in else');
                this.professorData = {
                  "professorId": this.loggedInUserId,
                  "fname": this.firstName,
                  "lname": this.lastName,
                  "email": this.userEmail
                }
                this.apiService.createAProfessor(this.professorData).subscribe((result: any) => {
                  console.log("Professor added succesfully");
                });
              }
             
              this.router.navigate(['/CourseListPage']);
            });
          }
        });
      }
   });
   }

   // login as a student
    LoginAsAStudent() {
      window.open('http://localhost:8080/studentAuth',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
      let listener = window.addEventListener('message', (message) => {
        if (message) {
          this.studentfullName = message.data.user.displayName
          this.studentfirstName = message.data.user.name.givenName
          this.studentlastName = message.data.user.name.familyName
          this.studentloggenInUserId = message.data.user.id
          this.studentuserEmail = message.data.user.emails[0].value

          this.cookie.setCookie({
            'name': 'timelyAppfullNameCookie',
            'value': this.studentfullName
           });
  
           this.cookie.setCookie({
            'name': 'timelyAppUserIdCookie',
            'value': this.studentloggenInUserId
          });
  
          this.cookie.setCookie({
            'name': 'timelyAppemailCookie',
            'value': this.studentuserEmail
          });

          this.cookie.setCookie({
            'name': 'timelyAppUserType',
            'value': "S"
          });

          this.apiService.getProfessorByProfessorId(this.studentloggenInUserId).subscribe((result: any) => {
            console.log('in same mesage API call');
            this.sameStudentIdExistsMessage = false;

            if (result != null) {
              this.sameProfessorIdExistsMessage = true;

              this.cookie.deleteCookie('timelyAppfullNameCookie');
              this.cookie.deleteCookie('timelyAppUserIdCookie');
              this.cookie.deleteCookie('timelyAppemailCookie');
              this.cookie.deleteCookie('timelyAppUserType');
            }
            else {

              console.log('going to check a student' + this.studentloggenInUserId);
              this.apiService.getStudentByStudentId(this.studentloggenInUserId).subscribe((result: any) => {

                this.studentResult = result;
                console.log(this.studentResult);

                if (result != null) {
                  console.log('in if');
                  console.log('Student is already registered')
                } else {

                  this.studentData = {
                    "studentId": this.studentloggenInUserId,
                    "fname": this.studentfirstName,
                    "lname": this.studentlastName,
                    "email": this.studentuserEmail
                  }

                  this.apiService.createAStudent(this.studentData).subscribe((result: any) => {
                    console.log("Student added succesfully");
                  });
                }
            
                this.router.navigate(['/takeAttendance']);
              });
            }
          });
        }
      })
    }
}
