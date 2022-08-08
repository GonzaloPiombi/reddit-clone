import styled from 'styled-components';
import { StyledCommentBox } from './CommentBox.styled';

const StyledCreatePost = styled.div`
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin: 100px auto 0;
  padding: 10px 15px;
  width: 750px;

  & form > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  & form > div:last-child {
    align-items: flex-end;
    padding-right: 35px;
  }

  & label {
    margin-bottom: 10px;
  }

  & input {
    border: solid 1px #ccc;
    border-radius: 4px;
    color: #1c1c1c;
    outline: none;
    font-size: 1rem;
    height: 35px;
    margin-bottom: 10px;
    padding: 1px 10px;
  }
  & input:focus {
    border: solid 1px #6c6c6c;
  }

  & button {
    display: block;
    margin-left: auto;
    margin-right: 0;
  }

  @media (max-width: 600px) {
    margin-top: 120px;
  }

  @media (max-width: 800px) {
    width: 90vw;

    & input {
      width: 95%;
    }

    & button {
      margin-right: 30px;
    }
  }
`;

const CreatePostBox = styled(StyledCommentBox)`
  height: 200px;
  width: 720px;

  @media (max-width: 800px) {
    margin: 0;
    width: 95%;
  }
`;

export { StyledCreatePost, CreatePostBox };
