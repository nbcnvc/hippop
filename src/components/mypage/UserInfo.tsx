import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

//api
import { getUser } from '../../api/user';
import { supabase } from '../../api/supabase';

import { setUserStore } from '../../store/userStore';
import { randomFileName } from '../../hooks/useHandleImageName';
//스타일
import PartyModeIcon from '@mui/icons-material/PartyMode';
//메세지
import { useQuery } from '@tanstack/react-query';
import shortid from 'shortid';
const UserInfo = () => {
  const navigate = useNavigate();
  // const { id } = useParams();

  const { state } = useLocation();
  // const userId = state.userId;
  const userId: string = state?.userId || '';
  console.log(state.userId);

  const { data: currentUser } = useQuery(['user', userId], () => getUser(userId ?? ''));
  // const { data: currentUser } = useQuery(['user', id], () => getUser(id ?? ''));

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  //구독 목록 메뉴 상태
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [subscribers, setSubscribers] = useState<string[]>([]);

  const setCurrentUser = setUserStore((state) => state.setCurrentUser);
  // 현재유저 정보 가져오기
  const currentUserId = currentUser?.id;
  const { data: sublistData } = useQuery(['sublist'], () => getSubList(currentUserId ?? ''));

  const imageInputRef = useRef(null);

  const getSubList = async (userId: string) => {
    const { data } = await supabase.from('subscribe').select('subscribe_to').eq('subscribe_from', userId);
    return data;
  };
  // 구독한 사람 가져오기
  useEffect(() => {
    const loadSubscribers = async () => {
      if (sublistData) {
        const subscribeToValues = sublistData.map((item) => item.subscribe_to);
        const subscribeUserPromises = subscribeToValues.map(async (subscribe_to) => {
          const { data: subscribeUser } = await supabase.from('user').select('*').eq('id', subscribe_to);
          return subscribeUser;
        });
        const allSubscribeUsers = await Promise.all(subscribeUserPromises);

        const filteredSubscribers = allSubscribeUsers
          .filter((subscribeUserArray) => subscribeUserArray && subscribeUserArray.length > 0)
          .map((subscribeUserArray) => subscribeUserArray && subscribeUserArray[0].name);

        setSubscribers(filteredSubscribers as string[]);
      }
    };
    if (sublistData) {
      loadSubscribers();
    }
  }, [sublistData]);

  // 구독목록 visible
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // 닉네임 수정 handler
  const handleNameEdit = () => {
    setEditingName(true);
    setNewName(currentUser?.name || '');
  };
  // 닉네임 저장
  const handleNameSave = async () => {
    if (newName.length >= 5) {
      alert('닉네임은 다섯 글자 미만이어야 합니다.');
      return;
    }

    const { error } = await supabase.from('user').update({ name: newName }).eq('id', currentUser?.id);
    if (currentUser && !error) {
      const userData = await getUser(currentUser?.id ?? '');
      setCurrentUser(userData);
      setEditingName(false); // 수정 모드 해제
      alert('닉네임이 변경 됐습니다 :)');
    } else {
      console.log(error);
    }
  };
  // 수정 모드 해제
  const handleNameCancel = () => {
    setEditingName(false);
  };

  // 프로필 수정 handler
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

  // 프로필 선택후 저장하기
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
            const userData = await getUser(currentUser?.id ?? '');
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
    <div className="info-wrapper">
      {currentUser?.avatar_url && (
        <div className="avatar-container">
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)} // 선택한 이미지 파일을 미리보기로 보여줌
              alt="Selected Image"
              width={120}
              height={120}
            />
          ) : (
            <div className="avatar">
              {currentUser.avatar_url && (
                <img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${currentUser.avatar_url}`} alt="User Avatar" />
              )}
            </div>
          )}
          <div className="circle-bg">
            <PartyModeIcon className="party-icon" onClick={handleImageUpload} />
          </div>
          {imageUploadVisible && (
            <div className="img-uploader">
              <input type="file" ref={imageInputRef} onChange={handleImageInputChange} />
              <button className="confirm" onClick={handleImageConfirm}>
                저장
              </button>
            </div>
          )}
        </div>
      )}
      <div className="info-inner">
        <p>
          Welcome,&nbsp;&nbsp;
          {editingName ? (
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} style={{ width: '20%' }} />
          ) : (
            currentUser?.name
          )}
          님의 My Page
        </p>
        <span>
          <div className="user-sub-info">
            {currentUser?.email}
            {sublistData && (
              <h5 onClick={() => setIsMenuOpen((isMenuOpen) => !isMenuOpen)}>
                &nbsp;&nbsp;구독한 사람: {subscribers.length}
              </h5>
            )}
            {isMenuOpen && (
              <ul>
                {sublistData?.map((subscriberData, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      // navigate(`/yourpage/${subscriberData.subscribe_to}`);
                      navigate(`/yourpage/${shortid.generate()}`, { state: { userId: subscriberData.subscribe_to } });
                    }}
                  >
                    Subscriber {index + 1}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            {editingName ? (
              <>
                <button onClick={handleNameSave}>저장</button>
                <button onClick={handleNameCancel}>취소</button>
              </>
            ) : (
              currentUser?.id === userId && <button onClick={handleNameEdit}>수정</button>
            )}
          </div>
        </span>
      </div>
    </div>
  );
};

export default UserInfo;
