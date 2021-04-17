const express = require("express");
const prefix = "/server/v1";
const blogRoutes = require("./routes/blogRoutes");
const path = require("path"); 

//Server setup
const app = express();

app.listen(3001, (err) => {
  if (err) {
    console.error("The server could not start");
    console.log(err);
  }
  console.log("listening on port 3001");
});

// This is middleware makes the req.body object available to us.
app.use(express.json());

app.use(prefix + "/blogs", blogRoutes);

//server static allows us to access frontend from backend (see notes in evernote on how to install)
//put path as argument with join method
app.use(express.static(path.join(__dirname, "../client/build")))