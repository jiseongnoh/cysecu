# 반드시 docs/WORKING_CONTRACT.md를 Read 도구로 읽고 따를 것

## 프로젝트 개요

사이시큐연구소(CySecuLab) 기업 홈페이지 — KAIST 정보보호대학원 기반 사이버보안 스타트업

## 기술 스택

- 정적 HTML/CSS/JS (빌드 도구 없음)
- GitHub Pages 배포 (main push 시 자동)
- SUIT 커스텀 한국어 폰트

## 파일 구조

- `index.html` — 메인 페이지 (최종본, 네이비 테마)
- `ppt.html` — index.html과 동일 (동기화 필요)
- `style.css` — 기본 스타일
- `ppt-style.css` — 네이비 테마 오버라이드
- `script.js` — 탭, 아코디언, 스크롤 애니메이션
- `solutions/` — 솔루션 상세페이지 (tmaf, dpf, ccbox, ccsbom, outerstellar)
- `assets/images/` — 이미지
- `assets/fonts/` — SUIT TTF 폰트
