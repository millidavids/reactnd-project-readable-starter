import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import MdSettings from 'react-icons/lib/md/settings'
import * as CommentActions from '../actions/comments'
import * as PostActions from '../actions/posts'
import CommentForm from './CommentForm'
import CommentEdit from './CommentEdit'
import Comment from './Comment'
import '../stylesheets/post.css'

/**
* @description Post component
* @param {object} props - Contains the book data, handleUpdate function, and the current bookshelf
*/
class Post extends Component {
  state = {
    editingComment: null
  }

  componentDidMount = () => {
    this.props.getPostComments(this.props.match.params.id)
  }

  /**
  * @description sets the current comment being edited
  * @param {string} id - id of the comment being edited
  */
  setEditingComment = (id) => {
    this.setState({
      editingComment: id
    })
  }

  render = () => {
    const commentItems = this.props.commentList.map((comment, index) => {
      const listItem = (comment.id === this.state.editingComment) ?
          <li key={'comment-item-' + index} className='comment-item'>        
            <CommentEdit setEdit={this.setEditingComment} id={comment.id}/>
          </li>
        :
          <li key={'comment-item-' + index} className='comment-item'>
            <Comment setEdit={this.setEditingComment} castCommentVote={this.props.castCommentVote} data={comment}/>
          </li>
      return listItem
    })
    return (
      <div className='post'>
        {this.props.data &&
          <div className='post-content'>
            <span className='post-edit-link'>
              <Link to={`/posts/${this.props.data.id}/edit`}>
                <MdSettings className='gear'/>
              </Link>
            </span>
            <h1 className='main-header'>{this.props.data.title}</h1>
            <h3 className='author-header'>- {this.props.data.author}</h3>
            <hr />
            <div className='post-body'>
              {this.props.data.body}
            </div>
            <hr />
            <div className='post-footer'>
              <span className='post-score'>
                <FaThumbsODown className='hover-click' onClick={() => this.props.castPostVote(this.props.data.id, 'downVote')}/>
                /
                <FaThumbsOUp className='hover-click' onClick={() => this.props.castPostVote(this.props.data.id, 'upVote')}/>
                Score: {this.props.data.voteScore}
              </span>
              <span className='post-time'>
                {(new Date(this.props.data.timestamp * 1000)).toString()}
              </span>
            </div>
            <h3 className='left-header'>
              Comments ({commentItems.length})
            </h3>
            <ul className='post-comment-list'>
              {commentItems}
            </ul>
            <div className='post-comment-form-wrapper'>
              <CommentForm parentId={this.props.data.id}/>
            </div>
          </div>
        }
      </div>
    )
  }
}

/**
  * @description Writes the state to the Post component props
  * @param {object} state - Contains the book data of the book to add
  * @return {object} - contains props for the Post component
  */
const matchStateToProps = (state, ownProps) => {
  return {
    data: state.posts.postList.find(post => post.id === ownProps.match.params.id),
    commentList: state.comments.commentList.filter((comment) => !comment.deleted),
  }
}

/**
  * @description Writes dispatchers to the Post component props
  * @param {object} dispatch - the dispatch function of redux
  * @return {object} - contains props for the Post component
  */
const matchDispatchToProps = (dispatch) => {
  return {
    getPostComments: (id) => dispatch(CommentActions.fetchPostComments(id)),
    castPostVote: (id, vote) => dispatch(PostActions.fetchCastPostVote(id, vote)),
    castCommentVote: (id, vote) => dispatch(CommentActions.fetchCastCommentVote(id, vote)),
  }
}

export default connect(
  matchStateToProps,
  matchDispatchToProps,
)(Post)
