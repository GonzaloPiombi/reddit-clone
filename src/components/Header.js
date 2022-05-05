import { StyledHeader, Nav, Logo } from './styles/Header.styled';
import { Button, AltButton, ButtonContainer } from './styles/Button.styled';

const Header = (props) => {
  return (
    <StyledHeader>
      <Nav>
        <Logo src="./images/reddit-logo.png" alt="logo" />
        <ButtonContainer>
          <AltButton onClick={props.showSignInForm}>Log In</AltButton>
          <Button onClick={props.showSignUpForm}>Sign Up</Button>
        </ButtonContainer>
      </Nav>
    </StyledHeader>
  );
};

export default Header;
