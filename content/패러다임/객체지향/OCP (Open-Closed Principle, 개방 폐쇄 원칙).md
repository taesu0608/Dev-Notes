- https://inpa.tistory.com/entry/OOP-%F0%9F%92%A0-%EC%95%84%EC%A3%BC-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8A%94-OCP-%EA%B0%9C%EB%B0%A9-%ED%8F%90%EC%87%84-%EC%9B%90%EC%B9%99

# 1. 개방 폐쇄 원칙
**정의**: 개방적인 확장, 폐쇄적인 수정
- SOLID의 두 번째 원칙
	- S: SRP (단일 책임 원칙)
	- **O: OCP (개방-폐쇄 원칙)**
	- L: LSP (리스코프 치환 원칙)
	- I: ISP (인터페이스 분리 원칙)
	- D: DIP (의존성 역전 원칙)
# 2. 개방

## 2.1. 메서드 확장 (인터페이스 활용)
**정의**: 공통 메서드 명세를 인터페이스로 오픈하여 구현체 추가, 교체를 통해 메서드 동작을 확장하는 방식
### 2.1.1. 레이어별 기능 추가
- 계층마다 메서드 형식은 유지하되, 각 레이어에서 역할이 달라짐
- 공통 인터페이스를 기준으로 서비스, 저장소, 외부 연동 계층 등으로 레이어 구분
#### Ex) [[Spring MVC]]의 `save()`
- Service 계층: 유효성 검증(validation), 저장 요청
- Repository 계층: 실제 DB
- Client 계층: 외부 API 저장 요청

### 2.1.2. 구현체 각각의 내부로직
- 가장 전형적인 OCP 확장 방식

#### Ex) 정책에 따른 내부로직 변경
```java
public interface DiscountPolicy {  
	int discount(int price);  
}

// 고정 금액 할인 구현체
public class FixDiscountPolicy implements DiscountPolicy {  
  
private final int discountAmount;  
  
	public FixDiscountPolicy(int discountAmount) {  
		this.discountAmount = discountAmount;  
	}  
  
@Override  
	public int discount(int price) {  
		return price - discountAmount;  
	}  
}

// 정가율 할연 구현체
public class RateDiscountPolicy implements DiscountPolicy {  
  
	private final double discountRate;  
  
	public RateDiscountPolicy(double discountRate) {  
		this.discountRate = discountRate;  
	}  
  
@Override  
	public int discount(int price) {  
		return (int) (price * (1 - discountRate));  
	}  
}
```
---
## 2.2. 메서드 확장 (조합)
**정의**: 상속 없이 다른 객체를 포함하며, 그 객체의 메서드를 호출하거나

### 2.2.1. 위임을 위한 메서드 확장
- 내부에 다른 객체를 두고, 해당 객체에 메서드 호출을 넘김
#### Ex) 협력 객체 사용
```java
class OrderService {  
	private final PaymentService paymentService;  
  
	public void order() {  
		paymentService.pay();  
	}  
}
```

### 2.2.2. 부가 기능을 위한 메서드 확장
- 데코레이터적 확장
- 로깅, 캐싱, 인증, 검증, 트랙잭션 등을 추가
### 2.2.3. 여러 객체를 활용한 메서드 확장
- 여러 객체와의 협력을 통해 기능을 확장
---
## 2.3. 메서드 확장 (상속)
### 2.3.1. 재정의
- 부모클래스 , 자식클래스, [[오버라이딩 (Overriding)]]

#### Ex) 상속관계에서의 재정의
```java
class Animal {  
	void sound() {  
	System.out.println("...");  
	}  
}  
  
class Dog extends Animal {  
@Override  
void sound() {  
	System.out.println("멍멍");  
	}  
}
```

### 2.3.2. 추상메서드 구현
- 추상클래스와 구현클래스를 통한 메서드 확장
```java
abstract class Payment {  
	abstract void pay();  
}
```