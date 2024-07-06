var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Database,')
var db=mongoose.connection
db.on('error',()=> console.log("Error in connection to Database"))
db.once('open',()=> console.log("connected to database"))

app.post("/sign_up",(req,res) => {
    var name= req.body.name
    var age=req.body.age
    var email=req.body.email
    var phno=req.body.phno
    var gender=req.body.gender
    var password=req.body.password

    var data={
        "name":name,
        "age":age,
        "email":email,
        "phno":phno,
        "gender":gender,
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")
    })
    return res.redirect('signup_successful.html')

})

app.get("/",(req,res) =>{
    res.set({
        "Allow-access-Allow-Orgin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("listening on port 3000")