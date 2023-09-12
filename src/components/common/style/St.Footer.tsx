import styled from 'styled-components';

export const St = {
  FooterTag: styled.div`
    max-width: 100%;
    background-color: var(--fifth-color);
    height: 250px;
    padding: 4rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .footer-inner {
      max-width: 1920px;
      min-width: 744px;
      width: 50%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        text-align: center;
        margin: 5px 0;
        color: white;
      }

      .hover-logo {
        width: 160px;
        filter: grayscale(100%); /* 초기에 회색조로 설정 */
        transition: filter 0.3s ease; /* 효과에 애니메이션 추가 */

        &:hover {
          filter: grayscale(0%); /* 호버 시 회색조 해제 */
        }
      }
      ul {
        color: white;
        margin: 8px 0 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
      }
      li {
        font-weight: 600;
        img {
          filter: grayscale(100%);
        }
      }
      span {
        line-height: 24px;
      }
    }
  `
};
