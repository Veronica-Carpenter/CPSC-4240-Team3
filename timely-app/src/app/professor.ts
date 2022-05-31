export interface Professor{
    professorId: number;
    fname: string;
    lname: string;
    email: string;
    courseList?:[
        {
            courseId: number,
            courseName: string
        }
    ];
}