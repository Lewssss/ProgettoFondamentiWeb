import React from 'react';
import { useContext } from 'react';
import {postsContext} from '../Context/PostsContext'
import { fileUrl } from '../api/config'

function Comment({comment, replies, handleCommentReply}){
    const {PublishedOn} = useContext(postsContext);
    return(
        <React.Fragment key={comment.id}>
            <div className="comment">
                <img src={fileUrl(comment.author.profilePicture)} alt="" referrerPolicy="no-referrer" />
                <p className="username">{comment.author.username}:</p>
                <p className="text">{comment.text}</p>
                <p className="reply" onClick={() => handleCommentReply(comment)}>Rispondi</p>
                <p className="publishedOn">{PublishedOn(comment.date)}</p>
            </div>
            {replies.map((commentReply) => (
                <div key={commentReply.id} className="comment comment-replyTo">
                    <img src={fileUrl(commentReply.author.profilePicture)} alt="" referrerPolicy="no-referrer" />
                    <p className="username">{commentReply.author.username}:</p>
                    <p className="text">{commentReply.text}</p>
                </div>
            ))
            }
        </React.Fragment>
    );
}
export default Comment;