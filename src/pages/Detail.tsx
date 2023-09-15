// 컴포넌트
import { useEffect } from 'react';
import StoreDetail from '../components/detail/StoreDetail';

const Detail = () => {
  useEffect(() => {
    return () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };
  }, []);
  return (
    <div style={{ marginTop: '10rem' }}>
      <StoreDetail />
    </div>
  );
};

export default Detail;
