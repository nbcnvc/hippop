import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}

body {
    max-width: 80%;
    margin: 0 auto;
}

`;

export default GlobalStyle;
