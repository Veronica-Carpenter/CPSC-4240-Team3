import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from './cookie.service';
import { TimelyAPIService } from './timely-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'timely-app';
  loggedOut = false;
  content: any;

  constructor(private apiService: TimelyAPIService, private activatedRoute: ActivatedRoute, public cookie: CookieService, private router: Router) {
    console.log(this.cookie.getCookie('timelyAppfullNameCookie'))
    console.log(this.cookie.getCookie('timelyAppUserIdCookie'))
  }
  
  ngOnInit(): void {

  }

  getLoggedIn() {
    if (this.cookie.getCookie('timelyAppfullNameCookie') && this.cookie.getCookie('timelyAppUserIdCookie')){
      return true;
    }
    return false;
  }

  logout() {
    console.log("entered logout")
    this.apiService.logout(this.content).subscribe((result: any) => {
      console.log("Logged out succesfully");
      
      this.cookie.deleteCookie('timelyAppfullNameCookie');
      this.cookie.deleteCookie('timelyAppUserIdCookie');
      this.cookie.deleteCookie('timelyAppemailCookie');
      this.cookie.deleteCookie('timelyAppUserType');
      
      this.router.navigate(['/NewWelcomePageComponent']);
    });
  }
  
}
