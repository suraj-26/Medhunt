const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app =  express()
const mySql = require('mysql')


const db = mySql.createPool({
    host: "localhost",
    user : "root",
    password : "",
    database : "users"
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/api/get',(req,res)=>{
    const sqlGet = "select * from logintable";
    db.query(sqlGet,(err,result)=>{
        res.send(result)
    })
})

app.post('/api/insert', (req,res) =>{

    const username = req.body.username
    const password = req.body.password

    const sqlInsert = "INSERT INTO logintable (username,password) VALUES (?,?);";
    db.query(sqlInsert,[username,password],(err,result) =>{
        console.log(result)
    })
})

app.listen(3001, () =>{
    console.log("Running on port 3001")
})
