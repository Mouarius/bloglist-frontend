import React, { useEffect, useRef } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom/"

import { useSelector, useDispatch } from "react-redux"

//STYLESHEET
// import './App.css'

//Notification
import Notification from "./features/notification/Notification"

//Toggleable
import Togglable from "./components/Togglable"

//Blogs
import blogService from "./services/blogs"
import { initializeBlogs, sortBlogs } from "./features/blogs/blogsSlice"
import BlogForm from "./features/blogs/BlogForm"

//Login
import { selectUser, setUser } from "./features/login/loginSlice"
import LoginForm from "./features/login/LoginForm"

//Users
import { initializeUsers } from "./features/users/usersSlice"
import UserList from "./features/users/UserList"
import User from "./features/users/User"
import BlogList from "./features/blogs/BlogList"
import LoginInfo from "./features/login/LoginInfo"
import Blog from "./features/blogs/Blog"

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
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [dispatch])

  return (
    <Router>
      <div className="px-4 py-4 mx-auto min-w-lg">
        <nav className="mb-2 shadow-lg rounded-box bg-primary navbar text-content-100">
          <div className="flex-none px-2 mx-2 ">
            <h1 className="text-lg font-bold">Bloglist App</h1>
          </div>
          <div className="flex-1 text-md">
            <div classname="items-stretch hidden lg:flex">
              <Link
                className="btn btn-ghost btn-sm rounded-btn hover:text-content-100"
                to="/"
              >
                blogs
              </Link>
              <Link
                className="btn btn-ghost btn-sm rounded-btn hover:text-content-100"
                to="/users"
              >
                users
              </Link>
            </div>
          </div>
        </nav>
        <div className="container max-w-lg pt-12 mx-auto">
          {user.username ? <LoginInfo /> : <Redirect to="/login" />}

          <Notification />

          <Switch>
            <Route path="/login">
              {!user.username ? <LoginForm /> : <Redirect to="/" />}
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
      </div>
    </Router>
  )
}

export default App
