import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import blogService from '../../services/blogs'

export const initializeBlogs = createAsyncThunk(
  'blogs/fetchingBlogStatus',
  async (thunkAPI) => {
    const allBlogs = await blogService.getAll()
    return allBlogs
  }
)

export const createNewBlog = createAsyncThunk(
  'blogs/createNewBlogStatus',
  async (blogToCreate, thunkAPI) => {
    const newBlog = await blogService.create(blogToCreate)
    return newBlog
  }
)

export const addLikeToBlog = createAsyncThunk(
  'blogs/addLikeToBlogStatus',
  async (blog, thunkAPI) => {
    const blogToUpdate = { ...blog }
    blogToUpdate.likes += 1
    const updatedBlog = await blogService.update(blogToUpdate)
    return updatedBlog
  }
)

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return state.concat(action.payload)
    },
    addNewBlog: (state, action) => {
      return state.concat(action.payload)
    },
  },
  extraReducers: {
    [initializeBlogs.fulfilled]: (state, action) => {
      return state.concat(action.payload)
    },
    [addLikeToBlog.fulfilled]: (state, action) => {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
    [createNewBlog.fulfilled]: (state, action) => {
      return state.concat(action.payload)
    },
  },
})

export const { setBlogs, addNewBlog, addLikeToBlogWithID } = blogsSlice.actions

export const selectBlogs = (state) => state.blogs
export default blogsSlice.reducer
