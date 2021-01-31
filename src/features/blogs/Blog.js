import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addCommentToBlog,
  addLikeToBlog,
  removeBlog,
  selectBlogs,
} from "./blogsSlice"
import {
  sendErrorMessage,
  sendInfoMessage,
} from "../notification/notificationSlice"
import { unwrapResult } from "@reduxjs/toolkit"
import { selectUser } from "../login/loginSlice"
import { useHistory, useParams } from "react-router-dom"

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(selectBlogs)
  const history = useHistory()
  const id = useParams().id

  const [comment, setComment] = useState("")

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
        history.push("/")
      } catch (error) {
        dispatch(sendErrorMessage(error.message))
      }
    }
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    try {
      const objectToSend = { blog: blog, comment: comment }
      const addComment = await dispatch(addCommentToBlog(objectToSend))
      unwrapResult(addComment)
    } catch (e) {
      console.log(e)
    } finally {
      setComment("")
    }
  }

  const removeButton = () => {
    if (loggedUser && loggedUser.id === blog.user.id) {
      return (
        <li>
          <button
            className="button-remove btn btn-sm btn-secondary"
            onClick={handleRemoveButton}
          >
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
    <div className="shadow blog card">
      <div className="card-body">
        <div className="flex card-title">
          <h3 className="flex-1 blog-title">{blog.title}</h3>
          <span class="badge flex-none badge-outline badge-sm blog-author">
            {blog.author}
          </span>
        </div>
        <div className="blog-details">
          <ul className="">
            <li className="py-2 blog-url text-md ">
              <span className="mr-2">Visit url :</span>
              <a className="underline text-primary" href={blog.url}>
                {blog.url}
              </a>
            </li>
            <li className="py-2 blog-likes">
              <span className="mr-4 text-lg">Likes : {blog.likes}</span>

              <button
                className="p-0 bg-gray-100 rounded-full button-likes btn btn-ghost btn-sm btn-square"
                onClick={handleLikeButton}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </li>
            <li className="py-2">
              <span className="mr-4 text-lg">Comments :</span>
              <ul>
                {blog.comments.map((comment) => (
                  <li className="pl-4 mb-1 border-t border-b" key={comment.id}>
                    {" "}
                    {comment.content}
                  </li>
                ))}
              </ul>
            </li>
            <li className="py-4">
              <span className="mr-4 text-lg">Leave a comment</span>
              <form onSubmit={handleCommentSubmit} className="flex flex-col">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-initial block h-24 my-2 textarea textarea-bordered"
                  placeholder="Type in your comment..."
                />
                <button className="my-2 btn btn-sm btn-primary" type="submit">
                  send comment
                </button>
              </form>
            </li>
            {removeButton()}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Blog
