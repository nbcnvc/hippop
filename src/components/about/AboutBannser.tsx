import { styled } from 'styled-components';
import React from 'react';

const AboutBannser = () => {
  return (
    <BannerContainer>
      <Img src="/asset/about_1.jpg" />
      <BannerText>
        <TitleText> "힙팝, 팝업 스토어와 함께하는 라이프 스타일"</TitleText>
        <Text> 힙팝에 오신 여러분 환영합니다. </Text>
        <Text> 힙팝은 팝업 스토어를 통해 여러분의 라이프 스타일에 새로운 의미를 부여하고자 합니다. </Text>
        <Text>
          {' '}
          힙팝이 드리는 다양한 서비스들이 팝업스토어와 함께하는 여러분의 일상을 더욱 풍부하게 만들어드릴 수 있길
          기대합니다!
        </Text>
      </BannerText>
    </BannerContainer>
  );
};

export default AboutBannser;

const BannerContainer = styled.div`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 1200px;
  margin: 0 auto;

  position: relative;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  filter: brightness(0.5);
`;

const BannerText = styled.div`
  position: absolute;
  top: 40%;
  left: 32%;

  font-size: 30px;
  font-weight: bold;
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.p`
  margin-bottom: 60px;
  font-size: 35px;
`;

const Text = styled.p`
  padding: 5px;

  font-size: 18px;
`;
