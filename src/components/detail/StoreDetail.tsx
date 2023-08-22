import React from 'react';
// 라이브러리
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
// 타입
import { Store } from '../../types/types';
// api
import { fetchDetailData } from '../../api/store';
// 스타일
import { styled } from 'styled-components';
// 컴포넌트
import Share from './Share';
import Calendar from './Calendar';
import BookMark from './BookMark';
import StoreMap from './StoreMap';

const StoreDetail = () => {
  const { id } = useParams<{ id: string }>();

  // store 상세 데이터 가져오기
  const {
    data: storeData,
    isLoading,
    isError
  } = useQuery<Store | null>({ queryKey: ['detailData', id], queryFn: () => fetchDetailData(id ?? '') });

  // 팝업스토어 링크 오픈 핸들러
  const handleopenlink = () => {
    const linkUrl = `${storeData?.link}`;
    window.open(linkUrl, '_blank');
  };

  if (isError) {
    return <div>데이터를 가져오는 도중 오류가 발생했습니다.</div>;
  }

  if (isLoading) {
    return <div>데이터를 로딩 중입니다.</div>;
  }

  return (
    <div>
      {storeData && (
        <>
          <div>제목 : {storeData.title}</div>
          <div>내용 : {storeData.body}</div>
          <div>지역: {storeData.location}</div>
          <div>운영시간 : {storeData.opening}</div>
          <div>
            기간 : {storeData.period_start} ~ {storeData.period_end}
          </div>
          <div>
            <LinkBtn
              onClick={() => {
                handleopenlink();
              }}
            >
              🔗 {storeData.link}
            </LinkBtn>
          </div>
          <div>
            <Share />
          </div>
          <div>
            <BookMark storeData={storeData} />
          </div>
          <ImgBox>
            {storeData.images.map((image, index) => (
              <div key={index}>
                <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${image}`} alt={`Image ${index}`} />
              </div>
            ))}
          </ImgBox>
          <Calendar storeData={storeData} />
          <StoreMap storeLocation={storeData.location} />
        </>
      )}
    </div>
  );
};

export default StoreDetail;

const ImgBox = styled.div`
  display: flex;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
`;

const LinkBtn = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  background: none;
`;
