import styled from 'styled-components';

const Button = styled.button`
  background-color: #0079d3;
  border: 1px solid #0079d3;
  border-radius: 9999px;
  color: #fff;
  font-size: 1rem;
  min-width: 120px;
  padding: 6px 30px;

  &:hover {
    background-color: #1484d7;
  }

  &:active {
    background-color: #3d99de;
  }
`;

const AltButton = styled(Button)`
  background-color: #fff;
  color: #0079d3;

  &:hover {
    background-color: #f5fafe;
  }

  &:active {
    background-color: #d7eaf8;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 300px;

  @media (max-width: 700px) {
    min-width: 225px;

    & button {
      font-size: 0.8rem;
      min-width: 80px;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    height: 100px;

    & button {
      width: 50%;
    }
  }
`;

const AltButtonContainer = styled(ButtonContainer)`
  flex-direction: row;

  & button {
    font-size: 0.9rem;
  }
`;

export { Button, AltButton, ButtonContainer, AltButtonContainer };
