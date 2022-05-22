import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TakeAttendancePageComponent } from './take-attendance-page/take-attendance-page.component';
import { ProfessorHomePageComponent } from './professor-home-page/professor-home-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfessorCoursePageComponent } from './professor-course-page/professor-course-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TakeAttendancePageComponent,
    ProfessorHomePageComponent,
    WelcomePageComponent,
    ProfessorCoursePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
