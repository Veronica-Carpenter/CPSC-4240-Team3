import { Component, OnInit } from '@angular/core';
import { StudentClass } from '../student-class';
import { TimelyAPIService } from '../timely-api.service'; 

@Component({
  selector: 'app-update-students',
  templateUrl: './update-students.component.html',
  styleUrls: ['./update-students.component.css']
})
export class UpdateStudentsComponent implements OnInit {

  studentID: number = 0;
  studentResult: StudentClass;

  formDisplay = true;
  successfulMessageDisplay = false;
  invalidStudentIdMessageDisplay = false;
  deniedSubmissionDisplay = false;

  constructor(private apiService: TimelyAPIService) { 
    
  }

  ngOnInit(): void {
  }

  getStudentId(val: string){

    //check if student id is number
    if(!isNaN(Number(val))){
      this.studentID = parseInt(val);
    }
    else(
      console.log("Student ID should be a number")
    )
  }

  reloadPage(){
    window.location.reload();
  }

  submitButton(){ 
    let studentObjId :any ; 

    //Turn off all error message

    this.invalidStudentIdMessageDisplay = false;
    this.apiService.getStudentByStudentId(this.studentID).subscribe((result: any)=>{
      this.studentResult = result; 
      if (result == null) {
        this.invalidStudentIdMessageDisplay = true;
      }
    });
  }
}
