import React from 'react';
import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { fetchDetailData } from '../api/store';
import { useParams } from 'react-router-dom';
import { Store } from '../types/types';

const Detail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: storeData,
    isLoading,
    isError
  } = useQuery<Store[] | null>({ queryKey: ['detailData', id], queryFn: () => fetchDetailData(id ?? '') });

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
          <div>제목 : {storeData[0].title}</div>
          <div>내용 : {storeData[0].body}</div>
          <div>지역: {storeData[0].location}</div>
          <div>운영시간 : {storeData[0].opening}</div>
          <div>기간 : {storeData[0].period}</div>
          <div>링크 : {storeData[0].link}</div>
          {storeData[0].images.map((image, index) => (
            <div key={index}>
              <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${image}`} alt={`Image ${index}`} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Detail;

const Img = styled.img`
  width: 500px;
  height: 400px;
`;
