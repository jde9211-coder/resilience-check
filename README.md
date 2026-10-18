# 회복탄력성 자가진단 (20문항)

김주환 교수의 한국형 회복탄력성 지수(KRQ-53) 3요인·9하위요인 구조와 Reivich & Shatté, CD-RISC, BRS 연구를 참고해 새로 작성한 20문항 자가진단입니다.

- 자기조절능력 7문항 (감정조절력·충동통제력·원인분석력)
- 대인관계능력 7문항 (소통능력·공감능력·자아확장력)
- 긍정성 6문항 (자아낙관성·생활만족도·감사하기)
- 5점 리커트, 역채점 5문항, 총점 20–100

## 구조
- 정적 사이트 (`index.html`, `style.css`, `app.js`) — Vercel 배포
- Supabase `public.resilience_responses` 테이블에 응답 저장 (RLS: 익명 INSERT만 허용)
- `public.resilience_stats()` RPC로 전체 평균만 조회

응답 데이터는 Supabase 대시보드 Table Editor에서 확인할 수 있습니다.
