import { styled } from 'styled-components';

export const St = {
  Container: styled.div`
    overflow-y: hidden;
    position: relative;
    width: 98.6%;
    margin: 0 auto;

    .header-wrapper {
      padding: 10px;
      display: flex;
      background-color: var(--fourth-color);
      border-radius: 14px;
      h4 {
        margin-left: 6px;
      }
    }

    .boxBtn-wrapper {
      display: flex;

      span {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: auto;
        margin-left: 40px;
      }
    }
    button {
      border-radius: 20px;
      padding: 10px 0px 30px;

      &:last-child {
        margin: 8px 0 0;
      }
    }
  `,

  ProfileBox: styled.div`
    width: 50%;
    display: flex;
    align-items: center;

    margin-top: 6px;
  `,

  RecieveTime: styled.div`
    width: 50%;
    padding: 5px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,

  Img: styled.img`
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
  `,

  BodyBox: styled.div`
    background-color: var(--fourth-color);
    border-radius: 14px;
    padding: 10px;
    width: 620px;
    height: 143px;
    margin-top: 10px;
  `
};
