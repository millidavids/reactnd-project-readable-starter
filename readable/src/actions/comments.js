import uuidv4 from 'uuid/v4'
import * as API from '../utils/api'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const CAST_COMMENT_VOTE = 'CAST_COMMENT_VOTE'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

/**
* @description Receive comments redux action creator
* @param {string} comments - a list of comment objects
* @return {object} - redux action for receiving comments
*/
export const receiveComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  }
}

/**
* @description Add comments redux action creator
* @param {string} comment - a new comment
* @return {object} - redux action for adding comments
*/
export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

/**
* @description cast comment vote comments redux action creator
* @param {string} commens - an updated comment
* @return {object} - redux action for casting a comment vote
*/
export const castCommentVote = (comment) => {
  return {
    type: CAST_COMMENT_VOTE,
    comment,
  }
}

/**
* @description update comments redux action creator
* @param {string} comment - an updated comment
* @return {object} - redux action for updating a comment
*/
export const updateComment = (comment) => {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

/**
* @description delete comment redux action creator
* @param {string} id - a comment id
* @return {object} - redux action for deleting a comment
*/
export const deleteComment = (id) => {
  return {
    type: DELETE_COMMENT,
    id
  }
}

/**
* @description api interface thunk delete comment action dispatcher
* @param {string} id - a comment id
* @param {function} dispatch - thunk for multi dispatching
* @fires {function} - api delete comment then dispatch delete comment action
*/
export const fetchDeleteComment = (id) => dispatch => {
  API.deleteComment(id)
    .then(res => dispatch(deleteComment(id)))
}

/**
* @description api interface thunk update comment action dispatcher
* @param {string} id - a comment id
* @param {string} body - a comment body
* @param {function} dispatch - thunk for multi dispatching
* @fires {function} - api update comment then dispatch update comment action
*/
export const fetchUpdateComment = (id, body) => dispatch => {
  const timestamp = Date.now()
  API.updateComment(id, body, timestamp)
    .then(res => res.json())
    .then(result => dispatch(updateComment(result)))
}

/**
* @description api interface thunk vote comment action dispatcher
* @param {string} id - a comment id
* @param {string} vote - a comment vote
* @param {function} dispatch - thunk for multi dispatching
* @fires {function} - api vote comment then dispatch vote comment action
*/
export const fetchCastCommentVote = (id, vote) => dispatch => {
  API.castCommentVote(id, vote)
    .then(res => res.json())
    .then(result => dispatch(castCommentVote(result)))
}

/**
* @description api interface thunk create comment action dispatcher
* @param {string} author - a comment id
* @param {string} body - a comment body
* @param {string} parentId - a comment parent post id
* @param {function} dispatch - thunk for multi dispatching
* @fires {function} - api create comment then dispatch create comment action
*/
export const createComment = (author, body, parentId)=> dispatch => {
  const id = uuidv4()
  const timestamp = Date.now()
  API.addComment(author, body, parentId, id, timestamp)
    .then(res => res.json())
    .then(result => dispatch(addComment(result)))
}

/**
* @description api interface thunk post comments action dispatcher
* @param {string} id - a post id
* @param {function} dispatch - thunk for multi dispatching
* @fires {function} - api fetch post comments then dispatch receive comments action
*/
export const fetchPostComments = (id) => dispatch => {
  API.getPostComments(id)
    .then(res => res.json())
    .then(result => dispatch(receiveComments(result)))
}
