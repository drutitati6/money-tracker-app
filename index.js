var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app=express()
app.use(bodyParser.json())
app.use(express.static('docs'))
app.use(bodyParser.urlencoded({
   extended:true
}))
mongoose.connect('mongodb+srv://druti:dhruva@cluster0.3lot51t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
var db= mongoose.connection
db.on('error',()=> console.log("error in connecting to database"))
db.once('open',()=>console.log("Connected to Database"))

app.post("/add",(req,res)=>{
     var category_select = req.body.category_select
     var amount_in = req.body.amount_in
     var info = req.body.info
     var date_in = req.body.date_in

     var data={
        "Category" : category_select,
        "Amount" : amount_in,
        "Info" : info,
        "Date" : date_in
     }
     db.collection('usersp').insertOne(data,(err,collection)=> {
       if(err){
        throw err;
       }
       console.log("Inserted record successfully")
     })
})
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    }) 
    return res.redirect('index.html')
}).listen(5000)

console.log("Listening on port 5000")