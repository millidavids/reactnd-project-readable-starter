import uuidv4 from 'uuid/v4'

const apiFetchSkel = (endpoint, method = 'GET', body = {}) => {
  const options = {
    method: method,
    headers: new Headers({
      'Authorization': process.env.REACT_APP_AUTHORIZATION,
      'Content-Type': 'application/json',
    }),
    mode: 'cors',
    cache: 'default',
    body: (method === 'GET' || method === 'HEAD') ? null : JSON.stringify(body),
  }

  return fetch(`${process.env.REACT_APP_API_URI}${endpoint}`, options)
}

export const getCategories = () => apiFetchSkel('/categories')

export const getCategoryPosts = (category) => apiFetchSkel(`/${category}/posts`)

export const getPosts = () => apiFetchSkel('/posts')

export const addPost = (title, body, owner, category) => {
  const id = uuidv4()
  const timestamp = Date.now()
  const requestBody = {id, timestamp, title, body, owner, category}

  return apiFetchSkel('/posts', 'POST', requestBody)
}

export const getPost = (id) => apiFetchSkel(`/posts/${id}`)

export const updatePost = (id, title, body) => apiFetchSkel(`/posts/${id}`, 'PUT', {title, body})

export const deletePost = (id) => apiFetchSkel(`/posts/${id}`, 'DELETE')

export const getPostComments = (id) => apiFetchSkel(`/posts/${id}/comments`)

export const addComment = (body, owner, parentId) => {
  const id = uuidv4()
  const timestamp = Date.now()
  const requestBody = {id, timestamp, body, owner, parentId}

  return apiFetchSkel(`/comments`, 'POST', requestBody)
}

export const getComment = (id) => apiFetchSkel(`/comments/${id}`)

export const postVote = (id) => apiFetchSkel(`/comments/${id}`, 'POST')

export const updateComment = (id, body) => {
  const timestamp = Date.now()
  const requestBody = {timestamp, body}

  return apiFetchSkel(`/comments/${id}`, 'PUT', requestBody)
}

export const deleteComment = (id) => apiFetchSkel(`/comments/${id}`, 'DELETE')
