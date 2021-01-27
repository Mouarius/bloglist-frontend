import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { addLikeToBlog, removeBlog } from './blogsSlice'
import {
  sendErrorMessage,
  sendInfoMessage,
} from '../notification/notificationSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { selectUser } from '../users/usersSlice'

const Blog = ({ blog }) => {
  const [detailed, setDetailed] = useState(false)

  const loggedUser = useSelector(selectUser)

  const dispatch = useDispatch()

  const showWhenVisible = { display: detailed ? '' : 'none' }
  const buttonLabel = detailed ? 'hide' : 'view'

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
