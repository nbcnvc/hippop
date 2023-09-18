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
| 부리 | 장혜진 | 담당 기능                    | <a href="https://github.com/huizhenz">https://github.com/huizhenz</a>         |
| 팀원 | 김우리 | 소셜 로그인 / 마이 페이지                | <a href="https://github.com/wooriki">https://github.com/wooriki</a>           |
| 팀원 | 나윤빈 | 담당 기능     | <a href="https://github.com/skdbsqls">https://github.com/skdbsqls</a>           |
| 팀원 | 조진명 | 메인페이지 fid table 작업               | <a href="https://github.com/nbcnvc">https://github.com/nbcnvc</a>     |

<br />

## 📌 Implementation of key features

### Supabase <a href="/">RealTime</a>

- Example

### Example <a href="/">RealTime</a>

- Example

  
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
