import { styled } from 'styled-components';
// 라이브러리
import { FacebookShareButton, TwitterShareButton } from 'react-share';

export const St = {
  Img: styled.img`
    width: 46px;
    &:hover {
      filter: brightness(120%);
    }

    &:active {
      transform: scale(0.95);
    }

    cursor: pointer;
  `,

  KakaoBtn: styled.button`
    padding: 0;
    margin: 0;
    border: none;
    background: none;
  `,

  FacebookBtn: styled(FacebookShareButton)`
    margin: 0 5px 0 12px;
  `,

  TwitterBtn: styled(TwitterShareButton)`
    margin: 0 12px 0 5px;
  `
};
