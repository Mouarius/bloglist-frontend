import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)

  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
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
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage({
        type: 'error',
        content: exception.response.data.error,
      })
      setTimeout(() => setNotificationMessage(null), 5000)
    }
  }

  const addBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      setNotificationMessage({
        type: 'info',
        content: `The blog ${newBlog.title} by ${newBlog.author} has been created !`,
      })
      setTimeout(() => setNotificationMessage(null), 5000)
      setBlogs(blogs.concat(newBlog))
    } catch (exception) {
      setNotificationMessage({
        type: 'error',
        content: exception.response.data.error,
      })
      setTimeout(() => setNotificationMessage(null), 5000)
    }
  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="add blog">
        <BlogForm createBlog={addBlog} />
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
        handleLogin={handleLogin}
      />
    </div>
  )
  const blogsList = () => (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
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
      <Notification message={notificationMessage} />
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
