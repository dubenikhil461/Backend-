const express = require("express");
const nikhil = express();

// listen request
const port = 4000
nikhil.listen(port, () => {
  console.log("listen on port " + port);
});


// Hndling request , sending request
nikhil.use((req,res)=>{
    console.log("request recieved")
    res.send({"hello" : "nikhil"})
})

// Routing
nikhil.get("/",(req,res)=>{
   res.send("this / pth")
})
 nikhil.get("/fruits",(req,res)=>{
    let code = "<h2>FRUITS</h2> <ul><li>pine</li></ul>"
    res.send(code)
 })

 //pth prmeters
 nikhil.get("/:user/:id",(req,res)=>{
    // like instgrm sent the pge when user id end point hit
    console.log(req.params)
    res.send("i m fine")
 })

 //query string
 nikhil.get("/serch",(req,res)=>{
    //http://localhost:4000/serch?q=pine
    const {q} = req.query
    res.send("<h2>serch result for query :</h2>" + q )
 })