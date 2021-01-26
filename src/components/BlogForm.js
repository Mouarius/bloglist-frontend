import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addNewBlog, createNewBlog } from '../features/blogs/blogsSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { sendErrorMessage } from '../features/notification/notificationSlice'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(
      createNewBlog({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
      })
    )
      .then(unwrapResult)
      .catch((error) => {
        sendErrorMessage(dispatch, error.message)
      })
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div id="blog-form">
      <h3>create new</h3>
      <form onSubmit={addBlog}>
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

BlogForm.propTypes = { createBlog: PropTypes.func.isRequired }

export default BlogForm
