// import React, { useEffect, useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import { supabase } from '../supabase';
// import { User } from '@supabase/supabase-js';

// function Layout() {
//   const [user, setUser] = useState<User | null>(null);
//   const [userNickname, setUserNickname] = useState<string | null>(null);

//   useEffect(() => {
//     // 되긴 되는데 괜찮은데 병수튜터님께 여쭤보기
//     const storedUser = sessionStorage.getItem('user'); // 세션 스토리지에서 사용자 정보 가져오기
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }

//     const authSubscription = supabase.auth.onAuthStateChange((event, session) => {
//       if (event === 'SIGNED_IN' && session) {
//         setUser(session.user);
//         sessionStorage.setItem('user', JSON.stringify(session.user)); // 세션 스토리지에 사용자 정보 저장
//       } else if (event === 'SIGNED_OUT') {
//         setUser(null);
//         sessionStorage.removeItem('user'); // 로그아웃 시 세션 스토리지에서 사용자 정보 삭제
//       }
//     });

//     // const authSubscription = supabase.auth.onAuthStateChange((event, session) => {
//     // if (event === "SIGNED_IN" && session) {
//     // setUser(session.user);
//     // } else if (event === "SIGNED_OUT") {
//     // setUser(null);
//     // }
//     // });

//     // 컴포넌트가 언마운트될 때 이벤트 구독 해제
//     return () => {
//       authSubscription.data.subscription.unsubscribe();
//     };
//   }, []);

//   useEffect(() => {
//     if (user) {
//       console.log('로그인한 사용자 정보:', user);
//       setUserNickname(user.user_metadata.user_name); // 사용자 닉네임 설정
//     }
//   }, [user]); // user 상태가 변경될 때마다 실행

//   const renderLoginButton = () => {
//     if (user) {
//       return (
//         // <button></button>
//         <Link
//           to="/"
//           onClick={async () => {
//             await supabase.auth.signOut();
//             setUser(null);
//             setUserNickname(null); // 로그아웃 시 사용자 닉네임 초기화
//             alert('로그아웃 됐다~~~');
//           }}
//         >
//           로그아웃
//         </Link>
//       );
//     } else {
//       return (
//         <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>
//           로그인
//         </Link>
//       );
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         position: 'relative',
//         paddingBottom: '90px',
//         boxSizing: 'border-box'
//       }}
//     >
//       <header
//         style={{
//           position: 'fixed',
//           left: 0,
//           right: 0,
//           display: 'flex',
//           justifyContent: 'space-between',
//           padding: '24px',
//           backgroundColor: '#F8B3B3',
//           color: 'white'
//         }}
//       >
//         <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
//           로고
//         </Link>
//         <div
//           style={{
//             display: 'flex',
//             gap: '12px'
//           }}
//         >
//           {userNickname || user?.user_metadata.full_name ? (
//             <span>
//               {userNickname ? `${userNickname}님, 환영합니다.` : `${user?.user_metadata.full_name}님, 환영합니다.`}
//             </span>
//           ) : null}
//           <Link to="/home" style={{ color: 'black', textDecoration: 'none' }}>
//             기다리는 친구들 |
//           </Link>
//           <Link to="/community" style={{ color: 'black', textDecoration: 'none' }}>
//             커뮤니티 |
//           </Link>
//           <Link to="/aboutus" style={{ color: 'black', textDecoration: 'none' }}>
//             about us |
//           </Link>
//           {renderLoginButton()}
//         </div>
//       </header>
//       <div
//         style={{
//           paddingTop: '80px'
//         }}
//       >
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default Layout;
