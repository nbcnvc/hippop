import React from 'react';
import { styled } from 'styled-components';

const Footer = () => {
  return (
    <FooterTag>
      <div>
        <img src="./asset/test-logo1.png" alt="logo img" width={60} />
        <span>
          EMAIL <br />
          COPYRIGHT <br />
          SERVICE RULES <br />
          SUBSCRIBES
        </span>
      </div>
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
    </FooterTag>
  );
};

export default Footer;

const FooterTag = styled.div`
  margin: 0 auto;
  background-color: gray;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem 0;
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
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
`;
