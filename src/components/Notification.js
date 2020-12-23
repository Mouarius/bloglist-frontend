import React from 'react'

const Notification = ({ message }) => {
  if (message) {
    return (
      <div className={message.type + '-message'}>
        <h3>{message.type}</h3>
        <p>{message.content}</p>
      </div>
    )
  }
  return null
}

export default Notification
