import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import usersService from '../../services/users'

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async (thunkAPI) => {
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
    [fetchAllUsers.fulfilled]: (state, action) => {
      return (state = action.payload)
    },
  },
})

export const selectAllUsers = (state) => state.users

export default usersSlice.reducer
