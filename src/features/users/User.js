import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectAllUsers } from './usersSlice'

const User = () => {
  const id = useParams().id
  const users = useSelector(selectAllUsers)

  if (users.length !== 0) {
    console.log('users :>> ', users)
    const user = users.find((user) => user.id === id)
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  }
  return null
}

export default User
