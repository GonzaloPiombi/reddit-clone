import { StyledHeader, Nav, Logo } from './styles/Header.styled';
import { Button, AltButton, ButtonContainer } from './styles/Button.styled';

const Header = () => {
  return (
    <StyledHeader>
      <Nav>
        <Logo src="./images/reddit-logo.png" alt="logo" />
        <ButtonContainer>
          <AltButton>Log In</AltButton>
          <Button>Sign Up</Button>
        </ButtonContainer>
      </Nav>
    </StyledHeader>
  );
};

export default Header;
