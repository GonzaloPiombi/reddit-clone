import styled from 'styled-components';

const StyledCard = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin: 0 auto 10px;
  max-width: 800px;
  padding-left: 40px;
  position: relative;
  width: 650px;

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
  padding: 0px 10px;

  & h5 {
    margin: 0;
  }

  & button {
    position: absolute;
    right: 0;
  }
`;

export { StyledCard, StyledCardSidebar, StyledCardTop };
