import { useEffect, useState } from "react";

const Blog = (props) => {
  const { id } = props.match.params;
  const [fetchedBlog, setFetchedBlog] = useState(null);

  useEffect(() => {
    fetchBlogById(id);
  }, []);

  const fetchBlogById = async (id) => {
    let blog = await fetch(`/server/v1/blogs/${id}`);
    blog = await blog.json();
    setFetchedBlog(blog);
  };

  let content = <p>Loading...</p>;
  if (fetchedBlog) {
    content = (
      <div>
        <h2>{fetchedBlog.author}</h2>
        <em>{fetchedBlog.created}</em>
        <p>{fetchedBlog.title}</p>
        <p>{fetchedBlog.content}</p>
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
