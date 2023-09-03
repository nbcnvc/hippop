import Header from '../components/common/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Footer';
import TopButton from '../components/common/TopButton';
import { ToastContainer } from 'react-toastify'; // ToastContainer 불러오기
import 'react-toastify/dist/ReactToastify.css'; //

const Layout = () => {
  return (
    <>
      <ToastContainer position="top-center" limit={1} />
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
