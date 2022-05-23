db = db.getSiblingDB('attendance-tracker')

// courses data
db.createCollection('courses')
coursesCollection = db.getCollection("courses")
coursesCollection.remove({})
coursesCollection.insert(
    {
        courseId: 1,
        courseName: "CPSC 4310: Machine Learning",
        courseDays: {
            day1: "Monday",
            day2: "Wednesday"
        },
        courseTime: "3:30 pm - 5:40 pm",
        Professor: {}
    }
)
coursesCollection.insert(
    {
        courseId: 2,
        courseName: "CPSC 4240: Software as a Service",
        courseDays: {
            day1: "Monday",
            day2: "Tuesday"
        },
        courseTime: "6:00 pm - 8:40 pm",
        Professor: {}
    }
)
coursesCollection.insert(
    {
        courseId: 3,
        courseName: "CPSC 4220: User Experience Design",
        courseDays: {
            day1: "Tuesday",
            day2: "Wednesday"
        },
        courseTime: "3:30 pm - 5:40 pm",
        Professor: {}
    }
)
coursesCollection.insert(
    {
        courseId: 4,
        courseName: "CPSC 4260: Refactoring & Software Design",
        courseDays: {
            day1: "Wednesday",
            day2: "Thursday"
        },
        courseTime: "3:30 pm - 5:40 pm",
        Professor: {}
    }
)
coursesCollection.insert(
    {
        courseId: 5,
        courseName: "CPSC 4300: Phys Database Design and Opt",
        courseDays: {
            day1: "Wednesday",
            day2: "Friday"
        },
        courseTime: "6:00 pm - 8:30 pm",
        Professor: {}
    }
)
coursesCollection.insert(
    {
        courseId: 6,
        courseName: "CPSC 4510 Computer Networks",
        courseDays: {
            day1: "Friday"
        },
        courseTime: "3:30 pm - 5:40 pm",
        Professor: {}
    }
)

db.createCollection('lectures')
lecturesCollection = db.getCollection("lectures")
lecturesCollection.remove({})

// Machine Learning Lectures
lecturesCollection.insert(
    {
        lectureId: 1,
        courseId: 1,
        courseName: "CPSC 4310: Machine Learning",
        date: "04-05-2022",
        secureCode: 123456
    }
)
lecturesCollection.insert(
    {
        lectureId: 2,
        courseId: 1,
        courseName: "CPSC 4310: Machine Learning",
        date: "04-07-2022",
        secureCode: 223456
    }
)
lecturesCollection.insert(
    {
        lectureId: 3,
        courseId: 1,
        courseName: "CPSC 4310: Machine Learning",
        date: "04-12-2022",
        secureCode: 222456
    }
)
lecturesCollection.insert(
    {
        lectureId: 4,
        courseId: 1,
        courseName: "CPSC 4310: Machine Learning",
        date: "04-14-2022",
        secureCode: 222256
    }
)
lecturesCollection.insert(
    {
        lectureId: 5,
        courseId: 1,
        courseName: "CPSC 4310: Machine Learning",
        date: "04-19-2022",
        secureCode: 222226
    }
)

// Software as a Service Lectures
lecturesCollection.insert(
    {
        lectureId: 11,
        courseId: 2,
        courseName: "CPSC 4240: Software as a Service",
        date: "04-04-2022",
        secureCode: 111111
    }
)
lecturesCollection.insert(
    {
        lectureId: 22,
        courseId: 2,
        courseName: "CPSC 4240: Software as a Service",
        date: "04-06-2022",
        secureCode: 222222
    }
)
lecturesCollection.insert(
    {
        lectureId: 33,
        courseId: 2,
        courseName: "CPSC 4240: Software as a Service",
        date: "04-11-2022",
        secureCode: 333333
    }
)
lecturesCollection.insert(
    {
        lectureId: 44,
        courseId: 2,
        courseName: "CPSC 4240: Software as a Service",
        date: "04-13-2022",
        secureCode: 444444
    }
)
lecturesCollection.insert(
    {
        lectureId: 55,
        courseId: 2,
        courseName: "CPSC 4240: Software as a Service",
        date: "04-18-2022",
        secureCode: 555555
    }
)

