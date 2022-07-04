import {
  StyledComment,
  StyledCommentBottom,
  Replies,
  ShowRepliesButton,
} from './styles/Comments.styled';
import { StyledCardTop } from './styles/Card.styled';
import { formatDate, vote } from '../helpers/helpers';
import CommentBox from './CommentBox';
import { useAuth } from '../AuthContext';
import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from '@firebase/firestore';

const Comment = ({
  comment,
  renderReplies,
  commentBox,
  commentToReply,
  showCommentBox,
  hideCommentBox,
  isLoading,
  submitReply,
}) => {
  const { currentUser } = useAuth();
  const [showReplies, setShowReplies] = useState(false);
  const [isCollapsed, toggleCollapseStatus] = useState(false);
  const [currentVotes, setVotes] = useState(() => comment.votes);
  const [upvote, toggleUpvote] = useState();
  const [downvote, toggleDownvote] = useState();

  useEffect(() => {
    const getVote = async () => {
      try {
        const db = getFirestore();
        const colRef = collection(db, comment.path, 'votes');
        const snapshot = await getDocs(colRef);
        const isVoted = snapshot.docs.find(
          (doc) => doc.data().uid === currentUser.uid
        );
        if (!isVoted) {
          toggleUpvote(false);
          toggleDownvote(false);
        } else if (isVoted.data().vote === 1) {
          toggleUpvote(true);
        } else {
          toggleDownvote(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getVote();
  }, [currentUser]);

  const shrinkReplies = (e) => {
    const parentComment = e.currentTarget.parentNode.parentNode;
    const hasReplies = [...parentComment.childNodes].find((child) =>
      child.classList.contains('replies')
    );

    if (hasReplies) {
      setShowReplies(true);
      toggleCollapseStatus(true);
    }
  };

  const growReplies = () => {
    setShowReplies(false);
    toggleCollapseStatus(false);
  };

  const handleClick = async (value) => {
    try {
      const newValue = await vote(comment.path, currentUser.uid, value);
      if (value === 1) {
        toggleUpvote(!upvote);
        toggleDownvote(false);
      } else {
        toggleDownvote(!downvote);
        toggleUpvote(false);
      }
      console.log(newValue);
      setVotes((prevValue) => prevValue + newValue);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <StyledComment>
      <div>
        <StyledCardTop>
          <h5>{comment.author}</h5>
          <div>
            <span>.</span>
          </div>
          <p>{formatDate(comment.date.toDate())}</p>
        </StyledCardTop>
        <div
          className="thread-line"
          onClick={(e) => shrinkReplies(e, comment.id)}
        ></div>
        <div className="container">
          <div className="content">
            <p>{comment.content}</p>
          </div>
          <StyledCommentBottom>
            <button
              className={upvote ? 'up' : null}
              onClick={() => handleClick(1)}
            >
              <i className="las la-caret-up"></i>
            </button>
            <p>{currentVotes}</p>
            <button
              className={downvote ? 'down' : null}
              onClick={() => handleClick(-1)}
            >
              <i className="las la-caret-down"></i>
            </button>
            <button id={comment.id} onClick={showCommentBox}>
              <i className="las la-comment-alt"></i>
              <p>Reply</p>
            </button>
          </StyledCommentBottom>
        </div>
      </div>
      {commentBox && comment.id === commentToReply && currentUser && (
        <CommentBox
          hideCommentBox={hideCommentBox}
          submitReply={submitReply}
          path={comment.path}
          isLoading={isLoading}
        ></CommentBox>
      )}
      {showReplies && isCollapsed && (
        <ShowRepliesButton onClick={(e) => growReplies(e, comment.id)}>
          Show {comment.replies.length} Replies
        </ShowRepliesButton>
      )}
      {comment.replies.length > 0 ? (
        <Replies className={`replies ${isCollapsed ? 'hidden' : null}`}>
          {renderReplies(comment.replies)}
        </Replies>
      ) : null}
    </StyledComment>
  );
};

export default Comment;
