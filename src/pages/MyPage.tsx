import React, { useState, useRef } from 'react';

import { styled } from 'styled-components';
import { setUserStore, useCurrentUser } from '../store/userStore';
import { supabase } from '../api/supabase';
import PartyModeIcon from '@mui/icons-material/PartyMode';
import { randomFileName } from '../hooks/useHandleImageName';
import { getProfileImg, getUser } from '../api/user';
import { useQuery } from '@tanstack/react-query';

import SendBox from '../components/message/SendBox';
import MessageReply from '../components/message/MessageReply';
import { MessageType } from '../types/types';
import RecieveBox from '../components/message/RecieveBox';

const MyPage = () => {
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // 쪽지 답장 모달
  const [replyModal, setReplyModal] = useState<boolean | null>(null);
  const [sendMsgUser, setSendMsgUser] = useState<MessageType | null>(null);

  const [toggleMsgBox, setToggleMsgBox] = useState<string>('받은 쪽지함');
  const imageInputRef = useRef(null);

  const setCurrentUser = setUserStore((state) => state.setCurrentUser);
  // 현재유저 정보 가져오기

  const currentUser = useCurrentUser();

  const handleNameEdit = () => {
    setEditingName(true);
    setNewName(currentUser?.name || '');
  };

  const handleNameSave = async () => {
    // 여기서 서버 요청 등으로 새로운 이름을 저장하는 로직을 구현

    // let { data: user, error } = await supabase.from('user').select('name');
    // console.log(user);

    const { error } = await supabase.from('user').update({ name: newName }).eq('id', currentUser?.id);
    if (currentUser) {
      const userData = await getUser(currentUser?.id);
      setCurrentUser(userData);
    }
    console.log(error);
  };

  const handleImageUpload = () => {
    setSelectedImage(null);
    setImageUploadVisible(!imageUploadVisible);
  };

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
  const { data }: any = useQuery(['profileImg', currentUser?.id], () => getProfileImg(currentUser?.id));

  const handleImageConfirm = async () => {
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
            const userData = await getUser(currentUser?.id);
            setCurrentUser(userData);
            console.log('userData', userData);
          }

          alert('프로필 변경이 완료됐습니다 :)');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const ClickToggleBox = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setToggleMsgBox(name);
  };

  return (
    <MypageTag>
      <div className="info-wrapper">
        {currentUser?.avatar_url && (
          <div className="avatar-container">
            {currentUser.avatar_url.startsWith('profile/') ? (
              <img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${currentUser.avatar_url}`} alt="User Avatar" />
            ) : (
              <img src={currentUser.avatar_url} alt="User Avatar" />
            )}
            <PartyModeIcon className="party-icon" onClick={handleImageUpload} />
            {imageUploadVisible && (
              <div>
                <input type="file" ref={imageInputRef} onChange={handleImageInputChange} />
                <button onClick={handleImageConfirm}>확인</button>
              </div>
            )}
          </div>
        )}
        <div className="info-inner">
          <p>
            Welcome,
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
          </p>
          <span>
            {currentUser?.email}
            <div>
              {editingName ? (
                <>
                  <button onClick={handleNameSave}>저장</button>
                  <button onClick={() => setEditingName(false)}>취소</button>
                </>
              ) : (
                <button onClick={handleNameEdit}>수정</button>
              )}
            </div>
          </span>
        </div>
      </div>
      <div>
        <button name="받은 쪽지함" onClick={ClickToggleBox}>
          받은 쪽지함
        </button>
        <button name="보낸 쪽지함" onClick={ClickToggleBox}>
          보낸 쪽지함
        </button>
        <div className="alram-wrapper">
          {toggleMsgBox === '받은 쪽지함' ? (
            <RecieveBox setSendMsgUser={setSendMsgUser} setReplyModal={setReplyModal} />
          ) : (
            <SendBox setSendMsgUser={setSendMsgUser} setReplyModal={setReplyModal} />
          )}
        </div>
        {/* <img src="/asset/myPage.png" alt="test image" /> */}
        {replyModal && <MessageReply sendMsgUser={sendMsgUser} setOpenReply={setReplyModal} />}
      </div>
    </MypageTag>
  );
};

export default MyPage;

const MypageTag = styled.div`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .avatar-container {
    position: relative;
  }

  .avatar-container .party-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    margin-bottom: 5px;
    margin-right: 5px;
    color: white; //rgb(103, 243, 201);
  }

  .info-wrapper {
    width: 50%;
    border: 1px dotted gray;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;

    .info-inner {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 0;
      margin-left: 10px;
      p {
        font-size: 1.2rem;
        text-align: left;
      }
      span {
        text-align: left;
        margin: 10px 0 0;
        color: gray;
        display: flex;
        justify-content: space-between;

        .party-icon {
          margin-left: auto; /* 이미지 왼쪽에 여백을 만들어 아이콘이 오른쪽으로 밀려나게 함 */
          align-self: flex-end; /* 아이콘을 아래쪽으로 정렬 */
          color: #ffd700; /* 아이콘 색상 변경 */
        }
      }
    }

    img {
      margin: 0;
      padding: 0;
      margin-left: 0;
      max-width: 100%;
      width: 100px;
      border-radius: 10px;
    }
  }

  .alram-wrapper {
    width: 520px;
    height: 400px;
    border: 1px dotted gray;
    display: flex;
  }

  // img {
  //   margin: 0 auto;
  //   display: flex;
  //   max-width: 100%;
  // }
`;