// User Experience Design Lectures
lecturesCollection.insert(
    {
        lectureId: 111,
        courseId: 3,
        courseName: "CPSC 4220: User Experience Design",
        date: "04-04-2022",
        secureCode: 121212
    }
)
lecturesCollection.insert(
    {
        lectureId: 222,
        courseId: 3,
        courseName: "CPSC 4220: User Experience Design",
        date: "04-06-2022",
        secureCode: 131313
    }
)
lecturesCollection.insert(
    {
        lectureId: 333,
        courseId: 3,
        courseName: "CPSC 4220: User Experience Design",
        date: "04-11-2022",
        secureCode: 141414
    }
)
lecturesCollection.insert(
    {
        lectureId: 444,
        courseId: 3,
        courseName: "CPSC 4220: User Experience Design",
        date: "04-13-2022",
        secureCode: 151515
    }
)
lecturesCollection.insert(
    {
        lectureId: 555,
        courseId: 3,
        courseName: "CPSC 4220: User Experience Design",
        date: "04-18-2022",
        secureCode: 161616
    }
)

db.createCollection('professors')
professorsCollection = db.getCollection("professors")
professorsCollection.remove({})

// Abigail's courses
professorsCollection.insert(
    {
        professorId : 1,
        fname: "Abigail",
        lname: "Perry",
        email: "abigail.perry@edu.edu",
        courseList : []
    }
)

// Shafiq's courses
professorsCollection.insert(
    {
        professorId : 2,
        fname: "Shafiq",
        lname: "Ahmad",
        email: "shafiq.ahmad@edu.edu",
        courseList : []
    }
)

// Linh's courses
professorsCollection.insert(
    {
        professorId : 3,
        fname: "Linh",
        lname: "Tran",
        email: "linh.tran@edu.edu",
        courseList : []
    }
)

professorsCollection.insert(
    {
        professorId : 4,
        fname: "Herry",
        lname: "Herry",
        email: "herry@edu.edu",
        courseList : []
    }
)

professorsCollection.insert(
    {
        professorId : 5,
        fname: "Shin",
        lname: "Shin",
        email: "shin@edu.edu",
        courseList : []
    }
)

professorsCollection.insert(
    {
        professorId : 6,
        fname: "Jan",
        lname: "Jan",
        email: "jan@edu.edu",
        courseList : []
    }
)

db.createCollection('students')
studentsCollection = db.getCollection("students")
studentsCollection.remove({})

// Sarah's courses and attendance
studentsCollection.insert(
{
    studentId : 1,
    fname: "Sarah",
    lname: "Smith",
    email: "sarah.smith@edu.edu",
    courseList : [],
    attendanceList : []
}
)
// Ash's courses and attendance
studentsCollection.insert(
    {
        studentId : 2,
        fname: "Ash",
        lname: "Green",
        email: "ash.green@edu.edu",
        courseList : [],
        attendanceList : []
    }
)
 
// John's courses and attendance
studentsCollection.insert(
    {
        studentId : 3,
        fname: "John",
        lname: "Doe",
        email: "john.doe@edu.edu",
        courseList : [],
        attendanceList : []
    }
)
  
// Jane's courses and attendance
studentsCollection.insert(
    {
        studentId : 4,
        fname: "Jane",
        lname: "Doe",
        email: "jane.doe@edu.edu",
        courseList : [],
        attendanceList : []
    }
)

// Alexander's courses and attendance
studentsCollection.insert(
    {
        studentId : 5,
        fname: "Alexander",
        lname: "Forbes",
        email: "alexander.forbes@edu.edu",
        courseList : [],
        attendanceList : []
    }
)
    
// Crystal's courses and attendance
studentsCollection.insert(
    {
        studentId : 6,
        fname: "Crystal",
        lname: "Matthews",
        email: "crystal.matthews@edu.edu",
        courseList : [],
        attendanceList : []
    }
)