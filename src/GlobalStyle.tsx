import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}

body {
    margin: 0 auto;
}

`;

export default GlobalStyle;
