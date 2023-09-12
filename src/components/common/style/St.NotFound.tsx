// style component
import styled from 'styled-components';

export const St = {
  Layout: styled.div`
    max-width: 1920px;
    min-width: 800px;
    margin: 0 auto;
    width: 50%;
    height: 900px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  LogoBox: styled.div`
    width: 40%;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Logo: styled.img`
    width: 400px;
    height: 153px;
    object-fit: cover;
  `,

  ErrorBox: styled.div`
    width: 40%;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  ErrorTitle: styled.h1`
    font-size: 60px;
    color: var(--primary-color);
  `,

  ErrorMsg: styled.div`
    font-size: 20px;
    font-weight: 700;
    margin-top: 10px;
  `
};
