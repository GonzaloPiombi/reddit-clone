import styled from 'styled-components';

const StyledSignInUp = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 1px 7px 20px 2px rgb(0 0 0 / 40%);
  display: flex;
  min-height: 65vh;
  min-width: 75vw;
  position: relative;

  & img {
    height: 100%;
    width: 130px;
  }

  & > div:nth-child(2) {
    margin-top: 50px;
    margin-left: 30px;
  }

  & form button {
    padding: 10px 0;
  }

  & .close-button {
    background: none;
    border: none;
    color: grey;
    font-size: 1.8rem;
    outline: none;
    position: absolute;
    top: 5px;
    right: 5px;
  }
`;

const Redirect = styled.div`
  display: flex;
  margin-top: 20px;

  & button {
    background: none;
    border: none;
    color: #0079d3;
    font-size: 0.9rem;
    font-weight: 800;
  }

  & button:hover {
    color: #3394dc;
  }
`;

export { StyledSignInUp, Redirect };
