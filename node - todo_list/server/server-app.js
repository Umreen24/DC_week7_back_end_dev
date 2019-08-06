
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

let todo = []

app.use(cors())
app.use(bodyParser.json())

app.get('/',(req, res) =>{
    res.send('Hello! Welcome to your TODO List!')
})

app.post('/tasks',(req,res) => {
    let taskName = req.body.taskName
    let task = {name: taskName}
    todo.push(task)
    res.send({success: true})
   // res.send("item saved")

})

app.get('/tasks',(req,res) => {
    res.json(todo)
})

app.listen(3000, () =>{
    console.log('Server is running...')
})