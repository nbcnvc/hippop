import React from 'react';
import { styled } from 'styled-components';

const Footer = () => {
  return (
    <FooterTag>
      <div className="footer-inner">
        <img src="/asset/nyb_logo.png" className="hover-logo" alt="logo img" />
        <ul>
          <li>
            Google
            {/* <img src="/asset/google.png" alt="provider img" width={40} /> */}
          </li>
          <li>
            Kakao
            {/* <img src="/asset/kakao.png" alt="provider img" width={40} /> */}
          </li>
          <li>
            Facebook
            {/* <img src="/asset/facebook.png" alt="provider img" width={40} /> */}
          </li>
        </ul>
        <ul>
          <li>ABOUT</li>
          <li>REVIEW</li>
          <li>MATE</li>
          <li>SEARCH</li>
        </ul>
        <span>
          Project-Name : HIPPOP | Team : 그 여름, 우리는
          <br />
          Developer : 조성록 / 장혜진 / 나윤빈 / 김우리 / 조진명 | Designer : 양윤아 | Build-Period : 2023.08.16 ~
          2023.09.12
          <br />
          Stack : React TypeScript | Design-Tool : Figma | GitHub : https://github.com/nbcnvc/hippop
          <br />
          Contact : HarryScreet / huizhen
        </span>
      </div>
    </FooterTag>
  );
};

export default Footer;

const FooterTag = styled.div`
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
`;
