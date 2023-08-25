import React, { useState, useRef, useEffect } from 'react';

import { styled } from 'styled-components';
import { setUserStore, useCurrentUser } from '../store/userStore';
import { supabase } from '../api/supabase';
import PartyModeIcon from '@mui/icons-material/PartyMode';
import { randomFileName } from '../hooks/useHandleImageName';
import { getProfileImg, getUser } from '../api/user';
import { useQuery } from '@tanstack/react-query';
import { UserInfo } from '../types/types';

const MyPage = () => {
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const imageInputRef = useRef(null);

  const setCurrentUser = setUserStore((state) => state.setCurrentUser);
  // 현재유저 정보 가져오기
  const currentUser = useCurrentUser();
  // console.log('currentUser11', currentUser);

  const handleNameEdit = () => {
    setEditingName(true);
    setNewName(currentUser?.name || '');
  };

  const handleNameSave = async () => {
    if (newName.length >= 5) {
      alert('닉네임은 다섯 글자 미만이어야 합니다.');
      return;
    }

    const { error } = await supabase.from('user').update({ name: newName }).eq('id', currentUser?.id);
    if (currentUser && !error) {
      const userData = await getUser(currentUser?.id);
      setCurrentUser(userData);
      setEditingName(false); // 수정 모드 해제
      alert('닉네임이 변경 됐습니다 :)');
    } else {
      console.log(error);
    }
  };

  const handleNameCancel = () => {
    setEditingName(false); // 수정 모드 해제
    alert('닉네임 변경을 취소하셨어요 :)');
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
  // console.log(data);

  const imgUrl = data?.avatar_url;

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
            // console.log('userData', userData);
          }

          alert('프로필 변경이 완료됐습니다 :)');
          setImageUploadVisible(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
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
                  <button onClick={handleNameCancel}>취소</button>
                </>
              ) : (
                <button onClick={handleNameEdit}>수정</button>
              )}
            </div>
          </span>
        </div>
      </div>
      <div className="alram-wrapper">
        <ul>
          <li>Alram #1</li>
          <li>Alram #2</li>
          <li>Alram #3</li>
          <li>Alram #4</li>
        </ul>
      </div>
      {/* <img src="/asset/myPage.png" alt="test image" /> */}
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
    width: 50%;
    border: 1px dotted gray;
    display: flex;
    justify-content: flex-end;

    li {
      text-align: center;
      padding: 2px 20px;
      margin: 4px 0;
      background-color: gray;
      border-radius: 4px;
    }
  }

  // img {
  //   margin: 0 auto;
  //   display: flex;
  //   max-width: 100%;
  // }
`;
