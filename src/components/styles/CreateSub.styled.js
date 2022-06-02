import styled from 'styled-components';

const StyledCreateSub = styled.div`
  background-color: #fff;
  border: solid 1px #ccc;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 500px;
  padding: 1% 2%;
  width: 500px;

  & h1 {
    font-size: 1.4rem;
    margin: 0;
  }

  & label {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  & h1,
  label {
    color: #383838;
    font-weight: 500;
  }

  & div {
    margin-bottom: 12px;
  }

  & > div:first-child {
    border-bottom: solid 1px #ccc;
    padding-bottom: 10px;
  }

  & form > div:last-child {
    margin-top: 20px;
    text-align: end;
  }

  & span {
    color: #7a7a7a;
    position: relative;
    right: 45px;
    top: 35px;
  }

  & input {
    border: solid 1px #ccc;
    border-radius: 4px;
    font-size: 0.9rem;
    height: 28px;
    margin-top: 10px;
    outline: none;
    padding-left: 16px;
    width: 100%;
  }

  & button {
    font-size: 0.9rem;
    font-weight: 600;
    margin-left: 10px;
    padding: 6px 10px;
  }
`;

export { StyledCreateSub };
