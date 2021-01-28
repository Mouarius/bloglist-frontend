import React from 'react'
import BlogForm from './BlogForm'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

describe('<BlogForm />', () => {
  const createBlogHandler = jest.fn()
  test('correct information is sent', () => {
    const component = render(<BlogForm createBlog={createBlogHandler} />)
    const form = component.container.querySelector('form')
    const inputTitle = component.container.querySelector(
      'input[name="blogTitle"]'
    )
    const inputAuthor = component.container.querySelector(
      'input[name="blogAuthor"]'
    )
    const inputUrl = component.container.querySelector('input[name="blogUrl"]')
    fireEvent.change(inputTitle, { target: { value: 'test title by input' } })
    fireEvent.change(inputAuthor, { target: { value: 'test author by input' } })
    fireEvent.change(inputUrl, { target: { value: 'test url by input' } })
    fireEvent.submit(form)
    expect(createBlogHandler.mock.calls).toHaveLength(1)
    expect(createBlogHandler.mock.calls[0][0]).toEqual({
      title: 'test title by input',
      author: 'test author by input',
      url: 'test url by input',
    })
  })
})
