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
    <div id="login-form" className="flex max-w-md mx-auto mt-10 shadow card">
      <div className="card-body">
        <h2 className="text-3xl card-title">Log in to the app</h2>

        <form className="form-control" onSubmit={handleLogin}>
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            className="input input-bordered"
          />

          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            className=" input input-bordered"
          />
          <button className="px-8 mt-4 btn btn-primary" type="submit">
            login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
