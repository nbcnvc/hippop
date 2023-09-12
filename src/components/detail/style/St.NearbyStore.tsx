import Slider from 'react-slick';
import { styled } from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const St = {
  NearbyStoreContainer: styled.div`
    .nearby-store-title {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 150px 0 100px 0;

      h1 {
        color: var(--fifth-color);
        font-size: 30px;
        background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
      }
    }
  `,

  StyledSlider: styled(Slider)`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1920px;
    min-width: 764px;
    margin: 0 auto;

    @media (max-width: 844px) {
      /* width: 744px; */
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

  StyledSliderTriple: styled(Slider)`
    max-width: 1920px;
    min-width: 764px;
    margin: 0 auto;

    @media (max-width: 2100px) {
      display: flex !important;
      justify-content: center;
      align-items: center;
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

  Card: styled.div`
    /* width: 370px !important ; */
    width: 330px !important ;
    height: 500px;
    border-radius: 18px;
    border: 3px solid var(--fifth-color);
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    cursor: pointer;
    box-sizing: border-box;
    transition: color 0.3s ease, transform 0.3s ease;

    &:hover {
      border: 3px solid var(--primary-color);
    }
    &:active {
      background-color: rgb(215, 215, 219);
      transform: scale(0.98);
    }
  `,

  InfoBox: styled.div`
    /* width: 330px; */
    width: 295px;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    margin-top: 20px;
  `,

  Img: styled.img`
    /* width: 340px;
  height: 369px; */
    width: 300px;
    height: 359px;
    object-fit: cover;
    border-radius: 10px;
    border: 3px solid var(--fifth-color);
  `,

  StoreName: styled.div`
    width: 200px;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 13px 0 13px 0;
  `,

  DetailBtn: styled.button`
    width: 85px;
    background-color: var(--second-color);
    color: white;
  `,

  GridContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  GridWrapper: styled.div<{ columnCount: number }>`
    width: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    place-items: center;
    grid-template-columns: ${({ columnCount }) => `repeat(${columnCount}, 1fr)`};

    @media (max-width: 1800px) {
      width: 744px;

      .custom-card {
        width: 330px !important ;
        margin-right: 5px;
      }

      .custom-info {
        width: 295px;
      }

      .custom-img {
        width: 300px;
        height: 359px;
      }
    }
  `,

  NullContainer: styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 26px;
    margin: 100px 0 150px 0;
  `
};
