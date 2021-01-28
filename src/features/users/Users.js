import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers, selectAllUsers } from './usersSlice'
import './Users.css'

const Blogs = () => {
  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllUsers())
    console.log(users)
  }, [])
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>number of blogs</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul></ul>
    </div>
  )
}

export default Blogs
