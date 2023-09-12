import styled from 'styled-components';

export const St = {
  MainContainer: styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    margin: 8rem 8rem 12rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    img {
      margin: 0 auto;
      max-width: 1400px;
      width: 60%;
      transition: filter 0.3s ease;
      &:hover {
        filter: brightness(1.4);
      }
      @media (max-width: 390px) {
        width: 90%;
      }
    }
    h4 {
      font-size: 1.1vw;
      margin-top: 2rem;
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(0.98);
      }
      @media (max-width: 390px) {
        font-size: 5vw;
      }
    }
    span {
      font-size: 1.5vw;
      color: var(--primary-color);
      @media (max-width: 390px) {
        font-size: 6vw;
      }
    }
    }
  }
`
};
