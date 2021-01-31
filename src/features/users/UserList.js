import React from "react"
import { useSelector } from "react-redux"
import { selectAllUsers } from "./usersSlice"
import { Link } from "react-router-dom"

const UserList = () => {
  const users = useSelector(selectAllUsers)

  return (
    <div className="container flex flex-col mx-auto shadow card">
      <div className="card-body">
        <h2 className="card-title">Users</h2>
        <table>
          <thead>
            <tr className="font-medium border-2 border-solid">
              <td className="p-2">Name</td>
              <td className="p-2 border-l">Number of blogs</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border ">
                <td className="p-1 hover:underline hover:text-primary">
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td className="pl-2 border-l">{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserList
