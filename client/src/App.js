import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import PostsProvider from "./context/PostsProvider";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Blog from "./Pages/Blog";
import CreatePost from "./Pages/CreatePost";

function App() {
  return (
    <div className="App">
      <PostsProvider>
        <BrowserRouter>
          <Link to="/">Home</Link>
          <Link to="/createblog">Create A Blog</Link>
          <Link to="/about">About</Link>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/blog/:id" component={Blog} />
            <Route exact path="/createblog" component={CreatePost} />
            <Route exact path="/blog/:id/edit" component={CreatePost} />
            <Route exact path="/about" component={About} />
          </Switch>
        </BrowserRouter>
      </PostsProvider>
    </div>
  );
}

export default App;
