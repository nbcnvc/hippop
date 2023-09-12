import { St } from '../../pages/style/St.About';

const AboutBannser = () => {
  return (
    <St.BannerContainer>
      <St.ImgContainer>
        <St.Img src="/asset/about_sum.jpg" alt="banner-image" />
      </St.ImgContainer>
      <St.BannerText>
        <St.TitleText>
          "<span>힙팝, 팝업 스토어</span>와 함께 하는 <span>라이프 스타일</span>"
        </St.TitleText>
        <St.Text> 힙팝에 오신 여러분 환영합니다. </St.Text>
        <St.Text> 힙팝은 팝업 스토어를 통해 여러분의 라이프 스타일에 새로운 의미를 부여하고자 합니다. </St.Text>
        <St.Text>
          힙팝이 드리는 다양한 서비스들이 팝업스토어와 함께 하는 여러분의 일상을 더욱 풍부하게 만들어드릴 수 있길
          기대합니다!
        </St.Text>
      </St.BannerText>
    </St.BannerContainer>
  );
};

export default AboutBannser;
