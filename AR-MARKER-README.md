# 태성 AR 링 · 최상위 배포

별도 폴더 없이 모든 시험 파일을 저장소 최상위에 배치합니다. 시작은 `index.html?v=scale2` 또는 `test.html?v=scale2`입니다.

표시 크기 수정 v2가 포함돼 있습니다. 이미 출력한 마커를 그대로 쓰세요. 실물 10mm 인식 보장은 아닙니다.

- 출력: A4-marker-tests.pdf (실제 크기 100%)
- 분석 및 시험: AR-MARKER-REPORT-ko.md
- 표시 수정 설명: SCALE-FIX.md
- 검증: scale-validation.json

A/B/C/D .png·.svg·.patt는 같은 이름끼리 대응합니다. `-inner` 이미지는 학습용이며 반지 출력물로 쓰지 않습니다.

실행 코드는 ar-lab.js, aframe-lab.min.js, aframe-ar-lab.js입니다. 기존 ar-v08.html·ar.js·assets는 유지합니다. A-Frame 1.6.0 및 AR.js 3.4.7(MIT), 공식 패턴 인코더와 기본 카메라 보정 파일을 사용합니다.
