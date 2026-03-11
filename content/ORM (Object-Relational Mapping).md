- https://eun-jeong.tistory.com/31
# 1. ORM(Object Relational Mapping) 개념
- `ORM(Object Relational Mapping)` = `객체로 연결을 해준다.`
- 목적
	- 어플리케이션 개발 언어로 DB 접근

# 2. ORM 특징 
## 2.1. SQL Mapper
- `Object`와 `SQL`의 필드를 매핑하여 데이터를 객체화함
- 객체의 행동(Behavior,SQL)에 포커스를 둔 기술
- Ex) Jdbc Template, MyBatis

## 2.2. ORM
- 객체(Object)와 DB의 테이블을 자동으로 연결(Mapping)하는 기술
- 객체의 존재(Being, Entity)에 포커스를 둔 기술
- Ex) [[JPA]], JPA의 구현체 Hibernate

## 2.3. 객체 - 관계 간의 불일치
![[Pasted image 20250817182353.png]]
1. 세분성(Granularity)
	- DB의 테이블 수보다 더 많은 클래스를 가진 모델이 생길 수도 있음
	>예를 들어, Person과 Address 두 개의 클래스로 어플리케이션 내부에선 사용자 정보를 활용하지만 DataBase에선 하나의 Table로 취급될 수 있다.
2. 상속성(Inheritance)
	- RDBMS는 객체지향 프로그래밍 언어의 특징인 상속 개념 X
3. 일치(Identity)
	- RDBMS 동일성
		- 기본키(Primary Key)를 통해 동일성을 정의
	- Java
		- 동일성 (객체 식별/ `a==b`) 
		- 동등성 (`a.equals(b)`)를 모두 정의
4. 연관성(Associations)
	- RDBMS 연관성
		- 외래키 (Foreign Key)
	- Java 연관성
		- 객체 참조 (Reference)
5. 탐색(Navigation)
	- RDMBS
		- `JOIN`을 통해 여러 엔티티 로드(LOAD)한 뒤, 대상 엔티티 선택(SELECT)
	- Java
		- 메서드 체이닝과 같은 연결리스트 방식의 탐색

## 2.4. 장단점
- **장점**
	- 객체지향적인 코드
	- 재사용 및 유지보수성의 편리성 증가
	- DBMS 종속성 감소
- **단점**
	- 완벽한 ORM으로만 서비스 구현 부락
	- 프로시저가 많은 시스템에선 ORM의 객체 지향적인 장점 활용 불가
# 3. CF
[[Cf) 실무에서 JPA vs Mybatis]]
Frameworks
- JPA/Hibernate
	- JPA(Java Persistence API)는 자바의 ORM 기술 표준으로 인터페이스의 모음이다. JPA 표준 명세를 구현한 구현체가 Hibernaer
- Sequelize
	- Postgres, MySQL, MariaDb, SQLite를 지원하는 `Promise`에 기반한 비동기로 동작하는 Node.js ORM
		- 복잡한 비동기 코드를 쉽게 만듬
		- Chaining을 통해 값 전달 및 연속된 일련의 작업 처리
		- Error handling에 대한 처리를 깔끔하게 함
- Django ORM
	- Python 기반 프레임워크인 Django에서 자체적 지원하는 ORM
- Prisma
	- GraphQL 스키마를 기반으로 DB 자동 생성
	- GraphQL 특징
		- 수신 메세지가 JSON과 비슷 송신 메세지는 JSON형태임
		- 단일 요청으로 원하는 데이터를 한번에 가져옴
		- type system을 지원
		- GraphiQL 등의 강력한 도구 사용
		- 확장성이 좋음
