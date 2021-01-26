import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addLikeToBlog, removeBlog } from './blogsSlice'
import { sendErrorMessage } from '../notification/notificationSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const Blog = ({ blog, loggedUser }) => {
  const [detailed, setDetailed] = useState(false)

  const dispatch = useDispatch()

  const showWhenVisible = { display: detailed ? '' : 'none' }
  const buttonLabel = detailed ? 'hide' : 'view'

  const handleLikeButton = () => {
    dispatch(addLikeToBlog(blog))
      .then(unwrapResult)
      .catch((error) => {
        sendErrorMessage(dispatch, error.message)
      })
  }

  const handleRemoveButton = () => {
    dispatch(removeBlog(blog))
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

  const toggleDetails = () => {
    setDetailed(!detailed)
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
  loggedUser: PropTypes.object.isRequired,
}

export default Blog
