// 라이브러리
import { Outlet } from 'react-router-dom';
// 컴포넌트
import Footer from '../components/common/Footer';
import TopButton from '../components/common/TopButton';
import Header from '../components/common/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: '5rem' }}>
        <Outlet />
      </div>
      <TopButton />
      <Footer />
    </>
  );
};

export default Layout;
