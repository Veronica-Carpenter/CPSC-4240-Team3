db = db.getSiblingDB('attendance-tracker')

// courses data
db.createCollection('courses')
coursesCollection = db.getCollection("courses")
coursesCollection.remove({})
coursesCollection.insert(
    {
        courseId: 1,
        courseName: "CPSC 4310: Machine Learning"
    }
)
coursesCollection.insert(
    {
        courseId: 2,
        courseName: "CPSC 4240: Software as a Service"
    }
)
coursesCollection.insert(
    {
        courseId: 3,
        courseName: "CPSC 4220: User Experience Design"
    }
)
coursesCollection.insert(
    {
        courseId: 4,
        courseName: "CPSC 4260: Refactoring & Software Design"
    }
)
coursesCollection.insert(
    {
        courseId: 5,
        courseName: "CPSC 4300: Phys Database Design and Opt"
    }
)
coursesCollection.insert(
    {
        courseId: 6,
        courseName: "CPSC 4510 Computer Networks"
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

// List of users
db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.remove({})
usersCollection.insert(
    {
        userId: 0,
        userName: "professorabigail",
        password: "123",
        fname: "Abigail",
        lname: "Perry",
        email: "abigail.perry@edu.edu",
        userCategory: "Professor"
    }
)
usersCollection.insert(
    {
        userId: 1,
        userName: "sarahsmith",
        password: "456",
        fname: "Sarah",
        lname: "Smith",
        email: "sarah.smith@edu.edu",
        userCategory: "Student"
    }
)
usersCollection.insert(
    {
        userId: 2,
        userName: "ashgreen",
        password: "789",
        fname: "Ash",
        lname: "Green",
        email: "ash.green@edu.edu",
        userCategory: "Student"
    }
)
usersCollection.insert(
    {
        userId: 3,
        userName: "johndoe",
        password: "111",
        fname: "John",
        lname: "Doe",
        email: "john.doe@edu.edu",
        userCategory: "Student"
    }
)
usersCollection.insert(
    {
        userId: 4,
        userName: "janedoe",
        password: "222",
        fname: "Jane",
        lname: "Doe",
        email: "jane.doe@edu.edu",
        userCategory: "Student"
    }
)
usersCollection.insert(
    {
        userId: 5,
        userName: "alexanderforbes",
        password: "333",
        fname: "Alexander",
        lname: "Forbes",
        email: "alexander.forbes@edu.edu",
        userCategory: "Student"
    }
)
usersCollection.insert(
    {
        userId: 6,
        userName: "crystalmatthews",
        password: "444",
        fname: "Crystal",
        lname: "Matthews",
        email: "crystal.matthews@edu.edu",
        userCategory: "Student"
    }
)
usersCollection.insert(
    {
        userId: 7,
        userName: "professorshafiq",
        password: "555",
        fname: "Shafiq",
        lname: "Ahmad",
        email: "shafiq.ahmad@edu.edu",
        userCategory: "Professor"
    }
)
usersCollection.insert(
    {
        userId: 8,
        userName: "professorlinh",
        password: "666",
        fname: "Linh",
        lname: "Tran",
        email: "linh.tran@edu.edu",
        userCategory: "Professor"
    }
)

db.createCollection('professors')
professorsCollection = db.getCollection("professors")
professorsCollection.remove({})

// Abigail's courses
professorsCollection.insert(
    {
        professorId : 0,
        fname: "Abigail",
        lname: "Perry",
        email: "abigail.perry@edu.edu",
        courseList : [
         {
            courseId: 1,
            courseName: "CPSC 4310: Machine Learning"
         },
         {
            courseId: 2,
            courseName: "CPSC 4240: Software as a Service"
         },
         {
            courseId: 3,
            courseName: "CPSC 4220: User Experience Design"
         }
        ] 
    }
)

// Shafiq's courses
professorsCollection.insert(
    {
        professorId : 7,
        fname: "Shafiq",
        lname: "Ahmad",
        email: "shafiq.ahmad@edu.edu",
        courseList : [
         {
            courseId: 4,
            courseName: "CPSC 4260: Refactoring & Software Design"
         },
        ] 
    }
)

// Linh's courses
professorsCollection.insert(
    {
        professorId : 8,
        fname: "Linh",
        lname: "Tran",
        email: "linh.tran@edu.edu",
        courseList : [
         {
            courseId: 5,
            courseName: "CPSC 4300: Phys Database Design and Opt"
         },
         {
            courseId: 6,
            courseName: "CPSC 4510 Computer Networks"
         }
        ] 
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
// Ash's courses and attendance
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
 
// John's courses and attendance
studentsCollection.insert(
    {
        studentId : 3,
        fname: "John",
        lname: "Doe",
        email: "john.doe@edu.edu",
        courseList : [
         {
            courseId: 1,
            courseName: "CPSC 4310: Machine Learning"
         },
         {
            courseId: 3,
            courseName: "CPSC 4220: User Experience Design"
         }
        ],
        attendanceList : [
            // ML lectures
            {
                lectureId: 1,
                date: "04-05-2022",
                studentId: 3,
                status: "Present"
            },
            {
                lectureId: 2,
                date: "04-07-2022",
                studentId: 3,
                status: "Present"
            },
            {
                lectureId: 3,
                date: "04-12-2022",
                studentId: 3,
                status: "Present"
            },
            {
                lectureId: 4,
                date: "04-14-2022",
                studentId: 3,
                status: "Present"
            },
            {
                lectureId: 5,
                date: "04-19-2022",
                studentId: 3,
                status: "Late"
            },
            // UX lectures
            {
                lectureId: 111,
                date: "04-04-2022",
                studentId: 3,
                status: "Present"
            },
            {
                lectureId: 222,
                date: "04-06-2022",
                studentId: 3,
                status: "Present"
            },
            {
                lectureId: 333,
                date: "04-11-2022",
                studentId: 3,
                status: "Present"
            },
            {
                lectureId: 444,
                date: "04-13-2022",
                studentId: 3,
                status: "Present"
            },
            {
                lectureId: 555,
                date: "04-18-2022",
                studentId: 3,
                status: "Present"
            }
           ] 
    }
)
  
// Jane's courses and attendance
studentsCollection.insert(
    {
        studentId : 4,
        fname: "Jane",
        lname: "Doe",
        email: "jane.doe@edu.edu",
        courseList : [
         {
            courseId: 1,
            courseName: "CPSC 4310: Machine Learning"
         }
        ],
        attendanceList : [
            // ML lectures
            {
                lectureId: 1,
                date: "04-05-2022",
                studentId: 4,
                status: "Present"
            },
            {
                lectureId: 2,
                date: "04-07-2022",
                studentId: 4,
                status: "Absent"
            },
            {
                lectureId: 3,
                date: "04-12-2022",
                studentId: 4,
                status: "Present"
            },
            {
                lectureId: 4,
                date: "04-14-2022",
                studentId: 4,
                status: "Present"
            },
            {
                lectureId: 5,
                date: "04-19-2022",
                studentId: 4,
                status: "Late"
            }
           ] 
    }
)

// Alexander's courses and attendance
studentsCollection.insert(
    {
        studentId : 5,
        fname: "Alexander",
        lname: "Forbes",
        email: "alexander.forbes@edu.edu",
        courseList : [
         {
            courseId: 3,
            courseName: "CPSC 4220: User Experience Design"
         }
        ],
        attendanceList : [
            // UX lectures
            {
                lectureId: 111,
                date: "04-04-2022",
                studentId: 5,
                status: "Present"
            },
            {
                lectureId: 222,
                date: "04-06-2022",
                studentId: 5,
                status: "Present"
            },
            {
                lectureId: 333,
                date: "04-11-2022",
                studentId: 5,
                status: "Present"
            },
            {
                lectureId: 444,
                date: "04-13-2022",
                studentId: 5,
                status: "Present"
            },
            {
                lectureId: 555,
                date: "04-18-2022",
                studentId: 5,
                status: "Present"
            }
           ] 
    }
)
    
// Crystal's courses and attendance
studentsCollection.insert(
    {
        studentId : 6,
        fname: "Crystal",
        lname: "Matthews",
        email: "crystal.matthews@edu.edu",
        courseList : [
         {
            courseId: 1,
            courseName: "CPSC 4310: Machine Learning"
         },
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
                studentId: 6,
                status: "Present"
            },
            {
                lectureId: 22,
                date: "04-06-2022",
                studentId: 6,
                status: "Present"
            },
            {
                lectureId: 33,
                date: "04-11-2022",
                studentId: 6,
                status: "Present"
            },
            {
                lectureId: 44,
                date: "04-13-2022",
                studentId: 6,
                status: "Absent"
            },
            {
                lectureId: 55,
                date: "04-18-2022",
                studentId: 6,
                status: "Present"
            }
           ] 
    }
)