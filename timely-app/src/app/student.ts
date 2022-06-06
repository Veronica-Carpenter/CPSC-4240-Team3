import { Course } from "./course";

export interface Student{
    studentId: string;
    fname: string;
    lname: string;
    email: string;
    courseList?:Course[],
    attendanceList?:[
        {
            lectureId: Number;
            date: Date;
            studentId: Number;
            status: String;
        }
    ];
    lectureIds? : Number[];
}