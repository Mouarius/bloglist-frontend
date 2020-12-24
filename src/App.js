import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = { username, password }
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      console.log(`Saved the user : ${JSON.stringify(user)}`)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage({ type: 'error', content: 'Wrong credentials' })
      setTimeout(() => setNotificationMessage(null), 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
    }
  }, [])

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
      {user === null ? (
        <div>
          <h2>log in to the app</h2>
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          {loginInfo()}
          {blogsList()}
        </div>
      )}

      <Notification message={notificationMessage} />
    </div>
  )
}

export default App
