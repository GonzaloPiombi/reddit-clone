import styled from 'styled-components';
import Container from './Container.styled';

const StyledCard = styled(Container)`
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  max-width: 800px;
  padding-left: 40px;

  & h2 {
    font-size: 1.3rem;
    font-weight: 500;
    margin: 2px 10px;
  }

  & p {
    margin: 0 10px;
    max-height: 600px;
    overflow: hidden;
  }

  &:hover {
    border: 1px solid #9f9f9f;
  }

  & .link-replace {
    color: #0074cc;
  }

  & .link-replace:hover {
    text-decoration: underline;
  }
`;

const StyledCardSidebar = styled.div`
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 40px;

  & > button {
    background: none;
    border: none;
    outline: none;
  }

  & button {
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.5rem;
  }

  & button:hover {
    background-color: #ccc;
    color: #ff4500;
  }

  & button:not(:first-child):hover {
    background-color: #ccc;
    color: #7193ff;
  }

  & .up {
    color: #ff4500;
  }

  & .down {
    color: #7193ff;
  }
`;

const StyledCardTop = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;

  & h5 {
    margin: 0;
  }

  & p {
    font-size: 0.8rem;
    font-weight: 300;
    margin: 0;
  }

  & > div {
    display: inline;
    width: auto !important;
    padding: 0;
  }

  & span {
    font-weight: 300;
    margin: 0 5px;
    vertical-align: super;
  }

  & button {
    font-size: 0.9rem;
    min-width: 50px;
    padding: 2px 12px;
    position: absolute;
    top: 4px;
    right: 7px;
  }
`;

const PostCard = styled(StyledCard)`
  border: solid 1px transparent;
  cursor: default;

  & > div {
    background-color: #fff;
  }

  & h1 {
    font-size: 1.6rem;
    font-weight: 500;
    margin: 2px 10px;
  }

  & > p {
    margin-bottom: 10px;
    max-height: none;
  }

  &:hover {
    border: solid 1px transparent;
  }
`;

const CardContainer = styled.div`
  max-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const StyledCardBottom = styled.button`
  background: none;
  border: none;
  border-radius: 4px;
  color: #878a8c;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 5px 0 0 4px;
  outline: none;
  padding: 1px 3px;
  width: fit-content;

  & p {
    margin: 0;
    font-weight: 800;
  }

  & i {
    font-size: 1.5rem;
    margin-right: 5px;
  }

  &:hover {
    background-color: #dbdbdb;
  }
`;

export {
  StyledCard,
  StyledCardSidebar,
  StyledCardTop,
  PostCard,
  CardContainer,
  StyledCardBottom,
};
