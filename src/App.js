import React, { useState, useEffect, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import Notification from './features/notification/Notification'
import { sendErrorMessage } from './features/notification/notificationSlice'

import Blog from './features/blogs/Blog'
import {
  selectBlogs,
  initializeBlogs,
  sortBlogs,
} from './features/blogs/blogsSlice'

import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(selectBlogs)

  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      await dispatch(initializeBlogs())
      dispatch(sortBlogs())
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = { username, password }
    try {
      const userToLogin = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBloglistUser',
        JSON.stringify(userToLogin)
      )
      setUser(userToLogin)
      setUsername('')
      setPassword('')
    } catch (exception) {
      sendErrorMessage(dispatch, exception.response.data.error)
    }
  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const blogForm = () => {
    return (
      <Togglable ref={blogFormRef} buttonLabel="add blog">
        <BlogForm />
      </Togglable>
    )
  }

  const loginForm = () => (
    <div>
      <h2>log in to the app</h2>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
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

  return (
    <div>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          {loginInfo()}
          {blogForm()}
          {blogsList()}
        </div>
      )}
    </div>
  )
}

export default App
