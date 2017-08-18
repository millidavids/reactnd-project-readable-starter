import * as CategoryActions from '../actions/categories'

export const categories = (state = [], action) => {
  switch (action.type) {
    case CategoryActions.RECEIVE_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
