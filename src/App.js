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
import './App.css'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { selectUser, setUser } from './features/users/usersSlice'

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
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setUser(null))
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
