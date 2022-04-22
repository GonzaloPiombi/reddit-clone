import { StyledHeader, Nav, Logo } from './styles/Header.styled';

const Header = () => {
  return (
    <StyledHeader>
      <Nav>
        <Logo src="./images/reddit-logo.png" alt="logo" />
      </Nav>
    </StyledHeader>
  );
};

export default Header;
