import styled, { css } from 'styled-components';

// 미디어 쿼리 세팅
const mediaQuery = (maxWidth: number) => css`
  @media (max-width: ${maxWidth}px) {
    width: 40%;
  }
`;

export const St = {
  Layout: styled.div`
    max-width: 1920px;
    min-width: 744px;
    width: 50%;
    padding-bottom: 150px;
    display: flex;
    flex-direction: column;

    ${mediaQuery(900)}

    .custom-btn {
      width: 10%;
      background-color: var(--second-color);
      border-radius: 0 18px 18px 0;
      padding: 8px 16px 10px 16px;
      font-size: 18px;
      font-weight: 700;
    }
  `,

  CommentWrite: styled.div`
    width: 100%;
    margin: 50px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,

  Title: styled.div`
    font-size: 18px;
    font-weight: 700;
    padding: 20px 25px;
  `,

  WriteBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
  `,

  Input: styled.input`
    width: 85%;
    height: 38px;
    padding: 2px 15px;
    outline: none;
    border-radius: 20px 0 0 20px;
    border: 2px solid var(--fifth-color);
  `,

  CommentContainer: styled.div`
    width: 100%;
  `,

  ButtonBox: styled.div`
    display: flex;
    justify-content: right;
  `,

  Button: styled.button`
    width: 60px;
    height: 32px;
    margin-right: 10px;
    font-size: 14px;
    font-weight: 600;
    color: var(--second-color);
    background-color: var(--third-color);
  `,

  CommentBox: styled.div`
    padding: 10px;
    margin: 10px 0;
    background-color: #fff;
    border-radius: 18px;
    border: 2px solid var(--fifth-color);
  `,

  EditInput: styled.input`
    width: 50%;
    padding: 5.5px;
    margin: 5px 0;
    outline: none;
  `,

  DateBox: styled.div`
    display: flex;
    float: right;
    align-items: center;
    padding: 0 10px;
  `,

  Date: styled.div`
    display: flex;
    align-items: center;
    padding: 14px 0;
    font-size: 14px;
  `,

  ProfileBox: styled.div`
    width: 150px;
    display: flex;
    float: left;
    align-items: center;
    padding: 0 20px;
  `,

  Img: styled.img`
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
  `,

  Name: styled.div`
    font-weight: 600;
    padding: 0 20px;
    cursor: pointer;
  `,

  Content: styled.div`
    display: flex;
    align-items: center;
    padding: 12px 0;
  `,

  MoreButtonBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  MoreButton: styled.button`
    width: 100px;
    font-weight: 600;
    margin: 10px 0;
  `
};
