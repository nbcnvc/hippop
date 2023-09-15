import { styled, css } from 'styled-components';

// 미디어 쿼리 세팅
const mediaBarQuery = (maxWidth: number) => css`
  @media (max-width: ${maxWidth}px) {
    width: 60%;
  }
`;
const mediaQuery = (maxWidth: number) => css`
  @media (max-width: ${maxWidth}px) {
    width: 40%;
  }
`;

export const St = {
  ButtonContainer: styled.div`
    max-width: 1920px;
    min-width: 764px;
    width: 51%;

    ${mediaBarQuery(900)}
  `,

  Between: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  ButtonBox: styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: row;
  `,

  Button: styled.button`
    width: 80px;
    font-size: 14px;
    margin-left: 10px;
    background-color: var(--second-color);
  `,

  Input: styled.input`
    width: 200px;
    height: 33px;
    padding: 0 10px;
    margin-right: 10px;
    border-radius: 18px;
    border: 3px solid var(--fifth-color);
    outline: none;
  `,

  SelectBox: styled.select`
    width: 120px;
    height: 38px;
    padding: 0 10px;
    margin-right: 10px;
    border-radius: 18px;
    border: 3px solid var(--fifth-color);

    outline: none;
    /* -moz-appearance: none; */
    /* -webkit-appearance: none; */
    /* appearance: none; */
  `,

  PostContainer: styled.div`
    max-width: 1920px;
    min-width: 744px;
    width: 50%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${mediaQuery(900)}
  `,

  PostBox: styled.div`
    width: 100%;
    height: 240px;
    background-color: #fff;
    border: 3px solid var(--fifth-color);
    border-radius: 18px;
    padding: 10px;
    margin: 10px;
    display: flex;
    cursor: pointer;

    transition: color 0.3s ease, transform 0.3s ease;
    &:hover {
      border: 3px solid var(--primary-color);
    }
    &:active {
      background-color: rgb(215, 215, 219);
      transform: scale(0.98);
    }
    .img-div {
      width: 40%;
      padding: 10px;
    }
  `,

  ContentBox: styled.div`
    width: 60%;
    padding: 10px 20px;
  `,

  ImageBox: styled.img`
    max-width: 600px;
    min-width: 200px;
    width: 99%;
    height: 98%;
    border: 2px solid var(--fifth-color);
    border-radius: 10px;
    object-fit: cover;
  `,

  Store: styled.div`
    font-weight: 600;
    padding: 20px 0;
  `,

  Title: styled.span`
    font-size: 20px;
    font-weight: 700;
    background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
  `,

  Body: styled.div`
    height: 65px;
    width: 420px;
    color: black;
    font-size: 14px;
    line-height: 1.5;
    max-height: 85px;
    padding: 20px 0 0 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 표시할 줄 수 설정 */
    -webkit-box-orient: vertical; /* 텍스트의 방향 설정 */
  `,

  Date: styled.div`
    margin: 15px 0 0 5px;
    font-size: 14px;
    font-weight: 400;
  `,

  DetailButton: styled.button`
    width: 80px;
    font-size: 14px;
    margin: 15px 0 0 0;
  `,

  NoResultBox: styled.div`
    height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  NoResult: styled.h1`
    font-size: 24px;
    font-weight: 700;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Trigger: styled.div`
    width: 100%;
    align-items: center;
  `,

  // 스켈레톤
  ImageBoxs: styled.div`
    width: 310px;
    height: 190px;
    border: 2px solid var(--fifth-color);
    border-radius: 10px;
    margin: 5px 0 5px 3px;
    object-fit: cover;
  `
};
