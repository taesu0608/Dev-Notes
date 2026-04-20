- https://inpa.tistory.com/entry/OOP-%F0%9F%92%A0-%EC%95%84%EC%A3%BC-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8A%94-LSP-%EB%A6%AC%EC%8A%A4%EC%BD%94%ED%94%84-%EC%B9%98%ED%99%98-%EC%9B%90%EC%B9%99

# 1. LSP(Liskov Substitution Principle)
**정의**: 하위 타입(자식 클래스)은 상위 타입(부모 클래스)을 대체할 수 있어야 한다
- SOLID의 세 번째 원칙
    - S: SRP (단일 책임 원칙)
    - O: OCP (개방-폐쇄 원칙)
    - **L: LSP (리스코프 치환 원칙)**
    - I: ISP (인터페이스 분리 원칙)
    - D: DIP (의존성 역전 원칙)

**목적**
- 잘못된 상속으로 [[다형성]]이 깨지는 것을 방지
- 하위 타입이 상위 타입이 기대하는 **규약, 의미, 동작 방식**까지  유지해야 함
-  상위 타입을 기준으로 작성된 코드를 하위 타입으로 교체되어도 **안정성 보장**

---

# 2. 상속 관계와 치환 가능성
- 객체지향언어의 특징 중 하나인 상속 관계는 치환 가능성을 높여주는 특성이 있음
- 상위 타입이 하위 타입에게 필드와 메서드를 계승하므로 하위타입은 여러 경우에 상위 타입 대신의 치환이 가능
- 하지만 상속 관계가 완전한 치환의 충분조건은 아님
## 2.1. LSP 위반의 경우
- LSP 위반은 다양한 형태로 나타나지만, 여러 사례를 공통된 기준으로 정리하면 다음과 같이 분류할 수 있다.
1. 하위 타입이 상위 타입보다 더 강한 선행조건을 요구하는 경우
2. 상위 타입이 보장하던 후행조건을 유지하지 못하는 경우
- 여기서 선행조건과 후행조건은 엄밀한 학술 용어라기보다는,  
- 본 글에서는 메서드 상속 과정에서 발생하는 위반을 호출 이전과 호출 이후의 관점으로 구분하기 위해, 선행조건과 후행조건을 실용적인 기준으로 사용한다.
### 2.1.1. 선행조건
**선행 조건**: 메서드를 호출하기 전에 만족되어야 하는 조건
- Ex) 파라미터 값의 범위, null 허용 여부, 예외 실행 조건, 조건문, 객체의 현재 상태
	- - `amount >= 0`
	- `user != null`
	- 잔액이 0 이상이어야 함
	- 이미 로그인된 상태여야 함
#### Ex) 선행조건 위반
```java
public class Main {  
	public static void main(String[] args) {  
		// 상위 타입 변수에 하위 타입 객체를 대입  
		Payment payment = new CardPayment();  
	  
		// 클라이언트는 Payment 타입만 보고 사용  
		// 즉, 부모 타입 기준으로는 pay(500) 호출이 가능하다고 기대할 수 있음  
		processPayment(payment, 500);  
	}  
  
static void processPayment(Payment payment, int amount) {  
// 호출 흐름  
// 1. 클라이언트는 Payment 타입 객체를 받음  
// 2. payment.pay(amount)를 호출함  
// 3. 실제 객체가 CardPayment 이므로 오버라이딩된 pay()가 실행됨  
// 4. 부모는 amount >= 0 이면 허용하지만  
// 5. 자식은 amount >= 1000 이어야만 허용함  
// 6. 따라서 부모보다 더 강한 선행조건을 요구하게 됨  
// 7. 결과적으로 상위 타입을 하위 타입으로 안전하게 대체하지 못함  
  
	payment.pay(amount);  
	}  
}  
  
class Payment {  
	void pay(int amount) {  
	// 부모의 선행조건:  
	// amount는 0 이상이면 된다.  
	if (amount < 0) {  
	throw new IllegalArgumentException("금액은 0 이상이어야 합니다.");  
	}  
  
	// 부모의 의도:  
	// 0 이상의 금액은 결제가 가능하다고 본다.  
	}  
}  
  
class CardPayment extends Payment {  
	@Override  
	void pay(int amount) {  
	// 자식의 선행조건:  
	// amount는 1000 이상이어야 한다.  
	if (amount < 1000) {  
		throw new IllegalArgumentException("카드 결제는 1000원 이상만 가능합니다.");  
		}  
  
	// 문제점:  
	// 부모는 허용하던 500원을 자식은 허용하지 않는다.  
	// 즉, 자식이 부모보다 더 강한 조건을 요구한다.  
	// 이것은 선행조건 강화에 해당한다.  
	}  
}
```
### 2.1.2. 후행조건
**후행 조건**: 메서드 호출 후 보장되어야 하는 결과나 상태
- Ex) 반환값의 의미, 상태 변화 결과, 부수 효과, 부모가 약속한 동작 결과
	- 상위 타입의 실행 의도와 다른 의도 혹은 결과를 가져오는 것을 말함

#### Ex) 후행조건 위반
```java
public class Main {
    public static void main(String[] args) {
        // 상위 타입 변수에 하위 타입 객체를 대입
        Counter counter = new BrokenCounter();

        // 클라이언트는 Counter 타입만 보고 사용
        // 즉, increase() 호출 후 count가 1 증가할 것이라 기대할 수 있음
        increaseOnce(counter);
    }

    static void increaseOnce(Counter counter) {
        // 호출 흐름
        // 1. 클라이언트는 Counter 타입 객체를 받음
        // 2. counter.increase()를 호출함
        // 3. 실제 객체가 BrokenCounter 이므로 오버라이딩된 increase()가 실행됨
        // 4. 부모는 count가 1 증가할 것을 보장함
        // 5. 그러나 자식은 count를 2 증가시킴
        // 6. 즉, 호출 이후의 결과가 부모의 보장과 달라짐
        // 7. 결과적으로 상위 타입을 하위 타입으로 대체했을 때 기대한 후행조건이 유지되지 않음

        counter.increase();
    }
}

class Counter {
    protected int count = 0;

    void increase() {
        // 부모의 후행조건:
        // increase() 호출 후 count는 정확히 1 증가해야 한다.
        count++;
    }

    int getCount() {
        return count;
    }
}

class BrokenCounter extends Counter {
    @Override
    void increase() {
        // 자식의 실제 동작:
        // count를 2 증가시킨다.
        count += 2;

        // 문제점:
        // 부모는 호출 후 count가 1 증가할 것을 보장했지만
        // 자식은 그 결과를 유지하지 않는다.
        // 이것은 후행조건 변경에 해당한다.
    }
}
```