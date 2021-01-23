import React from 'react'
import { useSelector } from 'react-redux'
import { selectNotificationContent } from './notificationSlice'

const Notification = () => {
  const notification = useSelector(selectNotificationContent)

  if (notification.content) {
    return (
      <div className={notification.type + ' message'}>
        <h3>{notification.type}</h3>
        <p>{notification.content}</p>
      </div>
    )
  }
  return null
}

export default Notification
