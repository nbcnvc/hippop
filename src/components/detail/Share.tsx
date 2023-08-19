import React from 'react';
import { styled } from 'styled-components';
// 소셜 라이브러리
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import CopyToClipboard from 'react-copy-to-clipboard';
// 소셜 링크 이미지
import LinkIcon from '../../images/LinkIcon.png';
import KakaoIcon from '../../images/kakaoIcon.png';

const { Kakao } = window;

// Kakao 타입 선언
declare global {
  interface Window {
    Kakao: any;
  }
}

const Share = () => {
  const currentUrl = window.location.href;

  // 카카오톡 init
  Kakao.cleanup();
  window.Kakao.init(`${process.env.REACT_APP_KAKAO_KEY}`);

  // 카카오톡 링크 공유
  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'HiPPOP, 팝업의 모든 것',
        description: '다양한 팝업스토어 정보를 제공 해드립니다!',
        imageUrl: 'https://jlmwyvwmjcanbthgkpmh.supabase.co/storage/v1/object/public/images/store/kusmitea1.jpg',
        link: {
          mobileWebUrl: currentUrl
        }
      },
      buttons: [
        {
          title: '자세히 보러 가기',
          link: { mobileWebUrl: currentUrl }
        }
      ]
    });
  };

  return (
    <>
      <KakaoBtn
        className="grey-btn"
        onClick={() => {
          shareKakao();
        }}
      >
        <Img src={KakaoIcon} alt="카카오톡 아이콘" />
      </KakaoBtn>
      <FacebookShareButton url={currentUrl}>
        <FacebookIcon size={38} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={currentUrl}>
        <TwitterIcon size={38} round={true} />
      </TwitterShareButton>
      <CopyToClipboard text={currentUrl} onCopy={() => alert('주소가 복사되었습니다.')}>
        <Img src={LinkIcon} alt="링크 아이콘" />
      </CopyToClipboard>
    </>
  );
};

export default Share;

const Img = styled.img`
  width: 38px;
`;

const KakaoBtn = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  background: none;
`;
