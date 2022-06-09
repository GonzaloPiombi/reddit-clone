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
              <div>
                <p>{comment.content}</p>
              </div>
              <StyledCommentBottom>
                <p>{comment.votes}</p>
                <button>Reply</button>
              </StyledCommentBottom>
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
