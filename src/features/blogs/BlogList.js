import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectUser } from "../login/loginSlice"
import { selectBlogs } from "./blogsSlice"

const BlogList = () => {
  const blogs = useSelector(selectBlogs)
  const user = useSelector(selectUser)

  if (!blogs || !user) {
    return null
  }
  return (
    <div id="bloglist" className="container flex flex-col mx-auto">
      {blogs.map((blog) => (
        <div key={blog.id} className="my-2 bordered blog card">
          <Link to={`/blogs/${blog.id}`} className="p-4 card-body">
            <h2 class="mb-0 text-2xl">
              {blog.title} -{" "}
              <div class="badge badge-outline">{blog.author}</div>
            </h2>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
