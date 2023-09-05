import { styled } from 'styled-components';

const NotFound = () => {
  return (
    <Layout>
      <LogoBox>
        <Logo src="/asset/nyb_logo.png" alt="Logo Image" width={250} height={140} />
      </LogoBox>
      <ErrorBox>
        <ErrorTitle>ERROR :(</ErrorTitle>
        <ErrorMsg>죄송합니다. 해당 페이지를 찾을 수 없습니다.</ErrorMsg>
      </ErrorBox>
    </Layout>
  );
};

export default NotFound;

const Layout = styled.div`
  max-width: 1920px;
  min-width: 800px;
  margin: 0 auto;
  width: 50%;
  height: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoBox = styled.div`
  width: 40%;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 400px;
  height: 153px;
  object-fit: cover;
`;

const ErrorBox = styled.div`
  width: 40%;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorTitle = styled.h1`
  font-size: 60px;
  color: var(--primary-color);
`;

const ErrorMsg = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
`;
