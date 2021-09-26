import './App.css';
import React from "react";
import HomePage from './pages/Home/home.js';
import PostsPage from './pages/Posts/posts.js';
import PostPage from './pages/Posts/post.js';
import LoginPage from './pages/Login/login.js';
import ProfilePage from './pages/Profile/profile.js';
import axios, { CancelToken } from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { useState } from 'react/cjs/react.development';
import UserContext from './contexts/UserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({
    authed: false,
    userId: null,
    token: null,
  })
  const handleLogin = (email, password) => {
    axios({
      method: 'GET',
      url: 'https://60dff0ba6b689e001788c858.mockapi.io/tokens'
    }).then(({ data }) => {
      setCurrentUser({
        userId: data.userId, token: data.token, authed: true
      })
    })
  }

  const handleLogout = () => {
    setCurrentUser({
      id: null, token: null, authed: false
    })
  }

  return (
    <UserContext.Provider value={currentUser}>
      <Router>

        <div>
          <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
            {!currentUser.authed && <Link to="/login">Login</Link>}
            {currentUser.authed && <Link to="/profile">Profile</Link>}
            {currentUser.authed && <Link to="/profile" onClick={handleLogout}>Logout</Link>}
          </div>


          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/posts" exact>
              <PostsPage />
            </Route>
            <Route path="/posts/:id" children={<PostPage />}>
            </Route>
            <Route path="/login" exact>
              <LoginPage handleLogin={handleLogin} />
            </Route>
            <Route path="/profile" exact>
              <ProfilePage />
            </Route>
          </Switch>
        </div>

      </Router>
    </UserContext.Provider>
  );
}

export default App;