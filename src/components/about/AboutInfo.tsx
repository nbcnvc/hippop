import React from 'react';
import { styled } from 'styled-components';
import face1Img from '../../images/mimoticon1.png';
import face2Img from '../../images/mimoticon3.png';
import face3Img from '../../images/mimoticon2.png';
import NewJeans from '../../images/Newjeans.png';

const AboutInfo = () => {
  return (
    <Container>
      <FirstTitle>힙-팝은 이런 서비스예요.</FirstTitle>
      <Wraaper>
        <Box>
          <FaceImg src={face1Img} />
          <ColorTag1>다채로운</ColorTag1>
          <Ptag>힙팝은 다채로움을 추구해요.</Ptag>
          <Ptag>일관성있는 컨셉이 아닌,</Ptag>
          <Ptag>다채로운 팝업 스토어를 발굴하여 소개합니다!</Ptag>
        </Box>
        <Box>
          <FaceImg src={face2Img} />
          <ColorTag2>개성있는</ColorTag2>
          <Ptag>힙팝은 개성을 존중해요.</Ptag>
          <Ptag>당신이 평소와는 다른, 색다른 장소로 나아가고 싶을 때, </Ptag>
          <Ptag> 그에 맞는 추천을 제공합니다!</Ptag>
        </Box>
        <Box>
          <FaceImg src={face3Img} />
          <ColorTag3>다양한</ColorTag3>
          <Ptag>힙팝은 다양성을 지지해요.</Ptag>
          <Ptag>한 가지 팝업 스토어에만 국한되지 않고, </Ptag>
          <Ptag>가능한 모두가 만족할 수 있도록 다양한 선택을 제공합니다! </Ptag>
        </Box>
      </Wraaper>
      <SecondTitle>힙-팝은 다양한 팝업스토어를 한 눈에 소개해요.</SecondTitle>
      <SecondBox>
        <div>
          <SecondHtag>힙팝은 간편하게 팝업스토어를 찾게 해줘요.</SecondHtag>
          <SecondPtag>일상에서 다양한 정보들에 손쉽게 접근 가능하지만, 우리가 원하는 정보를 찾</SecondPtag>
          <SecondPtag>는 것은 여전히 번거로운 경우가 많죠. 힙팝은 이런 번거로움을 해소하고자</SecondPtag>
          <SecondPtag>팝업 스토어 뿐만 아니라 함께 갈만한 곳들도 같이 추천해요.</SecondPtag>
        </div>
        <SecondImg src={NewJeans} />
      </SecondBox>
    </Container>
  );
};

export default AboutInfo;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1920px;
  min-width: 744px;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 160px;
`;

const FirstTitle = styled.h1`
  font-size: 28px;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;

const Wraaper = styled.div`
  display: flex;
  margin-top: 50px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 60px;
`;

const FaceImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ColorTag1 = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #a8b2e9;

  font-size: 25px;
  font-weight: bold;

  margin: 25px 0 25px 0;

  padding: 0 5px;
`;

const ColorTag2 = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #ecd995;

  font-size: 25px;
  font-weight: bold;

  margin: 25px 0 25px 0;
  padding: 0 5px;
`;

const ColorTag3 = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #eb455f;

  font-size: 25px;
  font-weight: bold;

  margin: 25px 0 25px 0;
  padding: 0 5px;
`;

const Ptag = styled.p`
  font-size: 16px;
  line-height: 20px;
`;

const SecondTitle = styled.h1`
  font-size: 28px;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);

  margin-top: 100px;
`;

const SecondBox = styled.div`
  margin: 160px 0 200px 0;
  max-width: 1920px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 844px) {
    justify-content: center;
    flex-direction: column;
    margin: 140px 0 140px 0;
    & > div {
      order: 1; /* 텍스트를 포함하는 div를 위로 이동 */
    }

    & > SecondImg {
      order: 2; /* 이미지 태그를 아래로 이동 */
      margin-top: 20px; /* 이미지와 텍스트 사이의 간격 조절 (선택 사항) */
    }
  }
`;
const SecondImg = styled.img`
  width: 50%;
  object-fit: cover;
  border: 3px solid black;
  border-radius: 18px;
  @media (max-width: 844px) {
    width: 80%;
  }
`;

const SecondHtag = styled.h2`
  font-size: 24px;

  margin-bottom: 50px;
  @media (max-width: 2100px) {
    padding: 8px 14px 0 0;
  }
  @media (max-width: 844px) {
    margin-top: 2rem;
  }
`;

const SecondPtag = styled.p`
  font-size: 17px;
  padding: 8px 0 8px 0;
  @media (max-width: 2100px) {
    padding: 8px 14px 8px 0;
  }
`;
