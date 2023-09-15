import styled from 'styled-components';
// 라이브러리
import NotificationsIcon from '@mui/icons-material/Notifications';

export const St = {
  HeaderTag: styled.header`
    position: fixed;
    background-color: var(--primary-color);
    color: white;
    width: 100%;
    height: 80px;
    top: 0;
    z-index: 5;

    .header-wrapper {
      margin: 0 auto;
      height: 100%;
      max-width: 1920px;
      min-width: 764px;
      width: 51%;
      display: flex;
      justify-content: center;
      align-items: center;
      @media (max-width: 390px) {
        width: 80%;
      }
      ul {
        margin: 0 auto;
        width: 40%;
        text-align: center;
        display: flex;
        justify-content: space-between;
        gap: 40px;
      }
      li {
        a {
          color: white;
          display: block;
          width: 100%;
          height: 100%;
          transition: filter 0.3s, transform 0.3s !important;
          font-size: 20px;
          font-weight: 700;
          text-shadow: -1px -1px 0 var(--fifth-color), 1px -1px 0 var(--fifth-color), -1px 1px 0 var(--fifth-color),
            1px 1px 0 var(--fifth-color);

          &:hover {
            filter: brightness(120%) !important;
            color: #f8aa7d !important;
          }
          &:active {
            transform: scale(0.92) !important;
          }
        }
      }
    }
    .logo-wrapper {
      display: flex;
      align-items: center;
      .nyb-logo {
        width: 120px;
        transition: filter 0.3s, transform 0.3s;
        &:hover {
          filter: brightness(120%);
          transform: scale(0.92);
        }
      }
    }
    .user-info {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 44px;
        height: 44px;
        object-fit: cover;
        border-radius: 50%;
      }
      .user-dropdown {
        position: relative;
        cursor: pointer;
        .info-mate {
          display: flex;
          align-items: center;
          text-align: right;
          img {
            transition: filter 0.3s, transform 0.3s;
            &:hover {
              transform: scale(0.92);
              filter: brightness(107%);
            }
          }
          .welcome-mate {
            margin-right: 8px;
            width: 85px;
            p {
              font-size: 14px;
              margin: 10px 0;
            }
          }
        }
        .welcome-mate p:last-child {
          font-weight: 600;
        }
        .dropdown-content {
          position: absolute;
          bottom: -70px;
          right: 0;
          width: 120px;
          background-color: white;
          border: 1px solid var(--fifth-color);
          border-radius: 6px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          display: none;
          z-index: 1;
          a,
          div {
            display: block;
            padding: 8px 10px;
            text-align: center;
            text-decoration: none;
            color: #333;

            &:hover {
              background-color: var(--sixth-color);
              font-weight: 600;
            }

            &:first-child {
              border-radius: 6px 6px 0 0;
            }

            &:last-child {
              border-radius: 0 0 6px 6px;
            }
          }
        }
      }
    }
    .alarm {
      position: absolute;
      margin-left: 170px;
      img {
        position: absolute;
        top: -17%;
        right: -25%;
        width: 10px;
        height: 10px;
      }
      ul {
        position: relative;
      }
    }
  `,

  ModalWrapper: styled.div.attrs<{ isopen: boolean }>((props) => ({
    style: {
      transform: props.isopen ? 'translateY(0)' : 'translateY(100%)'
    }
  }))<{ isopen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
  `,

  AlarmButton: styled(NotificationsIcon)`
    cursor: pointer;
    transition: filter 0.3s, transform 0.3s;
    &:hover {
      transform: rotate(-30deg);
    }
  `
};
