import { styled } from 'styled-components';

export const St = {
  CardContainerClosed: styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 18px;
    box-sizing: border-box;
    margin: 0 auto;
    transition: transform 0.3s ease;
    img {
      filter: grayscale(100%); /* 이미지를 흑백으로 만듭니다. */
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    /* @media (max-width: 390px) {
      width: '40%';
    } */

    &:hover {
      border: 3px solid var(--primary-color);
    }

    &:active {
      transform: scale(0.97); /* 클릭 시 작아지는 효과 */
    }
  `,

  CLosed: styled.div`
    font-size: 40px;
    font-weight: bold;
    color: white;
  `,

  CardContainer: styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 18px;
    box-sizing: border-box;
    transition: transform 0.3s ease;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    /* @media (max-width: 390px) {
      width: '40%';
    } */
    &:hover {
      border: 3px solid var(--primary-color);
    }

    &:active {
      transform: scale(0.97); /* 클릭 시 작아지는 효과 */
    }
  `,

  ClosedStoreInfo: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    padding: 5px 10px;
  `,

  StoreInfo: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    color: white;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    max-height: 100%;
    overflow: hidden;
    z-index: 1;
    transition: opacity 0.3s ease, transform 0.3s ease; /* opacity와 transform에 transition 효과 추가 */

    .closed-wrap {
      padding: 2rem;
      h2 {
        text-align: center;
        font-size: 1.5rem;
        margin-bottom: 20px;
      }
      p {
        line-height: 20px;
        margin-bottom: 20px;
      }
    }
    .info-wrap {
      padding: 2rem;
      h2 {
        font-size: 1.5rem;
        margin-bottom: 20px;
      }
      p {
        line-height: 20px;
        margin-bottom: 20px;
      }
    }

    /* styles.css */
    .dots {
      display: flex;
      padding: 10px 0;
      justify-content: center;
    }

    .dot {
      border: none;
      width: 10px;
      height: 10px;
      background: #c5c5c5;
      border-radius: 50%;
      margin: 0 5px;
      padding: 5px;
      cursor: pointer;
    }

    .dot:focus {
      outline: none;
    }

    .dot.active {
      background: #000;
    }

    .arrow {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      fill: #fff;
      cursor: pointer;
    }

    .arrow--left {
      left: 5px;
    }

    .arrow--right {
      left: auto;
      right: 5px;
    }

    .arrow--disabled {
      fill: rgba(255, 255, 255, 0.5);
    }
  `
};
