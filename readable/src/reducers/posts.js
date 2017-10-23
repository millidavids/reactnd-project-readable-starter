import * as PostActions from '../actions/posts'

const defaultPostsState = {
  postList: [],
  sortBy: 'voteScore',
  sortDirection: 1,
}

/**
* @description Post redux reducer
* @param {array} state - the previous state of the posts
* @param {object} action - the action object which is modifying the state
* @return {array} - the new state
*/
export const posts = (state = defaultPostsState, action) => {
  switch (action.type) {
    case PostActions.RECEIVE_POSTS:
      return {
        ...state,
        postList: action.posts.sort((a, b) => compare(a, b, state.sortBy, state.sortDirection)),
      }
    case PostActions.SET_POST_SORT:
      return {
        ...state,
        postList: state.postList.sort((a, b) => compare(a, b, action.sortBy, state.sortDirection)),
        sortBy: action.sortBy,
      }
    case PostActions.SET_SORT_DIRECTION:
      return {
        ...state,
        postList: state.postList.sort((a, b) => compare(a, b, state.sortBy, action.sortDirection)),
        sortDirection: action.sortDirection,
      }
    case PostActions.ADD_POST:
      return {
        ...state,
        postList: state.postList.concat(action.post).sort((a, b) => compare(a, b, state.sortBy, state.sortDirection))
      }
    case PostActions.UPDATE_POST:
    case PostActions.CAST_POST_VOTE:
      return {
        ...state,
        postList: state.postList.map((post) => {
          return (post.id === action.post.id) ? action.post : post
        })
      }
    case PostActions.DELETE_POST:
      return {
        ...state,
        postList: state.postList.map((post) => {
          if (post.id === action.id) {
            post.deleted = true
          }
          return post
        })
      }
    case PostActions.SET_COMMENT_COUNT:
      return {
        ...state,
        postList: state.postList.map((post) => {
          if (post.id === action.id) {
            post.commentCount = action.count
          }
          return post
        })
      }
    default:
      return state
  }
}

/**
* @description Sort compare function
* @param {object} a - First object to compare
* @param {object} b - Second object to compare
* @param {string} filter - property of the object to sort by
* @param {integer} direction - can reverse the direction of the sort
*/
const compare = (a, b, filter, direction = 1) => {
  if ( a[filter] > b[filter]) {
    return 1 * direction
  } else if (a[filter] < b[filter]) {
    return -1 * direction
  }
  return 0
}
