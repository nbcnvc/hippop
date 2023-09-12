import { styled } from 'styled-components';
// mui
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Menu from '@mui/material/Menu';
import RoomIcon from '@mui/icons-material/Room';
import { styled as muiStyled } from '@mui/material/styles';

export const St = {
  DetailContainer: styled.div`
    max-width: 1920px;
    /* min-width: 800px; */
    min-width: 764px;
    width: 50%;
    height: 100%;
    margin: 90px auto;

    .store-detail {
      display: flex;
      gap: 30px;
      margin-bottom: 150px;

      .image-slider {
        width: 630px;
        height: 580px;

        div {
          display: flex;
          justify-content: center;

          img {
            width: 610px;
            height: 570px;
            object-fit: cover;
            border: 3px solid var(--fifth-color);
            border-radius: 10px;
          }
        }
      }

      .store-info {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        padding: 15px 0 10px 0;

        h1 {
          color: var(--fifth-color);
          font-size: 32px;
          background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
        }

        .store-body {
          width: 100%;
          height: auto;
          border-bottom: 2px dashed #65656587;
          margin-bottom: 10px;

          div {
            max-height: 100px;
            min-height: 60px;

            font-size: 18px;
            line-height: 26px;
            overflow: auto;
            margin: 20px 0;
            padding: 0 25px 0 5px;
          }
        }

        .store-text {
          width: 635px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          padding-left: 5px;

          span {
            font-size: 18px;
            font-weight: 600;
            margin-right: 12px;
          }

          p {
            text-decoration: underline;
            cursor: pointer;
            margin-right: 15px;
            &:hover {
              color: var(--primary-color);
            }
          }
        }

        button {
          padding: 13px;
        }

        .button-box {
          display: flex;
          align-items: center;
        }
      }
    }

    @media (max-width: 2200px) {
      .store-detail {
        width: 100%;
        flex-direction: column;
        gap: 80px;
        margin: 120px auto;

        .image-slider {
          width: 100%;
        }

        .store-info {
          display: flex;
          justify-content: center;
          align-items: center;
          /* text-align: left; */
          text-align: center;

          .store-body {
            width: 95%;
            display: flex;
            justify-content: center;
            align-items: center;

            div {
              width: 90%;
            }
          }

          .store-text {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .button-box {
            margin-top: 20px;
          }
        }
      }
    }
  `,

  TopBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 2200px) {
      /* flex-direction: row; */
      justify-content: center;
      align-items: center;
    }
  `,

  ShareBtn: styled.button`
    background-color: #fff;
    color: var(--fifth-color);
    padding: 14px 25px !important;
    margin: 10px 5px;
  `,

  LocationIcon: styled(RoomIcon)`
    margin-left: 10px;
    cursor: pointer;

    &:hover {
      color: var(--primary-color);
      transform: scale(1.1);
    }
  `,

  LinkIcon: styled(InsertLinkIcon)`
    margin-left: 3px;
    cursor: pointer;

    &:hover {
      color: var(--primary-color);
      transform: scale(1.1);
    }
  `,

  CalendarIcon: styled(CalendarMonthIcon)`
    margin: 0 7px 0 15px;
    cursor: pointer;

    &:hover {
      color: var(--primary-color);
      transform: scale(1.1);
    }
  `,

  CalendarClickInfo: styled.div`
    animation: blink 5s infinite; /* 깜빡거리는 애니메이션 적용 */

    @keyframes blink {
      0% {
        opacity: 1; /* 시작 시 fully visible */
      }
      50% {
        opacity: 0; /* 중간에 투명 */
      }
      100% {
        opacity: 1; /* 다시 fully visible */
      }
    }
  `,

  CalendarBox: styled.div`
    position: absolute;
    top: 40%;
    z-index: 3; /* 다른 요소 위에 나타나도록 설정 */
  `,

  ShareMenu: muiStyled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: '18px',
      padding: '15px 22px',
      marginTop: '10px'
    },

    '& .MuiList-root': {
      listStyle: 'none',
      margin: '0',
      padding: '0',
      position: 'relative'
    }
  })),

  ShareInfo: styled.div`
    margin-bottom: 15px;
    font-weight: 600;
  `
};
