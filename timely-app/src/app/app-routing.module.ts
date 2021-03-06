import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeAttendancePageComponent } from './take-attendance-page/take-attendance-page.component';
import { NewWelcomePageComponent } from './new-welcome-page/new-welcome-page.component';
import { CourseListPage } from './course-list-page/course-list-page.component';
import { AddStudentsComponent} from './add-students/add-students.component';
import { LectureListPageComponent } from '../app/lecture-list-page/lecture-list-page.component';
import { DeleteStudentsComponent} from './delete-students/delete-students.component';
import { ViewStudentListPageComponent } from '../app/view-student-list-page/view-student-list-page.component'
import { DeletionConfirmComponent} from './deletion-confirm/deletion-confirm.component';
import { AttendanceSubmittedPageComponent } from './attendance-submitted-page/attendance-submitted-page.component';
import { UpdateStudentsComponent } from './update-students/update-students.component';
import { NewStudentPageComponent } from './new-student-page/new-student-page.component';
import { LectureAttendancePageComponent } from './lecture-attendance-page/lecture-attendance-page.component';
import { StudentDetailsPageComponent } from '../app/student-details-page/student-details-page.component';
import { CookieService } from './cookie.service';

const routes: Routes = [
  { path: 'NewWelcomePageComponent', component: NewWelcomePageComponent },
  { path: '', redirectTo: '/NewWelcomePageComponent', pathMatch: 'full' },
  { path: 'CourseListPage', component: CourseListPage },
  { path: 'takeAttendance', component: TakeAttendancePageComponent },
  { path: 'AddStudents/:courseId', component: AddStudentsComponent, pathMatch: 'full' },
  { path: 'LectureList/:courseId', component: LectureListPageComponent, pathMatch: 'full' },
  { path: 'DeleteStudents', component: DeleteStudentsComponent },
  { path: 'ViewStudentList/:courseId', component: ViewStudentListPageComponent, pathMatch: 'full' },
  { path: 'ViewStudentList', component: ViewStudentListPageComponent },
  { path: 'DeletionConfirm', component: DeletionConfirmComponent },
  { path: 'attendanceSubmittedPage', component: AttendanceSubmittedPageComponent },
  { path: 'UpdateStudents', component: UpdateStudentsComponent },
  { path:  'NewStudentPage', component:NewStudentPageComponent },
  { path:  'NewStudentPage/:courseId', component:NewStudentPageComponent },
  { path: "LectureList/LectureId/:lectureId", component:LectureAttendancePageComponent },
  { path: "StudentDetailsPageComponent/CourseId/:courseID/StudentId/:studentId", component:StudentDetailsPageComponent }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule],
  providers: [CookieService],
})
export class AppRoutingModule { }
