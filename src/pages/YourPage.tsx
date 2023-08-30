import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const YourPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const { subscriberId } = location.state || {};

  console.log(id);
  useEffect(() => {
    // 이 부분에서 해당 id에 해당하는 사용자 정보를 가져오는 작업을 수행
    // 예를 들어, API 호출 등을 통해 사용자 정보를 가져오고 setUserData로 상태 업데이트
    console.log('Subscriber ID:', subscriberId);
  }, [subscriberId]);

  return (
    <div>
      <div>
        <h2>닉과 이메일</h2>
        {/* <h1>{userData.name}님의 Your Page</h1> */}
        {/* <p>{userData.email}</p> */}
      </div>

      <div>
        <h2>구독 정보</h2>
        {/* 구독 정보 관련 내용 렌더링 */}
      </div>
    </div>
  );
};

export default YourPage;
