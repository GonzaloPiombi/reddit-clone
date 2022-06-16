import styled from 'styled-components';
import Container from './Container.styled';

const CommentBoxContainer = styled(Container)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  & button {
    display: block;
    margin: 0 34px 20px auto;
  }

  & > div:last-child {
    border-bottom: solid 1px #ccc;
    margin: 0 auto;
    width: 600px;
  }
`;

const StyledCommentBox = styled.textarea`
  border: solid 1px #ccc;
  border-radius: 4px;
  color: #1c1c1c;
  display: block;
  line-height: 1.5;
  margin: auto auto 20px;
  outline: none;
  height: 150px;
  padding: 5px 10px;
  width: 600px;

  &:focus {
    border: solid 1px #6c6c6c;
  }
`;

export { CommentBoxContainer, StyledCommentBox };