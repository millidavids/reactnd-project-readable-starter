import * as CategoryActions from '../actions/categories'

const defaultCategoriesState = {
  categoryList: [],
  currentCategory: null
}

/**
* @description Category redux reducer
* @param {array} state - the previous state of the cateogires
* @param {object} action - the action object which is modifying the state
* @return {array} - the new state
*/
export const categories = (state = defaultCategoriesState, action) => {
  switch (action.type) {
    case CategoryActions.RECEIVE_CATEGORIES:
      return {
        ...state,
        categoryList: action.categoryList,
      }
    case CategoryActions.SET_CATEGORY:
       return {
        ...state,
        currentCategory: action.category,
      }
    default:
      return state
  }
}
