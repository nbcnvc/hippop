import { keyframes, styled } from 'styled-components';
import React, { useEffect, useState } from 'react';

const AboutBannser = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };
  useEffect(() => {
    if (imagesLoaded === 4) {
      // 모든 이미지가 로드됨
    }
  }, [imagesLoaded]);
  return (
    <BannerContainer>
      <ImgContainer>
        <Img src="/asset/about_1.jpg" onLoad={handleImageLoad} />
        <Img src="/asset/about_2.png" onLoad={handleImageLoad} />
        <Img src="/asset/about_3.jpg" onLoad={handleImageLoad} />
        <Img src="/asset/about_4.jpg" onLoad={handleImageLoad} />
      </ImgContainer>
      <BannerText>
        <TitleText> "힙팝, 팝업 스토어와 함께하는 라이프 스타일"</TitleText>
        <Text> 힙팝에 오신 여러분 환영합니다. </Text>
        <Text> 힙팝은 팝업 스토어를 통해 여러분의 라이프 스타일에 새로운 의미를 부여하고자 합니다. </Text>
        <Text>
          힙팝이 드리는 다양한 서비스들이 팝업스토어와 함께하는 여러분의 일상을 더욱 풍부하게 만들어드릴 수 있길
          기대합니다!
        </Text>
      </BannerText>
    </BannerContainer>
  );
};

export default AboutBannser;

const BannerContainer = styled.div`
  margin: 0 auto;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 1200px;
  position: relative;
`;

const ImgContainer = styled.div`
  display: flex;
  animation: rotateImages 12s linear infinite;
  position: relative;
  width: 400%;
  height: 100%;

  @keyframes rotateImages {
    0%,
    100% {
      transform: translateX(0); // 초기 위치
    }
    25% {
      transform: translateX(0); // 시작 시점
    }
    50% {
      transform: translateX(-50%); // 첫 번째 이미지가 왼쪽으로 슬라이드
    }
    75% {
      transform: translateX(-50%); // 두 번째 이미지가 시작 시점으로 이동
    }
    100% {
      transform: translateX(0); // 다음 애니메이션 시작 시점
    }
  }
`;

const Img = styled.img`
  width: 25%; // 이미지 컨테이너의 너비를 4배로 설정했으므로 이미지의 너비는 25%
  height: 100%; // 이미지의 높이는 100%로 설정
  object-fit: cover;
`;

const BannerText = styled.div`
  position: absolute;
  top: 40%;
  left: 25%;
  width: 50%;
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
