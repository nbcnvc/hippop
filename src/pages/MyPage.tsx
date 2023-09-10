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
  //쪽지함 버튼 active
  const [isReceivedMessagesActive, setIsReceivedMessagesActive] = useState(true);
  const [isSentMessagesActive, setIsSentMessagesActive] = useState(false);
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

  // 프로필 수정 저장 / 중복체크, 특수문자 방지, 네글자 초과 방지,
  const handleSaveChanges = async () => {
    let nameChanged = false;
    let imageChanged = false;
    let alertMessages = [];

    const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;

    if (newName.trim() !== '' && newName !== currentUser?.name) {
      if (newName.length <= 4) {
        if (!specialCharacters.test(newName)) {
          // 이름 중복 확인
          const { data: existingUsers, error: nameError } = await supabase
            .from('user')
            .select('name')
            .eq('name', newName);

          if (!nameError) {
            if (existingUsers.length === 0) {
              // 중복되는 닉네임이 없는 경우에만 변경 처리
              const { error: updateNameError } = await supabase
                .from('user')
                .update({ name: newName })
                .eq('id', currentUser?.id);

              if (!updateNameError) {
                const userData = await getUser(currentUser?.id ?? '');
                setCurrentUser(userData);
                setEditingName(false);
                nameChanged = true;
              } else {
                console.error(updateNameError);
                alertMessages.push('닉네임 변경 중 오류가 발생했습니다 :(');
              }
            } else {
              alertMessages.push('이미 사용 중인 닉네임입니다 :(');
            }
          } else {
            console.error(nameError);
            alertMessages.push('닉네임 변경 중 오류가 발생했습니다 :(');
          }
        } else {
          alertMessages.push('닉네임에는 특수문자를 포함할 수 없어요 :(');
        }
      } else {
        alertMessages.push('닉네임은 네 글자 이하로 입력해주세요 :(');
      }
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
        alertMessages.push('프로필 사진 변경 중 오류가 발생했습니다! :)');
      }
    }

    if ((nameChanged || imageChanged) && alertMessages.length === 0) {
      // 변경된 내용이 있는 경우
      alertMessages.push('프로필 변경이 완료됐습니다! :)');
      setEditingName(false);
      setImageUploadVisible(false);
    } else if (!nameChanged && !imageChanged && alertMessages.length === 0) {
      // 변경된 내용이 없는 경우
      alertMessages.push('변경된 부분이 없어요! "취소" 버튼을 눌러주세요 :)');
    }

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

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  const handleReceivedMessagesClick = () => {
    setIsReceivedMessagesActive(true);
    setIsSentMessagesActive(false);
    setToggleMsgBox('받은 쪽지함');
  };

  const handleSentMessagesClick = () => {
    setIsReceivedMessagesActive(false);
    setIsSentMessagesActive(true);
    setToggleMsgBox('보낸 쪽지함');
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
            <button
              className={`receive-btn ${isReceivedMessagesActive ? 'active' : ''}`}
              name="받은 쪽지함"
              onClick={handleReceivedMessagesClick}
            >
              받은 쪽지함
            </button>
            <button
              className={`send-btn ${isSentMessagesActive ? 'active' : ''}`}
              name="보낸 쪽지함"
              onClick={handleSentMessagesClick}
            >
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
