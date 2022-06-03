import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from './cookie.service';
import { TimelyAPIService } from './timely-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'timely-app';
  loggedOut = false;
  content: any;

  constructor(private apiService: TimelyAPIService, private activatedRoute: ActivatedRoute, public cookie: CookieService) {
  }

  ngOnInit(): void {

  }
  
}
