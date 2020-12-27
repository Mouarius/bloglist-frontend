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
    blogService.getAll().then((blogs) => setBlogs(sortBlogsByLikes(blogs)))
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
      setNotificationMessage({
        type: 'error',
        content: exception.response.data.error,
      })
      setTimeout(() => setNotificationMessage(null), 5000)
    }
  }

  const sortBlogsByLikes = (blogs) => {
    console.log(`Appelé`)
    const sortedBlogs = [...blogs].sort(
      (blog1, blog2) => blog2.likes - blog1.likes
    )
    return sortedBlogs
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

  const addLikeTo = async (id) => {
    try {
      const blogToModify = blogs.find((blog) => blog.id === id)
      blogToModify.likes += 1
      const modifiedBlog = await blogService.update(blogToModify)
      const updatedBlogs = blogs.map((blog) =>
        blog.id === id ? modifiedBlog : blog
      )
      setBlogs(sortBlogsByLikes(updatedBlogs))
    } catch (exception) {
      setNotificationMessage({
        type: 'error',
        content: exception,
      })
      setTimeout(() => setNotificationMessage(null), 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      const blogToDelete = blogs.find((blog) => blog.id === id)
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      setNotificationMessage({
        type: 'info',
        content: `The blog ${blogToDelete.title} has been deleted.`,
      })
      setTimeout(() => setNotificationMessage(null), 5000)
    } catch (e) {
      setNotificationMessage({
        type: 'error',
        content: e.response.data.error,
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
        handleSubmit={handleLogin}
      />
    </div>
  )

  const blogsList = () => (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeButton={() => addLikeTo(blog.id)}
          handleDeleteButton={() => deleteBlog(blog.id)}
          loggedUser={user}
        />
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
