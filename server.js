const express = require('express') 
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express(); 
app.use(cors()); 
app.use(bodyParser.json()); 

// frontend 
app.use(express.static('public'))


// data 
let students = [{ 
    id: 1, firstname : "Abhishek", lastname:  "yadav", email : "abhishek@gmail.com", city: 'Delhi'
}, 
{ 
    id: 2, firstname : "ram", lastname: "sharma", email : "ram@gmail.com", city: 'chennai'
}]

// routes 
app.get('/api/students', (req,res) => res.json(students));

app.post('/api/students', (req,res) => { 
    const { firstname , lastname, email, city} = req.body; 
    const newStudent = { id : students.length + 1, firstname, lastname, email, city}; 
    students.push(newStudent); 
    res.status(201).json(newStudent); 
})

app.listen(3000, () => console.log(`server is running on PORT ${3000}`)); 