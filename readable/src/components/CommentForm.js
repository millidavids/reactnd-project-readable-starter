import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as CommentActions from '../actions/comments'
import '../stylesheets/comment-form.css'

/**
* @description CommentForm component
* @param {object} props - Props written in by redux
*/
class CommentForm extends Component {
  state = {
    authorField: '',
    bodyField: ''
  }

  /**
  * @description syncing state and form fields
  * @param {object} target - target form field
  */
  updateForm = (target) => {
    this.setState({
      [target.name]: target.value
    })
  }

  /**
  * @description handles the creating of a comment
  * @param {object} event - submit event
  */
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.createComment(
      this.state.authorField,
      this.state.bodyField,
      this.props.parentId
    )
  }

  render = () => {
    return (
      <div className='comment-form'>
        <h4 className='left-header'>
          Add Comment
        </h4>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label>Author: </label><br />
          <input
            type='text'
            name='authorField'
            value={this.state.authorField}
            className='full-width-input'
            onChange={(event) => this.updateForm(event.target)}
          /><br />
          <label>Body</label><br />
          <textarea
            name='bodyField'
            rows='10'
            value={this.state.bodyField}
            className='full-width-input'
            onChange={(event) => this.updateForm(event.target)}
          >
          </textarea><br />
          <input type='submit'/>
        </form>
      </div>
    )
  }
}

/**
  * @description Writes the state to the CommentForm component props
  * @param {object} state - Contains the book data of the book to add
  * @return {object} - contains props for the CommentForm component
  */
const matchStateToProps = (state, ownProps) => {
  return {
  }
}

/**
  * @description Writes dispatchers to the CommentForm component props
  * @param {object} dispatch - the dispatch function of redux
  * @return {object} - contains props for the CommentForm component
  */
const matchDispatchToProps = (dispatch) => {
  return {
    createComment: (author, body, parentId) => dispatch(CommentActions.createComment(author, body, parentId)),
  }
}

export default connect(
  matchStateToProps,
  matchDispatchToProps,
)(CommentForm)
