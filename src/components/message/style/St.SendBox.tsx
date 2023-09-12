import { styled } from 'styled-components';

export const St = {
  Container: styled.div`
    position: relative;
    overflow-y: auto;
    width: 100%;
  `,

  Wrapper: styled.div`
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    background-color: var(--fourth-color);
    align-items: center;
    width: 99%;
    height: 50px;
    border-radius: 14px;
    margin: 6px 0 0;
    color: var(--fifth-color);
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, padding-right 0.3s ease;
    &:hover {
      background-color: var(--sixth-color);
    }
    &:active {
      transform: scale(0.988);
    }
    h4 {
      margin-left: 8px;
      width: 100px;
      text-align: center;
    }
    span {
      display: block;
      width: 180px;
      text-align: center;
    }
    .deleteBtn {
      width: 60px;
      height: 50px !important;
      font-size: 14px;
      border-radius: 0 14px 14px 0;
      border-bottom: 4px solid var(--fifth-color);
    }
    p {
      width: 180px;
      margin-left: 20px;
      text-align: center;
      @media (max-width: 1360px) {
        width: 220px;
        margin-left: 0px;
      }
      @media (max-width: 1060px) {
        display: inline-block;
        // animation: marquee 7s linear infinite;
        overflow: hidden;
        width: 180px;
      }
    }
  `,

  ProfileBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Img: styled.img`
    margin-left: 10px;
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
  `,
  Body: styled.div`
    width: 30%;
    overflow: hidden;
    margin-right: 0;
    @media (max-width: 1960px) {
      width: 40%;
    }
    @media (max-width: 1360px) {
      display: none;
    }
    span {
      margin: 0 auto;
      margin-right: -10px;
      display: inline-block;
      animation: marquee 7s linear infinite;
    }

    @keyframes marquee {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  `,

  NullBox: styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    background-color: var(--fourth-color);
    border-radius: 30px;
  `
};
