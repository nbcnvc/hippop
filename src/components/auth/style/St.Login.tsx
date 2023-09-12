import { styled } from 'styled-components';

export const St = {
  LoginTag: styled.div`
    margin: 0 auto;
    margin-bottom: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 320px;
    height: 520px;
    background: rgba(183, 79, 231, 0.76);
    border-radius: 10px;
    padding: 1rem;
    // backdrop-filter: blur(10px);
    box-shadow: 4px 4px 18px rgba(0, 0, 0, 0.3);
    p {
      margin-top: 2rem;
      font-size: 12px;
    }
    .login-content {
      gap: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h2 {
        margin-top: 10px;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        color: white;
      }
      span {
        font-size: 12px;
      }
    }
    .btn-wrapper {
      width: 100%;
    }
    .list-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0 !important;
    }
    .list {
      margin: 0.5rem;
      cursor: pointer;
      transition: transform 0.5s, filter 0.5s;
    }
    .list:hover {
      transform: scale(0.98);
      filter: brightness(1.2);
    }
    .list > img {
      width: 200px;
      border-radius: 8px;
      box-shadow: 4px 4px 10px rgba(45, 45, 45, 0.665);
    }
  `
};
