import { StyledHeader, Nav, Logo } from './styles/Header.styled';
import { Button, AltButton, ButtonContainer } from './styles/Button.styled';
import UserButton from './UserButton.js';

const Header = (props) => {
  return (
    <StyledHeader>
      <Nav>
        <Logo src="./images/reddit-logo.png" alt="logo" />
        <ButtonContainer>
          {!props.isSignedIn && (
            <AltButton onClick={props.showSignInForm}>Log In</AltButton>
          )}
          {!props.isSignedIn && (
            <Button onClick={props.showSignUpForm}>Sign Up</Button>
          )}
          {props.isSignedIn && <UserButton />}
        </ButtonContainer>
      </Nav>
    </StyledHeader>
  );
};

export default Header;
