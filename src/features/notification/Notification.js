import React from "react"
import { useSelector } from "react-redux"
import { selectNotificationContent } from "./notificationSlice"

const Notification = () => {
  const notification = useSelector(selectNotificationContent)
  const notificationIcon = () => {
    switch (notification.type) {
      case "error":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 mx-2 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )

      case "info":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 mx-2 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )

      default:
    }
  }

  if (notification.content) {
    return (
      <div
        className={`flex w-auto notification alert alert-${notification.type}`}
      >
        <div className="flex-1">
          {notificationIcon()}
          <label>{notification.content}</label>
        </div>
      </div>
    )
  }
  return (
    <div
      className={`flex w-auto h-14 bg-white notification alert alert-${notification.type}`}
    >
      <div className="flex-1"></div>
    </div>
  )
}

export default Notification
