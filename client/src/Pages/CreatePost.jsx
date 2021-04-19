import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { PostContext } from "../context/PostsProvider";

const CreatePost = (props) => {
  const history = useHistory();
  const {
    createNewPost,
    getPostById,
    singlePost,
    setSinglePost,
    editPostById,
  } = useContext(PostContext);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [created, setCreated] = useState("");

  useEffect(() => {
    if (props.match.params.id) {
      getPostById(props.match.params.id);
    }

    // This function will run when the component is destroyed.
    //it resets the forms when going to a different page
    return () => {
      setSinglePost(null);
    };
  }, []);

  useEffect(() => {
    if (singlePost && props.match.params.id) {
      setTitle(singlePost.title);
      setContent(singlePost.content);
      setAuthor(singlePost.author);
    }
  }, [singlePost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newBlog = {
      author,
      title,
      content,
      created,
    };

    if (props.match.params.id) {
      // newBlog.id = props.match.params.id;
      let result = await editPostById(newBlog);

      if (result.success) {
        console.log("edit is succcessful");
        history.push("/");
      }
    } else {
      let result = await createNewPost(newBlog);
      console.log(result);
      if (result.success) {
        console.log("creating new blog");
        history.push("/");
      }
    }
  };

  //onChange can also be written like this
  // const handleAuthor = (e) => {
  //   setAuthor(e.target.value);
  // };

  return (
    <div className="createPost">
      <h1>{props.match.params.id ? "Edit your blog" : "Create a blog"}</h1>
      <form onSubmit={handleSubmit}>
        <label>Author: </label>
        <input
          type="text"
          placeholder="author"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <label>Title: </label>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Blog: </label>
        <textarea
          type="text"
          placeholder="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        {/* <label>Created: </label>
        <input type="text" placeholder="created" onChange={(e) => {setCreated(e.target.value)}} /> */}
        <button type="submit">
          {props.match.params.id ? "Edit Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
