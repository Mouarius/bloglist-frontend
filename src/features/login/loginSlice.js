import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import loginService from '../../services/login'

const initialState = {
  username: '',
  password: '',
  name: '',
  id: '',
  token: '',
}

export const loginUser = createAsyncThunk(
  'login/loginUserStatus',
  async (credentials) => {
    const userToLogin = await loginService.login(credentials)
    window.localStorage.setItem(
      'loggedBloglistUser',
      JSON.stringify(userToLogin)
    )
    return userToLogin
  }
)

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload)
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      window.localStorage.setItem(
        'loggedBloglistUser',
        JSON.stringify(action.payload)
      )
      return (state = action.payload)
    },
  },
})

export const selectUserCredentials = (state) => {
  return { username: state.username, password: state.password }
}

export const selectUser = (state) => state.login

export const { setUser } = loginSlice.actions

export default loginSlice.reducer
