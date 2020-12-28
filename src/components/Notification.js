import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message) {
    return (
      <div className={message.type + ' message'}>
        <h3>{message.type}</h3>
        <p>{message.content}</p>
      </div>
    )
  }
  return null
}

Notification.propTypes = {
  message: PropTypes.exact({
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }),
}

export default Notification
