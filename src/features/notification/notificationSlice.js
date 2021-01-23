import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    type: '',
    content: '',
  },
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload
    },
    setType: (state, action) => {
      state.type = action.type
    },
    sendErrorMessage: (state, action) => {
      state.type = 'error'
      state.content = action.payload
    },
    sendInfoMessage: (state, action) => {
      state.type = 'info'
      state.content = action.payload
    },
    removeNotification: (state) => {
      state.type = ''
      state.content = ''
    },
  },
})

export const selectNotificationContent = (state) => state.notification

export const {
  setContent,
  setType,
  sendErrorMessage,
  sendInfoMessage,
  removeNotification,
} = notificationSlice.actions
export default notificationSlice.reducer
