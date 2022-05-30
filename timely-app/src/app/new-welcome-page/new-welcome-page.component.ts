import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimelyAPIService } from '../timely-api.service';

@Component({
  selector: 'app-new-welcome-page',
  templateUrl: './new-welcome-page.component.html',
  styleUrls: ['./new-welcome-page.component.css']
})
export class NewWelcomePageComponent implements OnInit {
  public loggedInUser  = ""
  public fullName = ""
  public userEmail = ""
  loggedIn = false;
  formDisplay = true;
  constructor(private apiService: TimelyAPIService, private activatedRoute: ActivatedRoute) {
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
        this.loggedInUser = message.data.user.id
        this.userEmail = message.data.user.emails[0].value
        this.formDisplay = false;
        this.loggedIn = true;
        this.link()
      }
   });
   
   }
   link() {
    return "/welcomePage";
  }
}
