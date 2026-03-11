- https://www.elancer.co.kr/blog/detail/231

백엔드에서 데이터베이스로 사용하는 프레임워크 기술
- [[Mybatis]]
- [[JPA]]

> 한줄요약
> Mybatis는 행동(Behavior)에 집중
> JPA는 객체(Entity)에 집중한 프레임워크이다.


# Mybatis
- **SQL Mapper 기술**
	- 개발자가 작성한 SQL 실행 결과를 객체에 매핑
	- 인터페이스 메서드 : SQL 구문 1 : 1 매핑
- **특징**
	- SQL 제어
	- 데이터베이스별 특화 기능 사용 용이
	- 유지보수 시 SQL 관리 부담
- **장점**
	- 세밀한 쿼리 제어
	- SQL과 비즈니스 로직 분리(XML/어노테이션 기반)

# JPA
- **ORM(Object Relational Mapping) 기술**
	- 객체와 DB의 데이터를 '자동으로 매핑'
	- 개발자는 Enitty와 관계만 정의
- **특징**
	- 객체지향적인 코드 > Entity 중심의 개발
	- 영속성 컨텍스트, 캐싱, 지연 로딩, 변경 감지 기능 제공
	- 복잡한 쿼리는 JPQL, QueryDSL등 보완필요
- **장점**
	- 생산성, 유지보수성 향상 (SQL 작성량 감소)
	- 도메인 주도 설계 (DDD)와 잘 어울림