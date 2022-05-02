import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box
  }

  body {
    background-color: #dae0e6;
    font-family: 'Jost', sans-serif;
    margin: 0;    
  }
`;

export default GlobalStyles;
