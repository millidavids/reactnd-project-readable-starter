/**
* @description Function for consuming the readable api
* @param {string} endpoint - The endpoint for which the api calls
* @param {string} method - The http method used
* @param {object} body - Optional body object used for POST and PUT
* @return {promise} - promise of the fetch api response
*/
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

/**
* @description Get all categories
* @return {Promise} - function call to the apiFetchSkel function
*/
export const getCategories = () => apiFetchSkel('/categories')

/**
* @description Get all categories belonging to a certain category
* @param {string} category - category for which to filter posts
* @return {Promise} - function call to the apiFetchSkel function
*/
export const getCategoryPosts = (category) => apiFetchSkel(`/${category}/posts`)

/**
* @description Get all posts
* @return {Promise} - function call to the apiFetchSkel function
*/
export const getPosts = () => apiFetchSkel('/posts')

/**
* @description Create a new post
* @param {string} title - title of the post
* @param {string} body - body of the post
* @param {string} owner - user who wrote the post
* @param {string} category - category of the post
* @param {string} id - id of the post
* @param {Date} timestamp - timestamp of the post
* @return {Promise} - function call to the apiFetchSkel function
*/
export const addPost = (title, author, body, category, id, timestamp) => {
  const requestBody = {id, timestamp, title, body, author, category}

  return apiFetchSkel('/posts', 'POST', requestBody)
}

/**
* @description Get a specific post
* @param {string} id - id string of the post
* @return {Promise} - function call to the apiFetchSkel function
*/
export const getPost = (id) => apiFetchSkel(`/posts/${id}`)

/**
* @description Update an existing post
* @param {string} id - id of the post
* @param {string} title - new title of the post
* @param {string} body - new body of the post
* @return {Promise} - function call to the apiFetchSkel function
*/
export const updatePost = (id, title, body) => apiFetchSkel(`/posts/${id}`, 'PUT', {title, body})

/**
* @description Delete a post
* @param {string} id - id of the post to delete
* @return {Promise} - function call to the apiFetchSkel function
*/
export const deletePost = (id) => apiFetchSkel(`/posts/${id}`, 'DELETE')

/**
* @description Get all comments of a specific post
* @param {string} id - id of the post
* @return {Promise} - function call to the apiFetchSkel function
*/
export const getPostComments = (id) => apiFetchSkel(`/posts/${id}/comments`)

/**
* @description Create a new comment on a post
* @param {string} body - body of the comment
* @param {string} owner - user who wrote the comment
* @param {string} parentId - the post id that the comment belongs to
* @param {string} id - the post id that the comment belongs to
* @param {Date} timestamp - the post id that the comment belongs to
* @return {Promise} - function call to the apiFetchSkel function
*/
export const addComment = (author, body, parentId, id, timestamp) => {
  const requestBody = {id, timestamp, body, author, parentId}

  return apiFetchSkel(`/comments`, 'POST', requestBody)
}

/**
* @description get a single comment
* @param {string} id - id of the comment
* @return {Promise} - function call to the apiFetchSkel function
*/
export const getComment = (id) => apiFetchSkel(`/comments/${id}`)

/**
* @description Create a vote for a specific comment
* @param {string} id - id of the comment being voted on
* @return {Promise} - function call to the apiFetchSkel function
*/
export const castCommentVote = (id, vote) => apiFetchSkel(`/comments/${id}`, 'POST', {'option': vote})

/**
* @description Create a vote for a specific comment
* @param {string} id - id of the comment being voted on
* @return {Promise} - function call to the apiFetchSkel function
*/
export const castPostVote = (id, vote) => apiFetchSkel(`/posts/${id}`, 'POST', {'option': vote})

/**
* @description Update an existing comment
* @param {string} id - id of the comment
* @param {string} body - the new body of the comment
* @return {Promise} - function call to the apiFetchSkel function
*/
export const updateComment = (id, body, timestamp) => {
  const requestBody = {timestamp, body}

  return apiFetchSkel(`/comments/${id}`, 'PUT', requestBody)
}

/**
* @description Delete a comment
* @param {string} id - id of the comment
* @return {Promise} - function call to the apiFetchSkel function
*/
export const deleteComment = (id) => apiFetchSkel(`/comments/${id}`, 'DELETE')
