import React from 'react';
// 라이브러리
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import CopyToClipboard from 'react-copy-to-clipboard';
import { styled } from 'styled-components';
// 소셜 링크 이미지
import LinkIcon from '../../images/LinkIcon.png';
import KakaoIcon from '../../images/kakaoIcon.png';
import { ShareProps } from '../../types/props';

const Share = ({ onClick, storeData }: ShareProps) => {
  // 현재 주소 가져오기
  const currentUrl = window.location.href;

  const { Kakao } = window;

  // 카카오톡 init
  Kakao.cleanup();
  window.Kakao.init(`${process.env.REACT_APP_KAKAO_JS_APP_KEY}`);

  // 카카오톡 링크 공유
  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'HIPPOP, 팝업의 모든 것',
        description: `${storeData.title} 팝업스토어에 대한 정보를 구경해 보세요!`,
        imageUrl: `${process.env.REACT_APP_SUPABASE_STORAGE_URL}${storeData.images[0]}`,
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl
        }
      },
      buttons: [
        {
          title: '구경하러 가기',
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl
          }
        }
      ]
    });
  };

  return (
    <Container>
      <KakaoBtn
        className="grey-btn"
        onClick={() => {
          shareKakao();
        }}
      >
        <Img src={KakaoIcon} alt="카카오톡 아이콘" />
      </KakaoBtn>
      <FacebookBtn url={currentUrl}>
        <FacebookIcon size={45} round={true} />
      </FacebookBtn>
      <TwitterBtn url={currentUrl}>
        <TwitterIcon size={45} round={true} />
      </TwitterBtn>
      <CopyToClipboard text={currentUrl} onCopy={() => alert('주소가 복사되었습니다.')}>
        <Img src={LinkIcon} alt="링크 아이콘" />
      </CopyToClipboard>
    </Container>
  );
};

export default Share;

const Container = styled.div``;

const Img = styled.img`
  width: 43px;
  &:hover {
    filter: brightness(120%);
  }

  &:active {
    transform: scale(0.95);
  }

  cursor: pointer;
`;

const KakaoBtn = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  background: none;
`;

const FacebookBtn = styled(FacebookShareButton)`
  margin: 0 7px 0 14px;
`;

const TwitterBtn = styled(TwitterShareButton)`
  margin: 0 14px 0 7px;
`;
