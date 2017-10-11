import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as CommentActions from '../actions/comments'
import '../stylesheets/comment-edit.css'

/**
* @description CommentEdit component
* @param {object} props - Props written in by redux and a post
*/
class CommentEdit extends Component {
  state = {
    bodyField: ''
  }

  /**
  * @description syncing state and form fields
  * @param {object} target - target input field
  */
  updateForm = (target) => {
    this.setState({
      [target.name]: target.value,
    })
  }

  /**
  * @description handles the submitting of the form
  * @param {object} event - submit event
  */
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.updateComment(
      this.props.id,
      this.state.bodyField
    )
    this.props.setEdit(null)
  }

  /**
  * @description handles deleting of a comment
  * @param {object} event - button event
  */
  handleDelete = (event) => {
    event.preventDefault()
    this.props.deleteComment(this.props.id)
    this.props.setEdit(null)
  }

  render = () => {
    return (
      <div className='comment-edit'>
        <form onSubmit={(event) => this.handleSubmit(event)}>
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
        <button onClick={(event) => this.props.setEdit(null)}>Cancel</button>
        <button className='delete-comment' onClick={(event) => this.handleDelete(event)}>Delete</button>
      </div>
    )
  }
}

/**
  * @description Writes the state to the CommentEdit component props
  * @param {object} state - Contains the book data of the book to add
  * @return {object} - contains props for the CommentEdit component
  */
const matchStateToProps = (state, ownProps) => {
  return {
    data: state.comments.commentList.find(comment => comment.id === ownProps.id)
  }
}

/**
  * @description Writes dispatchers to the CommentEdit component props
  * @param {object} dispatch - the dispatch function of redux
  * @return {object} - contains props for the CommentEdit component
  */
const matchDispatchToProps = (dispatch) => {
  return {
    updateComment: (id, body) => dispatch(CommentActions.fetchUpdateComment(id, body)),
    deleteComment: (id) => dispatch(CommentActions.fetchDeleteComment(id))
  }
}

export default connect(
  matchStateToProps,
  matchDispatchToProps,
)(CommentEdit)
