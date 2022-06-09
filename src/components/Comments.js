import {
  StyledCommentSection,
  StyledComment,
  StyledCommentBottom,
  Replies,
} from './styles/Comments.styled';
import { StyledCardTop } from './styles/Card.styled';
import { formatDate } from '../helpers/helpers';

const Comments = ({ comments }) => {
  const renderReplies = (replies) => {
    return <Comments comments={replies} />;
  };

  return (
    <StyledCommentSection>
      {comments.map((comment) => {
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
              <div className="thread-line"></div>
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
            {comment.replies.length > 0 ? (
              <Replies>{renderReplies(comment.replies)}</Replies>
            ) : null}
          </StyledComment>
        );
      })}
    </StyledCommentSection>
  );
};

export default Comments;
