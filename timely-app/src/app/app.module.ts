import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TakeAttendancePageComponent } from './take-attendance-page/take-attendance-page.component';
import { ProfessorHomePageComponent } from './professor-home-page/professor-home-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfessorCoursePageComponent } from './professor-course-page/professor-course-page.component';
import { AddStudentsComponent } from './add-students/add-students.component';
import { DeleteStudentsComponent } from './delete-students/delete-students.component';
import { DeletionConfirmComponent } from './deletion-confirm/deletion-confirm.component';
import { AttendanceSubmittedPageComponent } from './attendance-submitted-page/attendance-submitted-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TakeAttendancePageComponent,
    ProfessorHomePageComponent,
    WelcomePageComponent,
    ProfessorCoursePageComponent,
    AddStudentsComponent,
    DeleteStudentsComponent,
    DeletionConfirmComponent,
    AttendanceSubmittedPageComponent
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
