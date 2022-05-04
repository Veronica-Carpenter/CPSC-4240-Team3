db = db.getSiblingDB('attendance-tracker')

db.createCollection('students')
studentsCollection = db.getCollection("students")
studentsCollection.remove({})
studentsCollection.insert(
{
    // classes Sarah is taking
    studentId : 1,
    fname: "Sarah",
    lname: "Smith",
    email: "sarah.smith@edu.edu",
    courseList : [
     {
        courseId: 1,
        courseName: "CPSC 4310: Machine Learning"
     },
     {
        courseId: 2,
        courseName: "CPSC 4240: Software as a Service"
     }
    ],
    attendanceList : [
        // ML lectures
        {
            lectureId: 1,
            date: "04-05-2022",
            studentId: 1,
            status: "Absent"
        },
        {
            lectureId: 2,
            date: "04-07-2022",
            studentId: 1,
            status: "On-time"
        },
        {
            lectureId: 3,
            date: "04-12-2022",
            studentId: 1,
            status: "On-time"
        },
        {
            lectureId: 4,
            date: "04-14-2022",
            studentId: 1,
            status: "Absent"
        },
        {
            lectureId: 5,
            date: "04-19-2022",
            studentId: 1,
            status: "On-time"
        },
        // SaaS lectures
        { 
            lectureId: 11,
            date: "04-04-2022",
            studentId: 1,
            status: "On-time"
        },
        { 
            lectureId: 22,
            date: "04-06-2022",
            studentId: 1,
            status: "Late"
        },
        { 
            lectureId: 33,
            date: "04-11-2022",
            studentId: 1,
            status: "Late"
        },
        { 
            lectureId: 44,
            date: "04-13-2022",
            studentId: 1,
            status: "On-time"
        },
        {
            lectureId: 55,
            date: "04-18-2022",
            studentId: 1,
            status: "On-time"
        }
       ] 
}
)
// classes Ash is taking
studentsCollection.insert(
    {
        studentId : 2,
        fname: "Ash",
        lname: "Green",
        email: "ash.green@edu.edu",
        courseList : [
         {
            courseId: 2,
            courseName: "CPSC 4240: Software as a Service"
         },
         {
            courseId: 3,
            courseName: "CPSC 4220: User Experience Design"
         }
        ],
        attendanceList : [
            // Saas lectures
            {
                lectureId: 11,
                date: "04-04-2022",
                studentId: 2,
                status: "Present"
            },
            {
                lectureId: 22,
                date: "04-06-2022",
                studentId: 2,
                status: "Present"
            },
            {
                lectureId: 33,
                date: "04-11-2022",
                studentId: 2,
                status: "Present"
            },
            {
                lectureId: 44,
                date: "04-13-2022",
                studentId: 2,
                status: "Present"
            },
            {
                lectureId: 55,
                date: "04-5-2022",
                studentId: 2,
                status: "Present"
            },
            // UX lectures
            {
                lectureId: 111,
                date: "04-04-2022",
                studentId: 2,
                status: "Present"
            },
            {
                lectureId: 222,
                date: "04-06-2022",
                studentId: 2,
                status: "Present"
            },
            {
                lectureId: 333,
                date: "04-11-2022",
                studentId: 2,
                status: "Present"
            },
            {
                lectureId: 444,
                date: "04-13-2022",
                studentId: 2,
                status: "Present"
            },
            {
                lectureId: 555,
                date: "04-18-2022",
                studentId: 2,
                status: "Present"
            }
           ] 
    }
)
    