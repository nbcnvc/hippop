import { styled } from 'styled-components';

const AboutBannser = () => {
  return (
    <BannerContainer>
      <ImgContainer>
        <Img src="/asset/about_sum.jpg" alt="banner-image" />
        {/* <Img src="/asset/about_1.jpg" onLoad={handleImageLoad} /> */}
      </ImgContainer>
      <BannerText>
        <TitleText>
          "<span>힙팝, 팝업 스토어</span>와 함께 하는 <span>라이프 스타일</span>"
        </TitleText>
        <Text> 힙팝에 오신 여러분 환영합니다. </Text>
        <Text> 힙팝은 팝업 스토어를 통해 여러분의 라이프 스타일에 새로운 의미를 부여하고자 합니다. </Text>
        <Text>
          힙팝이 드리는 다양한 서비스들이 팝업스토어와 함께 하는 여러분의 일상을 더욱 풍부하게 만들어드릴 수 있길
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
  // display: flex;
  // justify-content: center;
  // align-items: center;
`;

const ImgContainer = styled.div`
  margin: 0 auto;

  position: relative;
  max-width: 100%;
  width: 100%;
  height: 100%;
  @media (max-width: 844px) {
    width: 100%;
    // width: 844px;
  }
`;

const Img = styled.img`
  margin: 0 auto;

  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.65);
  @media (max-width: 844px) {
    // width: 844px;
    width: 100%;
  }
`;

const BannerText = styled.div`
  position: absolute;
  top: 40%;
  left: 20%;
  width: 65%;
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
  span {
    color: var(--primary-color);
    &:last-child {
      color: var(--fifth-color);
    }
  }
  @media (max-width: 1280px) {
    font-size: 30px;
  }
  @media (max-width: 1100px) {
    font-size: 24px;
  }
`;

const Text = styled.p`
  padding: 5px;
  font-size: 18px;
  text-align: center;
  @media (max-width: 1100px) {
    font-size: 14px;
  }
`;
