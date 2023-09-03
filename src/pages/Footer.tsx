import React from 'react';
import { styled } from 'styled-components';

const Footer = () => {
  return (
    <FooterTag>
      <div>
        <img src="./asset/nyb_logo.png" alt="logo img" width={200} />
        <ul>
          <li>
            <img src="./asset/google.png" alt="provider img" width={40} />
          </li>
          <li>
            <img src="./asset/kakao.png" alt="provider img" width={40} />
          </li>
          <li>
            <img src="./asset/facebook.png" alt="provider img" width={40} />
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
          Developer : 조성록 / 장혜진 / 나윤빈 / 김우리 / 조진명 | Designer : 양윤아 | Build-Period : 2023.08.16 ~ 2023.09.12
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
  margin: 0 auto;
  background-color: var(--fifth-color);
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 0;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      text-align: center;
      margin: 5px 0;
      color: white;
    }
  }
  ul {
    color: white;
    margin-top: 20px;
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
`;
