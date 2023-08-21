import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}

@font-face {
    font-family: 'Fira Sans', sans-serif;
    src: url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@500&display=swap');
  }

body {
    font-family: 'Fira Sans', sans-serif;
    max-width: 80%;
    margin: 0 auto;
}
a {
    text-decoration:none;
    color: black;
}
`;

export default GlobalStyle;
