import React from 'react'
import Blog from './Blog'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { useSelector } from 'react-redux'
import { selectBlogs } from './blogsSlice'

describe('<Blog />', () => {
  let component
  const handleLikeClick = jest.fn()
  const handleRemoveClick = jest.fn()

  const blog = {
    title: 'The title is shown',
    author: 'React Tester',
  }
  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        handleLikeButton={handleLikeClick}
        handleDeleteButton={handleRemoveClick}
      />
    )
  })
  test('renders title and author name only by default', () => {
    const blogTitle = component.container.querySelector('.blog-title')
    const blogAuthor = component.container.querySelector('.blog-author')

    expect(blogTitle).toHaveTextContent('The title is shown')
    expect(blogAuthor).toHaveTextContent('React Tester')
  })
  test('everything is shown when view button is clicked', () => {
    const showButton = component.container.querySelector('.button-visibility')
    fireEvent.click(showButton)
    const blogDetails = component.container.querySelector('.blog-details')

    expect(blogDetails).not.toHaveStyle('display:none')
  })
  test('like button should be called twice', () => {
    const likeButton = component.container.querySelector('.button-likes')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(handleLikeClick.mock.calls.length).toBe(2)
  })
})
