import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import blogService from '../../services/blogs'

export const sortBlogsByLikes = (blogs) => {
  const sortedBlogs = [...blogs].sort(
    (blog1, blog2) => blog2.likes - blog1.likes
  )
  return sortedBlogs
}

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

export const removeBlog = createAsyncThunk(
  'blogs/removeBlogStatus',
  async (blog, thunkAPI) => {
    const updatedBlogs = await blogService.remove(blog.id)
    return updatedBlogs
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
    sortBlogs: (state, action) => {
      return sortBlogsByLikes(state)
    },
  },
  extraReducers: {
    [initializeBlogs.fulfilled]: (state, action) => {
      return state.concat(action.payload)
    },
    [addLikeToBlog.fulfilled]: (state, action) => {
      return sortBlogsByLikes(
        state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        )
      )
    },
    [createNewBlog.fulfilled]: (state, action) => {
      return sortBlogsByLikes(state.concat(action.payload))
    },
    [removeBlog.fulfilled]: (state, action) => {
      return sortBlogsByLikes(
        state.filter((blog) => blog.id !== action.meta.arg.id)
      )
    },
  },
})

export const {
  setBlogs,
  addNewBlog,
  addLikeToBlogWithID,
  sortBlogs,
} = blogsSlice.actions

export const selectBlogs = (state) => state.blogs
export default blogsSlice.reducer
