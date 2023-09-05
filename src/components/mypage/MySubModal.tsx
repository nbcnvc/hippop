import { useQuery } from '@tanstack/react-query';
import { useCurrentUser } from '../../store/userStore';
import { getSubInfo, getSubList } from '../../api/subscribe';
import { MySubModalProps } from '../../types/props';
import { styled } from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom';
import shortid from 'shortid';

const MySubModal = ({ setIsSubModal }: MySubModalProps) => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const currentUserId = currentUser?.id;
  const { data: sublistData, isLoading, isError } = useQuery(['subinfo'], () => getSubInfo(currentUserId ?? ''));
  const closeSubModal = () => {
    setIsSubModal(false);
  };
  const naviSubPage = (userId: string) => {
    navigate(`/yourpage/${shortid.generate()}`, { state: { userId: userId } });
  };

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류입니다.</div>;
  }
  return (
    <>
      <ModalContainer>
        <ModalBox>
          <ButtonBox>
            <XButton onClick={closeSubModal} />
          </ButtonBox>
          <UserContainer>
            {sublistData?.map((sub) => {
              return (
                <UserBox key={sub.id} onClick={() => naviSubPage(sub.subscribe_to)}>
                  <div>
                    <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${sub.to.avatar_url}`} alt="User Avatar" />
                  </div>
                  <Name>
                    팝업메이트 <NameLine>{sub.to.name}</NameLine> 님
                  </Name>
                </UserBox>
              );
            })}
          </UserContainer>
        </ModalBox>
      </ModalContainer>
    </>
  );
};

export default MySubModal;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  backdrop-filter: blur(5px);
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  width: 400px;
  height: 600px;
  padding: 20px;
  background-color: #fff;
  border-radius: 18px;
  border: 3px solid var(--fifth-color);
  overflow: scroll;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const XButton = styled(CloseRoundedIcon)`
  cursor: pointer;
`;

const UserContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserBox = styled.div`
  padding: 10px;
  margin: 10px;
  border: 3px solid var(--fifth-color);
  border-radius: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 5px 10px;
`;

const NameLine = styled.span`
  padding: 2px;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;
