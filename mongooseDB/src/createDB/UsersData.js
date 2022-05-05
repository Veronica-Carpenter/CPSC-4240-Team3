db = db.getSiblingDB('attendance-tracker')

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