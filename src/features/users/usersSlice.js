import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import usersService from '../../services/users'

export const initializeUsers = createAsyncThunk(
  'users/initializeUsers',
  async () => {
    const users = await usersService.getAll()
    return users
  }
)

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [initializeUsers.fulfilled]: (state, action) => {
      return (state = action.payload)
    },
  },
})

export const selectAllUsers = (state) => state.users

export default usersSlice.reducer
