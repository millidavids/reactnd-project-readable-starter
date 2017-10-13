import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as CategoryActions from '../actions/categories'
import * as PostActions from '../actions/posts'
import PostList from './PostList'
import PostForm from './PostForm'
import Post from './Post'
import '../stylesheets/app.css'

/**
* @description App component
* @param {object} props - Props written in by redux
*/
class App extends Component {
  componentWillMount = () => {
    this.unsubscribeFromHistory = this.props.history.listen(this.handleLocationChange);
    this.handleLocationChange(this.props.history.location);
    this.props.getCategories()
  }

  componentWillUnmount = () => {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
  }

  /**
  * @description handles location change, pseudo routing
  * @param {object} location - location of the window
  */
  handleLocationChange = (location) => {
    if (location.pathname.replace(/^\/([^\/]*).*$/, '$1') === 'categories') {
      this.props.setCategoryAndPostList(location.pathname.replace(/^(?:[^/]*\/){2}([^\/]*).*$/, '$1'))
    } else {
      this.props.setCategoryAndPostList(null)
    }
  }

  render = () => {
    return (
      <div className='app'>
        <ul className='sidenav'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/posts/create'>Add A Post</Link></li>
          <li>
            <div className='dropdown'>
              <button className='dropbtn'>Category</button>
              <div className='dropdown-content'>
                {this.props.categories.map((category, index) => {
                  return (
                    <Link
                      className={this.props.currentCategory === category.name ? 'path-match' : ''}
                      key={category.name}
                      to={`/categories/${category.path}`}
                    >
                      {category.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          </li>
          <li>
            <Route path='/(categories|)/' render={() => (
              <div className='dropdown'>
                <button className='dropbtn'>Sort By</button>
                <div className='dropdown-content'>
                  <a onClick={() => this.props.setSortDirection(1)} className={this.props.sortDirection === 1 ? 'path-match' : ''}>Ascending</a>
                  <a onClick={() => this.props.setSortDirection(-1)} className={this.props.sortDirection === -1 ? 'path-match' : ''}>Descending</a>
                  <hr />
                  <a onClick={() => this.props.setPostSort('voteScore')} className={this.props.sortBy === 'voteScore' ? 'path-match' : ''}>Vote Score</a>
                  <a onClick={() => this.props.setPostSort('timestamp')} className={this.props.sortBy === 'timestamp' ? 'path-match' : ''}>Timestamp</a>
                </div>
              </div>
            )}/>
          </li>
        </ul>
        <div className='content-body'>
          <Route exact path='/' render={() =><h1 className='main-header'>All Posts</h1>} />
          <Route path='/(categories|)/' component={PostList} />
          <Route exact path='/posts/:id' component={Post}/>
          <Route exact path='/posts/:id/edit' component={PostForm}/>
          <Route exact path='/posts/create' component={PostForm}/>
        </div>
      </div>
    )
  }
}

/**
  * @description Writes the state to the App component props
  * @param {object} state - Contains the book data of the book to add
  * @return {object} - contains props for the App component
  */
const matchStateToProps = (state, ownProps) => {
  return {
    categories: state.categories.categoryList,
    currentCategory: state.categories.currentCategory,
    postList: state.posts.postList,
    sortBy: state.posts.sortBy,
    sortDirection: state.posts.sortDirection,
  }
}

/**
  * @description Writes dispatchers to the App component props
  * @param {object} dispatch - the dispatch function of redux
  * @return {object} - contains props for the App component
  */
const matchDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(CategoryActions.fetchCategories()),
    setCategoryAndPostList: (category) => dispatch(CategoryActions.setCategoryAndPostList(category)),
    setPostSort: (sortBy) => dispatch(PostActions.setPostSort(sortBy)),
    setSortDirection: (sortDirection) => dispatch(PostActions.setSortDirection(sortDirection)),
  }
}

export default connect(
  matchStateToProps,
  matchDispatchToProps,
)(App)
