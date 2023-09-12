import { styled } from 'styled-components';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Slider from 'react-slick';

export const St = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    margin: 0 auto;
    margin-top: 7rem;

    max-width: 1920px;
    max-height: 100%;
  `,

  TagBox: styled.div`
    display: flex;
    align-items: center;

    margin-top: 40px;
  `,

  TagTitle: styled.div`
    margin-right: 20px;
    font-weight: bold;
    margin-left: 5px;
  `,

  Tag: styled.div`
    margin-right: 5px;
  `,

  SearchBox: styled.div`
    position: relative;

    margin-top: 20px;

    .custom-btn {
      border: 2px solid #333333;

      border-bottom: 5.2px solid var(--fifth-color);
      border-radius: 0 18px 18px 0;
      padding: 13.2px 20px;
    }
  `,

  Reset: styled(RestartAltIcon)`
    position: absolute;

    top: 25%;
    right: 15%;
    cursor: pointer;
  `,

  SearchInput: styled.input`
    width: 450px;
    height: 46.6px;

    box-shadow: 1px;

    border: px solid #333333;
    border-right: none;
    border-radius: 18px 0px 0px 18px;

    outline: none;

    padding-left: 35px;
  `,
  ChipBoX: styled.div`
    display: flex;
  `,

  Title: styled.div`
    font-size: 20px;
    font-weight: bold;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
  `,

  H1Tag: styled.h1`
    font-size: 28px;
    color: #333333;

    background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
    padding: 4px;
  `,

  SearchCountBox: styled.div`
    font-size: 16px;

    margin: 10px 0 35px 0;
  `,

  SearchCount: styled.span`
    color: var(--primary-color);
  `,

  GridContainer1: styled.div`
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr); // Three columns per row
    gap: 30px;
    @media (max-width: 1600px) {
      grid-template-columns: repeat(2, 1fr); // Three columns per row
    }
    @media (max-width: 1000px) {
      grid-template-columns: repeat(2, 1fr); // Three columns per row
    }

    width: 100%;
    /* margin-top: 50px; */
  `,

  GridContainer: styled.div`
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2 1fr); // 한 줄에 두 개의 열 */
    gap: 30px;
    margin-top: 70px;

    /* margin-bottom: 250px; */
  `,

  StyledSlider: styled(Slider)`
    display: flex !important;
    justify-content: center;
    align-items: center;
    width: 1200px;
    @media (max-width: 844px) {
      width: 740px;
    }
    .slick-slide {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .slick-list {
      overflow: hidden;
    }
  `,

  SliderBtn: styled.button`
    background-color: var(--primary-color);
  `,
  ClosedCard: styled.div`
    width: 330px;
    height: 500px;
    border-radius: 18px;
    border: 3px solid var(--fifth-color);

    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    transition: color 0.3s ease, transform 0.3s ease;
    img {
      filter: grayscale(100%); //이미지를 흑백으로 만듭니다.
      object-fit: cover;
    }
    &:hover {
      border: 3px solid var(--primary-color);
    }
    &:active {
      background-color: rgb(215, 215, 219);
      transform: scale(0.98);
    }
  `,
  ClosedStoreInfo: styled.div`
    position: absolute;
    top: 35%;
    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    padding: 5px 10px;
  `,

  CLosed: styled.div`
    font-size: 30px;
    font-weight: bold;
    color: var(--primary-color);
    background-color: white;
    border-radius: 18px;
    padding: 5px 10px;
  `,

  Card: styled.div`
    width: 330px;
    height: 500px;
    border-radius: 18px;
    border: 3px solid var(--fifth-color);
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    position: relative;
    box-sizing: border-box;
    transition: color 0.3s ease, transform 0.3s ease;

    cursor: pointer;
    &:hover {
      border: 3px solid var(--primary-color);
    }
    &:active {
      background-color: rgb(215, 215, 219);
      transform: scale(0.98);
    }
  `,

  RankingNumber: styled.div`
    font-size: 18px;
    font-weight: bold;
    position: absolute;

    bottom: 60px;
    right: 27px;

    background-color: var(--third-color);

    border-radius: 18px;
    padding: 5px 15px;
    transform-origin: left center;

    margin-top: 3px;
  `,

  InfoBox: styled.div`
    width: 90%;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    margin-top: 20px;
  `,

  Img: styled.img`
    width: 300px;
    height: 374px;
    object-fit: cover;
    border-radius: 10px;

    border: 3px solid var(--fifth-color);
  `,

  StoreName: styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    line-height: 1.2;
    font-size: 20px;
    font-weight: bold;

    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    margin: 9px 0 9px 0;
  `,

  Period: styled.div`
    font-size: 14px;
  `,

  DetailBtn: styled.button`
    background-color: var(--second-color);
    width: 120px;
    color: white;
  `,

  Ref: styled.div`
    margin-top: 350px;
  `
};
