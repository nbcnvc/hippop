import React from 'react';
import { styled } from 'styled-components';
import face1Img from '../../images/aboutFace1.png';
import NewJeans from '../../images/Newjeans.png';

const AboutInfo = () => {
  return (
    <Container>
      <FirstTitle>힙-팝은 이런 서비스에요.</FirstTitle>
      <Wraaper>
        <Box>
          <FaceImg src={face1Img} />
          <ColorTag1>다채로운</ColorTag1>
          <Ptag>일관성 있는 컨셉이 아닌,</Ptag>
          <Ptag>통통 튀는 다양한 팝업스토어를 추천해요!</Ptag>
        </Box>
        <Box>
          <FaceImg src={face1Img} />
          <ColorTag2>개성잇는</ColorTag2>
          <Ptag>평소와는 다른 개성있는 장소를 가고 싶을 때</Ptag>
          <Ptag>힙팝이 추천해요!</Ptag>
        </Box>
        <Box>
          <FaceImg src={face1Img} />
          <ColorTag3>다양한</ColorTag3>
          <Ptag>한 가지 팝업스토어만 찾지 않아요!</Ptag>
          <Ptag>가능한 한 모두가 만족할 수 있게,</Ptag>
          <Ptag>다양하게 추천해드려요!</Ptag>
        </Box>
      </Wraaper>
      <SecondTitle>힙-팝은 다양한 팝업스토어를 한 눈에 소개해요.</SecondTitle>
      <SecondBox>
        <div>
          <SecondHtag>힙팝은 간편하게 팝업스토어를 찾게 해줘요</SecondHtag>
          <SecondPtag>요즘은 인터넷 시대죠. 다양한 정보들을 찾을 수 있지만 정작 우리가 원하는</SecondPtag>
          <SecondPtag>정보를 찾기는 번거로워요. 힙팝은 그런 번거로움을 줄이기 위해 팝업스토어</SecondPtag>
          <SecondPtag>뿐만 아니라 함께 갈만한 곳들도 같이 추천해요.</SecondPtag>
        </div>
        <SecondImg src={NewJeans} />
      </SecondBox>
    </Container>
  );
};

export default AboutInfo;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 150px;
`;

const FirstTitle = styled.h1`
  font-size: 28px;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;

const Wraaper = styled.div`
  display: flex;
  margin-top: 100px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 124px;
`;

const FaceImg = styled.img`
  width: 150px;
  height: 150px;
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
  font-size: 15px;
`;

const SecondTitle = styled.h1`
  font-size: 28px;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);

  margin-top: 100px;
`;

const SecondImg = styled.img`
  width: 560;
  height: 360px;
  object-fit: cover;

  border: 3px solid black;
  border-radius: 18px;
`;

const SecondBox = styled.div`
  margin: 100px 0 200px 0;

  width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SecondHtag = styled.h2`
  font-size: 24px;

  margin-bottom: 50px;
`;

const SecondPtag = styled.p`
  font-size: 17px;
  padding: 8px 0 8px 0;
`;
