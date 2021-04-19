import { createContext, useState, useEffect } from "react";

export const PostContext = createContext();

const PostsProvider = (props) => {
  const [posts, setPosts] = useState(null);
  const [singlePost, setSinglePost] = useState(null);

  //we use this useEffect so that it will render getAllPosts when the page loads(rendrs)
  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    //setting up the api request. fetch already comes with js
    let posts = await fetch("/server/v1/blogs");
    //This method makes the information available to us
    posts = await posts.json();
    if (posts.length === 0) {
      console.log("something went wrong");
    } else {
      setPosts(posts);
    }
  };

  const getPostById = async (id) => {
    let post = await fetch(`/server/v1/blogs/${id}`);
    post = await post.json();
    setSinglePost(post);
  };

  const createNewPost = async (newBlog) => {
    let result = await fetch("/server/v1/blogs", {
      method: "POST", //DELETE for delete, Put for updates
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBlog), //converts JS object or value into JSON string
    });
    result = result.json(); //parses json into javascript object
    await getAllPosts();
    return result;
  };

  const editPostById = async (blogToEdit) => {
    let result = await fetch(`/server/v1/blogs/$blogToEdit.id`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(blogToEdit),
    });
    result = await result.json(); //parses json into javascript object

    await getAllPosts();
    return result;
  };

  const deletePostById = async (id) => {
    await fetch(`/server/v1/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    //to show on frontend that blog no longer exist
    setPosts(posts.filter((post) => id !== post.id));
  };

  const values = {
    posts,
    singlePost,
    setSinglePost,
    getAllPosts,
    getPostById,
    createNewPost,
    editPostById,
    deletePostById,
  };

  return (
    <PostContext.Provider value={values}>{props.children}</PostContext.Provider>
  );
};

export default PostsProvider;
