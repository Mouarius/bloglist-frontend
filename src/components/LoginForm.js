import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../features/login/loginSlice'
import { sendErrorMessage } from '../features/notification/notificationSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const loginCredentials = { username, password }
    console.log('loginCredentials :>> ', loginCredentials)
    try {
      const resultLoginUser = await dispatch(loginUser(loginCredentials))
      unwrapResult(resultLoginUser)
      setUsername('')
      setPassword('')
    } catch (e) {
      dispatch(sendErrorMessage(e.message))
    }
  }

  return (
    <div id="login-form">
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
