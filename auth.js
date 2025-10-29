// Problem statement - Let people sign up to your website
// Only allow signed in users to see people (create
// a dummy people list)

// A website which has 2 endpoints -
// POST /signin
// Body - {
// username: string
// password: string
// }
// Returns a json web token with username encrypted

// GET /users
// Headers -
// Authorization header
// Returns an array of all users if user is signed in (token is correct)
// Returns 403 status code if not

const express = require('express')
const jwt = require('jsonwebtoken');
const jwtPassword = "123456";
const port = 3000;


const express = require('express'); 

const app = express()

app.use(express.json())

const ALL_USERS = [
{
username: "harkirat@gmail.com",
password: "123",
name: "harkirat singh",
},
{
username: "raman@gmail.com",
password: "123321",
name: "Raman singh",
},
{
username: "priya@gmail.com",
password: "123321",
name: "Priya kumari",
},
];

function userExists(username, password) {
// write logic to return true or false if this user exists
// in ALL_USERS array
let x = ALL_USERS.find((user) => user.username === "harkirat@gmail.com" && user.password === "123")
return (x ? true : false)
}

function usernameExists(username) {
for (var i = 0; i < ALL_USERS.length; i++) {
if (ALL_USERS[i].username === username) {
return true; //user exist
}
}
return false; //user not exist
}

//first signup
app.post("/signup", function (req, res) {
console.log("inside signup page");
const username = req.body.username;
const password = req.body.password;
const name = req.body.name;

//early return if username already exists
if (usernameExists(username)) {
    console.log("inside if");
    return res.status(403).json({
        msg: "User already exist in our in memory db. Please go to signin page",
    });
}

//update the users db
ALL_USERS.push({
    username: username,
    password: password,
    name: name,
})

let token = jwt.sign({ username: username }, jwtPassword) //token created
//return token to the client
res.status(200).json({
    token
})
console.log("User signed in successfully");
})

//user login
app.post("/signin", function (req, res) {
console.log("inside signin");
const username = req.body.username;
const password = req.body.password;

//early return if username and password doesn't match
if (!userExists(username, password)) {
    return res.status(403).json({
        msg: "incorrect username or password",
    });
}

let token = jwt.sign({ username: username }, jwtPassword) // create token
//return token to the client
res.status(200).json({
    token,
})
console.log("User Logged in successfully");
})

//get users list
app.get("/users", function (req, res) {
console.log("inside users");
const token = req.headers.authorization; //gets token from request headers
try {
const decoded = jwt.verify(token, jwtPassword); // decode and varify token
const username = decoded.username;

    // return a list of users other than this username
    return res.status(200).send(ALL_USERS.filter(function (user) {
        return user.username != username;
    }))

} catch (err) {
    return res.status(403).json({
        msg: "Invalid token",
    });
}
});

//error handling middleware
app.use(function (err, req, res, next) {
console.log(err.type);
res.status(500).json({
msg: "server broke"
})
})

app.listen(port, function () {
console.log(`listening on ${port}`);
})