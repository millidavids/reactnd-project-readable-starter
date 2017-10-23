import React from 'react'
import '../stylesheets/post-card.css'
import { Link } from 'react-router-dom'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import MdSettings from 'react-icons/lib/md/settings'

/**
* @description PostCard component
* @param {object} props - Contains data of the PostCard
*/
const PostCard = (props) => {
  return (
    <div className='post-card'>
      <div className='post-card-title'>
        <Link key={props.data.id} to={`/posts/${props.data.id}`}>
          {props.data.title}
        </Link>
        <span className='post-edit-link push-right'>
          <Link to={`/posts/${props.data.id}/edit`}>
            <MdSettings className='gear'/>
          </Link>
        </span>
      </div>
      <span>- {props.data.author}</span>
      <hr/>
      <div className='post-card-body'>{props.data.body}</div>
      <hr/>
      <div className='post-card-footer'>
        <span className='post-score'>
          <FaThumbsODown className='hover-click' onClick={() => props.castPostVote(props.data.id, 'downVote')}/>
          /
          <FaThumbsOUp className='hover-click' onClick={() => props.castPostVote(props.data.id, 'upVote')}/>
          Score: {props.data.voteScore}
        </span>
        <span className='post-card-comment-count'>Comment Count: {props.data.commentCount}</span>
        <span className='post-card-time'>
          {(new Date(props.data.timestamp * 1000)).toString()}
        </span>
      </div>
    </div>
  )
}

export default PostCard
