# 태성 AR 링 마커 시험 패키지

1. `A4-marker-tests.pdf`를 A4 실제 크기 100%로 출력하고 50mm 검증선을 재세요.
2. 전체 파일을 GitHub 저장소의 새 `marker-lab/` 폴더 안에 업로드하세요. 기존 루트 파일은 덮어쓸 필요가 없습니다.
3. Pages 배포 후 `/taesung-ar-ring/marker-lab/test.html`을 휴대폰 HTTPS 브라우저에서 여세요.
4. 출력물과 같은 A/B/C/D를 고르고, 먼저 30mm 평면 카드부터 확인하세요.
5. 크기 설정을 출력물 전체 크기에 맞추세요. 흰 여백까지 포함한 크기입니다.
6. 측정 전에는 마커를 가렸다가 시작 후 보여 주세요. 다른 페이지로 이동하기 전에 CSV를 저장하세요.

**10mm 인식 보장 없음. 실물 검증은 아직 하지 않았습니다.**

원인 분석·치수 정의·전체 시험 절차는 `REPORT-ko.md`, 자동 검증 결과는 `validation.json`에 있습니다.
`markers/*-inner.*`는 학습용 내부 그림입니다. 반지에 붙일 출력물은 `*-inner`가 없는 전체 마커 또는 PDF를 사용하세요.
SVG/PNG 원본은 10mm 스티커입니다. PDF에는 10/12/15/30mm가 모두 있습니다.

실행 라이브러리와 기본 카메라 보정 파일을 패키지 안에 포함했습니다. HTTPS 서버의 카메라 권한은 필요합니다.
가상 카메라 시험의 `csv-test-output.csv`는 소프트웨어 기능 확인용이며 실물 측정값이 아닙니다.

## 외부 코드 출처

- A-Frame v1.6.0: https://github.com/aframevr/aframe/tree/v1.6.0 (MIT)
- AR.js v3.4.7: https://github.com/AR-js-org/AR.js/tree/3.4.7 (MIT)
- AR.js 공식 marker encoder 및 camera_para.dat: 위 AR.js 저장소
- 로고·장면: 사용자가 제공한 태성고 AR 링 프로젝트. 로고의 권리·사용 범위는 원 권리자 기준입니다.
- `vendor/remote-ar-v08.html`: 2026-10-19 비교 확인한 기존 공개 소스 사본. 실행용 진입점은 `test.html`입니다.

이 작업에서는 GitHub에 업로드하거나 Pages를 변경하지 않았습니다.
