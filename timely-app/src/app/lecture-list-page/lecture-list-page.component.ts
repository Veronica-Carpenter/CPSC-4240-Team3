import { Component, OnInit } from '@angular/core';
import { TimelyAPIService } from '../timely-api.service';
import { ActivatedRoute } from '@angular/router';
import { LectureClass } from '../lecture-class';
@Component({
  selector: 'app-lecture-list-page',
  templateUrl: './lecture-list-page.component.html',
  styleUrls: ['./lecture-list-page.component.css']
})
export class LectureListPageComponent implements OnInit {

  courseId: number = 0;
  lectureLists: LectureClass[];
  lectureDate: string;
  courseName: string;
  lectureId: number;
  radioClicked: boolean = false;
  

  constructor(private apiService: TimelyAPIService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.forEach((route) => this.courseId = route["courseId"]);
    console.log("courseID: " + this.courseId);
    this.apiService.getLecturesByCourse(this.courseId).subscribe((result: any)=>{
      this.lectureLists = result;
      console.log("Lecture List: " + JSON.stringify(this.lectureLists));
      
      if(this.lectureLists.length>0){
        this.courseName = this.lectureLists[0].courseName;
      }
      
    });
  }

  formatDate (date: string){
    let tempDate = new Date(date);
      return tempDate.toDateString();
  }

  generateCodeClick(){
    //The today date 
    let todayDate = new Date();

    let lectureObject={
      "courseId" :this.courseId,
      "date": todayDate
    }
    
    //Call POST API to add new lecture 
    this.apiService.addLecture(lectureObject).subscribe((result:any)=>{
      console.log("Lecture Result: "+ JSON.stringify(result));
      this.reloadPage();
    });

  }

  reloadPage(){
    window.location.reload();
  }

  radioButtonClick(lectureId: number){
    console.log("lectureId: " + lectureId)
    this.lectureId = lectureId;
    this.radioClicked = true;
  }
  link(){
    return "/LectureList/LectureId/" + this.lectureId;
  }


}
