(https://www.redhat.com/en/topics/devops/what-is-blue-green-deployment)

# 0. Overview
블루 그린 배포는 애플리케이션 릴리즈 모델이다
- 이전 버전으로부터 유저 트래픽을 점진적으로 전환한다.
- 프로덕션이 실행중인 동시에
**Blue environment**
- 오래된 버전
**Green environment**
- 새로운 버전

트래픽의 완전한 전환 이후에 Blue environment는 세가지 용도로 주로 사용된다.
- 롤백 대기
- 프로덕션 삭제
- 새로운 업데이트를 위한 템플릿

### Cf) 수직 확장(Scale Up) vs 수평 확정(Scale Out)
1. 수직 확장(Vertical Scaling/ Scale Up)
- 하나의 좋은 서버를 이용
- **장점**
	- 구현이 간단함
	- 기존 애플리케이션 수정 불필요 - 데이터 일관성 보장이 쉬움
- **단점**
	- 하드웨어 성능의 한계 존재
		- 비용 상승의 폭이 기하 급수적임
	- [[단일 장애 지점 (SPOF)]]
	- 확장 시 다운타임 발생

1. 수평 확장(Horizontal Scaling/ Scale Out)
- 여러 대의 서버로 부하를 분산
- **장점**
	- 무한 확장 가능
	- Fault Tolerance(장애 허용성) 높음
	- 효율적
- **단점**
	- 시스템 구조의 복잡도 증가
	- 데이터 일관성 유지 어려움
	- 애플리케이션 구조 수정 필요
# 1. Blue-Green Deployment
## 1.1. 배포 절차
1. 현재 운영 중인 서버(V1)는 Blue 환경
2. 새로운 버전 서버(V2)는 Green 환경에 배포 후, 테스트 완료
3. 문제 없을 시, 로드밸런서 트래픽 Blue > Green으로 전환

## 1.2. 단점
1. 인프라 비용 증가
2. 공통 자원 충돌
	- DB나 캐시 등 공유 리소스 간의 상태 충돌 우려
3. 데이터 마이그레이션 복잡
	- DB 스키마가 변경될 경우 롤백이 어려워짐
4. 전환관리 필요
	- Health Check 필요