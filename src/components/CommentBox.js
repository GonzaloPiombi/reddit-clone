import {
  CommentBoxContainer,
  StyledCommentBox,
} from './styles/CommentBox.styled';
import { Button, AltButton, AltButtonContainer } from './styles/Button.styled';
import { useAuth } from '../AuthContext';
import Loader from './Loader';

const CommentBox = ({
  hideCommentBox,
  submitComment,
  submitReply,
  path,
  isLoading,
}) => {
  const { currentUsername } = useAuth();

  const deleteComment = (e) => {
    e.target.parentNode.previousSibling.value = '';
  };

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
        <StyledCommentBox
          name="content"
          required
          placeholder="Markdown is enabled!"
        ></StyledCommentBox>
        {isLoading ? (
          <Loader />
        ) : (
          <AltButtonContainer>
            <AltButton
              type="button"
              onClick={hideCommentBox ? hideCommentBox : deleteComment}
            >
              Cancel
            </AltButton>
            <Button type="submit">Post</Button>
          </AltButtonContainer>
        )}
      </form>
    </CommentBoxContainer>
  );
};

export default CommentBox;
