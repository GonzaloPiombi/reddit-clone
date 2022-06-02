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
  }

  & h3 {
    font-size: 1.2rem;
  }

  & h1,
  h3 {
    color: #383838;
    margin: 0;
    font-weight: 500;
  }

  & > div {
    margin-bottom: 12px;
  }

  & > div:first-child {
    border-bottom: solid 1px #ccc;
    padding-bottom: 10px;
  }

  & > div:last-child {
    margin-top: 20px;
    text-align: end;
  }

  & span {
    color: #7a7a7a;
    position: relative;
    right: -5px;
    top: 24px;
  }

  & input {
    border: solid 1px #ccc;
    border-radius: 4px;
    font-size: 0.9rem;
    height: 28px;
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
