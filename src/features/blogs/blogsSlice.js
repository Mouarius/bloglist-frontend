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
  async () => {
    const allBlogs = await blogService.getAll()
    return allBlogs
  }
)

export const createNewBlog = createAsyncThunk(
  'blogs/createNewBlogStatus',
  async (blogToCreate) => {
    const newBlog = await blogService.create(blogToCreate)
    return newBlog
  }
)

export const addLikeToBlog = createAsyncThunk(
  'blogs/addLikeToBlogStatus',
  async (blog) => {
    console.log('blog :>> ', blog)
    const blogToUpdate = { ...blog }
    blogToUpdate.likes += 1
    const updatedBlog = await blogService.update(blogToUpdate)
    return updatedBlog
  }
)

export const addCommentToBlog = createAsyncThunk(
  'blogs/addCommentToBlogStatus',
  async (recievedObject) => {
    const { blog, comment } = recievedObject
    const commentedBlog = await blogService.comment(blog, { content: comment })
    return commentedBlog
  }
)

export const removeBlog = createAsyncThunk(
  'blogs/removeBlogStatus',
  async (blog) => {
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
    sortBlogs: (state) => {
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
    [addCommentToBlog.fulfilled]: (state, action) => {
      console.log('action.payload :>> ', action.payload)
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
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
