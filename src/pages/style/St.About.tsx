import styled from 'styled-components';
// 라이브러리

export const St = {
  BannerContainer: styled.div`
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 1200px;
    position: relative;
  `,
  ImgContainer: styled.div`
    margin: 0 auto;
    position: relative;
    max-width: 100%;
    width: 100%;
    height: 100%;
    @media (max-width: 844px) {
      width: 100%;
      // width: 844px;
    }
  `,
  Img: styled.img`
    margin: 0 auto;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.65);
    @media (max-width: 844px) {
      width: 100%;
    }
  `,
  BannerText: styled.div`
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
  `,
  TitleText: styled.p`
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
  `,
  Text: styled.p`
    padding: 5px;
    font-size: 18px;
    text-align: center;
    @media (max-width: 1100px) {
      font-size: 14px;
    }
  `,

  Container: styled.div`
    margin: 0 auto;
    max-width: 1920px;
    min-width: 744px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 160px;
  `,

  FirstTitle: styled.h1`
    font-size: 28px;
    background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
  `,

  Wraaper: styled.div`
    display: flex;
    margin-top: 50px;
  `,

  Box: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding: 60px;
  `,

  FaceImg: styled.img`
    width: 100%;
    height: 100%;
  `,

  ColorTag1: styled.div`
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
  `,

  ColorTag2: styled.div`
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
  `,

  ColorTag3: styled.div`
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
  `,

  Ptag: styled.p`
    font-size: 16px;
    line-height: 20px;
  `,

  SecondTitle: styled.h1`
    font-size: 28px;
    background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);

    margin-top: 100px;
  `,

  SecondBox: styled.div`
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
  }
`,
  SecondImg: styled.img`
    width: 50%;
    object-fit: cover;
    border: 3px solid black;
    border-radius: 18px;
    @media (max-width: 844px) {
      width: 80%;
    }
  `,

  SecondHtag: styled.h2`
    font-size: 24px;

    margin-bottom: 50px;
    @media (max-width: 2100px) {
      padding: 8px 14px 0 0;
    }
    @media (max-width: 844px) {
      margin-top: 2rem;
    }
  `,

  SecondPtag: styled.p`
    font-size: 17px;
    padding: 8px 0 8px 0;
    @media (max-width: 2100px) {
      padding: 8px 14px 8px 0;
    }
  `
};
