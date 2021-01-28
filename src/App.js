import React, { useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom/'

import { useSelector, useDispatch } from 'react-redux'

//STYLESHEET
// import './App.css'

//Notification
import Notification from './features/notification/Notification'

//Toggleable
import Togglable from './components/Togglable'

//Blogs
import blogService from './services/blogs'
import { initializeBlogs, sortBlogs } from './features/blogs/blogsSlice'
import BlogForm from './features/blogs/BlogForm'

//Login
import { selectUser, setUser } from './features/login/loginSlice'
import LoginForm from './features/login/LoginForm'

//Users
import { initializeUsers } from './features/users/usersSlice'
import UserList from './features/users/UserList'
import User from './features/users/User'
import BlogList from './features/blogs/BlogList'
import LoginInfo from './features/login/LoginInfo'
import Blog from './features/blogs/Blog'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(selectUser)

  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      await dispatch(initializeBlogs())
      dispatch(sortBlogs())
    }
    const fetchUsers = async () => {
      await dispatch(initializeUsers())
    }
    fetchBlogs()
    fetchUsers()
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [dispatch])

  const navLinkClass = 'nav-link'

  return (
    <Router>
      <div className="container px-4 mx-auto bg-">
        <nav>
          <h1 className="">blogs</h1>
          <Link className={navLinkClass} to="/users">
            USERS
          </Link>
          <Link className={navLinkClass} to="/">
            BLOGS
          </Link>
        </nav>

        <Notification />

        {user.username ? <LoginInfo /> : <Redirect to="/login" />}

        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/">
            <Togglable ref={blogFormRef} buttonLabel="add blog">
              <BlogForm blogFormRef={blogFormRef} />
            </Togglable>
            <BlogList />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
