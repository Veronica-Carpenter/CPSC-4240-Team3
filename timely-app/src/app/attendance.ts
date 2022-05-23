import { Student } from "./student";

export interface Attendance {
    lectureId: number;
    date: Date;
    status: string;
    Student: Student;
}