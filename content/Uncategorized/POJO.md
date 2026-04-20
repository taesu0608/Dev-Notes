# 1. Plain Old Java Object
[[JLS (Java Language Specification)]]에 의해 강제된 것 이외의 제한에 의존하지 않는 Java Object를 부르는 용어

# 2. 특정
## 2.1. 특정 규약에 종속되지 않음
1. 상속 강제
	- 특정 클래스를 반드시 상속해야 함
2. 인터페이스 구현 강제
	- 특정 인터페이스를 반드시 구현해야 함
3. 라이프사이클 메서드 시그니처 강제
	- 특정 메서드 이름/시그니처 존재
4. 런타임 환경 종속
	- 특정 컨테이너 안에서만 실행
5. 플랫폼/벤더 API 종속
	- 특정 벤더 API를 직접 호출

## 2.2. 특정 환경에 종속되지 않음
- Ex) 웹 환경 종속 API(HttpServletRequest, HttpSession) 이용 X

## 2.3. [[단일 책임 원칙 (SRP)]]

### Cf) POJO와 getter, setter의 관계
> 옛 자바빈즈(JavaBeans)의 규약에 존재하였던 public getter/setter 존재에서 영향을 받은 많은 POJO 지향 프레임워크들이 이를 따름
> OOP의 캡슐화의 주된 특징과 맞닿아있어 getter/setter의 사용이 곧 객체지향 + POJO 설계의 필수불가결한 특징으로 받아들이길 위해














