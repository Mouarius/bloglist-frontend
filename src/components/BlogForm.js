import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../features/blogs/blogsSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import {
  sendErrorMessage,
  sendInfoMessage,
} from '../features/notification/notificationSlice'

const BlogForm = () => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const resultCreateNewBlog = dispatch(
        createNewBlog({
          title: newBlogTitle,
          author: newBlogAuthor,
          url: newBlogUrl,
        })
      )
      const result = unwrapResult(resultCreateNewBlog)
      dispatch(
        sendInfoMessage(`A new blog '${result.title}' has been created !`)
      )
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
    } catch (error) {
      dispatch(sendErrorMessage(error.message))
    }
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

export default BlogForm
