import {
  CommentBoxContainer,
  StyledCommentBox,
} from './styles/CommentBox.styled';
import { Button, AltButton, ButtonContainer } from './styles/Button.styled';

const CommentBox = ({ hideCommentBox }) => {
  return (
    <CommentBoxContainer>
      <div>
        <h5>Comments as $User$</h5>
      </div>
      <StyledCommentBox></StyledCommentBox>
      <ButtonContainer>
        <AltButton onClick={hideCommentBox}>Cancel</AltButton>
        <Button>Post</Button>
      </ButtonContainer>
    </CommentBoxContainer>
  );
};

export default CommentBox;
