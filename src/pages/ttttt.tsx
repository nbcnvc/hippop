// // import { style } from '@mui/system';
// import { styled } from 'styled-components';
// // 프로필 수정 => 저장
// const handleEdit = async () => {
//     let profileimg: string | null = null;

//     if (jotaiUserData?.profileimg && Array.isArray(jotaiUserData.profileimg)) {
//       profileimg = jotaiUserData.profileimg.join(';');
//     }

//     if (selectedImages.length > 0) {
//       const newImageUrls: string[] = [];

//       for (const selectedImage of selectedImages) {
//         const { data, error } = await supabase.storage
//           .from('1st')
//           .upload(`images/${selectedImage.name}`, selectedImage);

//         if (error) {
//           console.error('Error uploading image to Supabase storage:', error);
//           alert('이미지 업로드 중 에러가 발생했습니다!');
//           return;
//         }

//         newImageUrls.push(data.path);
//       }

//       if (profileimg === null) {
//         profileimg = newImageUrls.join(';');
//       } else {
//         profileimg += ';' + newImageUrls.join(';');
//       }
//     }

//     if (editnickname.length > 6) {
//       alert('닉네임은 최대 6글자 입니다.');
//       return;
//     }

//     if (editnickname) {
//       const { error } = await supabase
//         .from('users')
//         .update({
//           nickname: editnickname,
//           profileimg: profileimg || jotaiUserData?.profileimg
//         })
//         .eq('uid', jotaiUserData?.uid);

//       if (error) {
//         console.error('Error editing post:', error);
//         alert('에러가 발생했습니다!');
//       } else {
//         alert('수정이 완료되었습니다.');

//         const { data, error: fetchError } = await supabase
//           .from('users')
//           .select()
//           .eq('uid', jotaiUserData?.uid)
//           .single();

//         if (fetchError) {
//           console.error('Error fetching updated user data:', fetchError);
//         } else {
//           localStorage.setItem('jotaiUserData', JSON.stringify(data));
//           setJotaiUserData(data);
//         }
//         setEditNickName('');
//         setSelectedImages([]);
//         setIsEditing(false);
//       }
//     }
//   };

//   const handleImageChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = e.target.files;

//     if (selectedFiles) {
//       const updatedSelectedImages = handleImageChange(selectedFiles);
//       setSelectedImages(updatedSelectedImages);
//     }
//   };

//   const handleEditClickOpen = () => {
//     if (!socialUser?.identities || (undefined && jotaiUserData)) {
//       setEditNickName(jotaiUserData?.nickname || '');
//       setIsEditing(true);
//     } else if (socialUser?.identities[0].provider !== 'email') {
//       setIsEditing(false);
//       alert('소셜 로그인 시 프로필 수정이 불가능합니다.');
//     }
//   };

//   const handleEditClickClose = () => {
//     setIsEditing(false);
//   };

//   const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEditNickName(event.target.value);
//   };

//   // 마이페이지 등급
//   const grade = () => {
//     if (myPostLegth >= 20) {
//       return 'VIP';
//     } else if (myPostLegth >= 15) {
//       return 'Gold';
//     } else if (myPostLegth >= 10) {
//       return 'Silver';
//     } else {
//       return 'Bronze';
//     }
//   };

//   // 판매완료 개수 체크
//   const completed = () => {
//     if (!myIscompleted) {
//       return 0; // 빈 배열이면 완료된 항목이 없으므로 0을 반환
//     } else {
//       const userUid = jotaiUserData?.uid;

//       // uid가 jotaiUserData의 uid와 일치하고 iscomplted가 true인 객체만 필터링
//       const completedItems = myIscompleted.filter((item) => {
//         return item.uid == userUid && item.iscompleted == '판매 완료';
//       });

//       return completedItems.length;
//     }
//   };






//   return (
//     <S.ProfileBox>
//     <S.ProfileImg
//     src={
//         jotaiUserData?.profileimg
//         ? `${process.env.REACT_APP_SUPABASE_STORAGE_URL}${jotaiUserData?.profileimg}`
//         : '-'
//     }
//     alt={`프로필 이미지 - ${user?.uid}`}
//     />
//     <S.ProfileInfo>
//     {isEditing ? (
//         <S.NickNameBox>
//         <S.EditNickName>닉네임 :</S.EditNickName>
//         <S.InputNickName type="text" value={editnickname} onChange={handleNicknameChange} />
//         </S.NickNameBox>
//     ) : (
//         <S.NickName>{jotaiUserData ? jotaiUserData.nickname : ''}</S.NickName>
//     )}
//     <S.Email>{jotaiUserData ? jotaiUserData.email : ''}</S.Email>

