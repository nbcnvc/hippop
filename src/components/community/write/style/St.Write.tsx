import { styled } from 'styled-components';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

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
    width: 800px;
    height: 820px;
    padding: 20px;
    background-color: #fff;
    border-radius: 18px;
    border: 3px solid var(--fifth-color);
    position: relative;
  `,

  ButtonBox1: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  XButton: styled(CloseRoundedIcon)`
    cursor: pointer;
  `,

  BackButton: styled(ArrowBackRoundedIcon)`
    cursor: pointer;
  `,

  StoreBox: styled.div`
    margin: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `,

  Picker: styled(RoomRoundedIcon)`
    padding: 2px;
  `,

  Store: styled.div`
    font-size: 18px;
    font-weight: 700;
    padding: 2px;
    background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
  `,

  ContentBox: styled.div`
    margin: 20px;
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

  ButtonBox2: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  Button: styled.button`
    width: 100px;
    margin: 0 10px;
    font-size: 14px;
    font-weight: 700;
  `
};
