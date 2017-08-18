import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/categories'
import * as Api from '../utils/api'

/**
* @description App component
* @param {object} props - Props written in by redux
*/
class App extends Component {
  componentWillMount = () => {
  }

  render = () => {
    return (
      <div className='app'>
      </div>
    )
  }
}

/**
  * @description Writes the state to the App component props
  * @param {object} state - Contains the book data of the book to add
  * @return {object} - contains props for the App component
  */
const matchStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

/**
  * @description Writes dispatchers to the App component props
  * @param {object} dispatch - the dispatch function of redux
  * @return {object} - contains props for the App component
  */
const matchDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(fetchCategories())
  }
}

export default connect(
  matchStateToProps,
  matchDispatchToProps,
)(App)
