import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'

const Home = () => {
  const history = useHistory(); 
  const [blogs, setBlogs] = useState([]);
  //allows the page to runs the function immediately when the page rerenders
  useEffect(() => {
    fetchAllBlogs();
  }, []);

  //By using fetch we can make requests to the server
  const fetchAllBlogs = async () => {
    //setting up the api request. fetch already comes with js
    let blogsToGet = await fetch("/server/v1/blogs");
    //This method makes the information available to us
    blogsToGet = await blogsToGet.json();
    if (blogsToGet.length === 0) {
      console.log("something went wrong");
    } else {
      setBlogs(blogsToGet);
    }
  };

  let blogResult = "";
  if (blogs) {
    blogResult = (
      <div>
        <button onClick={() => {history.push("/createBlog")}}>make more blogs</button>
        {blogs.map((blog, i) => (
          <div key={i} className="blog" onClick={() => {history.push(`/blog/${blog.id}`)}}>
            <h2>{blog.author}</h2>
            <em>{blog.created}</em>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    );
  } else {
    blogResult = <p>There are no blogs available</p>;
  }

  return (
    <div className="home">
      <h1>HELLO here are the blogs</h1>
      {blogResult}
    </div>
  );
};

export default Home;
