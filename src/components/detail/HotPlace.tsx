import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchHotPlaceInfo, fetchHotPlaceImg } from '../../api/store';

import { HotPlaceProps } from '../../types/props';

const HotPlace = ({ roadName }: HotPlaceProps) => {
  const { data: HotPlaceInfo, isLoading, isError } = useQuery({ queryKey: ['hotPlace'], queryFn: fetchHotPlaceInfo });

  const {
    data: HotPlaceImgData,
    isLoading: isLoadingImgData,
    isError: isErrorImgData
  } = useQuery({ queryKey: ['hotPlaceImg'], queryFn: fetchHotPlaceImg });

  console.log(HotPlaceInfo);
  // console.log(HotPlaceImgData);

  if (isLoading || isLoadingImgData) {
    <div>로딩중입니다...</div>;
  }

  if (isError || isErrorImgData) {
    <div>오류가 발생했습니다...</div>;
  }

  return (
    <div>
      {HotPlaceInfo?.filter((item: any) => item.RSTR_RDNMADR.includes(roadName)).map((item: any) => {
        return <div key={item.RSTR_ID}>{item.RSTR_NM}</div>;
      })}
    </div>
  );
};

export default HotPlace;
