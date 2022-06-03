import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimelyAPIService } from '../timely-api.service';
import { CookieService } from '../cookie.service';
import { Professor } from '../professor';
import { Student } from '../student';

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
  studentResult: Student;
  studentData: any;

  public studentfullName: string;
  public studentfirstName: string;
  public studentlastName: string;
  public studentuserEmail: string;
  public studentloggenInUserId: string;

  professorData: any;
  loggedIn = false;
  studentloggedIn = false;
  loggedOut = false;
  formDisplay = true;
  content: any;
  professorResult: Professor;

  constructor(private apiService: TimelyAPIService, private activatedRoute: ActivatedRoute, public cookie: CookieService) {
  }
  
  ngOnInit(): void {
  }

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
          this.formDisplay = false;
          this.loggedOut = false;
          this.loggedIn = true;
          this.studentloggedIn = false;
        });
      }
   });
   }

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
            'name': 'studentfullNameCookie',
            'value': this.studentfullName
           });

           this.cookie.setCookie({
            'name': 'studentloggenInUserIdCookie',
            'value': this.studentloggenInUserId
           });

           this.cookie.setCookie({
            'name': 'studentuserEmailCookie',
            'value': this.studentuserEmail
           });

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
            this.formDisplay = false;
            this.loggedOut = false;
            this.loggedIn = false;
            this.studentloggedIn = true;
           });
        }
      })
    }

    link() {
      return "/CourseListPage";
    }

    studentlink() {
      return "/takeAttendance";
    }

    logout() {
      this.apiService.logout(this.content).subscribe((result: any) => {
        
        console.log("Logged out succesfully");
        
        this.cookie.deleteCookie('timelyAppfullNameCookie');
        this.cookie.deleteCookie('timelyAppUserIdCookie');
        this.cookie.deleteCookie('timelyAppemailCookie');

        this.cookie.deleteCookie('studentfullNameCookie');
        this.cookie.deleteCookie('studentloggenInUserIdCookie');
        this.cookie.deleteCookie('studentuserEmailCookie');

        this.formDisplay = true;
        this.loggedOut = true;
        this.loggedIn = false;
        this.studentloggedIn = false;
      });
    }
}
