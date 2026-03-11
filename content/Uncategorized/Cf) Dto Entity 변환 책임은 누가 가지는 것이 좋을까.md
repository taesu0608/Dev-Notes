
dto
- 서비스 이용의 필요 정보

entity
- dto 정보 + 불필요한 정보 + 개인 정보(필수 정보)

1. Entity클래스 DTO간의 인스턴스 메서드를 통한 변환 수행
- toEntity
- fromDto

2. Controller Layer에서 변환수행
- 장점
	- Service 계층의 순수한 도메인 로직만 다룸
	- 변환 지점이 명확하여 코드 추적 용이
- 단점
	- Controller가 Entity 구조를 알아야함
	- 여러 Controller에서 변환 로직이 중복될 수 있음

1. Service Lay에서 변환 수행
- 장점
	- Controller가 Entity 구조를 알 필요 없음
	- 비즈니스 로직과 함께 데이터 변환을 캡슐화
	- 변환 로직의 재사용성이 높음
- 단점
	- Service 계층의 책임이 증가
	- Entity를 사용하는 다른 Service에서 재사용이 어려울 수 있음
		- 다른 Service 에서 해당 Service로의 참조가 강제된다.