import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeAttendancePageComponent } from './take-attendance-page/take-attendance-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfessorHomePageComponent } from './professor-home-page/professor-home-page.component';
import { AddStudentsComponent} from './add-students/add-students.component';
import { DeleteStudentsComponent} from './delete-students/delete-students.component';
import { DeletionConfirmComponent} from './deletion-confirm/deletion-confirm.component';
import { AttendanceSubmittedPageComponent } from './attendance-submitted-page/attendance-submitted-page.component';
import { UpdateStudentsComponent } from './update-students/update-students.component';
import { UniqueCodeComponent } from './unique-code/unique-code.component';

const routes: Routes = [
  { path: 'welcomePage', component: WelcomePageComponent },
  { path: '', redirectTo: '/welcomePage', pathMatch: 'full' },
  { path: 'ProfessorHomePageComponent', component: ProfessorHomePageComponent},
  { path: 'takeAttendance', component: TakeAttendancePageComponent},
  { path: 'AddStudents', component: AddStudentsComponent},
  { path: 'DeleteStudents', component: DeleteStudentsComponent},
  { path: 'DeletionConfirm', component: DeletionConfirmComponent},
  { path: 'attendanceSubmittedPage', component: AttendanceSubmittedPageComponent},
  { path: 'UpdateStudents', component: UpdateStudentsComponent},
  { path: 'UniqueCode', component: UniqueCodeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
