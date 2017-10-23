import uuidv4 from 'uuid/v4'
import * as API from '../utils/api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SET_POST_SORT = 'SET_POST_SORT'
export const SET_SORT_DIRECTION = 'SET_SORT_DIRECTION'
export const ADD_POST = 'ADD_POST'
export const CAST_POST_VOTE = 'CAST_POST_VOTE'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const SET_COMMENT_COUNT = 'SET_COMMENT_COUNT'

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
* @description sets the comment count for a post
* @param {string} id - a deleted post id
* @param {string} count - a comment count for that post
* @return {object} - redux action for setting the comment count for a post
*/
export const setCommentCount = (id, count) => {
  return {
    type: SET_COMMENT_COUNT,
    id: id,
    count: count
  }
}

/**
* @description sets the post list and all comment counts for the posts
* @param {object} posts - all of the posts
* @return {object} - dispatching thunk action for setting comment count and post list
*/
export const setCommentCountAndPostList = (posts) => dispatch => {
  dispatch(receivePosts(posts))
  posts.forEach((post) => {
    dispatch(fetchCommentCount(post.id))
  })
}

/**
* @description fetches the comment count for the api
* @param {string} id - id of the post
* @param {function} dispatch - thunk for multi dispatching
* @fires {function} - api get post comments then dispatch set comment count and post list comment action
*/
export const fetchCommentCount = (id) => dispatch => {
  API.getPostComments(id)
    .then(res => res.json())
    .then(result => dispatch(setCommentCount(id, result.length)))
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
      .then(result => dispatch(setCommentCountAndPostList(result)))
  }
}
