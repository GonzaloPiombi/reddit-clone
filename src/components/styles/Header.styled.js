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

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 200px;
  }

  & .create-button {
    background: none;
    border: none;
    color: #777777;
    font-size: 1.8rem;
  }

  & .create-button:hover {
    background-color: #dfdfdf;
    border-radius: 4px;
  }
`;

const Logo = styled.img`
  width: 95px;
`;

export { StyledHeader, Nav, Logo };
