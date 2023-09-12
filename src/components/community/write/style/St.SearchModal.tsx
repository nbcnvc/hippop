import { ToastContainer } from 'react-toastify';

import { styled } from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';

export const St = {
  ElarmContainer: styled(ToastContainer)`
    .custom-toast {
      background-color: red;
      color: black;
    }
  `,

  ModalContainer: styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    backdrop-filter: blur(5px);
    background-color: rgb(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  ModalBox: styled.div`
    width: 800px;
    height: 720px;
    padding: 20px;
    background-color: #fff;
    border-radius: 18px;
    border: 3px solid var(--fifth-color);
    position: relative;

    .custom-btn {
      width: 100px;
      background-color: var(--second-color);
      border-radius: 0 18px 18px 0;
      padding: 8.5px 16px;
      font-size: 14px;
      font-weight: 700;
    }
  `,

  XButton: styled(CloseRoundedIcon)`
    cursor: pointer;
  `,

  ResetButton: styled(ReplayRoundedIcon)`
    position: absolute;
    margin-left: 515px;
    cursor: pointer;
  `,

  ButtonBox: styled.div`
    display: flex;
    justify-content: flex-end;
  `,

  Title: styled.div`
    font-size: 18px;
    font-weight: 700;
    margin: 20px 25px 25px 25px;
  `,

  TitleLine: styled.span`
    padding: 2px;
    background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
  `,

  SearchBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
  `,

  Input: styled.input`
    width: 630px;
    height: 32px;
    padding: 2px 15px;
    outline: none;
    border-radius: 18px 0 0 18px;
    border: 2px solid var(--fifth-color);
  `,

  ResultBox: styled.div`
    height: 550px;
    margin: 20px;
    overflow: scroll;
  `,

  Comment: styled.div`
    font-weight: 600;
    margin: 10px;
  `,

  GridContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 한 줄에 두 개의 열 */
    gap: 15px; /* 열 사이의 간격 조정 */
    max-width: 800px; /* 그리드가 너무 넓어지는 것을 제한 */
    margin: 0 auto; /* 가운데 정렬 */
  `,

  Card: styled.div`
    width: 230px;
    border-radius: 18px;
    border: 2px solid var(--fifth-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    /* ClosedBox를 가운데 정렬하기 위한 스타일 */
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,

  Img: styled.img`
    width: 210px;
    height: 175px;
    margin-top: 10px;
    object-fit: cover;
    border-radius: 10px;
  `,

  ClosedBox: styled.div`
    position: absolute;
    width: 230px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 16px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
  `,

  Closed: styled.div`
    font-size: 20px;
    font-weight: 700;
    color: white;
  `,

  CImg: styled.img`
    width: 210px;
    height: 175px;
    margin-top: 10px;
    object-fit: cover;
    border-radius: 10px;
  `,

  StoreName: styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    line-height: 1.2;
    font-size: 14px;
    font-weight: 500;
    height: 30px;
    padding: 10px 15px;
  `
};
