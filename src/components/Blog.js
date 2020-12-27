import React, { useState } from 'react'
const Blog = ({ blog, handleLikeButton, handleDeleteButton, loggedUser }) => {
  const [detailed, setDetailed] = useState(false)

  const showWhenVisible = { display: detailed ? '' : 'none' }
  const buttonLabel = detailed ? 'hide' : 'view'

  const showRemoveButton = {
    display: loggedUser.id === blog.user.id ? '' : 'none',
  }

  const toggleDetails = () => {
    setDetailed(!detailed)
  }

  return (
    <div className="blog">
      <strong>{blog.title}</strong> - {blog.author}
      <button className="button-visibility" onClick={toggleDetails}>
        {buttonLabel}
      </button>
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
          <li>
            <button style={showRemoveButton} onClick={handleDeleteButton}>
              remove
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Blog
