import uuidv4 from 'uuid/v4'
import * as API from '../utils/api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SET_POST_SORT = 'SET_POST_SORT'
export const SET_SORT_DIRECTION = 'SET_SORT_DIRECTION'
export const ADD_POST = 'ADD_POST'
export const CAST_POST_VOTE = 'CAST_POST_VOTE'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'

/**
* @description receive posts redux action creator
* @param {string} posts - a list of post objects
* @return {object} - redux action for receiving posts
*/
export const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}

/**
* @description post sort posts redux action creator
* @param {string} sortBy - a sort filter
* @return {object} - redux action for sorting posts
*/
export const setPostSort = (sortBy) => {
  return {
    type: SET_POST_SORT,
    sortBy,
  }
}

/**
* @description sorting posts redux action creator
* @param {string} sortDirection - a sort filter
* @return {object} - redux action for sorting posts
*/
export const setSortDirection = (sortDirection) => {
  return {
    type: SET_SORT_DIRECTION,
    sortDirection,
  }
}

/**
* @description add posts redux action creator
* @param {string} post - a new post
* @return {object} - redux action for adding posts
*/
export const addPost = (post) => {
  return {
    type: ADD_POST,
    post
  }
}

/**
* @description cast vote posts redux action creator
* @param {string} post - a new post vote
* @return {object} - redux action for adding post votes
*/
export const castPostVote = (post) => {
  return {
    type: CAST_POST_VOTE,
    post
  }
}

/**
* @description update posts redux action creator
* @param {string} post - an updated post
* @return {object} - redux action for updateing posts
*/
export const updatePost = (post) => {
  return {
    type: UPDATE_POST,
    post
  }
}

/**
* @description delete posts redux action creator
* @param {string} post - a deleted post id
* @return {object} - redux action for deleting posts
*/
export const deletePost = (id) => {
  return {
    type: DELETE_POST,
    id
  }
}

/**
* @description api interface thunk delete post action dispatcher
* @param {string} id - a post id
* @param {function} dispatch - thunk for multi dispatching
* @fires {function} - api delete post then dispatch delete post action
*/
export const fetchDeletePost = (id) => dispatch => {
  API.deletePost(id)
    .then(res => dispatch(deletePost(id)))
}

/**
* @description api interface thunk updating post action dispatcher
* @param {string} id - a post id
* @param {string} title - a post title
* @param {string} body - a post body
* @param {function} dispatch - thunk for multi dispatching
* @fires {function} - api updating post then dispatch updating post action
*/
export const fetchUpdatePost = (id, title, body) => dispatch => {
  API.updatePost(id, title, body)
    .then(res => res.json())
    .then(result => dispatch(updatePost(result)))
}

/**
* @description api interface thunk voting post action dispatcher
* @param {string} id - a post id
* @param {string} vote - a post vote
* @param {function} dispatch - thunk for multi dispatching
* @fires {function} - api voting post then dispatch voting post action
*/
export const fetchCastPostVote = (id, vote) => dispatch => {
  API.castPostVote(id, vote)
    .then(res => res.json())
    .then(result => dispatch(castPostVote(result)))
}

/**
* @description api interface thunk creating post action dispatcher
* @param {string} title - a post title
* @param {string} author - a post author
* @param {string} body - a post body
* @param {string} cateogry - a post cateogry
* @param {function} dispatch - thunk for multi dispatching
* @fires {function} - api creating post then dispatch creating post action
*/
export const createPost = (title, author, body, category) => dispatch => {
  const id = uuidv4()
  const timestamp = Date.now()
  API.addPost(title, author, body, category, id, timestamp)
    .then(res => res.json())
    .then(result => dispatch(addPost(result)))
}

/**
* @description api interface thunk fetching post action dispatcher
* @param {string} cateogry - a post cateogry
* @param {function} dispatch - thunk for multi dispatching
* @fires {function} - api fetching posts then dispatch receive post action
*/
export const fetchPosts = (category) => dispatch => {
  if (category) {
    API.getCategoryPosts(category)
      .then(res => res.json())
      .then(result => dispatch(receivePosts(result)))
  } else {
    API.getPosts()
      .then(res => res.json())
      .then(result => dispatch(receivePosts(result)))
  }
}
