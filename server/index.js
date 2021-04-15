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
  //.all takes everything from the databsase
  let blogs = await db.all(query); 
  res.json(blogs); 
})

app.get(prefix + "/blogs/:id", async(req, res) => {
  //req.params = paramenter behind /blogs/
  // console.log(req.params);
  //$ in front means value
  let query = /*sql*/ `SELECT * FROM blogs WHERE id = $id`; 
  
  //different ways to define id as variable
  //let id = req.params.id
  //let {id} = req.params;
  //params is used to define value in query above
  let params = {$id: req.params.id}; 
  
  //get() gives us the first match in the db
  let blog = await db.get(query, params); 
  res.json(blog); 
} )

app.post(prefix + "/blogs", async(req, res) => {
  console.log("body: ", req.body);
  //destructuring to define what is req.body
  let { author, title, created, content } = req.body;
  let query = /*sql*/`
    INSERT INTO blogs (author, title, created, content)
    VALUES ($author, $title, $created, $content)
  `; 
  //params used to define value in query above
  let params = {
    $author: author, 
    $title: title, 
    $created: created,
    $content: content
  }
  let newPost = await db.run(query, params); 
  res.json(newPost);
}) 