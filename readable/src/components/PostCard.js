import React from 'react'
import '../stylesheets/post-card.css'
import { Link } from 'react-router-dom'

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
      </div>
      <span>- {props.data.author}</span>
      <hr/>
      <div className='post-card-body'>{props.data.body}</div>
      <hr/>
      <div className='post-card-footer'>
        <span className='post-card-score'>Score: {props.data.voteScore}</span>
        <span className='post-card-time'>
          {(new Date(props.data.timestamp * 1000)).toString()}
        </span>
      </div>
    </div>
  )
}

export default PostCard
