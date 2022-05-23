export interface Student{
    studentId: number;
    fname: string;
    lname: string;
    email: string;
    courseList?:[
        {
            courseId: number,
            courseName: string
        }
    ];
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