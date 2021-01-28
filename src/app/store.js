import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../features/notification/notificationSlice'
import blogsReducer from '../features/blogs/blogsSlice'
import loginReducer from '../features/login/loginSlice'
import usersReducer from '../features/users/usersSlice'
export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    users: usersReducer,
    login: loginReducer,
  },
})
