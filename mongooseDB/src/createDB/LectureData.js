db = db.getSiblingDB('attendance-tracker')

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