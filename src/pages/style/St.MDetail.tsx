import styled, { css } from 'styled-components';

// 미디어 쿼리 세팅
const mediaQuery = (maxWidth: number) => css`
  @media (max-width: ${maxWidth}px) {
    width: 40%;
  }
`;

export const St = {
  Layout: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  CategoryBox: styled.div`
    max-width: 1920px;
    min-width: 744px;
    width: 50%;
    margin-top: 50px;
    display: flex;
    justify-content: space-between;

    ${mediaQuery(900)}
  `,

  Category: styled.h1`
    color: var(--fifth-color);
    margin: 30px 0 10px 0;
    padding-bottom: 5px;
    font-size: 24px;
    float: left;
  `,

  TitleLine: styled.span`
    padding: 2px;
    background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
  `,

  ButtonBox: styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Button: styled.button`
    width: 60px;
    height: 32px;
    font-size: 14px;
    font-weight: 600;
    color: var(--second-color);
    background-color: var(--third-color);
  `,

  HeadContainer: styled.div`
    max-width: 1920px;
    min-width: 744px;
    width: 50%;

    ${mediaQuery(900)}
  `,

  StoreBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  TextBox: styled.div`
    width: 100%;
    padding: 30px 0 10px 0;
    border-bottom: 2px dashed var(--fifth-color);
    display: flex;
    justify-content: space-between;
  `,

  Text: styled.div`
    font-size: 16px;
    font-weight: 600;
    padding-right: 5px;
  `,

  Title: styled.div`
    font-size: 26px;
    font-weight: 600;
    padding: 10px 0 30px 10px;
    float: left;
  `,

  BodyContainer: styled.div`
    max-width: 1920px;
    min-width: 744px;
    width: 50%;

    ${mediaQuery(900)}
  `,

  Body: styled.div`
    width: 100%;
    min-height: 500px;
    margin: 20px 0;
  `
};
