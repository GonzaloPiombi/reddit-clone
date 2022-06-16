import {
  CommentBoxContainer,
  StyledCommentBox,
} from './styles/CommentBox.styled';
import { Button } from './styles/Button.styled';

const CommentBox = () => {
  return (
    <CommentBoxContainer>
      <div>
        <h5>Comments as $User$</h5>
      </div>
      <StyledCommentBox></StyledCommentBox>
      <div>
        <Button>Post</Button>
      </div>
    </CommentBoxContainer>
  );
};

export default CommentBox;
