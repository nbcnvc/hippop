import { styled } from 'styled-components';
import React from 'react';

const AboutBannser = () => {
  return (
    <BannerContainer>
      <Img src="/asset/about_1.jpg" />
      <BannerText>
        <TitleText> 힙팝은 팝업스토어를 좋아하는 사람들을 위해 탄생했어요!</TitleText>
        <Text> 힙-팝에 오신걸 환영해요:) </Text>
        <Text>힙팝은 팝업스토어를 좋아하는 사람들을 위해, 데이트를 위해,</Text>
        <Text> 또는 친구들과 즐길 거리를 찾기 위해 만들어졌어요.</Text>
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
  left: 37%;

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
`;

const Text = styled.p`
  padding: 5px;

  font-size: 18px;
`;
