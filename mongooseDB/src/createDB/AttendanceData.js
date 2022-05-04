db = db.getSiblingDB('attendance-tracker')

// courses data
db.createCollection('courses')
allCoursesCollection = db.getCollection("courses")
allCoursesCollection.remove({})
allCoursesCollection.insert(
    {
        courseId: 1,
        courseName: "CPSC 4310: Machine Learning"
    }
)
allCoursesCollection.insert(
    {
        courseId: 2,
        courseName: "CPSC 4240: Software as a Service"
    }
)
allCoursesCollection.insert(
    {
        courseId: 3,
        courseName: "CPSC 4220: User Experience Design"
    }
)
