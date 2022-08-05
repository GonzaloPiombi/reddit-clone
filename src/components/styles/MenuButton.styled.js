import styled from 'styled-components';

const StyledMenuButton = styled.button`
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

const StyledSubButton = styled(StyledMenuButton)`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 600;
  min-width: 215px;
  padding: 8px 5px;
  border: ${(props) => (props.active ? 'solid 1px #dfdfdf' : 'null')};

  @media (max-width: 600px) {
    min-width: 100px;
  }
`;

export { StyledMenuButton, StyledSubButton };
