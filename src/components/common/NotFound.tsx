// style component
import { St } from './style/St.NotFound';

const NotFound = () => {
  return (
    <St.Layout>
      <St.LogoBox>
        <St.Logo src="/asset/nyb_logo.png" alt="Logo Image" width={250} height={140} />
      </St.LogoBox>
      <St.ErrorBox>
        <St.ErrorTitle>ERROR :(</St.ErrorTitle>
        <St.ErrorMsg>죄송합니다. 해당 페이지를 찾을 수 없습니다.</St.ErrorMsg>
      </St.ErrorBox>
    </St.Layout>
  );
};

export default NotFound;
