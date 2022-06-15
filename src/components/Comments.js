import { useState } from 'react';
import {
  StyledCommentSection,
  StyledComment,
  StyledCommentBottom,
  Replies,
  ShowRepliesButton,
  NoComments,
} from './styles/Comments.styled';
import { StyledCardTop } from './styles/Card.styled';
import { formatDate } from '../helpers/helpers';
import Loader from './Loader';

const Comments = ({ comments, status }) => {
  const [showReplies, setShowReplies] = useState(false);

  const renderReplies = (replies) => {
    return <Comments comments={replies} status={status} />;
  };

  const shrinkReplies = (e) => {
    const parentComment = e.target.parentNode.parentNode;
    const hasReplies = [...parentComment.childNodes].find((child) =>
      child.classList.contains('replies')
    );

    if (hasReplies) {
      hasReplies.classList.toggle('hidden');
      setShowReplies(!showReplies);
    }
  };

  const growReplies = (e) => {
    e.target.nextSibling.classList.remove('hidden');
    setShowReplies(false);
  };

  if (!status) {
    return (
      <StyledCommentSection>
        <NoComments>
          <Loader />
        </NoComments>
      </StyledCommentSection>
    );
  }

  return (
    <StyledCommentSection>
      {comments.length === 0 ? (
        <NoComments>
          <p>No Comments Yet</p>
        </NoComments>
      ) : (
        comments.map((comment) => {
          return (
            <StyledComment key={comment.id}>
              <div>
                <StyledCardTop>
                  <h5>{comment.author}</h5>
                  <div>
                    <span>.</span>
                  </div>
                  <p>{formatDate(comment.date.toDate())}</p>
                </StyledCardTop>
                <div className="thread-line" onClick={shrinkReplies}></div>
                <div className="container">
                  <div className="content">
                    <p>{comment.content}</p>
                  </div>
                  <StyledCommentBottom>
                    <button>
                      <i className="las la-caret-up"></i>
                    </button>
                    <p>{comment.votes}</p>
                    <button>
                      <i className="las la-caret-down"></i>
                    </button>
                    <button>
                      <i className="las la-comment-alt"></i>
                      <p>Reply</p>
                    </button>
                  </StyledCommentBottom>
                </div>
              </div>
              {comment.replies.length > 0 && showReplies && (
                <ShowRepliesButton onClick={growReplies}>
                  Show {comment.replies.length} Replies
                </ShowRepliesButton>
              )}
              {comment.replies.length > 0 ? (
                <Replies className="replies">
                  {renderReplies(comment.replies)}
                </Replies>
              ) : null}
            </StyledComment>
          );
        })
      )}
    </StyledCommentSection>
  );
};

export default Comments;
