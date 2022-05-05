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