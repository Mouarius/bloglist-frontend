import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { addLikeToBlog, removeBlog, selectBlogs } from './blogsSlice'
import {
  sendErrorMessage,
  sendInfoMessage,
} from '../notification/notificationSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { selectUser } from '../login/loginSlice'
import { useHistory, useParams } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(selectBlogs)
  const history = useHistory()
  const id = useParams().id

  const blog = blogs.find((blog) => blog.id === id)

  const loggedUser = useSelector(selectUser)

  const handleLikeButton = () => {
    dispatch(addLikeToBlog(blog))
      .then(unwrapResult)
      .catch((error) => {
        dispatch(sendErrorMessage(error.message))
      })
  }

  const handleRemoveButton = async () => {
    const confirmation = window.confirm(
      `Are you sure you want to delete the blog ${blog.title} by ${blog.author} ?`
    )
    if (confirmation) {
      try {
        const resultRemoveBlog = await dispatch(removeBlog(blog))
        unwrapResult(resultRemoveBlog)
        const { meta } = resultRemoveBlog
        dispatch(sendInfoMessage(`The blog ${meta.title} has been removed`))
        history.push('/')
      } catch (error) {
        dispatch(sendErrorMessage(error.message))
      }
    }
  }

  const removeButton = () => {
    if (loggedUser && loggedUser.id === blog.user.id) {
      return (
        <li>
          <button className="button-remove" onClick={handleRemoveButton}>
            remove
          </button>
        </li>
      )
    }
    return null
  }

  if (!blog) {
    return (
      <div>
        <em>It exists no blogs at this adress (404 not found)</em>
      </div>
    )
  }

  return (
    <div className="blog">
      <h3 className="blog-title">{blog.title}</h3> -{' '}
      <span className="blog-author">{blog.author}</span>
      <div className="blog-details">
        <ul>
          <li className="blog-url">
            <a href={blog.url}>{blog.url}</a>
          </li>
          <li className="blog-likes">
            likes : {blog.likes}
            <button className="button-likes" onClick={handleLikeButton}>
              like
            </button>
          </li>
          {removeButton()}
        </ul>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,
}

export default Blog
