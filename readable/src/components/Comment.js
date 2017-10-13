import React from 'react'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import MdSettings from 'react-icons/lib/md/settings'
import '../stylesheets/comment.css'

/**
* @description Comment component
* @param {object} props - Contains the data of the comment
*/
const Comment = (props) => {
  return (
    <div className='comment'>
      <span className='comment-author'>{props.data.author}</span>
      <span className='comment-edit-button'><MdSettings className='gear' onClick={() => props.setEdit(props.data.id)}/></span>
      <br />
      <div className='comment-body'>
        {props.data.body}
      </div>
      <br />
      <span className='comment-score'>
        <FaThumbsODown className='hover-click' onClick={() => props.castCommentVote(props.data.id, 'downVote')}/>
        /
        <FaThumbsOUp className='hover-click' onClick={() => props.castCommentVote(props.data.id, 'upVote')}/>
        Score: {props.data.voteScore}
      </span>
    </div>
  )
}

export default Comment
