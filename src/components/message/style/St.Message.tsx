import { styled } from 'styled-components';

export const St = {
  Container: styled.div`
    /* position: absolute;
    z-index: 0; */
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
  `,

  Wrapper: styled.div`
    position: relative;
    background-color: white;
    width: 500px;
    height: 530px;

    border: 3px solid black;
    border-radius: 18px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,

  TopTitle: styled.span`
    margin-bottom: 30px;

    font-size: 20px;
    font-weight: bold;
  `,

  UserInfo: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    width: 400px;
  `,
  SenderInfoBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  SendIconBox: styled.div`
    position: absolute;
    top: 18.6%;
    left: 40%;
    width: 100px;
    height: 50px;
    margin-left: -50px;
    /* background-color: #000; */
    color: #333333;
    /* 애니메이션 이름 */
    animation-name: moveRightToLeft; /* 변경된 애니메이션 이름 적용 */
    animation-duration: 2s;
    animation-iteration-count: infinite; /* 무한 반복 */
    animation-direction: alternate;
    animation-fill-mode: forwards;

    @-webkit-keyframes moveRightToLeft {
      0% {
        left: 45%;
      }
      100% {
        left: 65%;
      }
    }
  `,

  RecieverInfoBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Title: styled.span`
    font-weight: bold;
    padding: 13px;
  `,

  Form: styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    margin-top: 10px;
  `,

  Textarea: styled.textarea`
    width: 400px;
    height: 200px;

    border: 2px solid black;
    border-radius: 18px;

    padding: 10px;
  `,

  Img: styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid black;
  `,

  Name: styled.span`
    font-weight: bold;
    font-size: 20px;

    margin-left: 15px;
  `,

  ButtonBox: styled.div`
    margin-top: 35px;
    display: flex;
  `,

  SendBtn: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 144px;
    height: 42px;
    padding: 10px 20px;
    margin-right: 20px;
  `,

  CancelBtn: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 144px;
    height: 42px;
    padding: 10px 20px;
    background-color: white;
    color: black;

    margin-left: 20px;
  `
};
