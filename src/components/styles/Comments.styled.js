import styled from 'styled-components';

const StyledCommentSection = styled.div`
  background-color: #fff;
  margin: 0 auto;
  width: 650px;

  & div {
    padding-left: 4px;
    width: 100%;
  }
`;

const StyledComment = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCommentBottom = styled.div`
  display: flex;
`;

const Replies = styled.div`
  border-left: solid 1px grey;
  max-width: 650px;
`;

export { StyledCommentSection, StyledComment, StyledCommentBottom, Replies };
