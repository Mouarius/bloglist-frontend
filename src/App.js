import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
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
      setNotificationMessage({ type: 'error', content: 'Wrong credentials' })
      setTimeout(() => setNotificationMessage(null), 5000)
    }
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
      }
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setNewBlogTitle('')
      setNewBlogUrl('')
      setNewBlogAuthor('')
    } catch (exception) {
      setNotificationMessage({
        type: 'error',
        content: 'Wrong blog content :',
        exception,
      })
      setTimeout(() => setNotificationMessage(null), 5000)
    }
  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const loginForm = () => (
    <div id="login-form">
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
  const blogForm = () => {
    return (
      <div id="blog-form">
        <form onSubmit={handleNewBlog}>
          <div>
            Title :
            <input
              type="text"
              value={newBlogTitle}
              name="blogTitle"
              onChange={({ target }) => setNewBlogTitle(target.value)}
            />
          </div>
          <div>
            Author :
            <input
              type="text"
              value={newBlogAuthor}
              name="blogAuthor"
              onChange={({ target }) => setNewBlogAuthor(target.value)}
            />
          </div>
          <div>
            URL :
            <input
              type="text"
              value={newBlogUrl}
              name="blogUrl"
              onChange={({ target }) => setNewBlogUrl(target.value)}
            />
          </div>
          <button type="submit">send</button>
        </form>
      </div>
    )
  }
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
        <div>
          <h2>log in to the app</h2>
          {loginForm()}
        </div>
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
