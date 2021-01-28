import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../login/loginSlice'
import Blog from './Blog'
import { selectBlogs } from './blogsSlice'

const BlogList = () => {
  const blogs = useSelector(selectBlogs)
  const user = useSelector(selectUser)

  if (!blogs || !user) {
    return null
  }
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} loggedUser={user} />
      ))}
    </div>
  )
}

export default BlogList
