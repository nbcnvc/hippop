import { styled } from 'styled-components';

export const St = {
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
  `,

  Img: styled.img`
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
    margin: 10px 15px;
  `
};
