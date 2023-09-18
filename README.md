<img src="https://capsule-render.vercel.app/api?type=wave&color=auto&height=300&section=header&text=💥HIPPOP💥&fontSize=60" />

### How to
- yarn start

# 💥 HIPPOP 💥

## 💥 Project summary

- 팝업스토어 정보를 공유하며 유저들 간의 소통을 도모하는 interactive communication service

<br />

### 💥 Service URL

- <a href="https://www.hippop.kr/">FIND YOUR HIPPOP</a>

<br />

### 💥 Project period

- 2023.08.16 ~ 2023.09.18

<br />

### 💥 Wire frame

<details>
<summary>Figma | 펼칠 시 스크린샷</summary>
<br />
	
![1](https://github.com/nbcnvc/hippop/assets/109304556/ad7a25ac-f430-45b2-91fa-a59660b61ad9)
![2](https://github.com/nbcnvc/hippop/assets/109304556/cfc9eeb4-dedb-4c8c-82ba-2ef5cd6a3839)
![3](https://github.com/nbcnvc/hippop/assets/109304556/47cf0c5a-8df4-4b9c-a573-7d29cbd01a27)
![4](https://github.com/nbcnvc/hippop/assets/109304556/0193fff7-9e04-4111-a924-0beeb9a1fde3)
![5](https://github.com/nbcnvc/hippop/assets/109304556/049e97a4-c801-494b-bab0-2c9840dd64c0)

<br />

</details>

<br />

### 🏷 Folder structure

<details>
<summary>View detailed structure</summary>
  
```
 ┣ 📂api
 ┃ ┣ 📜alarm 2.ts
 ┃ ┣ 📜alarm.ts
 ┃ ┣ 📜bookmark.ts
 ┃ ┣ 📜comment.ts
 ┃ ┣ 📜message.ts
 ┃ ┣ 📜post 2.ts
 ┃ ┣ 📜post.ts
 ┃ ┣ 📜store.ts
 ┃ ┣ 📜subscribe.ts
 ┃ ┣ 📜supabase.ts
 ┃ ┗ 📜user.ts
 ┣ 📂components
 ┃ ┣ 📂about
 ┃ ┃ ┣ 📜AboutBannser.tsx
 ┃ ┃ ┗ 📜AboutInfo.tsx
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┗ 📜St.Login.tsx
 ┃ ┃ ┗ 📜Login.tsx
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┣ 📜St.AlarmBox.tsx
 ┃ ┃ ┃ ┣ 📜St.Footer.tsx
 ┃ ┃ ┃ ┣ 📜St.Header.tsx
 ┃ ┃ ┃ ┣ 📜St.NotFound.tsx
 ┃ ┃ ┃ ┗ 📜St.TopButton.tsx
 ┃ ┃ ┣ 📜Alarm.tsx
 ┃ ┃ ┣ 📜AlarmBox.tsx
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┣ 📜NotFound.tsx
 ┃ ┃ ┗ 📜TopButton.tsx
 ┃ ┣ 📂community
 ┃ ┃ ┣ 📂detail
 ┃ ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┃ ┣ 📜St.Comments.tsx
 ┃ ┃ ┃ ┃ ┣ 📜St.Subscribe.tsx
 ┃ ┃ ┃ ┃ ┗ 📜St.Writer.tsx
 ┃ ┃ ┃ ┣ 📜Comments.tsx
 ┃ ┃ ┃ ┣ 📜Subscribe.tsx
 ┃ ┃ ┃ ┗ 📜Writer.tsx
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┣ 📂mate
 ┃ ┃ ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┃ ┃ ┗ 📜St.MPosts.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MNewPosts.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MPosts.tsx
 ┃ ┃ ┃ ┃ ┗ 📜MStorePosts.tsx
 ┃ ┃ ┃ ┗ 📂review
 ┃ ┃ ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┃ ┃ ┗ 📜St.RPosts.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CommentCount.tsx
 ┃ ┃ ┃ ┃ ┣ 📜RNewPosts.tsx
 ┃ ┃ ┃ ┃ ┣ 📜RPopularPosts.tsx
 ┃ ┃ ┃ ┃ ┣ 📜RPosts.tsx
 ┃ ┃ ┃ ┃ ┗ 📜RStorePosts.tsx
 ┃ ┃ ┗ 📂write
 ┃ ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┃ ┣ 📜St.Edit.tsx
 ┃ ┃ ┃ ┃ ┣ 📜St.SearchDefault.tsx
 ┃ ┃ ┃ ┃ ┣ 📜St.SearchModal.tsx
 ┃ ┃ ┃ ┃ ┗ 📜St.Write.tsx
 ┃ ┃ ┃ ┣ 📜Edit.tsx
 ┃ ┃ ┃ ┣ 📜Editor.tsx
 ┃ ┃ ┃ ┣ 📜SearchDefault.tsx
 ┃ ┃ ┃ ┣ 📜SearchModal.tsx
 ┃ ┃ ┃ ┗ 📜Write.tsx
 ┃ ┣ 📂detail
 ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┣ 📜St.BookMark.tsx
 ┃ ┃ ┃ ┣ 📜St.Calendar.tsx
 ┃ ┃ ┃ ┣ 📜St.HotPlace.tsx
 ┃ ┃ ┃ ┣ 📜St.NearbyStore.tsx
 ┃ ┃ ┃ ┣ 📜St.Share.tsx
 ┃ ┃ ┃ ┣ 📜St.StoreDetail.tsx
 ┃ ┃ ┃ ┗ 📜St.StoreMap.tsx
 ┃ ┃ ┣ 📜BookMark.tsx
 ┃ ┃ ┣ 📜Calendar.tsx
 ┃ ┃ ┣ 📜HotPlace.tsx
 ┃ ┃ ┣ 📜NearbyStore.tsx
 ┃ ┃ ┣ 📜Share.tsx
 ┃ ┃ ┣ 📜StoreDetail.tsx
 ┃ ┃ ┗ 📜StoreMap.tsx
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┗ 📜St.Card.tsx
 ┃ ┃ ┗ 📜Card.tsx
 ┃ ┣ 📂message
 ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┣ 📜St.Message.tsx
 ┃ ┃ ┃ ┣ 📜St.MessageDetail.tsx
 ┃ ┃ ┃ ┣ 📜St.MessageReply.tsx
 ┃ ┃ ┃ ┣ 📜St.ReceiveBox.tsx
 ┃ ┃ ┃ ┗ 📜St.SendBox.tsx
 ┃ ┃ ┣ 📜Message.tsx
 ┃ ┃ ┣ 📜MessageDetail.tsx
 ┃ ┃ ┣ 📜MessageReply.tsx
 ┃ ┃ ┣ 📜ReceiveBox.tsx
 ┃ ┃ ┗ 📜SendBox.tsx
 ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📜MyBookmark.tsx
 ┃ ┃ ┣ 📜MyReview.tsx
 ┃ ┃ ┣ 📜MySubModal.tsx
 ┃ ┃ ┗ 📜UserInfo.tsx
 ┃ ┗ 📂search
 ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┣ 📜St.SearchCalender.tsx
 ┃ ┃ ┃ ┗ 📜St.SearchList.tsx
 ┃ ┃ ┣ 📜SearchCalendar.tsx
 ┃ ┃ ┗ 📜SearchList.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useHandleImageName.ts
 ┃ ┗ 📜useRealTimeData.ts
 ┣ 📂pages
 ┃ ┣ 📂style
 ┃ ┃ ┣ 📜St.About.tsx
 ┃ ┃ ┣ 📜St.Main.tsx
 ┃ ┃ ┣ 📜St.Mate.tsx
 ┃ ┃ ┣ 📜St.MDetail.tsx
 ┃ ┃ ┣ 📜St.MyPage.tsx
 ┃ ┃ ┣ 📜St.RDetail.tsx
 ┃ ┃ ┣ 📜St.Review.tsx
 ┃ ┃ ┗ 📜St.YourPage.tsx
 ┃ ┣ 📜About.tsx
 ┃ ┣ 📜Detail.tsx
 ┃ ┣ 📜Main.tsx
 ┃ ┣ 📜Mate.tsx
 ┃ ┣ 📜MDetail.tsx
 ┃ ┣ 📜MyPage.tsx
 ┃ ┣ 📜RDetail.tsx
 ┃ ┣ 📜Review.tsx
 ┃ ┣ 📜Search.tsx
 ┃ ┗ 📜YourPage.tsx
 ┣ 📂shared
 ┃ ┣ 📜Layout.tsx
 ┃ ┗ 📜Router.tsx
 ┣ 📂store
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜userStore.ts
 ┣ 📂types
 ┃ ┣ 📜props.ts
 ┃ ┗ 📜types.ts
 ┣ 📜App.css
 ┣ 📜App.test.tsx
 ┣ 📜App.tsx
 ┣ 📜GlobalStyle.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┣ 📜reportWebVitals.ts
 ┣ 📜setupTests.ts
 ┗ 📜supabase.d.ts
```
</details>

<br />

## 🧑‍🤝‍🧑 Team introduction

- Team Name : 그 여름, 우리는
- Team members

| Role | Name   | In charge                                 | GitHub                                                                      |
| ---- | ------ | ---------------------------------------------- | --------------------------------------------------------------------------- |
| 리더 | 조성록 | 검색 페이지 / 프로필 페이지 / 쪽지 / 북마크 / 공유하기 / 달력 | <a href="https://github.com/pigrok">https://github.com/pigrok</a>  |
| 부리 | 장혜진 | 상세 페이지 / 팝업스토어 지도 / 핫플레이스 추천 / 동일 지역 팝업스토어 | <a href="https://github.com/huizhenz">https://github.com/huizhenz</a>         |
| 팀원 | 김우리 | 소셜 로그인 / 마이 페이지                | <a href="https://github.com/wooriki">https://github.com/wooriki</a>           |
| 팀원 | 나윤빈 | 리뷰 & 리뷰 디테일 페이지 / 메이트 & 메이트 디테일 페이지 / 글 작성 모달 / 구독 / 실시간 알림  | <a href="https://github.com/skdbsqls">https://github.com/skdbsqls</a>           |
| 팀원 | 조진명 | 메인페이지 피드 테이블 작업               | <a href="https://github.com/nbcnvc">https://github.com/nbcnvc</a>     |

<br />

## ⛓️ Service Architecture
![HIPPOP 서비스 아키텍쳐](https://github.com/nbcnvc/hippop/assets/133093192/b0ec3dde-1735-4bf9-9eb2-aee2b3e19bdc)

<br />

## ⛓️ Database Schema
![截屏2023-09-18 下午5 20 00](https://github.com/nbcnvc/hippop/assets/133093192/986905be-f478-4171-b5f8-ea1b809d4260)

<br />

## 📌 Implementation of key features

### <a href="https://supabase.com/docs/guides/realtime/postgres-changes">Supabase</a> <a href="https://velog.io/@skdbsqls/230915-Supabase-realtime-이용해서-실시간-알림기능-구현하기">RealTime</a>

- supabase는 데이터베이스 작업을 실시간으로 추적하고 애플리케이션에 업데이트를 자동으로 푸시할 수 있는 realtime을 제공한다.
- realtime은 Broadcast, Presence, Postgres Changes의 주요 기능을 포함한다.
- Postgres Changes 데이터베이스 테이블에서 발생하는 변경 사항을 실시간으로 감지하고 클라이언트에게 푸시한다.
- 이를 이용하여 사용자가 구독한 사람이 새 글을 작성했을 때, 누군가가 사용자를 구독했을 때, 다른 사용자로부터 쪽지를 받았을 때 실시간 알림을 제공한다.

### Kakao <a href="https://apis.map.kakao.com/web/guide/">Map API</a>

- Kakao Map API는 Kakao에서 제공하는 지도 API로 지도를 이용한 서비스를 제작할 수 있도록 다양한 기능을 제공한다.
- MAP API는 addressSearch, keywordSearch 등의 메서드를 포함한다.
- addressSearch 메서드는 주소를 좌표로 변환하고, keywordSearch 메서드는 키워드를 통한 검색 결과를 반환한다.
- 이를 이용하여 팝업스토어의 위치, 주변 핫플레이스 추천, 동일 지역 팝업스토어의 위치를 제공한다.

<br />

### 🎬 Service capture image

#### Summary

![main](https://github.com/nbcnvc/hippop/assets/109304556/47702ab0-8e95-496c-ba9c-c558ca0f8822)
![main2](https://github.com/nbcnvc/hippop/assets/109304556/58cd61f4-99fb-400d-a730-ba442a3008a3)
![main3](https://github.com/nbcnvc/hippop/assets/109304556/ddd0d51e-5ed1-4b16-9fea-f4fa3f32fcf4)
![main4](https://github.com/nbcnvc/hippop/assets/109304556/8fdd7544-36cc-4a1d-ac29-c3c4c3181f42)
![main5](https://github.com/nbcnvc/hippop/assets/109304556/80f331a3-3117-486b-ae0a-4e89c5b22929)
![main6](https://github.com/nbcnvc/hippop/assets/109304556/108b0f92-cebe-4444-ad63-70e8bac9feb4)


<br />

## ⚙️ Technology stack

- Typescript / React
<div align=“center”>
<img src="https://img.shields.io/badge/Typescript-DF2CE8?style=for-the-badge&logo=Typescript&logoColor=black">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">

</div>

### ⚙️ Library

- router-dom
- zustand
- @tanstack/react-query
- styled-components
- styled-reset
- @supabase/supabase-js
- @types/navermaps
- @mui/types
- @mui/styles
- @mui/icons-material
- @supabase/auth-ui-react
- @supabase/auth-ui-shared
- axios
- @types/axios
- react-kakao-maps-sdk
- react-slick
- @types/react-slick
- slick-carousel
- @tanstack/react-query-devtools
- react-toastify


<div align=“center”>
<img src="https://img.shields.io/badge/styled components-e62744?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/React Router DOM-ed7a40?style=for-the-badge&logo=reactrouter&logoColor=white">
<img src="https://img.shields.io/badge/React Query-32b3bf?style=for-the-badge&logo=reactquery&logoColor=white">
</div>

### ⚙️ Version control system

- Git/Github
<div align=“center”>
 <img src="https://img.shields.io/badge/git-7f8c8f?style=for-the-badge&logo=git&logoColor=white">
 <img src="https://img.shields.io/badge/github-595f61?style=for-the-badge&logo=github&logoColor=white">
 <img src="https://img.shields.io/badge/sourcetree-373c3d?style=for-the-badge&logo=sourcetree&logoColor=white">
</div>

### ⚙️ Collaboration tool

- Visual Studio
- Slack
- Figma
<div align=“center”>
 <img src="https://img.shields.io/badge/visual studio code-cf72ae?style=for-the-badge&logo=visualstudiocode&logoColor=white">
 <img src="https://img.shields.io/badge/slack-ad498a?style=for-the-badge&logo=slack&logoColor=white">
 <img src="https://img.shields.io/badge/figma-822f65?style=for-the-badge&logo=slack&logoColor=white">
</div>
<br />

## 🚨 Trouble Shooting 
<details>
<summary>소셜 로그인 및 유저 전역 상태 관리</summary>
	
- 요구사항
    - 소셜 로그인 (구글 / 카카오톡 / 페이스북) 하기.
    - 최초 소셜 로그인 시, 소셜 Provider에서 제공하는 유저 프로필 정보 가져오기 및 가져온 유저 프로필 정보 supabase user 테이블에 저장.
    - 소셜 로그인 시 유저의 프로필 정보 user 테이블에서 가져오기.
    - 로그인 한 유저는 전역 상태로 관리하기.
    
- 문제 상황
    - 소셜 로그인은 가능하나 새로고침 시 로그인 한 유저 정보를 화면에서 유지하지 못함.
    - 유저 프로필 변경 시 변경된 프로필이 바로 업데이트되지 않고 새로고침 이후 업데이트됨.
    - 크롬 상단 탭을 이동하고 나면 로그인 한 유저 정보가 필요한 쪽지, 댓글 등의 기능이 실행되지 않음.
    - 바로 로그아웃이 되지 않고 새로고침 이후에만 로그아웃이 됨.
    - 소셜 최초 로그인 시, Provider에서 제공하는 프로필 정보를 가져오긴 하나, 화면에 출력하지 못함.
    - 위의 문제 상황 해결 과정에서 카카오톡 로그인이 실행되지 않음.
    
- 해결 과정
    - 소셜 로그인 후 supabase에서 제공하는 onAuthStateChange 메서드를 통해 session에서 유저 정보를 받아 와 user 테이블에 저장하고, 같은 방식으로 localStorage를 생성하여 생성된 토큰을 zustand로 store에 담아 전역 상태 관리함.
        - 위의 방법으로 로그인한 유저의 정보를 화면에서 유지하는 것에는 성공했으나, 마이페이지에서 유저의 프로필( 이미지, 닉네임)을 수정하면 바로 반영되지 않고, 새로고침 시에만 수정된 프로필이 반영되는 문제 상황이 발생.
    - 직접 localStorage에 토큰을 생성하지 않고, zustand의 persist를 사용하여  store에 담긴 유저 정보를 localStorage에 토큰으로 자동 생성해 주고 유지함으로써 전역 상태 관리 함.
        - 위의 방법으로 프로필 수정이 실시간으로 반영되지만, 크롬 상단 탭을 이동 후 , 리뷰 페이지나, 메이트 페이지 등에서 글 작성, 댓글, 쪽지 보내기 기능을 이용할 때 기능이 동작하지 않는 문제 상황 발생.
    - 로그인 시 실행되는 로직이 Header 컴포넌트에 위치하여 탭 이동이나 새로고침 시 Header의 하위 컴포넌트 모두 렌더링이 되면서 userData가 충동하는 현상이 발생함.
    최상단인 App 컴포넌트로 해당 로직을 옮겨줌으로써 해결함.
        - 위의 방법으로 쪽지 등 기능이 정상적으로 실행되었지만, 바로 로그아웃이 안되는 현상이 발생함.
        - 하나의 useEffect에서 로그인 시 전역 상태로 유저 정보를 set 해주는 로직과 로그아웃 시 전역 상태에서 유저 정보를 null로 만들어주는 로직이 공존했으나, 로그아웃 시 필요한 로직을 다른 useEffect로 분리해줌으로써 로그아웃 문제 상황은 해결 함.
    - 소셜 최초 로그인 시, Provider에서 제공하는 유저의 프로필 이미지 값을 불러오지 못하는 현상이 발생하여, 제공하는 이미지 url를 blob을 통해 이미지를 다운로드하고  해당 파일을 객체로 변환하여 storage에 업로드하는 방식을 선택함.
    이 방법으로 storage에 업로드 한 data의 경로를 가져와 user 테이블에 담아주고 담아준 유저 정보를 가져와 프로필 이미지를 정상적으로 업로드 하는 데 성공함.
        - 위의 방법으로 유저의 이미지 정보 등을 원할하게 가져오나, 카카오톡 로그인이 안되는 현상이 발생 함.
    - Provider에서 제공하는 구글, 페이스북은 https 형식의 이미지 url이라면 카카오톡의 경우 http형식의 이미지 url이어서 supabase storage에 업로드할 때 cors 오류가 발생 함
     이를 해결하기 위해 카카오톡 Rest API를 이용하여 사용자의 프로필을 GET요청하는 방식으로 https 형식의 이미지 url을 JSON 객체로 받아 유저의 프로필을 업로드 하는 데 성공 함.
    
- 해결 방안
    - 사용자 인증 및 로그인:
        - 사용자의 소셜 로그인 후 Supabase의 `onAuthStateChange` 메서드를 사용하여 세션에서 사용자 정보를 가져오고 Supabase의 `user` 테이블에 저장한다.
        - 로그인한 사용자 정보를 localStorage에 토큰으로 생성하여 Zustand로 전역 상태를 관리한다.
    - 프로필 정보 실시간 반영:
        - 프로필 정보 수정이 바로 반영되지 않는 문제를 해결하기 위해 Zustand의 `persist`를 사용하여 상태 정보를 localStorage에 토큰 형태로 저장한다.
    - 기능 동작 문제:
        - 일부 기능이 크롬 탭 이동 후 작동하지 않는 문제를 해결하기 위해 로그인 시 실행되는 로직을 App 컴포넌트로 이동하여 해결한다.
    - 카카오톡 로그인 및 HTTPS 이미지 URL:
        - 카카오톡은 HTTP 형식의 이미지 URL을 제공하므로 Supabase Storage에 업로드 시 CORS 오류가 발생했다.
        이를 해결하기 위해 카카오톡 Rest API를 사용하여 사용자 프로필 이미지를 HTTPS 형식의 URL로 가져와서 저장한다.
    ⇒ 이러한 조치를 통해 사용자 인증, 프로필 관리, 기능 동작, 이미지 URL 문제 등 다양한 문제를 해결하게 되었다.

</details>

<details>
<summary>Supabase 검색 API</summary>

- 요구 사항
    - 검색 결과는 useInfinityQuery를 사용하여 무한스크롤로 UI로 구현
    - supabase DB에서 데이터를 가져올 때 검색 조건에 알맞는 데이터로  필터링해서 가져오기
    
- 문제 사항
    - useInfinityQuery를 사용하기 위해서 supabase에 데이터 요청을 할 때,  데이터를 중복으로 불러오는 현상이 발생
    - useInfinityQuery를 사용하기 위해서는 supabase DB로부터 필터링 된 데이터를 받아왔어야 함. post 테이블의 title과 foreignTable인 store 테이블의 title을 검색 필터링 조건으로 두었으나 알맞게 필터링 된 데이터를 가져오지 못 하는 현상 발생
    
- 해결 과정
    - order와 range 조건을 동시에 사용하게 되면 중복으로 데이터를 가져옴
        - supabase docs에서도 order조건과 range 조건을 동시에 사용한 예제가 없음, 하지만 이는 supabase의 필터링 오류로 판단함.
        - supabase SQL Editor을 통해 order조건(내림차순)으로 view를 생성하고, view table을 range조건으로 데이터 요청했지만 동일하게 데이터를 중복으로 가져오는 현상이 발생
    - supabase or 메소드에서는 post 테이블과 foreignTable 테이블을 동시에 조건으로 사용하지 못 하는 것으로 판단, 공식 문서에도 사용 예제가 없음
    
- 해결 방안
    - supabase 측 오류로 판단하여, order 조건을 제거 후 range조건만을 사용하여 데이터를 불러와 중복데이터를 제거함.
    - 카테고리를 두어 하나의 테이블에서 하나의 검색 조건만을 필터링한 데이터를 불러와 사용 함
 
</details>

<details>
<summary>지도 API & 검색 API</summary>

- 요구 사항
    - 팝업스토어 상세 위치를 지도 API를 사용해 마커로 표시하기.
    - 검색 API를 통해 팝업스토어 주변 핫플레이스에 대한 상세 정보는 카드 슬라이드로 보여주고 이와 지도 API를 연결하여 위치는 지도에 마커로 표시하기.
    - 주변 지역 팝업스토어 위치를 지도 API를 사용해 마커로 표시하기.
    
- 문제 사항
    - 네이버 검색 API를 요청하려면 node.js를 이용해 서버를 통해 호출해야 하거나 프록시 라이브러리를 사용해야함.
    - 공공 OPEN API에서 제공하는 음식점 정보와 음식점 이미지의 데이터가 서로 다름.
    - 카카오 검색 API에서 가져오는 이미지가 랜덤이라 핫플레이스와 관련없는 이미지도 가져옴.
    
- 해결 과정
    - 처음에 UI 적인 이유로 Naver 지도 API를 사용하였기 때문에 동일하게 Naver 검색 API를 사용하여 주변 핫플레이스에 대한 정보를 가져오려 했으나, Naver 검색 API를 사용하려면 node.js 같은 서버를 통해야 하거나 프록시 라이브러리를 사용했어야함.
    - 검색 API를 사용하지 않고 핫플레이스 관련 정보를 관광 음식점 OPEN API를 통해 가져오려고 했으나 음식점 상세 정보 데이터와 음식점 이미지 데이터의 정보가 일치하지 않아 연결할 수 없었음.
    - 서버를 통한 요청이 필요없는 Kakao 지도 API 내의 `keywordSearch` 함수를 사용하여 주변 지역 핫플레이스 데이터를 가져옴.
    - 위 해결 과정에서 가져오는 핫플레이스 데이터와 일치하는 장소의 이미지를 Kakao의 검색 api를 사용하여 호출하려 했으나 가져오는 이미지가 랜덤이라 장소와 관련없는 이미지도 가져오는 문제가 생김.
- 해결 방안
    - 핫플레이스에 대한 데이터를 카드 슬라이드를 통해 보여주는 대신 지도 위의 마커들로 표현하고 해당 마커핀을 클릭하면 iframe을 사용해 카카오맵의 상세정보를 띄워주는 식으로 변경함.
 
</details>
