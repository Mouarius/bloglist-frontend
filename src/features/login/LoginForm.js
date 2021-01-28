import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from './loginSlice'
import { sendErrorMessage } from '../notification/notificationSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

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
      history.push('/')
    } catch (e) {
      dispatch(sendErrorMessage(e.message))
    }
  }

  return (
    <div id="login-form">
      <h2>log in to the app</h2>

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
