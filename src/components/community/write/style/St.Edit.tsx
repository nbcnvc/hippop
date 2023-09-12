import { styled } from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const St = {
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
    width: 780px;
    height: 730px;
    padding: 20px;
    background-color: #fff;
    border-radius: 18px;
    border: 3px solid var(--fifth-color);
    position: relative;
  `,

  ButtonBox: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  Button: styled.button`
    width: 80px;
    height: 35px;
    font-weight: 600;
    color: var(--second-color);
    background-color: var(--third-color);
  `,

  ContentBox: styled.div`
    margin: 10px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  `,

  Title: styled.div`
    font-weight: 700;
    padding: 10px;
  `,

  Input: styled.input`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 715px;
    height: 30px;
    padding: 2px 20px;
    margin-bottom: 10px;
    outline: none;
    border-radius: 18px;
    border: 2px solid var(--fifth-color);
  `,

  XButton: styled(CloseRoundedIcon)`
    cursor: pointer;
  `
};
