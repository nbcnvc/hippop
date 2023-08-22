// import React, { useState, useEffect, FormEvent } from 'react';
// // import { createClient } from "@supabase/supabase-js";
// // import { Auth } from "@supabase/auth-ui-react";
// // import { ThemeSupa } from "@supabase/auth-ui-shared";
// // import { Session } from "@supabase/supabase-js"; // @supabase/supabase-js에서 제공하는 Session 타입을 가져옵니다.
// import { supabase } from '../supabase';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState(''); // 이메일을 위한 상태 변수
//   const [password, setPassword] = useState(''); // 비밀번호를 위한 상태 변수

//   const navigate = useNavigate();

//   async function signInWithEmail(e: FormEvent) {
//     e.preventDefault();
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password
//     });
//     console.log(data);
//     console.log(error);
//   }

//   const loginWithKakao = async () => {
//     await supabase.auth.signInWithOAuth({
//       provider: 'kakao'
//     });
//   };

//   const loginWithGoogle = async () => {
//     await supabase.auth.signInWithOAuth({
//       provider: 'google'
//     });
//   };

//   return (
//     <div>
//       <h1>로그인</h1>
//       <form onSubmit={signInWithEmail}>
//         <div>
//           <label htmlFor="email">이메일:</label>
//           <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="password">비밀번호:</label>
//           <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <button
//           // type="submit"
//           onClick={() => {
//             // navigate("/");
//             alert('로그인 완료.');
//           }}
//         >
//           로그인
//         </button>
//         <Link to="/signup" style={{ color: 'black', textDecoration: 'none' }}>
//           회원가입
//         </Link>
//       </form>
//       <div>
//         <button onClick={loginWithKakao}>kakao</button>
//         <button onClick={loginWithGoogle}>google</button>
//       </div>

//       {/*<button onClick={resetPassword}>비밀번호 재설정</button>*/}
//     </div>
//   );
// }

// export default Login;

// // const signInWithEmail = async (e: FormEvent) => {
// // e.preventDefault();
// // const checkedInput = checkInput(email, password);
// // if (!checkedInput) return;

// // try {
// // const { data, error } = await supabase.auth.signInWithPassword({
// // email,
// // password
// // });

// // if (data) {
// // // 데이터 베이스에서 로그인한 유저의 정보 가져오기
// // const id = data.user?.id;
// // const response = await supabase.from('user').select().eq('userid', id).single();
// // const user = response.data;
// // // 전역에 셋팅
// // dispatch(setCurrentUser(user));
// // }
// // if (error) {
// // alert('로그인 실패: 아이디가 없거나 비밀번호가 틀렸습니다.');
// // return;
// // }

// // alert('로그인 성공');
// // dispatch(closeModal());
// // } catch (error) {}
// // };
