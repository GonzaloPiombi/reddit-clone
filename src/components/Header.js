import { useState } from 'react';
import { StyledHeader, Nav, Logo } from './styles/Header.styled';
import { Button, AltButton, ButtonContainer } from './styles/Button.styled';
import UserButton from './UserButton.js';
import ProfileMenu from './ProfileMenu';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const [isUserButtonClicked, setIsUserButtonClicked] = useState(false);

  const handleClick = () => {
    setIsUserButtonClicked(!isUserButtonClicked);
  };

  return (
    <StyledHeader>
      <Nav>
        <Link to="/">
          <Logo src="./images/reddit-logo.png" alt="logo" />
        </Link>
        {!props.isSignedIn && (
          <ButtonContainer>
            <AltButton onClick={props.showSignInForm}>Log In</AltButton>
            <Button onClick={props.showSignUpForm}>Sign Up</Button>
          </ButtonContainer>
        )}
        {props.isSignedIn && (
          <UserButton onButtonClick={handleClick} user={props.user} />
        )}
        {isUserButtonClicked && <ProfileMenu onButtonClick={handleClick} />}
      </Nav>
    </StyledHeader>
  );
};

export default Header;
