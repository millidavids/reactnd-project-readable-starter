import * as CategoryActions from '../actions/categories'

/**
* @description Categories redux reducer
* @param {array} state - the previous state of the cateogires
* @param {object} action - the action object which is modifying the state
* @return {array} - the new state
*/
export const categories = (state = [], action) => {
  switch (action.type) {
    case CategoryActions.RECEIVE_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
