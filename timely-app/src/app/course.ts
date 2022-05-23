export interface Course {
    courseId: number;
    courseName: string;
    courseDays: {
        day1: String,
        day2: String
    };
    courseTime: Date;
}