//     {isEditing ? (
//         <div>
//         <S.EditBtn onClick={handleEdit}>저장하기</S.EditBtn>
//         <S.EditBtn onClick={handleEditClickClose}>취소하기</S.EditBtn>
//         </div>
//     ) : (
//         <S.EditBtn onClick={handleEditClickOpen}>프로필 수정</S.EditBtn>
//     )}
//     </S.ProfileInfo>
//     </S.ProfileBox>
// )


// export const MypageContainer = styled.div`
//   display: flex;
//   margin: 100px 0 40px 200px;
// `;

// export const MypageWrapper = styled.div`
//   display: flex;

//   flex-direction: column;
// `;

// export const MypageWrap = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 40px;
// `;

// export const ProfileTable = styled.div`
//   margin-left: 30px;
// `;

// export const ProfileBox = styled.div`
//   display: flex;
// `;

// export const ProfileImg = styled.img`
//   width: 150px;
//   height: 150px;
//   border-radius: 50%;
//   border: 2px solid #0a398d;
// `;

// export const ProfileInfo = styled.div`
//   margin: 40px 35px;
// `;

// export const NickNameBox = styled.div`
//   display: flex;
//   font-weight: bold;
//   color: #0a398d;

//   justify-content: center;
//   align-items: center;
//   margin-right: 10px;
// `;

// export const EditNickName = styled.p`
//   /* font-size: 30px; */
//   color: #0a398d;
//   font-weight: bold;
// `;

// export const InputNickName = styled.input`
//   width: 150px;
//   height: 20px;
//   font-weight: bold;
//   color: #0a398d;

//   margin-left: 5px;

//   border-radius: 5px;
// `;

// export const NickName = styled.p`
//   font-size: 30px;
//   font-weight: bold;
//   /* color: #0a398d; */
// `;
// export const Email = styled.p`
//   font-size: 14px;
//   margin: 8px 8px 8px 3px;
//   color: #8f8f8f;
// `;

// export const EditBtn = styled.button`
//   margin: 10px 10px 0 0;

//   width: 100px;
//   height: 35px;

//   border: 2px solid #0a398d;
//   background-color: transparent;
//   border-radius: 10px;

//   color: #0a398d;
//   font-weight: bold;
//   font-size: 16px;
//   padding: 5px;

//   cursor: pointer;

//   &:hover {
//     background-color: #0a3a8d1f;
//   }
// `;

// export const EditProfile = styled.div`
//   margin-bottom: 70px;
//   color: #0a398d;
// `;

// export const EditProfileLabel = styled.label`
//   display: inline-block;
//   justify-content: center;
//   align-items: center;

//   display: flex;

//   padding: 5px;
//   width: 90px;
//   height: 22px;

//   font-size: 16px;
//   font-weight: bold;
//   color: #0a398d;

//   background-color: #ffffff;
//   border: 2px solid #0a398d;
//   border-radius: 10px;
//   cursor: pointer;

//   margin: 0 0 50px 25px;
// `;

// export const EditProfileInput = styled.input`
//   display: none;
// `;

// export const EtcInfoBox = styled.div`
//   width: 290px;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   margin: 38px 30px 0 0;
// `;

// export const GradeBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding-right: 70px;
//   border-right: 1px solid black;
//   height: 80px;
// `;

// export const GradeFc = styled.p`
//   font-size: 21px;
//   font-weight: bold;
// `;

// export const GradeText = styled.p`
//   font-size: 13px;
//   margin-top: 5px;
//   color: #8f8f8f;
// `;

// export const CompleteBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding-left: 70px;
//   margin-top: 4px;
//   height: 80px;
// `;

// export const CompleteText = styled.p`
//   font-size: 18px;
//   font-weight: bold;
//   margin-bottom: 5px;
// `;

// export const CompleteNum = styled.p`
//   font-size: 15px;

//   color: #8f8f8f;
// `;