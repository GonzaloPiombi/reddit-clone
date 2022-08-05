import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #edeff1;
  position: fixed;
  left: 0;
  top: 0;
  height: 48px;
  width: 100%;
  z-index: 1;

  @media (max-width: 600px) {
    height: 100px;
  }
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

  & > div:first-child {
    min-width: 350px;
  }

  & > div > a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
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

  @media (max-width: 600px) {
    align-items: stretch;
    justify-content: space-between;

    & > div:first-child {
      min-width: 0px;
    }

    & > div {
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      min-width: 0;
    }

    & > div:last-child {
      flex-direction: column-reverse;
      align-items: flex-end;
    }
  }
`;

const Logo = styled.img`
  width: 95px;
`;

export { StyledHeader, Nav, Logo };
