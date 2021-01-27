import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../features/notification/notificationSlice'
import blogsReducer from '../features/blogs/blogsSlice'
import usersReducer from '../features/users/usersSlice'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: usersReducer,
  },
})
