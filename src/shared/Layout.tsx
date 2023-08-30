import Header from '../components/common/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Footer';
import TopButton from '../components/common/TopButton';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <TopButton />
      <Footer />
    </>
  );
};

export default Layout;
