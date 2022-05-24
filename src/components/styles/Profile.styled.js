import styled from 'styled-components';

const StyledProfile = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 75px auto 0;
  max-width: 80vw;
  padding: 10px 20px;

  & div {
    display: flex;
    flex-direction: column;
    width: 280px;
  }
`;

const StyledProfileMenu = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  top: 50px;
  right: 10px;
  padding: 10px 0;
  height: 100px;
  width: 200px;

  & button {
    background: none;
    border: none;
    color: #4a4a4a;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    padding: 3px 10px;
    width: 100%;
  }

  & button:hover {
    background-color: #0000000a;
  }

  & i {
    color: #4a4a4a;
    font-size: 1.7rem;
    margin-right: 10px;
  }
`;

export { StyledProfile, StyledProfileMenu };
