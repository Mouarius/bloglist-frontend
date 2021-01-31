import React, { useState, useImperativeHandle } from "react"
import Proptypes from "prop-types"

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? "" : "none" }
  const hideWhenVisible = { display: visible ? "none" : "" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible} className="shadow card">
        <button className="btn btn-primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="shadow card">
        <div className="flex card-body">
          <button
            onClick={toggleVisibility}
            className="absolute flex-none object-right w-12 h-12 p-3 rounded-full right-8 btn btn-ghost bg-content-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {props.children}
        </div>
      </div>
    </div>
  )
})

Togglable.propTypes = { buttonLabel: Proptypes.string.isRequired }

Togglable.displayName = "Togglable"

export default Togglable
