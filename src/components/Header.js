import { StyledHeader, Nav, Logo } from './styles/Header.styled';
import { Button, AltButton, ButtonContainer } from './styles/Button.styled';
import UserButton from './UserButton.js';

const Header = (props) => {
  return (
    <StyledHeader>
      <Nav>
        <Logo src="./images/reddit-logo.png" alt="logo" />
        {!props.isSignedIn && (
          <ButtonContainer>
            <AltButton onClick={props.showSignInForm}>Log In</AltButton>
            <Button onClick={props.showSignUpForm}>Sign Up</Button>
          </ButtonContainer>
        )}
        {props.isSignedIn && <UserButton user={props.user} />}
      </Nav>
    </StyledHeader>
  );
};

export default Header;
