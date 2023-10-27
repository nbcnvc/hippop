// 라이브러리
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
  

  .react-confirm-alert-overlay {
    background-color: transparent;
    bottom: 900px;
  }
  // input[type="file"]::-webkit-file-upload-button {
  //   /* Chrome 및 Safari에서 동작 */
  //   opacity: 10;
  // }

    // 검색 페이지 달력 삼각형 
    .react-datepicker__triangle  {
      &:after{
        border-bottom-color: #2B3467!important;
        border-top: none;
      }
   
    }
      /* day: 주말 날짜 */
      .react-datepicker__day:nth-child(1){ 
          color:#ff0000; /* 일요일 날짜*/
 
      }
      .react-datepicker__day:nth-child(7){
          color:#0000ff; /* 토요일 날짜 */

      }

    // 검색 페이지 달력
    .react-datepicker {
    border: 2px solid #333333;
    box-shadow: 7px 7px  10px #00000080  ;
    border-radius: 18px;
    font-weight:600;

    // 검색 페이지 헤더
    .react-datepicker__header {
      background-color: #2B3467;
    
      border-bottom: none;
      border-radius: 16px 16px 0 0 ;

      .react-datepicker__day-names {
        display: none;
      
      }
    }
    
    .react-datepicker__month-container{
      border-radius: 18px;
    }
    .react-datepicker__week-number {
       color: red;
    }

    .react-datepicker__day--outside-month {
    cursor: default;
    color: gray; // 해당 달이 아니면 날짜 색상 변경해서 구분해
  }
  }
  
}
a {
    text-decoration:none;
    color: black;
}

button {
    font-family: 'Pretendard-Regular';
    background-color: var(--primary-color);
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

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    padding: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--sixth-color);
    color: transparent;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--primary-color);
  }

  /* 수평 스크롤바 스타일링 */
  ::-webkit-scrollbar-track {
    height: 6px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-track-piece {
    height: 6px;  
    background-color: transparent; /* 스크롤바 트랙 배경색 설정 */
  }

  @media (max-width: 390px)  {
    input,
    textarea,
    select {
        font-size: 20px;
    }

  }
  /* -webkit-text-size-adjust : auto */
`;

export default GlobalStyle;
