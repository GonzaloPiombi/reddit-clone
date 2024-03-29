import styled from 'styled-components';
import Container from './Container.styled';

const StyledCommentSection = styled(Container)`
  margin-bottom: 50px;

  & div {
    padding-left: 5px;
    width: 100%;
  }

  & img {
    max-height: 350px;
    max-width: 350px;
  }

  @media (max-width: 700px) {
    width: 90vw;
  }
`;

const StyledComment = styled.div`
  display: flex;
  flex-direction: column;

  & .thread-line {
    border-left: solid 2px #d7d7d7;
    cursor: pointer;
    margin-left: 6px;
    min-height: 45px;
    width: 10px;
  }

  & .thread-line:hover {
    border-color: #ffb000;
  }

  & .container {
    display: flex;
    align-items: stretch;
    padding: 0;
  }

  & .container > div {
    padding: 0;
  }

  & .content {
    margin: 2px 0 8px;
  }

  & .up {
    color: #ff4500;
  }

  & .down {
    color: #7193ff;
  }
`;

const StyledCommentBottom = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 40px;

  & > p {
    font-weight: 500;
    margin: 0 2px;
  }

  & > button {
    background: none;
    border: none;
    border-radius: 4px;
    color: #878a8c;
    cursor: pointer;
    font-size: 1.2rem;
    outline: none;
    padding: 1px 3px;
  }

  & button:first-child {
    display: flex;
    align-items: center;
  }

  & button:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80px;
  }

  & button:hover {
    background-color: #ccc;
  }

  & button:first-child:hover {
    color: #ff4500;
  }

  & button:nth-child(3):hover {
    color: #7193ff;
  }
`;

const Replies = styled.div`
  &.hidden {
    display: none;
  }
`;

const ShowRepliesButton = styled.button`
  background: none;
  border: none;
  color: #0079d3;
  font-weight: 600;
  margin-left: 10px;
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }
`;

const NoComments = styled.div`
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > p {
    color: #7c7c7c;
    font-size: 2rem;
  }
`;

export {
  StyledCommentSection,
  StyledComment,
  StyledCommentBottom,
  Replies,
  ShowRepliesButton,
  NoComments,
};
