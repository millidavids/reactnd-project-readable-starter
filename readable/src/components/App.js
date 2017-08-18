import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/categories'
import * as Api from '../utils/api'

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

const matchStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(fetchCategories())
  }
}

export default connect(
  matchStateToProps,
  matchDispatchToProps,
)(App)
