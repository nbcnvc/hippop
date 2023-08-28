import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}

// 에디터 설정
.ql-editor {
    strong {
        font-weight:bold;
    }
    em {
        font-style: italic;
    }
}

@font-face {
    font-family: 'Fira Sans', sans-serif;
    src: url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@500&display=swap');
  }

body {
    font-family: 'Fira Sans', sans-serif;
    max-width: 100%;
    margin: 0 auto;
    background-color: #fffbf4;
}
a {
    text-decoration:none;
    color: black;
}
`;

export default GlobalStyle;
