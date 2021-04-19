import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom"; 

import { PostContext } from "../context/PostsProvider"; 

const Blog = (props) => {
  const history = useHistory (); 
  const { getPostById, singlePost } = useContext(PostContext); 
  const { id } = props.match.params; 

  useEffect(() => {
    getPostById(id); 
// eslint-disable-next-line
  }, []);

  const handleClick = () => {
    history.push(`/blog/${id}/edit`); 
  }

  let content = <p>Loading...</p>;
  if (singlePost) {
    content = (
      <div>
        <h2>{singlePost.title}</h2>
        <p>{singlePost.author}</p>
        <em>{new Date(singlePost.created).toLocaleDateString()}</em>
        <p>{singlePost.content}</p>
        <button onClick={handleClick} >Edit blog</button>
      </div>
    ); 
  }

  return (
    <div className="eachBlog">
      {content}
    </div>
  );
};

export default Blog;
