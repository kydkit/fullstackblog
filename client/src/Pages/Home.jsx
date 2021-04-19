import { useContext } from "react";
import { useHistory } from 'react-router-dom'
import { PostContext } from "../context/PostsProvider";

const Home = () => {
  const { posts, deletePostById} = useContext(PostContext); 
  const history = useHistory(); 

  const handleClick = (id) => {
    history.push(`/blog/${id}`); 
  }

  const handleDelete = (e, id) => {
    e.stopPropagation(); 
    deletePostById(id); 
  }

  const renderPosts = () => {
    return posts.map((post) => (
      <div className="card" key={post.id} onClick={() => handleClick(post.id)}>
        <div className="title">
          <h2>{post.title}</h2>
          <p>{post.author}</p>
          {/* if date is provided from backend use below */}
          {/* <em>{post.created}</em> */}
          {/* if date is provided from frontend use below */}
          <em>{new Date(post.created).toLocaleDateString()}</em>
        </div>
        <div className="content">
          <p>{post.content}</p>
          {/* <p>{post.content.slice(0, 20)}</p> */} 
          <button onClick={(e) => handleDelete(e, post.id)}>Delete Blog</button>
        </div>
      </div>
    ))
  }

  return (
    <div className="home">
      <h1>HELLO here are the blogs</h1>
      
      {posts && renderPosts()}
    </div>
  );
};

export default Home;
