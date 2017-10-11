import * as CommentActions from '../actions/comments'

const defaultCommentsState = {
  commentList: [],
}

/**
* @description Comment redux reducer
* @param {array} state - the previous state of the comments
* @param {object} action - the action object which is modifying the state
* @return {array} - the new state
*/
export const comments = (state = defaultCommentsState, action) => {
  switch (action.type) {
    case CommentActions.RECEIVE_COMMENTS:
      return {
        ...state,
        commentList: action.comments,
      }
    case CommentActions.ADD_COMMENT:
      return {
        ...state,
        commentList: state.commentList.concat(action.comment)
      }
    case CommentActions.UPDATE_COMMENT:
    case CommentActions.CAST_COMMENT_VOTE:
      return {
        ...state,
        commentList: state.commentList.map((comment) => {
          return (comment.id === action.comment.id) ? action.comment : comment
        })
      }
    case CommentActions.DELETE_COMMENT:
      return {
        ...state,
        commentList: state.commentList.map((comment) => {
          if (comment.id === action.id) {
            comment.deleted = true
          }
          return comment
        })
      }
    default:
      return state
  }
}
