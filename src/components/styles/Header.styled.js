import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #edeff1;
  position: fixed;
  left: 0;
  top: 0;
  height: 48px;
  width: 100%;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: inherit;
  padding: 0 20px;
`;

const Logo = styled.img`
  width: 100px;
`;

export { StyledHeader, Nav, Logo };
