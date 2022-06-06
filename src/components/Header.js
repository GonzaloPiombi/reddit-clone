import { useState } from 'react';
import { StyledHeader, Nav, Logo } from './styles/Header.styled';
import { Button, AltButton, ButtonContainer } from './styles/Button.styled';
import UserButton from './UserButton.js';
import ProfileMenu from './ProfileMenu';
import { Link } from 'react-router-dom';
import CreateMenu from './CreateMenu';
import SubMenu from './SubMenu';
import { StyledSubButton } from './styles/MenuButton.styled';

const Header = (props) => {
  const [isUserButtonClicked, setIsUserButtonClicked] = useState(false);
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);
  const [isSubButtonClicked, setIsSubButtonClicked] = useState(false);

  const handleUserButtonClick = () => {
    setIsUserButtonClicked(!isUserButtonClicked);
    if (isCreateButtonClicked) {
      setIsCreateButtonClicked(false);
    }
  };

  const handleCreateButtonClick = () => {
    setIsCreateButtonClicked(!isCreateButtonClicked);
    if (isUserButtonClicked) {
      setIsUserButtonClicked(false);
    }
  };

  const handleSubButtonClick = () => {
    setIsSubButtonClicked(!isSubButtonClicked);
  };

  return (
    <StyledHeader>
      <Nav>
        <div>
          <Link to="/" onClick={() => props.setSub('Home')}>
            <Logo src="./images/reddit-logo.png" alt="logo" />
          </Link>
          <StyledSubButton
            onClick={handleSubButtonClick}
            active={isSubButtonClicked}
          >
            <p>{props.currentSub}</p>
            <i className="las la-angle-down"></i>
          </StyledSubButton>
          {isSubButtonClicked && <SubMenu onBtnClick={handleSubButtonClick} />}
        </div>
        <div>
          {props.isSignedIn && (
            <button onClick={handleCreateButtonClick} className="create-button">
              <i className="las la-plus"></i>
            </button>
          )}
          {isCreateButtonClicked && (
            <CreateMenu toggleCreateSub={props.toggleCreateSub} />
          )}
          {!props.isSignedIn && (
            <ButtonContainer>
              <AltButton onClick={props.showSignInForm}>Log In</AltButton>
              <Button onClick={props.showSignUpForm}>Sign Up</Button>
            </ButtonContainer>
          )}
          {props.isSignedIn && (
            <UserButton
              onButtonClick={handleUserButtonClick}
              user={props.user}
            />
          )}
          {isUserButtonClicked && (
            <ProfileMenu onButtonClick={handleUserButtonClick} />
          )}
        </div>
      </Nav>
    </StyledHeader>
  );
};

export default Header;
