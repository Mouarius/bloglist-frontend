import React from 'react'

const BlogList = () => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeButton={() => addLikeTo(blog.id)}
          handleDeleteButton={() => deleteBlog(blog.id)}
        />
      ))}
    </div>
  )
}

export default BlogList
