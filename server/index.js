const express = require ("express"); 
const prefix = "/server/v1"

//Server setup
const app = express(); 

//DB setup
const DB = require("./DB"); 
const db = new DB(); 

// This is middleware makes the req.body object available to us.
app.use(express.json()); 

app.listen(3001, (err) => {
  if(err){
    console.error("The server could not start"); 
    console.log(err);
  }
  console.log('listening on port 3001');
})

app.get(prefix + "/blogs", async(req, res) => {
  let query = /*sql*/ `SELECT * FROM blogs`; 
  let blogs = await db.all(query); 
  res.json(blogs); 
})