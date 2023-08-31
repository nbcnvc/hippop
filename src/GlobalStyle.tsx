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
.ql-toolbar.ql-snow {
  width: 760px;
  border-radius: 18px 18px 0 0;
  border: 2px solid var(--fifth-color);
}
.ql-container.ql-snow  {
  height: 500px;
  border-radius: 0 0 18px 18px ;
  border: 2px solid var(--fifth-color);
}

// Color chip
:root {
    --primary-color: #eb455f; // King Pink
    --second-color: #2B3467; // Melange Navy
    --third-color: #E2EE32; // Lemon Yellow
    --fourth-color: #FFFDED; // Cream
    --fifth-color: #333333; // Deep Dark Gray
    --sixth-color: #ffb4bf; // Hover Primary color
  }

// Font-ENG / KOR
@font-face {
    font-family: 'RixYeoljeongdo_Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2102-01@1.0/RixYeoljeongdo_Regular.woff') format('woff');
}
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
}

h1, h2, h3, h4, h5 {
  font-family: 'RixYeoljeongdo_Regular';
}  
body {
    font-family: 'Pretendard-Regular';
    max-width: 100%;
    min-width: 900px;
    // width:1920px;
    margin: 0 auto;
    background-color:var(--fourth-color);
}
a {
    text-decoration:none;
    color: black;
}

button {
    // background-color: #eb455f;
    border: 2px solid var(--fifth-color);
    border-bottom: 4px solid var(--fifth-color);
    border-radius: 18px;
    color: white;
    font-size: 16px;
    padding: 5px 10px;
    cursor: pointer;
    transition: filter 0.3s, transform 0.3s;
  
    &:hover {
      filter: brightness(120%);
    }
  
    &:active {
      transform: scale(0.95);
    }
  }

`;

export default GlobalStyle;
