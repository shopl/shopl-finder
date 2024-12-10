# SHOPL 페이지 분석기 크롬 확장 프로그램

## 목차
- [주요 기능](https://github.com/shopl/Dashboard-TeckStack-Inspector/edit/main/README.md#%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5)
- [지원하는 페이지 유형](https://github.com/shopl/Dashboard-TeckStack-Inspector/edit/main/README.md#%EC%A7%80%EC%9B%90%ED%95%98%EB%8A%94-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9C%A0%ED%98%95)
- [설치 및 사용 방법](https://github.com/shopl/Dashboard-TeckStack-Inspector/edit/main/README.md#%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95)
- [주의사항](https://github.com/shopl/Dashboard-TeckStack-Inspector/edit/main/README.md#%EC%A3%BC%EC%9D%98%EC%82%AC%ED%95%AD)
- [문제해결 및 피드백](https://github.com/shopl/Dashboard-TeckStack-Inspector/edit/main/README.md#%EB%AC%B8%EC%A0%9C%ED%95%B4%EA%B2%B0-%EB%B0%8F-%ED%94%BC%EB%93%9C%EB%B0%B1)

## 주요 기능
<img src='https://lh3.googleusercontent.com/JTtaAL1WN716zYHZhg_-wsLjfOGH0oP23-KeYZCbIbZoWPIWS1khdmTUk2xGLpYBPmc6kCcFj98fjoDc4YI9s_-ILA=s1280-w1280-h800' alt="screenshot" width="700px" />

SHOPL 대시보드는 JSP와 React가 혼합된 하이브리드 구조로 되어 있어 페이지의 기술적 구성을 파악하기 어려울 수 있습니다.<br/>
SHOPL 페이지 분석기는 복잡한 구조를 시각화하여 비개발 직군도 쉽게 이해할 수 있게 도와줍니다.

### 화면 구조 하이라이팅
JSP와 React로 개발된 영역을 시각적으로 구분하여 표시합니다.

| **색상** | **의미** |
|------|--------------|
|🟦 파란색| React로 개발된 영역|
| 🟧 주황색| JSP로 개발된 영역|

### 요약 팝업
페이지의 구성을 한눈에 파악할 수 있는 요약 정보를 제공합니다.

## 지원하는 페이지 유형

| **유형** | **설명** |
|------|---------|
| JSP Page | 전체가 JSP로 개발된 페이지/모달 |
| React Page | 전체가 React로 개발된 페이지/모달| 
| React Modal | JSP 페이지 내에 있는 React 모달 |
| React Section | JSP 페이지 내 부분적 React 적용 영역 |

##  설치 및 사용 방법

### 설치하기
1. [링크](https://chromewebstore.google.com/detail/shopl-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%B6%84%EC%84%9D%EA%B8%B0/knimkfpaanfddllbkhbdopcimdangdaa?hl=ko&authuser=0)를 클릭하여 크롬 웹 스토어의 SHOPL 페이지 분석기 페이지로 이동합니다.
2. 페이지 우측 상단의 `Chrome에서 사용` 버튼을 클릭합니다.
3. 팝업 창이 뜨면 `확장 프로그램 추가` 버튼을 클릭하여 설치를 완료합니다.

### 사용하기
1. 크롬 브라우저에서 SHOPL 대시보드 페이지에 접속합니다. (개발/QA/운영 서버 지원)
2. 브라우저 우측 상단의 확장 프로그램 아이콘 중 SHOPL 페이지 분석기 아이콘을 클릭합니다.
3. 페이지 위에 JSP와 React 영역이 구분되어 표시되고, 팝업에서 구조 요약을 확인할 수 있습니다.

## 주의사항
이 확장 프로그램은 회사 내부용 도구이므로, SHOPL 대시보드 페이지에서만 작동합니다.

## 문제해결 및 피드백
다음과 같은 경우 사내 메신저를 통해 프론트엔드팀으로 연락해주세요: 
- 익스텐션이 정상적으로 작동하지 않는 경우
- 특정 페이지에서 영역 구분이 잘못 표시되는 경우
- 기능 개선 제안이 있는 경우
