# Festie 프로토타입

> 페스티벌의 모든 순간, 너의 옆에 있을게
> Your festival bestie, from discovery to memory

페스티벌 준비부터 기억까지 한곳에 담는 아카이브 앱 **Festie**의 인터랙티브 프로토타입입니다.
탐색 → 준비하기(타임테이블 · 플레이리스트 · 체크리스트 · 티켓) → 기록(리포트) → MY까지 처음부터 끝까지 직접 눌러볼 수 있어요.

ICT융합디자인과 졸업작품 · 2026

## 바로 보기

- **로컬**: `index.html`을 브라우저로 열면 바로 실행돼요. 서버나 설치가 필요 없어요.
- **GitHub Pages**: 저장소의 Settings → Pages에서 Branch를 `main` / `(root)`로 지정하면 `https://<아이디>.github.io/<저장소이름>/` 주소로 열려요.

넓은 화면에서는 폰 화면 옆에 **화면 바로가기** 메뉴가 보여요.
휴대폰으로 열면 앱 화면이 화면 폭에 꽉 차게 보여요.

### 특정 화면에서 시작하기

주소 뒤에 `?start=값`을 붙이면 그 상태에서 바로 시작해요. 예: `index.html?start=summary`

| 값 | 화면 |
| --- | --- |
| `discover` | 01 탐색 홈 (기본) |
| `genre` | 02 장르 칩 선택 · 인디 |
| `search` | 03 검색 화면 |
| `searchResult` | 04 검색 결과 |
| `detail` | 05 페스티벌 상세 |
| `artist` | 06 라인업 아티스트 무대 |
| `prepEmpty` | 07 준비 홈 · 비어 있음 |
| `dashStart` | 08 준비하기 · 시작 |
| `tte` | 09 타임테이블 · 1일차 고르기 |
| `tteBlocked` | 10 시간 겹침 · 선택 불가 |
| `tteSheet1` | 11 1일차 담기 완료 |
| `tteOnlyDay1` | 12 1일차만 설정 안내 |
| `tte2` | 13 2일차 고르기 |
| `tteSheetAll` | 14 1·2일차 모두 담기 완료 |
| `tt` | 15 내 타임테이블 |
| `dashMid` | 16 준비하기 · 상태 칩 |
| `check` | 17 체크리스트 |
| `playlist` | 18 플레이리스트 · 곡 빼기 |
| `playlistSheet` | 19 음악 앱으로 내보내기 |
| `ticket` | 20 티켓 등록 |
| `dashDone` | 21 준비하기 · 모두 완료 |
| `summary` | 22 내 준비 한눈에 |
| `recordLocked` | 23 기록 · 잠김 |
| `recordReady` | 24 기록 · 리포트 만들기 |
| `reportEdit` | 25 리포트 만들기 · 빈 상태 |
| `reportFilled` | 26 리포트 만들기 · 입력 완료 |
| `report` | 27 완성된 리포트 |
| `reportEditing` | 27-1 리포트 수정하기 |
| `recordSaved` | 28 기록 홈 · 저장 후 |
| `my` | 29 MY |

## 반영된 내용 (2026-10-19 기준)

- 하단 내비게이션 아이콘에 Festie 스파크 심볼 적용 (탐색 · 준비 · 기록)
- 기록(리포트)은 타임테이블 · 플레이리스트 · 티켓을 마치면 열림. 체크리스트는 다 챙기지 않아도 됨
- 내 준비 한눈에: 티켓 칸 중복 정보 정리, "설정 완료" 칩을 타이틀 옆으로
- 그 밖의 교수님 피드백 반영 사항 (장르 칩, 검색, 페스티벌 상세 한글화, 타임테이블 일차별 담기, 리포트 수정 등)

## 폴더 구조

```
index.html            화면 마크업(<template>) + 실행 코드
js/festie-app.js      화면 상태와 동작 (탭 이동, 타임테이블 담기, 리포트 작성 등)
js/dc-lite.js         화면 마크업을 그려주는 작은 런타임
vendor/preact.umd.js  Preact 10 (MIT, vendor/PREACT-LICENSE)
assets/images/
  posters/            페스티벌 포스터
  artists/            아티스트 사진
  photos/             리포트용 현장 사진
```

## 참고

- 글꼴(Josefin Sans, Hanken Grotesk, Noto Sans KR)은 Google Fonts에서 불러와요. 인터넷이 없으면 기본 글꼴로 보여요.
- 프로토타입이라 입력한 내용은 새로고침하면 처음 상태로 돌아가요.
- 포스터 · 아티스트 · 현장 사진은 시연용 이미지예요. 공개 저장소에 올릴 때는 이미지 사용 권한을 한 번 확인해 주세요.
