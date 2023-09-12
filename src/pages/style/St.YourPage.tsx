import { styled } from 'styled-components';

export const St = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1920px;
    min-width: 744px;
    width: 50%;
    height: 100%;
    margin: 0 auto;

    margin-top: 120px;
    margin-bottom: 100px;
  `,

  UserWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    overflow-y: auto;
  `,

  UserBox: styled.div`
    display: flex;
    flex-direction: column;
    min-width: 230px;
    width: 30%;
    height: 250px;
    padding: 5px;

    border: 3px solid #333333;
    border-radius: 18px;
    margin-right: 30px;
  `,

  Htag: styled.h2`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 30px;

    font-size: 22px;
  `,

  HtagLine: styled.h2`
    background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
    display: flex;
    /* justify-content: flex-start; */
    align-items: center;

    margin-left: 5px;
    /* width: 50%; */
  `,

  BoxLine: styled.div`
    border-bottom: 2px dashed #333333;

    margin: 15px 10px 5px 10px;
  `,

  UserProfile: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  Between: styled.div`
    display: flex;
    justify-content: space-between;

    margin: 10px 0;
  `,

  Between1: styled.div`
    display: flex;
    justify-content: space-between;

    margin: 10px 0;

    width: 200px;
    font-size: 12px;
  `,

  Img: styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
  `,

  NameBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  Ptag: styled.p`
    font-size: 20px;
    font-weight: 700;
    color: #333333;

    padding: 5px;

    margin-left: 15px;
  `,

  SpanLine: styled.span`
    background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
  `,

  MsgButton: styled.button`
    width: 120px;
    height: 40px;
    margin-left: 10px;
    font-weight: 600;
    font-size: 15px;
  `,

  StoreListBox: styled.div`
    background-color: var(--fourth-color);

    min-width: 330px;
    border: 3px solid #333333;
    border-radius: 18px;
    width: 100%;
    height: 250px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    padding: 5px;
  `,

  BookMarkList: styled.div`
    margin-top: 24px;
  `,

  BookMarkWraaper: styled.div`
    display: flex;
    flex-direction: column;
  `,

  BookMarkBox: styled.div`
    padding: 5px;
  `,

  StoreList: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    margin-left: 10px;
  `,

  StoreInfo: styled.div`
    margin-bottom: 6px;

    display: flex;
    justify-content: space-between;

    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  `,

  Location: styled.span`
    font-size: 14px;
    flex: 0.8;
    margin-left: 20px;
  `,

  TitleBox: styled.div`
    display: flex;
    flex: 3;
    justify-content: flex-start;
    white-space: nowrap;
    overflow: hidden;
    margin-left: 20px;
  `,

  StoreTitle: styled.span`
    display: flex;
    justify-content: flex-start;
    font-size: 15px;
  `,

  StoreDetailArrow: styled.div`
    cursor: pointer;
  `,

  Line: styled.div`
    width: 99%;
    margin: 5px 15px;
    border-bottom: 1px dashed #333333;
  `,

  ReviewWrapper: styled.div`
    margin: 50px 0 0 0;
    min-height: 750px;
  `,

  Htag2: styled.h2`
    margin-bottom: 55px;
    display: flex;
    font-size: 25px;
  `,

  GridContainer: styled.div`
    margin: 0 auto;

    display: grid;
    justify-content: center;
    grid-template-columns: repeat(3, 1fr); // 한 줄에 두 개의 열
    gap: 30px;

    width: 100%;

    margin-top: 28px;
    @media (max-width: 1600px) {
      grid-template-columns: repeat(2, 1fr); // Three columns per row
    }
    @media (max-width: 1000px) {
      grid-template-columns: repeat(2, 1fr); // Three columns per row
    }
  `,

  Card: styled.div`
    width: 100%;
    border-radius: 18px;
    border: 3px solid var(--fifth-color);

    padding: 10px;
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    cursor: pointer;
    position: relative;

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

  PostImg: styled.img`
    border: 2px solid black;
    border-radius: 18px;
    object-fit: cover;

    width: 365px;
    height: 310px;
    margin-bottom: 15px;
  `,

  CardInfo: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: ceoter;

    width: 100%;
  `,

  HtagTttle: styled.h3`
    margin-top: 10px;
    margin-left: 5px;
    margin: 10px 0 5px 5px;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 369px;
  `,

  PtagDate: styled.p`
    margin-top: 12px;
    margin-left: 5px;
    width: 100px;
    display: flex;
    justify-content: flex-start;
  `,

  BtnBox: styled.div`
    display: flex;
    align-items: flex-end;
  `,

  DetailBtn: styled.button`
    margin-top: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;

    font-size: 15px;

    background-color: var(--second-color);
  `,

  H1TagDiv: styled.div`
    width: 100%;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  H1tagLine: styled.h1`
    display: flex;
    align-items: center;

    margin-left: 5px;

    font-size: 30px;
  `
};
