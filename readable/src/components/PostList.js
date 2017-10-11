import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PostActions from '../actions/posts'
import PostCard from './PostCard'
import '../stylesheets/post-list.css'

/**
* @description PostList component
* @param {object} props - Props written in by redux
*/
class PostList extends Component {
  render = () => {
    return (
      <div className='post-list'>
        <h1 className='main-header'>
          {this.props.currentCategory}
        </h1>
        <ul>
          {this.props.postList.map((post, index) => {
            return <li key={index}><PostCard data={post}/></li>
          })}
        </ul>
      </div>
    )
  }
}

/**
  * @description Writes the state to the PostList component props
  * @param {object} state - Contains the book data of the book to add
  * @return {object} - contains props for the PostList component
  */
const matchStateToProps = (state) => {
  return {
    currentCategory: state.categories.currentCategory,
    postList: state.posts.postList.filter((post) => !post.deleted),
    sortBy: state.posts.sortBy,
    sortDirection: state.posts.sortDirection,
  }
}

/**
  * @description Writes dispatchers to the PostList component props
  * @param {object} dispatch - the dispatch function of redux
  * @return {object} - contains props for the PostList component
  */
const matchDispatchToProps = (dispatch) => {
  return {
    getPosts: (category) => dispatch(PostActions.fetchPosts(category)),
  }
}

export default connect(
  matchStateToProps,
  matchDispatchToProps,
)(PostList)
