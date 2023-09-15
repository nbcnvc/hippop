import { css, styled } from 'styled-components';

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
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${mediaBarQuery(900)}
  `,

  ButtonBox: styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: row;
  `,

  Button: styled.button`
    float: right;
    width: 80px;
    margin-left: 10px;
    font-size: 14px;
    background-color: var(--second-color);
  `,

  Input: styled.input`
    width: 200px;
    height: 33px;
    padding: 0 10px;
    margin-right: 10px;
    outline: none;
    border-radius: 18px;
    border: 3px solid var(--fifth-color);
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;

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
  `,

  ContentBox: styled.div`
    width: 70%;
    padding: 10px 25px 10px 20px;
    border-right: 2px dashed var(--fifth-color);
  `,

  Between: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Betweens: styled.div`
    gap: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 1600px) {
      justify-content: center;
      flex-direction: column;
      margin-top: -10px;
    }
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
    height: 63px;
    width: 430px;
    color: black;
    font-size: 14px;
    line-height: 1.5;
    padding: 20px 0 0 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 표시할 줄 수 설정 */
    -webkit-box-orient: vertical; /* 텍스트의 방향 설정 */
  `,

  Date: styled.div`
    margin: 0 0 0 5px;
    font-size: 14px;
    font-weight: 400;
  `,

  DetailButton: styled.button`
    float: right;
    width: 80px;
    font-size: 14px;
    margin-top: 2.5%;
  `,

  ProfileBox: styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  `,

  Name: styled.div`
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 5px 10px;
  `,

  NameLine: styled.div`
    font-size: 14px;

    span {
      font-size: 18px;
      padding: 2px;
      background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
    }
  `,

  Img: styled.img`
    width: 100px;
    height: 100px;
    margin: 10px 10px 10px 20px;
    border-radius: 50%;
    object-fit: cover;
  `,

  ProfileButton: styled.button`
    width: 80px;
    font-size: 14px;
    top: 185px;
    right: 20px;
    float: right;
    position: absolute;

    @media (max-width: 1600px) {
      top: 0;
      right: 0;
      position: relative;
      justify-content: center;
    }
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
  `
};
