##### 인터페이스는 계약과 동시에 즉시 응답을 보장한다.
## 1. 동기(인터페이스 중심)
- **요청 제약**: 강한 타입/시그니처 계약
- **즉시 응답 보장**: 호출 시점 동시성 요구
- 단점:
  - 호출자 스레드 점유
  - 타임아웃·백프레셔·장애 전파에 취약
- 결합 완화 방식:
  - Facade / Adapter
  - Circuit Breaker
  - Timeouts / Retries
  - Bulkhead 등

## 2. 비동기(메시지 계약 중심)
- **계약 방식**: 메서드 인터페이스 대신 스키마/이벤트 계약 (Avro/JSON Schema, AsyncAPI 등)
- **즉시 리턴**: 시간적 결합 해소
- 장점:
  - 다중 구독 용이
  - 확장성 우수
- 필수 기법:
  - Correlation ID
  - Outbox 패턴
  - 재시도 + Idempotency Key
  - Dead Letter Queue
  - 버전드 스키마 관리
  - 결국 일관성(Eventual Consistency)

## 3. 결론
- 동기: “즉시 리턴”이 본질 → 인터페이스와 결합이 짙어짐
- 비동기: 즉시성 요구를 제거 → **인터페이스 형태가 메시지 계약으로 전환**
