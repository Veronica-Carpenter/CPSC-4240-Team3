import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimelyAPIService } from '../timely-api.service';
import { CookieService } from '../cookie.service';
import { Professor } from '../professor';

@Component({
  selector: 'app-new-welcome-page',
  templateUrl: './new-welcome-page.component.html',
  styleUrls: ['./new-welcome-page.component.css']
})

export class NewWelcomePageComponent implements OnInit {
  public loggedInUserId: string;
  public fullName = "";
  public firstName = "";
  public lastName = "";
  public userEmail = "";
  professorData: any;
  loggedIn = false;
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
          this.loggedIn = true;
          
        });
      }
   });
   }

    LoginAsAStudent() {
      return "/takeAttendance"
    }

    link() {
      return "/welcomePage";
    }

    logout() {
      // this.apiService.logout(this.content).subscribe((result: any) => {
      //   console.log("Logged out succesfully");
      // });
    }
}
