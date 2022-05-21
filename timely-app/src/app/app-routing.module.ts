import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeAttendancePageComponent } from './take-attendance-page/take-attendance-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfessorHomePageComponent } from './professor-home-page/professor-home-page.component';

const routes: Routes = [
  { path: 'welcomePage', component: WelcomePageComponent },
  { path: '', redirectTo: '/welcomePage', pathMatch: 'full' },
  { path: 'ProfessorHomePageComponent', component: ProfessorHomePageComponent},
  { path: 'takeAttendance', component: TakeAttendancePageComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
