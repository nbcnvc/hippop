import React from 'react';
// 라이브러리
import { FacebookIcon, TwitterIcon } from 'react-share';
import CopyToClipboard from 'react-copy-to-clipboard';
// 타입
import { ShareProps } from '../../types/props';
// alert
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// 스타일
import { St } from './style/St.Share';

const Share = ({ storeData }: ShareProps) => {
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
        title: 'FIND YOUR HIPPOP',
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
    <>
      <St.KakaoBtn
        className="grey-btn"
        onClick={() => {
          shareKakao();
        }}
      >
        <St.Img src="/asset/kakaoIcon.png" alt="카카오톡 아이콘" />
      </St.KakaoBtn>
      <St.FacebookBtn url={currentUrl}>
        <FacebookIcon size={47} round={true} />
      </St.FacebookBtn>
      <St.TwitterBtn url={currentUrl}>
        <TwitterIcon size={47} round={true} />
      </St.TwitterBtn>
      <CopyToClipboard
        text={currentUrl}
        onCopy={() =>
          toast.info('주소가 복사되었습니다. :)', {
            className: 'custom-toast',
            theme: 'light'
          })
        }
      >
        <St.Img src="/asset/linkIcon.png" alt="링크 아이콘" />
      </CopyToClipboard>
    </>
  );
};

export default Share;
