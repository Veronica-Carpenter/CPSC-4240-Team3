db = db.getSiblingDB('attendance-tracker')

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