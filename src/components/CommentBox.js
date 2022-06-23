import {
  CommentBoxContainer,
  StyledCommentBox,
} from './styles/CommentBox.styled';
import { Button, AltButton, ButtonContainer } from './styles/Button.styled';
import { useAuth } from '../AuthContext';

const CommentBox = ({ hideCommentBox, submitComment, submitReply, path }) => {
  const { currentUsername } = useAuth();

  return (
    <CommentBoxContainer>
      <div>
        <h5>Comment as {currentUsername}</h5>
      </div>
      <form
        onSubmit={
          submitReply
            ? (e) => submitReply(e, e.target.content.value, path)
            : (e) => submitComment(e, e.target.content.value)
        }
      >
        <StyledCommentBox name="content" required></StyledCommentBox>
        <ButtonContainer>
          <AltButton type="button" onClick={hideCommentBox}>
            Cancel
          </AltButton>
          <Button type="submit">Post</Button>
        </ButtonContainer>
      </form>
    </CommentBoxContainer>
  );
};

export default CommentBox;
