import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = 'bearer ' + newToken.toString()
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const update = async (blogToUpdate) => {
  blogToUpdate.user = blogToUpdate.user.id
  const request = await axios.put(baseUrl + '/' + blogToUpdate.id, blogToUpdate)
  return request.data
}

const comment = async (blogToComment, comment) => {
  const request = await axios.post(
    baseUrl + '/' + blogToComment.id + '/comments',
    comment
  )
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(baseUrl + '/' + id, config)
  return request.data
}

export default { getAll, create, setToken, update, remove, comment }
