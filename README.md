<img src="https://capsule-render.vercel.app/api?type=wave&color=auto&height=300&section=header&text=💥HIPPOP💥&fontSize=60" />

### 실행법
- yarn start

# HIPPOP 🌇

## 🖥️ 프로젝트 개요

- 팝업스토어 정보를 공유하며 유저들간의 소통을 도모하는 interactive communication service

<br />

### 📍 사이트 주소

<a href="https://www.hippop.kr/">FIND YOUR HIPPOP</a>

<br />

### 🕰️ 개발 기간

2023.08.16 ~ 2023.09.18

<br />

### 🖼 와이어프레임

<details>
<summary><a href="https://www.figma.com/community/file/1264539931329446342">Figma</a> | 펼칠 시 스크린샷</summary>
<br />
	
![123](https://g![1](https://github.com/nbcnvc/hippop/assets/109304556/ad7a25ac-f430-45b2-91fa-a59660b61ad9)
![2](https://github.com/nbcnvc/hippop/assets/109304556/cfc9eeb4-dedb-4c8c-82ba-2ef5cd6a3839)
![3](https://github.com/nbcnvc/hippop/assets/109304556/47cf0c5a-8df4-4b9c-a573-7d29cbd01a27)
![4](https://github.com/nbcnvc/hippop/assets/109304556/0193fff7-9e04-4111-a924-0beeb9a1fde3)
![5](https://github.com/nbcnvc/hippop/assets/109304556/049e97a4-c801-494b-bab0-2c9840dd64c0)

<br />

</details>

<br />

### 🏷 폴더 구조

<details>
<summary>펼칠 시 파일 상세 구조</summary>
  
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

## 🧑‍🤝‍🧑 팀원 소개

- 팀명 : 그 여름, 우리는
- 팀원 및 담당 구현 기능

| 역할 | 이름   | 담당 구현 기능                                 | GitHub                                                                      |
| ---- | ------ | ---------------------------------------------- | --------------------------------------------------------------------------- |
| 팀장 | 조성록 | 담당 기능 | <a href="https://github.com/pigrok">https://github.com/pigrok</a>  |
| 팀원 | 장혜진 | 담당 기능                    | <a href="https://github.com/wooriki">https://github.com/wooriki</a>         |
| 팀원 | 김우리 | 소셜 로그인 / My page                 | <a href="https://github.com/wooriki">https://github.com/wooriki</a>           |
| 팀원 | 나윤빈 | 담당 기능     | <a href="https://github.com/pigrok">https://github.com/pigrok</a>           |
| 팀원 | 조진면 | Main page fid table 작업               | <a href="https://github.com/choisua98">https://github.com/choisua98</a>     |

<br />

## 📌 주요 기능

### 지도API <a href="https://www.ncloud.com/product/applicationService/maps">네이버 지도</a>

- 공공데이터API에서 불러온 데이터에서 위도와 경도를 활용하여 네이버 맵에 핀을 찍는다
- reverse geocoding api를 통해 위도와 경도를 통해서 도로명주소로 변환한다

### 공공데이터API <a href="http://data.seoul.go.kr/dataList/OA-2266/S/1/datasetView.do">서울시 체육시설 공공서비스 예약</a>

- `react query`, `axios` 활용하여 서울시 공공API 데이터 GET 요청한다
- 검색창 필터링으로 공공데이터 필터기능을 구현한다
- 필터링 된 API 데이터를 `pagination` 기능으로 `painting`
- 불러온 API 데이터를 사용자 위치 정보에 따라 가까운 순으로 정렬한다
- 거리 순으로 정렬된 데이터를 `react-js-pagination` 라이브러리 활용하여 페이지네이션한다

### 날씨API <a href="https://openweathermap.org/api">Open Weather Map</a>

- 현재 웹 브라우저 사용자의 위치를 통해 날씨 정보를 가져오는 API
- 도시의 위치(경도, 위도)값을 매개변수로 하여 활용한다
- json형태로 가져와서 현재 위치의 날씨 현황을 해당 날씨에 반환되는 icon으로 지역명과 함께 브라우저에 렌더링한다
- 추가적으로 날짜와 현재 시간을 렌더링한다

### 유튜브API <a href="https://developers.google.com/youtube/v3/getting-started?hl=ko">YouTube</a>

- 타겟팅한 특정 채널의 ID 값을 활용하여 채널의 재생목록 List를 API로 가져온다
- API 요청 매개변수와 일치하는 재생목록의 모음을 반환받아 axios get 요청으로 상세 데이터를 불러온다
- 필요한 값을 return 해주며 List를 shuffle하여 브라우저에 렌더링한다

<br />
<br />

### 🎬 페이지 스크린샷

#### 1. 메인화면

![main](https://github.com/nbcnvc/hippop/assets/109304556/47702ab0-8e95-496c-ba9c-c558ca0f8822)

<br />

## ⚙️ 기술 스택

- Typescript / React
<div align=“center”>
<img src="https://img.shields.io/badge/Typescript-61DAFB?style=for-the-badge&logo=Typescript&logoColor=black">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">

</div>

### ⚙️ 사용한 라이브러리

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

### ⚙️ 버전 관리 시스템

- Git/Github
<div align=“center”>
 <img src="https://img.shields.io/badge/git-7f8c8f?style=for-the-badge&logo=git&logoColor=white">
 <img src="https://img.shields.io/badge/github-595f61?style=for-the-badge&logo=github&logoColor=white">
 <img src="https://img.shields.io/badge/sourcetree-373c3d?style=for-the-badge&logo=sourcetree&logoColor=white">
</div>

### ⚙️ 협업툴

- Visual Studio
- Slack
- Figma
<div align=“center”>
 <img src="https://img.shields.io/badge/visual studio code-cf72ae?style=for-the-badge&logo=visualstudiocode&logoColor=white">
 <img src="https://img.shields.io/badge/slack-ad498a?style=for-the-badge&logo=slack&logoColor=white">
 <img src="https://img.shields.io/badge/figma-822f65?style=for-the-badge&logo=slack&logoColor=white">
</div>
