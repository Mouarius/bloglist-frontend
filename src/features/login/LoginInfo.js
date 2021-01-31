import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { selectUser, setUser } from "./loginSlice"

const LoginInfo = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const history = useHistory()
  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem("loggedBloglistUser")
    dispatch(setUser(null))
    history.push("/login")
  }
  if (!user) {
    return null
  }
  return (
    <div className="shadow card">
      <div className="flex flex-row items-center justify-between py-2 pr-2 card-body">
        <p className="">
          <strong>{user.name} </strong>is logged in.
        </p>
        <button className="flex-none btn btn-sm" onClick={logout}>
          log out
        </button>
      </div>
    </div>
  )
}

export default LoginInfo
