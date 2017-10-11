import { getCategories } from '../utils/api'
import { fetchPosts } from './posts'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const SET_CATEGORY = 'SET_CATEGORY'

/**
* @description Receive categories redux action creator
* @param {string} categoryList - a list of category objects
* @return {object} - redux action for receiving categories
*/
export const receiveCategories = (categoryList) => {
  return {
    type: RECEIVE_CATEGORIES,
    categoryList,
  }
}

/**
* @description Set categories redux action creator
* @param {string} category - a specific category of posts
* @return {object} - redux action for receiving categories
*/
export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    category
  }
}

/**
* @description dispatches the setCategory and fetchPosts actions
* @param {string} category - a list of category objects
* @param {function} dispatch - thunk for multi dispatching
* @return {object} - redux action for receiving categories
*/
export const setCategoryAndPostList = (category) => dispatch => {
  dispatch(fetchPosts(category))
  dispatch(setCategory(category))
}

/**
* @description Thunk action creator wrapper for receive categories
* @param {function} dispatch - thunk for multi dispatching
* @fires {function} - dispatches receiveCategories action creator after api call
*/
export const fetchCategories = () => dispatch => {
  getCategories()
    .then(res => res.json())
    .then(result => dispatch(receiveCategories(result.categories)))
}
