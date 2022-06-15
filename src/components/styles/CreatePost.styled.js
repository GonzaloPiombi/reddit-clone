import styled from 'styled-components';

const StyledCreatePost = styled.div`
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin: 100px auto 0;
  padding: 10px 15px;
  width: 750px;

  & form > div {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  & form > div:last-child {
    align-items: flex-end;
    padding-right: 35px;
  }

  & label {
    margin-bottom: 10px;
  }

  & input,
  textarea {
    border: solid 1px grey;
    border-radius: 4px;
    outline: none;
  }
  & input:focus,
  textarea:focus {
    border: solid 1px black;
  }

  & input {
    font-size: 1rem;
    height: 35px;
    margin-bottom: 10px;
  }

  & textarea {
    height: 200px;
  }

  & button {
    display: block;
    margin-left: auto;
    margin-right: 0;
  }
`;

export { StyledCreatePost };
