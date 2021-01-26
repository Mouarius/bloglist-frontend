import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addLikeToBlog, addLikeToBlogWithID } from './blogsSlice'
import {
  removeNotification,
  sendErrorMessage,
} from '../notification/notificationSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const Blog = ({ blog, handleDeleteButton, loggedUser }) => {
  const [detailed, setDetailed] = useState(false)

  const dispatch = useDispatch()

  const showWhenVisible = { display: detailed ? '' : 'none' }
  const buttonLabel = detailed ? 'hide' : 'view'

  const removeButton = () => {
    if (loggedUser && loggedUser.id === blog.user.id) {
      return (
        <li>
          <button className="button-remove" onClick={handleDeleteButton}>
            remove
          </button>
        </li>
      )
    }
    return null
  }

  const toggleDetails = () => {
    setDetailed(!detailed)
  }

  const handleLikeButton = () => {
    dispatch(addLikeToBlog(blog))
      .then(unwrapResult)
      .catch((error) => {
        dispatch(sendErrorMessage(error.message))
        setTimeout(() => dispatch(removeNotification()), 5000)
      })
  }

  return (
    <div className="blog">
      <h3 className="blog-title">{blog.title}</h3> -{' '}
      <span className="blog-author">{blog.author}</span>
      <button className="button-visibility" onClick={toggleDetails}>
        {buttonLabel}
      </button>
      <div className="blog-details" style={showWhenVisible}>
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
  handleLikeButton: PropTypes.func.isRequired,
  handleDeleteButton: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired,
}

export default Blog
