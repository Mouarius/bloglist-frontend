import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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
    <div id="bloglist">
      {blogs.map((blog) => (
        <div key={blog.id} className="blog">
          <Link to={`/blogs/${blog.id}`}>
            <h3 className="blog-title">{blog.title}</h3> -{' '}
            <span className="blog-author">{blog.author}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
