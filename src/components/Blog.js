import React, { useState } from 'react'
const Blog = ({ blog, handleLikeButton }) => {
  const [detailed, setDetailed] = useState(false)

  const showWhenVisible = { display: detailed ? '' : 'none' }
  const buttonLabel = detailed ? 'hide' : 'view'

  const toggleDetails = () => {
    setDetailed(!detailed)
  }

  return (
    <div className="blog">
      <strong>{blog.title}</strong> - {blog.author}
      <button onClick={toggleDetails}>{buttonLabel}</button>
      <div className="blog-details" style={showWhenVisible}>
        <ul>
          <li>
            <a href={blog.url}>{blog.url}</a>
          </li>
          <li>
            likes : {blog.likes}
            <button onClick={handleLikeButton}>like</button>
          </li>
          <li> {blog.user.name}</li>
        </ul>
      </div>
    </div>
  )
}

export default Blog
