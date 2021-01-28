import React, { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom/'
import Users from './features/users/Users'

import { useSelector, useDispatch } from 'react-redux'

import Notification from './features/notification/Notification'

import Blog from './features/blogs/Blog'
import {
  selectBlogs,
  initializeBlogs,
  sortBlogs,
} from './features/blogs/blogsSlice'

import blogService from './services/blogs'
import './App.css'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { selectUser, setUser } from './features/login/loginSlice'
import User from './features/users/User'
import { initializeUsers } from './features/users/usersSlice'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(selectBlogs)
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

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setUser(null))
  }

  const blogForm = () => {
    return (
      <Togglable ref={blogFormRef} buttonLabel="add blog">
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
    )
  }

  const loginForm = () => (
    <div>
      <h2>log in to the app</h2>
      <LoginForm />
    </div>
  )

  const blogsList = () => (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} loggedUser={user} />
      ))}
    </div>
  )
  const loginInfo = () => (
    <p>
      {user.name} is logged in. <button onClick={logout}>log out</button>
    </p>
  )

  const navLinkClass = 'nav-link'

  return (
    <Router>
      <h1>blogs</h1>

      <nav>
        <Link className={navLinkClass} to="/users">
          USERS
        </Link>
        <Link className={navLinkClass} to="/">
          BLOGS
        </Link>
      </nav>
      <Notification />

      {loginInfo()}
      <Switch>
        <Route path="/login">{loginForm()}</Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>

        <Route path="/">
          {blogForm()}
          {blogsList()}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
