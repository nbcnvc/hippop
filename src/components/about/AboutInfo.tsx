import { St } from '../../pages/style/St.About';

const AboutInfo = () => {
  return (
    <St.Container>
      <St.FirstTitle>힙-팝은 이런 서비스예요.</St.FirstTitle>
      <St.Wraaper>
        <St.Box>
          <St.FaceImg src="/asset/mimoticon1.png" />
          <St.ColorTag1>다채로운</St.ColorTag1>
          <St.Ptag>힙팝은 다채로움을 추구해요.</St.Ptag>
          <St.Ptag>일관성있는 컨셉이 아닌,</St.Ptag>
          <St.Ptag>다채로운 팝업 스토어를 발굴하여 소개합니다!</St.Ptag>
        </St.Box>
        <St.Box>
          <St.FaceImg src="/asset/mimoticon2.png" />
          <St.ColorTag2>개성있는</St.ColorTag2>
          <St.Ptag>힙팝은 개성을 존중해요.</St.Ptag>
          <St.Ptag>당신이 평소와는 다른, 색다른 장소로 나아가고 싶을 때, </St.Ptag>
          <St.Ptag> 그에 맞는 추천을 제공합니다!</St.Ptag>
        </St.Box>
        <St.Box>
          <St.FaceImg src="/asset/mimoticon3.png" />
          <St.ColorTag3>다양한</St.ColorTag3>
          <St.Ptag>힙팝은 다양성을 지지해요.</St.Ptag>
          <St.Ptag>한 가지 팝업 스토어에만 국한되지 않고, </St.Ptag>
          <St.Ptag>가능한 모두가 만족할 수 있도록 다양한 선택을 제공합니다! </St.Ptag>
        </St.Box>
      </St.Wraaper>
      <St.SecondTitle>힙-팝은 다양한 팝업스토어를 한 눈에 소개해요.</St.SecondTitle>
      <St.SecondBox>
        <div>
          <St.SecondHtag>힙팝은 간편하게 팝업스토어를 찾게 해줘요.</St.SecondHtag>
          <St.SecondPtag>일상에서 다양한 정보들에 손쉽게 접근 가능하지만, 우리가 원하는 정보를 찾는 것은</St.SecondPtag>
          <St.SecondPtag>여전히 번거로운 경우가 많죠. 힙팝은 이런 번거로움을 해소하고자</St.SecondPtag>
          <St.SecondPtag>팝업 스토어 뿐만 아니라 함께 갈만한 곳들도 같이 추천해요.</St.SecondPtag>
        </div>
        <St.SecondImg src="/asset/Newjeans.png" />
      </St.SecondBox>
    </St.Container>
  );
};

export default AboutInfo;
