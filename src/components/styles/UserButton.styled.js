import styled from 'styled-components';

const StyledUserButton = styled.button`
  background: none;
  border: solid 1px transparent;
  display: flex;
  min-width: 140px;
  justify-content: space-evenly;
  align-items: center;
  padding: 3px 0;

  &:hover {
    border: solid 1px #dfdfdf;
    border-radius: 4px;
  }

  & img {
    border-radius: 999px;
    height: 30px;
  }

  & i {
    color: #6e6e6e;
  }
`;

export { StyledUserButton };
