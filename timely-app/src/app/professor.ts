export interface Professor{
    professorId: string;
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