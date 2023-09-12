import styled from 'styled-components';

export const St = {
  Top: styled.button`
    width: 50px;
    border-radius: 30px;
    cursor: pointer;
    position: fixed;
    bottom: 80px;
    z-index: 1;
    right: 20%;
    transition: all 0.1s ease-in-out;
    @media (max-width: 1700px) {
      right: 15%;
    }
    @media (max-width: 980px) {
      right: 10%;
    }
    @media (max-width: 844px) {
      right: 0.8%;
    }
  `
};
