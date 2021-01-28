import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser } from './loginSlice'

const LoginInfo = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setUser(null))
  }
  if (!user) {
    return null
  }
  return (
    <p>
      {user.name} is logged in. <button onClick={logout}>log out</button>
    </p>
  )
}

export default LoginInfo
