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

  & form {
    display: flex;
    flex-direction: column;
    width: 280px;
  }

  & label {
    color: #525252;
    font-size: 0.9rem;
  }

  & input {
    background-color: #fcfcfb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    font-size: 1rem;
    height: 40px;
    margin-bottom: 10px;
    outline: none;
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

  & .error {
    border-color: red;
  }

  & .valid {
    border-color: green;
  }
`;

export { StyledSignInUp };
