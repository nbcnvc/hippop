import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Store } from '../../types/types';
import { fetchDetailData } from '../../api/store';
import StoreMap from './StoreMap';
import { styled } from 'styled-components';

const StoreDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: storeData,
    isLoading,
    isError
  } = useQuery<Store | null>({ queryKey: ['detailData', id], queryFn: () => fetchDetailData(id ?? '') });

  if (isError) {
    return <div>데이터를 가져오는 도중 오류가 발생했습니다.</div>;
  }

  if (isLoading) {
    return <div>데이터를 로딩 중입니다.</div>;
  }

  console.log('storeData.', storeData);

  return (
    <div>
      {storeData && (
        <>
          <div>제목 : {storeData.title}</div>
          <div>내용 : {storeData.body}</div>
          <div>지역: {storeData.location}</div>
          <div>운영시간 : {storeData.opening}</div>
          <div>기간 : {storeData.period}</div>
          <div>링크 : {storeData.link}</div>
          {storeData.images.map((image, index) => (
            <div key={index}>
              <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${image}`} alt={`Image ${index}`} />
            </div>
          ))}
          <StoreMap storeLocation={storeData.location} />
        </>
      )}
    </div>
  );
};

export default StoreDetail;

const Img = styled.img`
  width: 500px;
  height: 400px;
`;
