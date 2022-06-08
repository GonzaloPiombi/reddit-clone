import {
  StyledCommentSection,
  StyledComment,
  CommentTop,
} from './styles/Comments.styled';
import { formatDate } from '../helpers/helpers';

const Comments = ({ comments }) => {
  console.log(comments);
  return (
    <StyledCommentSection>
      {comments.map((comment) => {
        return (
          <StyledComment>
            <CommentTop>
              <h5>{comment.author}</h5>
              <span>.</span>
              <p>{formatDate(comment.date.toDate())}</p>
            </CommentTop>
            <div>
              <p>{comment.content}</p>
            </div>
            <div>
              <p>{comment.votes}</p>
              <button>Reply</button>
            </div>
          </StyledComment>
        );
      })}
    </StyledCommentSection>
  );
};

export default Comments;
