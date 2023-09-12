import styled, { css } from 'styled-components';

// 미디어 쿼리 세팅
const mediaQuery = (maxWidth: number) => css`
  @media (max-width: ${maxWidth}px) {
    width: 40%;
  }
`;

export const St = {
  WriterContainer: styled.div`
    max-width: 1920px;
    min-width: 744px;
    width: 50%;
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    border: 2px solid var(--fifth-color);
    border-radius: 14px;
    padding: 10px;

    ${mediaQuery(900)}
  `,

  ProfileBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 50px;
  `,

  Img: styled.img`
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
  `,

  Name: styled.div`
    font-size: 18px;
    font-weight: 600;
    padding: 0 20px;
  `,

  TitleLine: styled.span`
    padding: 2px;
    background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
    cursor: pointer;
  `,

  ButtonBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 50px;
  `,

  Button: styled.button`
    width: 120px;
    height: 40px;
    font-weight: 600;
  `
};
