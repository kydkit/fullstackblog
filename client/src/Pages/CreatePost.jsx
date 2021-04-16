import { useState } from 'react'; 
import { useHistory } from 'react-router-dom'; 

const CreatePost = () => {
  const history = useHistory(); 
  const [author, setAuthor] = useState(""); 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [created, setCreated] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 

    let newBlog = {
      author,
      title,
      content,
      created
    }; 
    console.log(newBlog);
    createBlog(newBlog); 
    
  }
  
  
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
    await fetch("/server/v1/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog)
    })
  
    history.push("/")
  }

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
        <label>Created: </label>
        <input type="text" placeholder="created" onChange={(e) => {setCreated(e.target.value)}} />
        <button type="submit">Post my blog</button>
      </form>
    </div>
  );
};

export default CreatePost;
