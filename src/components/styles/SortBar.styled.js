import styled from 'styled-components';

const StyledSortBar = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  max-height: 60px;
  max-width: 800px;
  margin: 75px auto;
  padding: 8px 10px;
  width: 650px;

  & > div {
    border-radius: 100px;
    color: #878a8c;
    cursor: pointer;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 12%;
  }

  & > div:hover {
    background-color: #f6f7f8;
  }

  & i {
    font-size: 1.5rem;
  }
`;

export { StyledSortBar };
