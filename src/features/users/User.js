import React from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { selectAllUsers } from "./usersSlice"

const User = () => {
  const id = useParams().id
  const users = useSelector(selectAllUsers)

  if (users.length !== 0) {
    console.log("users :>> ", users)
    const user = users.find((user) => user.id === id)
    return (
      <div className="shadow blog card">
        <div className="card-body">
          <div className="card-title">
            <h3 className="blog-title">{user.name}</h3>
          </div>
          <span className="mr-4 text-lg">Added blogs</span>
          <ul className="p-2">
            {user.blogs.map((blog) => (
              <li className="my-1 border-t border-b" key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  return null
}

export default User
