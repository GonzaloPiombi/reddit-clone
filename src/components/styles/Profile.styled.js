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

  &.create {
    right: 40px;
  }

  @media (max-width: 600px) {
    &.create {
      top: 95px;
      right: 10px;
    }
  }
`;

const StyledSubMenu = styled(StyledProfileMenu)`
  display: flex;
  align-items: flex-start;
  height: auto;
  top: 39px;
  left: 155px;
  border-top: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  width: 215px;

  & a {
    color: #4a4a4a;
    text-decoration: none;
    padding: 0 10px 2px;
    width: 100%;
  }

  & a:hover {
    background-color: #0000000a;
  }

  @media (max-width: 600px) {
    top: 92px;
    left: 20px;
    border-top: 1px solid #ccc;
  }
`;

export { StyledProfile, StyledProfileMenu, StyledSubMenu };
