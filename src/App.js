import React, { useState, useEffect, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import Notification from './features/notification/Notification'
import {
  sendInfoMessage,
  sendErrorMessage,
  removeNotification,
} from './features/notification/notificationSlice'

import Blog from './features/blogs/Blog'
import {
  setBlogs,
  selectBlogs,
  addNewBlog,
  initializeBlogs,
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
    dispatch(initializeBlogs())
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
      dispatch(sendErrorMessage(exception.response.data.error))
      setTimeout(() => dispatch(removeNotification()), 5000)
    }
  }

  const sortBlogsByLikes = (blogs) => {
    const sortedBlogs = [...blogs].sort(
      (blog1, blog2) => blog2.likes - blog1.likes
    )
    return sortedBlogs
  }

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blog)
      dispatch(
        sendInfoMessage(
          `The blog ${newBlog.title} by ${newBlog.author} has been created !`
        )
      )
      setTimeout(() => dispatch(removeNotification()), 5000)
      dispatch(addNewBlog(newBlog))
    } catch (exception) {
      dispatch(sendErrorMessage(exception.response.data.error))
      setTimeout(() => dispatch(removeNotification()), 5000)
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
      // dispatch(setBlogs(sortBlogsByLikes(updatedBlogs)))
      //dispatch(sendErrorMessage('hello'))
    } catch (exception) {
      dispatch(sendErrorMessage(exception))
      setTimeout(() => dispatch(removeNotification()), 5000)
    }
  }

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id)
    const confirmation = window.confirm(
      `Are you sure you want to delete ${blogToDelete.title} by ${blogToDelete.author}`
    )
    if (confirmation) {
      try {
        await blogService.remove(id)
        dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)))
        dispatch(
          sendInfoMessage(`The blog ${blogToDelete.title} has been deleted.`)
        )
        setTimeout(() => dispatch(removeNotification()), 5000)
      } catch (e) {
        dispatch(sendErrorMessage(e.response.data.error))
        setTimeout(() => dispatch(removeNotification()), 5000)
      }
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
