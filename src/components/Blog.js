import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <strong>{blog.title}</strong> - {blog.author.name}
  </div>
)

export default Blog
