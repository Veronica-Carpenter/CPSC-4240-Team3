import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TakeAttendancePageComponent } from './take-attendance-page/take-attendance-page.component';
import { CourseListPage } from './course-list-page/course-list-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfessorCoursePageComponent } from './professor-course-page/professor-course-page.component';
import { AddStudentsComponent } from './add-students/add-students.component';
import { DeleteStudentsComponent } from './delete-students/delete-students.component';
import { DeletionConfirmComponent } from './deletion-confirm/deletion-confirm.component';
import { AttendanceSubmittedPageComponent } from './attendance-submitted-page/attendance-submitted-page.component';
import { UpdateStudentsComponent } from './update-students/update-students.component';
import { UniqueCodeComponent } from './unique-code/unique-code.component';
import { NewStudentPageComponent } from './new-student-page/new-student-page.component';
import { LectureListPageComponent } from './lecture-list-page/lecture-list-page.component';
import { LectureAttendancePageComponent } from './lecture-attendance-page/lecture-attendance-page.component';
import { ViewStudentListPageComponent } from './view-student-list-page/view-student-list-page.component';
import { StudentDetailsPageComponent } from './student-details-page/student-details-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TakeAttendancePageComponent,
    CourseListPage,
    WelcomePageComponent,
    ProfessorCoursePageComponent,
    AddStudentsComponent,
    DeleteStudentsComponent,
    DeletionConfirmComponent,
    AttendanceSubmittedPageComponent,
    UpdateStudentsComponent,
    UniqueCodeComponent,
    NewStudentPageComponent,
    LectureListPageComponent,
    LectureAttendancePageComponent,
    ViewStudentListPageComponent,
    StudentDetailsPageComponent
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
