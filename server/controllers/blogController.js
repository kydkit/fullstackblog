//DB setup
const DB = require("../DB");
const db = new DB();

const getAllBlogs = async (req, res) => {
  let query = /*sql*/ `SELECT * FROM blogs`;
  //.all takes everything from the databsase
  let blogs = await db.all(query);
  res.json(blogs);
};

const getBlogById = async (req, res) => {
  //req.params = paramenter behind /blogs/
  // console.log(req.params);
  //$ in front means value
  let query = /*sql*/ `SELECT * FROM blogs WHERE id = $id`;

  //different ways to define id as variable
  //let id = req.params.id
  //let {id} = req.params;
  //params is used to define value in query above
  let params = { $id: req.params.id };

  //get() gives us the first match in the db
  let blog = await db.get(query, params);
  res.json(blog);
};

//POST add to database
//First part of POST request is to add info to the db
const postBlog = async (req, res) => {
  // console.log("body: ", req.body);
  //destructuring to define what is req.body
  let { author, title, created, content } = req.body;
  let query = /*sql*/ `
    INSERT INTO blogs (author, title, created, content)
    VALUES ($author, $title, $created, $content)
  `;
  //params used to define value in query above
  let params = {
    $author: author,
    $title: title,
    $created: created,
    $content: content,
  };
  let result = await db.run(query, params);

  //SECOND PART OF POST request is to GET back info in order to display
  query = `SELECT * FROM blogs WHERE id = $id`;
  //lastID info can be found when console logging  result variable
  params = { $id: result.lastID };
  let newPost = await db.get(query, params);
  res.json(newPost);
};

//run() is used when we want to make changes to the db, it can be a POST, PUT or DELETE
//PUT edit info in db
const editBlog = async (req, res) => {
  // console.log(req.body);
  let query = `
    UPDATE blogs 
    SET ${Object.keys(req.body)
      .map((k) => k + " = " + "$" + k)
      .join(", ")}
    WHERE id = $id`;
  //  UPDATE blogs
  //  SET author = $author, title = $title ...
  //  WHERE condition;
  let params = { $id: req.params.id };
  //  for/in loop loops thru the properties of an Object
  for (key in req.body) {
    params["$" + key] = req.body[key];
  }
  // $author: author,
  // $title: title,
  // $created: created,
  // $content: content

  let result = await db.run(query, params);
  query = `SELECT * FROM blogs WHERE id = $id`;
  params = { $id: req.params.id };
  let editPost = await db.get(query, params);
  res.json(editPost);
};

//DELETE from db
const deleteBlog = async (req, res) => {
  let blog = await db.get(/*sql*/ `SELECT * FROM blogs WHERE id = $id`, {
    $id: req.params.id,
  });
  if (!blog) {
    res.status(400).send("The blog does not exist");
    return;
  }
  let query = `DELETE FROM blogs WHERE id = $id`;
  let params = { $id: req.params.id };
  let deletedPost = await db.run(query, params);
  res.send("Blog has been deleted");
};

module.exports = {
  getAllBlogs,
  getBlogById,
  postBlog,
  editBlog,
  deleteBlog,
};
