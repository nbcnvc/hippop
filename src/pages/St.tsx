import styled from 'styled-components';

// My Page
// + user info tab, message tab, toggle, tab css
export const MypageTag = styled.div`
  max-width: 1920px;
  min-width: 800px;
  margin: 0 auto;
  margin-top: 10rem;
  width: 50%;
  
  header {
    width: 100%;
    margin: 0 auto;
    margin-top: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    @media (max-width: 1580px) {
      width: 97%;
    }
    @media (max-width: 1310px) {
      width: 94%;
    }
    .avatar-container {
      position: relative;
      margin: 0 auto;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.5rem;
      .circle-bg {
        background-color: white;
      }
      img {
        margin: 0;
        padding: 0;
        margin-left: 0;
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 50%;
      }
      .img-uploader {
        width: 250px;
        position: absolute;
        margin: 140px 120px 0 0;
      }
      button {
        border-radius: 12px;
        width: 80px;
      }
      .user-sub-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
      }
      .btn-wrapper {
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        
      }
      input {
        display: none;
      }
    }
    .receive-btn {
      background-color: var(--sixth-color);
      color: var(--fifth-color);
    }
    .send-btn {
      margin-left: 10px;
      background-color: var(--sixth-color);
      color: var(--fifth-color);
    }
  }
  ul {
    position: absolute;
    width: 100px;
    background: white;
    margin-left: -8px;
    text-align: center;
    top: 85px;
    border-radius: 8px;
    box-shadow: 4px 4px 10px rgb(129, 129, 129);
  }
  li {
    padding: 5px 10px;
    cursor: pointer;
    transition: color 0.3s ease;

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
  h5 {
    margin-top: 4px;
    font-size: 12px;
    cursor: pointer;
  }
  .dropdown-content {
    position: relative;
    ul {
      position: absolute;
      width: 100px;
      background: white;
      left: -104px;
      top: 20px;
      border-radius: 8px;
    }
    li {
      padding: 5px 10px;
      cursor: pointer;
      &:hover {
        border-radius: 8px;
        background-color: #f1f1f1;
      }
    }
  }
  .avatar-container .party-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    margin-bottom: 5px;
    color: var(--primary-color);
    background-color: white;
    padding: 4px;
    border-radius: 50%;
    transition: color 0.3s ease, transform 0.3s ease;
    cursor: pointer;
  }
  .party-icon:hover {
    color: gray;
  }
  .party-icon:active {
    transform: scale(0.9);
  }
  .info-wrapper {
    width: 25%;
    height: 300px;
    padding: 10px 20px;
    border: 3px solid var(--fifth-color);
    border-radius: 18px;
    background-color: white;

    .info-main {
      margin: 1rem 0 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .info-inner {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      line-height: 10px;
      p {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        color: gray;
        span {
          height: 22px;
          color: var(--primary-color);
          font-size: 20px;
          @media (max-width: 844px) {
            font-size: 16px;
          }
        }
      }
      span {
        font-size: 16px;
        margin: 10px 0 0;
        color: gray;
        display: flex;
        justify-content: center;
        align-items: center;
        // @media (max-width: 844px) {
        //   font-size:
        // }
        input {
          width: 55px !important;
          border-radius: 6px;
          border: 3px solid var(--primary-color);
        }
        .user-sub-info {
          display: flex;
        }
      }
    }
    h4 {
      margin-top: 10px;
      color: var(--fifth-color);
      text-align: center;
      cursor: pointer;
      display:flex;
      justify-content: center;
    }

    .btn-mother {
      margin: 0 auto;
      padding: 0;
      // width: 210px;
      display: flex;
      justify-content: center;
      position: relative;
      gap: 10px;

      .name-btn {
        gap: 10px;
        width: 170px;
        height: 49px;
        display: flex;
        position: relative;
        justify-content: center;
      }
      button {
        border-radius: 22px;
        padding: 12px 20px;
        color: white;
      }
      button:first-child {
        background-color: var(--sixth-color);

        font-weight: bold;
      }
      button:last-child {
        font-weight: 600;
        background-color: var(--primary-color);
      }
    }
  }
  .btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .alram-mother {
    padding: 10px 20px;
    border: 3px solid var(--fifth-color);
    border-radius: 18px;
    background-color: white;
    width: 65%;
    height: 300px;
    @media (max-width: 1820px) {
      width: 62%;
    }
    @media (max-width: 1820px) {
      width: 60%;
    }
    .alram-wrapper {
      margin: 0 auto;
      width: 100%;
      height: 240px;
      margin-top: 14px;
      display: flex;
      justify-content: flex-end;
      @media (max-width: 2200px) {
        width: 98%;
      }
      @media (max-width: 1820px) {
        width: 98%;
      }
      button {
        width: 120px;
        height: 22px;
      }
      li {
        width: 100%;
        text-align: center;
        padding: 2px 20px;
        margin: 4px 0;
        background-color: gray;
        border-radius: 4px;
      }
    }
  }
  .toggle-wrapper button {
    background-color: white; /* 비활성 버튼 배경색 */
    color: var(--fifth-color);
    padding: 10px 20px;
    cursor: pointer;
    font-weight: 600;
    margin-right: 10px;
  }
  .btns-wrapper {
    width: 100%;
  }
  button.active {
    background-color: var(--primary-color);
    color: white;
  }
  h3 {
    text-align: center !important;
    margin: 6rem 0 4rem !important;
    font-size: 28px !important;

    p {
      span {
        padding: 2px;
        background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
      }
    }
  }

  .post-wrapper-flex {
    display: flex;
    justify-content: center;
    padding: 80px 0;
    text-align: center;
    font-size: 2rem;
    @media (max-width: 844px) {
      padding: 200px 0;
    }
  }

  .post-wrapper-grid {
    margin: 0 auto;
    padding: 0;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
    max-width: 1920px;
    width: 99%;
    margin-top: 50px;
    @media (max-width: 1850px) {
      gap: 36px;

      margin-bottom: 60px;
    }
    @media (max-width: 1596px) {
      gap: 22px;
    }
    .none-review{
      margin: 0 auto;
    }
    .none-bookmark{
      margin: 0 auto;
    }
    .fid {
      margin: 0 auto;
      width: 100%;
      height: 500px;
      border-radius: 18px;
      border: 3px solid var(--fifth-color);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #ffffff;
      box-sizing: border-box;
      transition: color 0.3s ease, transform 0.3s ease;

      &:hover {
        border: 3px solid var(--primary-color);
      }
      &:active {
        background-color: rgb(215, 215, 219);
        transform: scale(0.98);
      }
      img {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        width: 90%;
        height: 370px;
        object-fit: cover;
        border-radius: 10px;
        border: 2px solid var(--fifth-color);
      }
      .info-box {
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        span {
          h2 {
            font-size: 18px;
            height: 18px;
            overflow: hidden;
            margin-bottom: 20px;
          }
          p {
            margin-top: 20px;
            font-size: 14px;
          }
        }
        button {
          width: 130px;
          padding: 10px 14px;
          background-color: var(--second-color);
          color: white;
          margin-right: 0;
          margin-top: 20px;

          @media (max-width: 1850px) {
            width: 100px;
            padding: 8px 10px;
          }
          @media (max-width: 1850px) {
            width: 100px;
            padding: 8px 10px;
            font-size: 14px;
          }
          @media (max-width: 1596px) {
            width: 70px;
            padding: 8px 12px;

            font-size: 10px;
          }
        }
      }
      .btn-div{
        float:right;
        text-align:center;
        position: relative;
        
        .review-tag{
          position: absolute;
          top: -10px;
          left: 62px;
          width:65px;
          border-radius: 6px;
          padding: 4px 0;
          background-color: pink;
          animation: blink 3s infinite;
          @media (max-width: 1850px) {
            left: 32px;
          }
          @media (max-width: 1596px) {
            left: 8px;
          }
        }

        .mate-tag{
          position: absolute;
          top: -10px;
          left: 76px;
          width:50px;
          border-radius: 6px;
          padding: 4px 0;
          background-color: var(--third-color);
          animation: blink 3s infinite;
          @media (max-width: 1850px) {
            left: 46px;
          }
          @media (max-width: 1596px) {
            left: 16px;
          }
        }
    }
    @keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
      @media (max-width: 1850px) {
        width: 97%;
        height: 400px;

        img {
          width: 84%;
          height: 290px;
        }
      }
      @media (max-width: 1596px) {
        width: 92%;
        height: 314px;

        img {
          width: 90%;
          height: 210px;
        }
      }
    }
  }
  .fids {
    margin: 0 auto;
    padding: 0;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
    max-width: 1920px;
    width: 99%;
    margin-top: 50px;
    @media (max-width: 1850px) {
      gap: 36px;

      margin-bottom: 60px;
    }
    @media (max-width: 1596px) {
      gap: 22px;
    }
    .user-subs {
      margin: 0 auto;
      width: 100%;
      height: 500px;
      border-radius: 18px;
      border: 3px solid var(--fifth-color);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #ffffff;
      transition: color 0.3s ease, transform 0.3s ease;
      &:hover {
        border: 3px solid var(--primary-color);
      }
      &:active {
        background-color: rgb(215, 215, 219);
        transform: scale(0.98);
      }
      @media (max-width: 1850px) {
        width: 97%;
        height: 400px;
  
        img {
          width: 84%;
          height: 290px;
        }
      }
      @media (max-width: 1596px) {
        width: 92%;
        height: 320px;
  
        img {
          width: 90%;
          height: 210px;
        }
      }
    }
      img {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        width: 90%;
        height: 370px;
        object-fit: cover;
        border-radius: 10px;
        border: 2px solid var(--fifth-color);
      }
      .info-box {
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        span {
          h2 {
            font-size: 18px;
            height: 18px;
            overflow: hidden;
            margin-bottom: 30px;
            @media (max-width: 2190px) {
              margin-bottom: 10px;
            }
          }
          p {
            font-size: 14px;
          }
        }
        button {
          width: 130px;
          padding: 10px 14px;
          background-color: var(--second-color);
          color: white;
          margin-right: 0;
          margin-top: 20px;
          @media (max-width: 1850px) {
            width: 100px;
            padding: 8px 10px;
          }
          @media (max-width: 1850px) {
            width: 100px;
            padding: 8px 10px;
            font-size: 14px;
          }
          @media (max-width: 1596px) {
            width: 70px;
            padding: 8px 12px;

            font-size: 10px;
          }
        }
      }
      }
    }
  }
`;
