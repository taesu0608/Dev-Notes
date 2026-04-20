- https://ittrue.tistory.com/227
# 의존성 주입(DI: Depedency Injection) 방법

- `@Component`로 등록된 빈을 `@Autowired` 를 통해 주입한다.
## 1. 생성자 주입
- 생성자를 통해서 의존 관계를 주입받는 방법
	- 생성자 호출 시점에 **1번만 호출**
	- **불변**과 **필수 의존 관계** 에 사용
	- 생성자가 1개만 존재하는 경우 @Autowired를 생략해도 자동 주입
	- NPE(NullPointerException) 방지
	- 주입받을 필드를 final로 선언 가능
```java
@Component
public class CoffeeService {
	private final MemberRepository memberRepo;

	@Autowired
	public CoffeeServiceImpl(MemberRepository memberRepo){
		this.memberRepository = memberRepository;
	}
}
```
## 2. 수정자 주입
- `setter`라 불리는 필드의 값을 변경하는 수정자 메서드를 통해서 의존 관계를 주입하는 방법
	- 선택과 변경 가능성이 있는 의존 관계의 경우 사용
	- 자바 빈 프로퍼티 규약의 `set + 필드명()`을 따름
	- `@Autowired` 를 입력하지 않으면 실행 X
```java
public class CoffeeService {
	private MemberRepository memberRepository;

	@Autowired
	public void setMemberRepository(MemberRepository memberRepository) {
		this.memberRepository = memberRepo;
	}
}
```
## 3. 필드 주입
- 필드에 `@Autowired` 를 붙여서 주입하는 방법
	- 외부에서 변경이 불가능함, 테스트가 어려움
	- 테스트 시 Mock 객체 주입하기 어려움
	- 스프링 컨테이너 없으면 동작 X
```java
@Component  
public class CoffeeService {  
  
	@Autowired  
	private MemberRepository memberRepository;  
}
```
## 4. 일반 메서드 주입
- 일반 메서드를 통해 여러 필드의 의존 관계를 주입
	- 한 번에 여러 의존성 주입
```java
@Component  
public class CoffeeService {  
  
	private MemberRepository memberRepository;  
	private DiscountPolicy discountPolicy;  
	  
	@Autowired  
	public void init(MemberRepository memberRepository, DiscountPolicy discountPolicy) {  
	this.memberRepository = memberRepository;  
	this.discountPolicy = discountPolicy;  
}  
}
```