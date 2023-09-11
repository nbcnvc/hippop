// 라이브러리
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import shortid from 'shortid';
// zustand
import { useCurrentUser } from '../../store/userStore';
// api
import { getSubInfo } from '../../api/subscribe';
// 타입
import { MySubModalProps } from '../../types/props';
// mui
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

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
          <div style={{ padding: '20px' }}>
            <ButtonBox>
              <XButton onClick={closeSubModal} />
            </ButtonBox>
            <UserContainer>
              {sublistData?.length === 0 ? (
                <div className="none-subs">아직 구독한 사람이 없어요 !</div>
              ) : (
                sublistData?.map((sub) => {
                  return (
                    <UserBox key={sub.id} onClick={() => naviSubPage(sub.subscribe_to)}>
                      <div>
                        <Img
                          src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${sub.to.avatar_url}`}
                          alt="User Avatar"
                        />
                      </div>
                      <Name>
                        팝업메이트 <NameLine>{sub.to.name}</NameLine> 님
                      </Name>
                    </UserBox>
                  );
                })
              )}
            </UserContainer>
          </div>
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
  background: rgba(183, 79, 231, 0.71);
  border-radius: 18px;
  border: 3px solid var(--fifth-color);
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const XButton = styled(CloseRoundedIcon)`
  cursor: pointer;
`;

const UserContainer = styled.div`
  width: 300px;
  max-height: 360px;
  margin: 10px 0;
  padding: 4px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: scroll;
  .none-subs {
    background-color: white;
    padding: 10px;
    text-align: center;
    border-radius: 8px;
    border: 3px solid var(--fifth-color);
  }
`;

const UserBox = styled.div`
  padding: 10px;
  margin: 10px;
  border: 3px solid var(--fifth-color);
  background-color: var(--fourth-color);
  border-radius: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, font-weight 0.3s ease;

  &:hover {
    border: 3px solid var(--primary-color);
    background-color: var(--sixth-color);
    font-weight: 600;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const Name = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin: 0 0 5px 10px;
  color: var(--primary-color);
`;

const NameLine = styled.span`
  font-size: 18px;
  color: var(--fifth-color);
  padding: 2px;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;
