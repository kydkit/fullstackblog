import { useState } from 'react'; 
import { useHistory } from 'react-router-dom'

const CreatePost = () => {
  const history = useHistory(); 
  const [author, setAuthor] = useState(""); 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    let newBlog = {
      author,
      title,
      content
    };
    console.log(newBlog);
    createBlog(newBlog); 
  }; 

  // const handleAuthor = (e) => {
  //   setAuthor(e.target.value); 
  // }

  // const handleTitle = (e) => {
  //   setTitle(e.target.value); 
  // }
  // A different way of getting the e.target.value of content, see in jsx
  // const handleContent = (e) => {
  //   setContent(e.target.value); 
  // }

  const createBlog = async (newBlog) => {
    await fetch ("/server/v1/blogs", {
      //second part of fetch takes in an object. In this case there are three things in the object which are method, headers and body
      method: "POST", //DELETE for delete and PUT for updates
      headers: {
        //Used by all (POST, PUT, DELETE) methods
        "content-type": "application/json"
      }, 
      //converts object or value to a JSON string
      body: JSON.stringify(newBlog)//body is only used when you request POST and PUT
    }); 
    history.push("/");
  }; 

  return (
    <div className="createPost">
      <h1>Create post page</h1>
      <form onSubmit={handleSubmit}>
        <label>Author: </label>
        <input type="text" placeholder="author" onChange={(e) => {setAuthor(e.target.value)}} />
        <label>Title: </label>
        <input type="text" placeholder="title" onChange={(e) => {setTitle(e.target.value)}} />
        <label>Blog: </label>
        <input type="text" placeholder="content" onChange={(e) => {setContent(e.target.value)}} />
        <button type="submit">Post my blog</button>
      </form>
    </div>
  );
};

export default CreatePost;
