import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import * as PostActions from '../actions/posts'
import * as CategoryActions from '../actions/categories'
import '../stylesheets/post-form.css'

/**
* @description PostForm component
* @param {object} props - Props written in by redux
*/
class PostForm extends Component {
  state = {
    titleField: '',
    authorField: '',
    bodyField: '',
    categoryField: '',
    redirectAfterSubmit: null,
  }

  componentWillReceiveProps = () => {
    if (typeof this.props.data !== 'undefined') {
      this.setState({
        titleField: this.props.data.title,
        authorField: this.props.data.author,
        bodyField: this.props.data.body,
        categoryField: this.props.data.category,
      })
    }
  }

  /**
  * @description syncing state and form fields
  * @param {object} target - the target form field
  */
  updateForm = (target) => {
    this.setState({
      [target.name]: target.value,
    })
  }

  /**
  * @description handles the creation or updating of a post
  * @param {object} event - submit event
  */
  handleSubmit = (event) => {
    event.preventDefault()
    if (this.props.data) {
      this.props.updatePost(
        this.props.data.id,
        this.state.titleField,
        this.state.bodyField,
      )
      this.setState({
        redirectAfterSubmit: `/posts/${this.props.data.id}`
      })
    } else {
      this.props.createPost(
        this.state.titleField,
        this.state.authorField,
        this.state.bodyField,
        this.state.categoryField,
      )
      this.props.setCategoryAndPostList(this.state.categoryField)
      this.setState({
        redirectAfterSubmit: `/categories/${this.state.categoryField}`
      })
    }
  }

  /**
  * @description handles the deletion of a post
  * @param {object} event - button event
  */
  handleDelete = (event) => {
    event.preventDefault()
    this.props.deletePost(this.props.data.id)
    this.setState({
      redirectAfterSubmit: `/categories/${this.state.categoryField}`
    })
  }

  render = () => {
    if (this.state.redirectAfterSubmit) {
      return (<Redirect to={this.state.redirectAfterSubmit}/>)
    }
    return (
      <div className='post-form'>
        <Route exact path='/posts/:id/edit' render={() => (
          <h1 className='main-header'>
            Update Post
          </h1>
        )}/>
        <Route exact path='/posts/create' render={() => (
          <h1 className='main-header'>
            Create A Post
          </h1>
        )}/>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label>Title: </label><br />
          <input
            type='text'
            name='titleField'
            value={this.state.titleField}
            className='full-width-input'
            onChange={(event) => this.updateForm(event.target)}
          /><br />
          <Route exact path='/posts/create' render={() => (
            <div>
              <label>Author: </label><br />
              <input
                type='text'
                name='authorField'
                value={this.state.authorField}
                className='full-width-input'
                onChange={(event) => this.updateForm(event.target)}
              /><br />
            </div>
          )}/>
          <label>Body</label><br />
          <textarea
            name='bodyField'
            rows='10'
            value={this.state.bodyField}
            className='full-width-input'
            onChange={(event) => this.updateForm(event.target)}
          >
          </textarea><br />
          <Route exact path='/posts/create' render={() => (
            <div>
              <label>Category: </label><br />
              <select
                name='categoryField'
                value={this.state.categoryField}
                style={{marginBottom: '16px'}}
                onChange={(event) => this.updateForm(event.target)}
              >
                <option disabled value=''></option>
                {this.props.categories.map((category) => {
                  return (<option key={category.name} value={category.name}>{category.name}</option>)
                })}
              </select><br />
            </div>
          )}/>
          <input type='submit'/>
        </form>
        <Route exact path='/posts/:id/edit' render={() => (
          <button className='delete-post' onClick={(event) => this.handleDelete(event)}>Delete</button>
        )}/>
      </div>
    )
  }
}

/**
  * @description Writes the state to the PostForm component props
  * @param {object} state - Contains the book data of the book to add
  * @return {object} - contains props for the PostForm component
  */
const matchStateToProps = (state, ownProps) => {
  return {
    data: state.posts.postList.find(post => post.id === ownProps.match.params.id),
    categories: state.categories.categoryList,
  }
}

/**
  * @description Writes dispatchers to the PostForm component props
  * @param {object} dispatch - the dispatch function of redux
  * @return {object} - contains props for the PostForm component
  */
const matchDispatchToProps = (dispatch) => {
  return {
    createPost: (title, author, body, category) => dispatch(PostActions.createPost(title, author, body, category)),
    setCategoryAndPostList: (category) => dispatch(CategoryActions.setCategoryAndPostList(category)),
    updatePost: (id, title, body) => dispatch(PostActions.fetchUpdatePost(id, title, body)),
    deletePost: (id) => dispatch(PostActions.fetchDeletePost(id))
  }
}

export default connect(
  matchStateToProps,
  matchDispatchToProps,
)(PostForm)
