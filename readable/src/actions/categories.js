import { getCategories } from '../utils/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

/**
* @description Receive categories redux action creator
* @param {string} categories - a list of category objects
* @return {object} - redux action for receiving categories
*/
export const receiveCategories = (categories) => {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

/**
* @description Thunk action creator wrapper for receive categories
* @fires {function} - dispatches receiveCategories action creator after api call
*/
export const fetchCategories = () => dispatch => {
  getCategories().then(result => dispatch(receiveCategories(result.categories)))
}
