import styled from 'styled-components';

const StyledCard = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 0 auto 10px;
  max-width: 800px;
  padding-left: 40px;
  position: relative;
  width: 650px;

  & h2 {
    font-size: 1.3rem;
    font-weight: 500;
    margin: 2px 10px;
  }

  &:hover {
    border: 1px solid #9f9f9f;
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
  }

  & > div {
    display: inline;
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

export { StyledCard, StyledCardSidebar, StyledCardTop };