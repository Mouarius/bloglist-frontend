import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createNewBlog } from "./blogsSlice"
import { unwrapResult } from "@reduxjs/toolkit"
import {
  sendErrorMessage,
  sendInfoMessage,
} from "../notification/notificationSlice"

const BlogForm = ({ blogFormRef }) => {
  const [newBlogTitle, setNewBlogTitle] = useState("")
  const [newBlogUrl, setNewBlogUrl] = useState("")
  const [newBlogAuthor, setNewBlogAuthor] = useState("")

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const resultCreateNewBlog = await dispatch(
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
    } catch (error) {
      dispatch(sendErrorMessage(error.message))
    } finally {
      blogFormRef.current.toggleVisibility()
      setNewBlogTitle("")
      setNewBlogAuthor("")
      setNewBlogUrl("")
    }
  }

  return (
    <div id="blog-form">
      <h3 className="card-title">Create a new Blog</h3>
      <form onSubmit={addBlog} className="flex flex-col">
        <div className="form-control">
          <label className="label">
            <h3 className="label-text">Title</h3>
          </label>
          <input
            type="text"
            value={newBlogTitle}
            name="blogTitle"
            onChange={({ target }) => setNewBlogTitle(target.value)}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <h3 className="label-text">Author</h3>
          </label>
          <input
            type="text"
            value={newBlogAuthor}
            name="blogAuthor"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <h3 className="label-text">Url</h3>
          </label>
          <input
            type="text"
            value={newBlogUrl}
            name="blogUrl"
            onChange={({ target }) => setNewBlogUrl(target.value)}
            className="input input-bordered"
          />
        </div>
        <button type="submit" className="w-auto mt-4 btn btn-primary">
          send
        </button>
      </form>
    </div>
  )
}

export default BlogForm
