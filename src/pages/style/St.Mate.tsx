import { styled } from 'styled-components';

export const St = {
  Layout: styled.div`
    min-width: 744px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  TitleBox: styled.div`
    margin: 100px 0 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Title: styled.h1`
    color: var(--fifth-color);
    font-size: 28px;
    font-weight: 400;
    padding-bottom: 5px;
    background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
  `,

  ButtonBox: styled.div`
    min-width: 744px;
    margin: 10px 0 100px 0;
    display: flex;
    justify-content: center;
  `,

  Button: styled.button`
    width: 150px;
    height: 40px;
    font-weight: 700;
  `
};
