import { Component, OnInit } from '@angular/core';
import { TimelyAPIService } from '../timely-api.service';
import { ActivatedRoute } from '@angular/router';
import { LectureClass } from '../lecture-class';
import { CookieService } from '../cookie.service';

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
  public name = ""
  public userId = ""
  public email = ""
  
  constructor(private apiService: TimelyAPIService, private activatedRoute: ActivatedRoute, public cookie: CookieService) { }

  ngOnInit(): void {

    this.name = this.cookie.getCookie('timelyAppfullNameCookie');
    this.userId = this.cookie.getCookie('timelyAppUserIdCookie');
    this.email = this.cookie.getCookie('timelyAppemailCookie');
    
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
    console.log('today date: ' + todayDate)
    let lectureObject={
      "courseId" :this.courseId,
      "date": todayDate
    }
   let todayString = todayDate.toUTCString(); 
   console.log("today string: " + todayString);
    
    //Validating so that no add new lecture with the same current date twice
    this.apiService.getLectureByDate(todayString, this.courseId).subscribe((result: any)=>{
      
      if (result.length == 0){
        console.log("yes");

        //Call POST API to add new lecture 
        this.apiService.addLecture(lectureObject).subscribe((result:any)=>{
        console.log("Lecture Result: "+ JSON.stringify(result));
        this.reloadPage();
        });
      }
      else{
        console.log("There exists a lecture with today's date");
        console.log("Exists: " + JSON.stringify(result));
      }
      
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
