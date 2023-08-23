import React from 'react';
import { styled } from 'styled-components';

const About = () => {
  return (
    <AboutTag>
      <div className="about-wrapper">
        <h2>Our Blue Print</h2>
        <div className="image-wrapper">
          <img src="/asset/bluePrint.jpg" alt="bulePrint" />
          <div className="text-overlay">
            <p>
              우리는 미래의 문화를 여는 문을 열기 위해 노력합니다.
              <br /> 다양한 관심사에 맞는 맞춤 팝업 스토어를 통해 새로운 경험과 문화를 제공합니다. <br />
              우리의 목표는 유용한 정보를 제공하며, 더욱 풍요로운 여가 생활과 행복한 삶을 만들어내는 것입니다.
              <br />
              PopupMate는 사용자들의 소통과 협력을 장려하며, 커뮤니티를 형성하여 함께 성장하는 공간을 제공합니다.
              <br />
              우리의 여정은 미래지향적이며, 새로운 문화와 경험을 창조하는 데 힘쓸 것입니다.
              <span>PopupMate - 미래의 문화를 만나다</span>
            </p>
          </div>
        </div>
      </div>
      <div className="sponsor-wrapper">
        <h2>Sponsor Mate</h2>
        <ul>
          <li>
            <img src="/asset/sponsor/soponsor4.png" />
          </li>
          <li>
            <img src="/asset/sponsor/soponsor5.png" />
          </li>
          <li>
            <img src="/asset/sponsor/soponsor.png" />
          </li>
          <li>
            <img src="/asset/sponsor/soponsor1.png" />
          </li>
          <li>
            <img src="/asset/sponsor/soponsor6.png" />
          </li>
          <li>
            <img src="/asset/sponsor/soponsor7.png" />
          </li>
        </ul>
      </div>
    </AboutTag>
  );
};

export default About;

const AboutTag = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;

  h2 {
    margin-top: 1rem;
    font-size: 2rem;
    text-align: center;
  }
  .about-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .image-wrapper {
    position: relative;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 100%;
      width: 100%;
      border-radius: 20px;
      transition: transform 0.3s;
    }

    &:hover img {
      filter: grayscale(40%);
    }

    .text-overlay {
      width: 100%;
      position: absolute;
      bottom: 0;
      background-color: rgba(236, 236, 236, 0.334);
      backdrop-filter: blur(10px);
      color: white;

      border-radius: 0 0 16px 16px;
      opacity: 0;
      transition: opacity 0.3s, transform 1s;
      transform: translateY(100%);
      text-align: center;

      p {
        margin-top: 10px;
        font-size: 80%;
        line-height: 24px;
        text-align: left;
        margin: 1rem 0 1rem 20px;
      }
      span {
        float: right;
        color: rgba(255, 106, 6);
        font-weight: 600;
        padding: 0 10px 0 0;
      }
    }

    &:hover .text-overlay {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .sponsor-wrapper {
    margin: 0 auto;
    width: 80%;
    h2 {
      margin: 1rem 0;
    }
    ul {
      margin: 0 auto;
      margin-top: 2rem;
      margin-bottom: 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
    li {
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px;
      transition: transform 0.3s, filter 0.3s; /* 트랜지션 효과 추가 */
    }
    img {
      width: 100px;
      transition: transform 0.3s, filter 0.3s;
    }
    li:hover img {
      transform: scale(1.05); /* 이미지가 살짝 커지는 효과 */
      filter: brightness(1.2); /* 이미지가 밝아지는 효과 */
    }
  }
`;
