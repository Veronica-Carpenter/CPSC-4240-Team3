import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimelyAPIService } from '../timely-api.service';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-new-welcome-page',
  templateUrl: './new-welcome-page.component.html',
  styleUrls: ['./new-welcome-page.component.css']
})
export class NewWelcomePageComponent implements OnInit {
  public loggedInUserId = ""
  public fullName = ""
  public userEmail = ""
  loggedIn = false;
  formDisplay = true;
  constructor(private apiService: TimelyAPIService, private activatedRoute: ActivatedRoute, public cookie: CookieService) {
  }
  
  ngOnInit(): void {
  }

  // Login() {
  //   console.log('in login');
  //   this.apiService.authentication().subscribe((result: any) => {
  //     console.log('response is : ' + result);
  //     console.log('call to auth is succesfull!');
  //   });
  // }
  Login(){
    window.open('http://localhost:8080/auth',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
   let listener = window.addEventListener('message', (message) => {

     //message will contain logged in user and details
      console.log(message)
      if (message) {
        this.fullName = message.data.user.displayName
        this.loggedInUserId = message.data.user.id
        this.userEmail = message.data.user.emails[0].value
        this.formDisplay = false;
        this.loggedIn = true;
        
        console.log('setting cookie');

        this.cookie.deleteCookie('timelyAppfullNameCookie');
        this.cookie.deleteCookie('timelyAppUserIdCookie');
        this.cookie.deleteCookie('timelyAppemailCookie');
        
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

        this.link()
      }
   });
   
   }

  link() {
    return "/welcomePage";
  }
}
