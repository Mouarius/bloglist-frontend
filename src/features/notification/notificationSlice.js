import { createSlice } from '@reduxjs/toolkit'

const duration = 5000
let notificationTimeout

export const sendErrorMessage = (message) => (dispatch) => {
  clearTimeout(notificationTimeout)
  dispatch(setErrorMessage(message))
  notificationTimeout = setTimeout(
    () => dispatch(removeNotification()),
    duration
  )
}
export const sendInfoMessage = (message) => (dispatch) => {
  clearTimeout(notificationTimeout)
  notificationTimeout = dispatch(setInfoMessage(message))
  setTimeout(() => dispatch(removeNotification()), duration)
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    timeoutID: '',
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
    setErrorMessage: (state, action) => {
      state.type = 'error'
      state.content = action.payload
    },
    setInfoMessage: (state, action) => {
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
  setErrorMessage,
  setInfoMessage,
  removeNotification,
} = notificationSlice.actions
export default notificationSlice.reducer
