import React, { useState, useRef, useEffect } from 'react';
// 라이브러리
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
// 타입
import { MessageType } from '../types/types';
// 컴포넌트
import SendBox from '../components/message/SendBox';
import MessageReply from '../components/message/MessageReply';
import ReceiveBox from '../components/message/ReceiveBox';
import MyReview from '../components/mypage/MyReview';
import MyBookmark from '../components/mypage/MyBookmark';
import MySubModal from '../components/mypage/MySubModal';
// ㅁpi
import { getUser } from '../api/user';
import { supabase } from '../api/supabase';
//store
import { setUserStore, useCurrentUser } from '../store/userStore';
import { randomFileName } from '../hooks/useHandleImageName';
// react-icons
import { BsFillPeopleFill } from 'react-icons/bs';
// mui
import PartyModeIcon from '@mui/icons-material/PartyMode';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Skeleton } from '@mui/material';

// style component
import { MypageTag } from './St';
const MyPage = () => {
  // 유저 정보
  const currentUser = useCurrentUser();
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // 쪽지 답장 모달
  const [replyModal, setReplyModal] = useState<boolean | null>(null);
  const [sendMsgUser, setSendMsgUser] = useState<MessageType | null>(null);
  // 구독 목록 메뉴 상태
  const [isSubModal, setIsSubModal] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  // 게시글 & 북마크 토글
  const [activeSection, setActiveSection] = useState('myReview');
  const [toggleMsgBox, setToggleMsgBox] = useState<string>('받은 쪽지함');
  const imageInputRef = useRef(null);
  const setCurrentUser = setUserStore((state) => state.setCurrentUser);

  // 구독목록 visible
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsSubModal(false);
      }
    }
    window.addEventListener('mousedown', handleOutsideClick);
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // 프로필 수정 저장
  const handleSaveChanges = async () => {
    let nameChanged = false;
    let imageChanged = false;
    let alertMessages = []; // 알림 메시지를 저장할 배열

    if (newName.trim() !== '' && newName.length <= 4 && newName !== currentUser?.name) {
      // 이름 변경 처리
      const { error: nameError } = await supabase.from('user').update({ name: newName }).eq('id', currentUser?.id);
      if (!nameError) {
        const userData = await getUser(currentUser?.id ?? '');
        setCurrentUser(userData);
        setEditingName(false); // 수정 모드 해제
        nameChanged = true;
      } else {
        console.error(nameError);
        alertMessages.push('닉네임 변경 중 오류가 발생했습니다 :(');
      }
    } else if (newName.trim() !== '' && newName.length > 4) {
      alertMessages.push('닉네임은 네 글자 이하로 입력해주세요.');
    }

    // 나머지 조건에 대한 else 추가
    if (selectedImage) {
      try {
        const newFileName = randomFileName(selectedImage.name);
        const renamedFile = new File([selectedImage], newFileName);
        const { data } = await supabase.storage.from('images').upload(`profile/${renamedFile.name}`, renamedFile);
        if (data) {
          const imgUrl = data.path;
          await supabase.from('user').update({ avatar_url: imgUrl }).eq('id', currentUser?.id);
          // Fetch updated user data using getUser
          if (currentUser) {
            const userData = await getUser(currentUser?.id ?? '');
            setCurrentUser(userData);
            imageChanged = true;
          }
        }
      } catch (error) {
        console.error(error);
        alertMessages.push('프로필 사진 변경 중 오류가 발생했습니다 ! :)');
      }
    }

    if (nameChanged || imageChanged) {
      alertMessages.push('프로필 변경이 완료됐습니다 ! :)');
      setEditingName(false); // 수정 모드 해제
      setImageUploadVisible(false);
    } else if (!nameChanged && !imageChanged) {
      alertMessages.push('변경된 부분이 없어요 :( [취소] 버튼을 눌러주세요 ! :)');
    }

    // alertMessages 배열에 있는 모든 메시지를 표시
    alertMessages.forEach((message) => {
      toast.info(message, {
        className: 'custom-toast',
        theme: 'light'
      });
    });
  };

  // 닉네임 수정 handler
  const handleNameEdit = () => {
    setEditingName(true);
    setNewName(currentUser?.name || '');
    setSelectedImage(null);
    setImageUploadVisible(!imageUploadVisible);
  };
  // 수정 모드 해제
  const handleNameCancel = () => {
    setEditingName(false);
    setSelectedImage(null);
    setImageUploadVisible(!imageUploadVisible);
  };
  // 프로필 이미지 변경
  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
      setImageUploadVisible(true);
    } else {
      setSelectedImage(null); // 이미지를 선택하지 않은 경우에 null로 설정
      setImageUploadVisible(false);
    }
  };
  // 프로필 이미지 선택-미리보여주기
  const handleSectionChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    const section = button.getAttribute('data-section');
    if (section !== null) {
      setActiveSection(section);
    }
  };
  const ClickToggleBox = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setToggleMsgBox(name);
  };

  return (
    <MypageTag>
      <header>
        {/* user Info tab */}
        <div className="info-wrapper">
          <div className="info-main">
            <div className="info-inner">
              <p>
                Welcome,
                <br />
                <span>
                  {editingName ? (
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      style={{ width: '20%' }}
                    />
                  ) : (
                    currentUser?.name
                  )}
                  님의 My Page
                </span>
              </p>
              <span>
                <div className="user-sub-info">{currentUser?.email}</div>
              </span>
            </div>
            {currentUser?.avatar_url && (
              <div className="avatar-container">
                {selectedImage ? (
                  <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" width={120} height={120} />
                ) : (
                  <div className="avatar">
                    {currentUser.avatar_url && (
                      <img
                        src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${currentUser.avatar_url}`}
                        alt="User Avatar"
                      />
                    )}
                  </div>
                )}
                <div className="circle-bg"></div>
                {imageUploadVisible && (
                  <div className="img-uploader">
                    <label htmlFor="file-input">
                      <PartyModeIcon className="party-icon" />
                      <input
                        type="file"
                        id="file-input"
                        accept="image/*"
                        ref={imageInputRef}
                        onChange={handleImageInputChange}
                      />
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="btn-mother">
            {isSubModal && <MySubModal setIsSubModal={setIsSubModal} />}
            {editingName ? (
              <div className="name-btn">
                <button onClick={handleNameCancel}>취소</button>
                <button onClick={handleSaveChanges}>저장</button>
              </div>
            ) : (
              currentUser && <button onClick={handleNameEdit}>프로필 변경</button>
            )}
          </div>
          <h4 onClick={() => setIsSubModal(true)}>
            구독한 유저 <BsFillPeopleFill />
          </h4>
        </div>
        {/* message tab */}
        <div className="alram-mother">
          <div className="btn-wrapper">
            <button name="받은 쪽지함" onClick={ClickToggleBox}>
              받은 쪽지함
            </button>
            <button className="send-btn" name="보낸 쪽지함" onClick={ClickToggleBox}>
              보낸 쪽지함
            </button>
          </div>
          <div className="alram-wrapper">
            {toggleMsgBox === '받은 쪽지함' ? (
              <ReceiveBox toggleMsgBox={toggleMsgBox} setSendMsgUser={setSendMsgUser} setReplyModal={setReplyModal} />
            ) : (
              <SendBox toggleMsgBox={toggleMsgBox} setSendMsgUser={setSendMsgUser} setReplyModal={setReplyModal} />
            )}
          </div>
          {replyModal && <MessageReply sendMsgUser={sendMsgUser} setOpenReply={setReplyModal} />}
        </div>
      </header>
      {/* Toggle tab */}
      <div className="toggle-wrapper">
        <h3>
          {activeSection === 'myReview' ? (
            <p>
              <span>내가 찜한</span> 팝업스토어 :D
            </p>
          ) : (
            <p>
              <span>나만의</span> 북마크-리스트 :)
            </p>
          )}
        </h3>
        <div className="btns-wrapper">
          <button
            data-section="myReview"
            onClick={handleSectionChange}
            className={activeSection === 'myReview' ? 'active' : ''}
          >
            나의 게시글
          </button>
          <button
            data-section="myBookmark"
            onClick={handleSectionChange}
            className={activeSection === 'myBookmark' ? 'active' : ''}
          >
            나의 북마크
          </button>
        </div>
        {/* Review tab */}
        {activeSection === 'myReview' && <MyReview activeSection={activeSection} />}
        {/* Bookmark tab */}
        {activeSection === 'myBookmark' && <MyBookmark activeSection={activeSection} />}
      </div>
    </MypageTag>
  );
};

export default MyPage;

// const MypageTag = styled.div`
//   max-width: 1920px;
//   min-width: 800px;
//   margin: 0 auto;
//   margin-top: 10rem;
//   width: 50%;
//   header {
//     margin-top: 4rem;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     gap: 20px;

//     .avatar-container {
//       position: relative;
//       margin: 0 auto;
//       padding: 0;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       margin-top: 0.5rem;
//       .circle-bg {
//         background-color: white;
//       }
//       img {
//         margin: 0;
//         padding: 0;
//         margin-left: 0;
//         width: 120px;
//         height: 120px;
//         object-fit: cover;
//         border-radius: 50%;
//       }
//       .img-uploader {
//         width: 250px;
//         position: absolute;
//         margin: 140px 120px 0 0;
//       }
//       button {
//         border-radius: 12px;
//         width: 80px;
//       }
//       .user-sub-info {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         position: relative;
//       }
//       .btn-wrapper {
//         margin-top: 2rem;
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         position: relative;
//       }
//       input {
//         display: none;
//       }
//     }
//   }
//   ul {
//     position: absolute;
//     width: 100px;
//     background: white;
//     margin-left: -8px;
//     text-align: center;
//     top: 85px;
//     border-radius: 8px;
//     box-shadow: 4px 4px 10px rgb(129, 129, 129);
//   }
//   li {
//     padding: 5px 10px;
//     cursor: pointer;
//     transition: color 0.3s ease;

//     &:hover {
//       background-color: var(--sixth-color);
//       font-weight: 600;
//     }

//     &:first-child {
//       border-radius: 6px 6px 0 0;
//     }

//     &:last-child {
//       border-radius: 0 0 6px 6px;
//     }
//   }
//   h5 {
//     margin-top: 4px;
//     font-size: 12px;
//     cursor: pointer;
//   }
//   .dropdown-content {
//     position: relative;
//     ul {
//       position: absolute;
//       width: 100px;
//       background: white;
//       left: -104px;
//       top: 20px;
//       border-radius: 8px;
//     }
//     li {
//       padding: 5px 10px;
//       cursor: pointer;
//       &:hover {
//         border-radius: 8px;
//         background-color: #f1f1f1;
//       }
//     }
//   }
//   .avatar-container .party-icon {
//     position: absolute;
//     bottom: 0;
//     right: 0;
//     margin-bottom: 5px;
//     color: var(--primary-color);
//     background-color: white;
//     padding: 4px;
//     border-radius: 50%;
//     transition: color 0.3s ease, transform 0.3s ease;
//     cursor: pointer;
//   }
//   .party-icon:hover {
//     color: gray;
//   }
//   .party-icon:active {
//     transform: scale(0.9);
//   }
//   .info-wrapper {
//     width: 25%;
//     height: 300px;
//     padding: 10px 20px;
//     border: 3px solid var(--fifth-color);
//     border-radius: 18px;
//     background-color: white;

//     .info-main {
//       margin: 1rem 0 0.5rem;
//       display: flex;
//       flex-direction: column;
//       align-items: flex-end;
//     }
//     .info-inner {
//       width: 100%;
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       align-items: center;
//       line-height: 10px;
//       p {
//         font-size: 18px;
//         font-weight: bold;
//         text-align: center;
//         color: gray;
//         span {
//           height: 22px;
//           color: var(--primary-color);
//           font-size: 20px !important;
//         }
//       }
//       span {
//         font-size: 16px;
//         margin: 10px 0 0;
//         color: gray;
//         display: flex;
//         justify-content: center;
//         align-items: center;

//         input {
//           width: 55px !important;
//           border-radius: 6px;
//           border: 3px solid var(--primary-color);
//         }
//         .user-sub-info {
//           display: flex;
//         }
//       }
//     }
//     h4 {
//       margin-top: 10px;
//       color: var(--fifth-color);
//       text-align: center;
//       cursor: pointer;
//     }

//     .btn-mother {
//       margin: 0 auto;
//       padding: 0;
//       width: 210px;
//       display: flex;
//       justify-content: center;
//       position: relative;
//       gap: 10px;

//       .name-btn {
//         gap: 10px;
//         width: 170px;
//         height: 49px;
//         display: flex;
//         position: relative;
//         justify-content: center;
//       }
//       button {
//         border-radius: 22px;
//         padding: 12px 20px;
//         color: white;
//       }
//       button:first-child {
//         background-color: var(--sixth-color);

//         font-weight: bold;
//       }
//       button:last-child {
//         font-weight: 600;
//         background-color: var(--primary-color);
//       }
//     }
//   }
//   .btn-wrapper {
//     display: flex;
//     align-items: center;
//     justify-content: flex-end;
//   }
//   .alram-mother {
//     padding: 10px 20px;
//     border: 3px solid var(--fifth-color);
//     border-radius: 18px;
//     background-color: white;
//     width: 65%;
//     height: 300px;

//     .alram-wrapper {
//       width: 100%;
//       height: 240px;
//       margin-top: 14px;
//       // border: 1px dotted gray;
//       display: flex;
//       justify-content: flex-end;
//       button {
//         width: 120px;
//         height: 22px;
//       }
//       li {
//         width: 100%;
//         text-align: center;
//         padding: 2px 20px;
//         margin: 4px 0;
//         background-color: gray;
//         border-radius: 4px;
//       }
//     }
//   }
//   .toggle-wrapper button {
//     background-color: white; /* 비활성 버튼 배경색 */
//     color: var(--fifth-color);
//     padding: 10px 20px;
//     cursor: pointer;
//     font-weight: 600;
//     margin-right: 10px;
//   }
//   .btns-wrapper {
//     width: 100%;
//   }
//   button.active {
//     background-color: var(--primary-color);
//     color: white;
//   }
//   h3 {
//     text-align: center !important;
//     margin: 6rem 0 4rem !important;
//     font-size: 28px !important;

//     p {
//       span {
//         padding: 2px;
//         background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
//       }
//     }
//   }
//   .send-btn {
//     margin-left: 10px;
//     background-color: var(--sixth-color);
//     color: var(--fifth-color);
//     font-weight: 600;
//   }
//   .post-wrapper {
//     margin: 0 auto;
//     padding: 0;
//     display: grid;
//     justify-content: center;
//     align-items: center;
//     grid-template-columns: repeat(3, 1fr);
//     gap: 50px;
//     max-width: 1920px;
//     width: 99%;
//     margin-top: 50px;

//     .fid {
//       margin: 0 auto;
//       width: 100%;
//       height: 500px;
//       border-radius: 18px;
//       border: 3px solid var(--fifth-color);
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       align-items: center;
//       background-color: #ffffff;
//       box-sizing: border-box;
//       transition: color 0.3s ease, transform 0.3s ease;
//       &:hover {
//         border: 6px solid var(--primary-color);
//       }
//       &:active {
//         background-color: rgb(215, 215, 219);
//         transform: scale(0.98);
//       }
//       img {
//         margin: 0 auto;
//         display: flex;
//         justify-content: center;
//         width: 90%;
//         height: 370px;
//         object-fit: cover;
//         border-radius: 10px;
//         border: 2px solid var(--fifth-color);
//       }
//       .info-box {
//         width: 90%;
//         margin: 0 auto;
//         display: flex;
//         justify-content: space-between;
//         align-items: flex-end;
//         margin-top: 20px;
//         &:first-child {
//           width: 80%;
//         }
//         h2 {
//           height: 16px;
//           overflow: hidden;
//         }
//         button {
//           width: 130px;
//           padding: 10px 14px;
//           background-color: var(--second-color);
//           color: white;
//           margin-right: 0;
//         }
//       }
//     }
//   }
//   .fids {
//     margin: 0 auto;
//     padding: 0;
//     display: grid;
//     justify-content: center;
//     align-items: center;
//     grid-template-columns: repeat(3, 1fr);
//     gap: 50px;
//     max-width: 1920px;
//     width: 99%;
//     margin-top: 50px;

//     .user-subs {
//       margin: 0 auto;
//       width: 100%;
//       height: 500px;
//       border-radius: 18px;
//       border: 3px solid var(--fifth-color);
//       box-sizing: border-box;
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       align-items: center;
//       background-color: #ffffff;
//       transition: color 0.3s ease, transform 0.3s ease;
//       &:hover {
//         border: 6px solid var(--primary-color);
//       }
//       &:active {
//         background-color: rgb(215, 215, 219);
//         transform: scale(0.98);
//       }
//       img {
//         margin: 0 auto;
//         display: flex;
//         justify-content: center;
//         width: 90%;
//         height: 370px;
//         object-fit: cover;
//         border-radius: 10px;
//         border: 2px solid var(--fifth-color);
//       }
//       .info-box {
//         width: 90%;
//         margin: 0 auto;
//         display: flex;
//         justify-content: space-between;
//         align-items: flex-end;
//         margin-top: 20px;
//         &:first-child {
//           width: 80%;
//         }
//         h2 {
//           height: 16px;
//           overflow: hidden;
//         }
//         button {
//           width: 130px;
//           padding: 10px 14px;
//           background-color: var(--second-color);
//           color: white;
//           margin-right: 0;
//         }
//       }
//     }
//   }
// `;
