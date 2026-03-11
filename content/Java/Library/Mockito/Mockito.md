## 1.1. 정의
- Mockito는 Java용 가장 널리 쓰이는 Mocking 프레임워크
- 단위 테스트 작성 시 독립적인 테스트를 가능하게 함

## 1.2. 목적
- 단위 테스트: 의존성 있는 객체를 가짜(mock)로 만들어 외부 영향 없이 테스트 대상 로직만 검증
- 독립적인 테스트: 실제 객체의 상태나 외부 시스템에 의존하지 않고 테스트 가능
- 테스트 실행 속도: 테스트 실행 속도 향상 및 재현성 보장

---

# 2. 특징
## 2.1. @Mock
- **정의**: 실제 객체 대신, 동작을 흉내 내는 가짜 객체를 생성하는 어노테이션
- **목적**: 네거티브 방식
- **특징**
	- 모든 메서드는 기본적으로 아무 동작 X
		- 원시타입 return: 0
		- 참조타입 return: null
		- 부울타입 return: false
	- 원하는 메서드만 동작 정의
		- `when().thenReturn()`
		- `doReturn().when()`
	- Mockito 알림을 위한 명시적 초기화 필요
	    - `MockitoAnnotations.openMocks(this)`
		- `@ExtendWith(MockitoExtension.class)`
- **예시**
```java
public class Calculator {
	public int add(int a, int b){
		return a + b;
	}

	public int multiply(int a, int b){
		return a * b;
	}
}
```

``` java
class CalculatorTest {

	@Mock
	private Calculator calculator;

	@Test
	void testMock() {
		MockitoAnnoattions.openMocks(this);

		// add 메서드: if dont stub, return 0;
		int defaultResult = calculator.add(2, 3);
		asserThat(defaultResult).isEqualTo(0);

		// multiply 메서드는 스텁 처리 (가짜 값 지정)
		when(calculator.multiply(2, 3)).tenReturn(100);
		int fakeResult = calculator.multiply(2, 3);
		assertThat(fakeResult).isEqualTo(100);
	}
}
```
## 2.2. @Spy

- **정의**: 실제 객체를 생성하되, 일부 메서드만 스텁(mock) 처리하고 싶은 경우 사용
- **목적:** 포지티브 방식
- **특징**
    - 진짜 객체가 생성되며, 기본적으로 모든 메서드는 실제 로직 수행
    - `when(...).thenReturn(...)` 으로 특정 메서드만 가짜 응답 설정 가능
    - Mockito 알림을 위한 명시적 초기화 필요
	    - `MockitoAnnotations.openMocks(this)`
		- `@ExtendWith(MockitoExtension.class)`
- **예시**

```java

public class Calculator {     
	public int add(int a, int b) {         
		return a + b;
		}     
	public int multiply(int a, int b) {         
		return a * b;
		}
}
```

```java
class CalculatorTest {     
	@Spy     
	private Calculator calculator;      
	@Test     
	void testSpy() {
        MockitoAnnotations.openMocks(this); // @Spy 초기화 필수

        // 실제 add 메서드는 정상 호출됨
        int realResult = calculator.add(2, 3);
        assertThat(realResult).isEqualTo(5);

        // multiply는 Stub 처리 (가짜 리턴값 설정)
        when(calculator.multiply(2, 3)).thenReturn(100);
        int fakeResult = calculator.multiply(2, 3);
        assertThat(fakeResult).isEqualTo(100);
    }
}
```

### Cf) Spy객체의 when().thenReturn()은 실제 메서드를 실행을 **주의**해라
- Spy 객체는 실제 객체 기반의 Mocking을 하는 Positive 방식의 작업이다. 따라서 `when().thenReturn()` 은 해당 객체의 메서드를 실행후 결과값을 통제하는 방식이므로
  Spy 객체의 실제 메서드가 실행된다.
- `doReturn().when()`을 통하여 이를 방지할 수 있다.
---

## 2.3. @InjectMocks

- **정의**: 테스트 대상 클래스에 대해 `@Mock` 혹은 `@Spy` 객체들을 자동으로 주입하는 애노테이션
- **목적**: `@InjectMocks`의 객체는 이미 `@Mock` 이나 `@Spy`로
- **특징**
    - 내부 필드, 생성자, setter 등을 통해 의존성 자동 주입
    - 단독 사용 불가, `@Mock` 또는 `@Spy`와 함께 사용해야 효과 발생
    - 명시적 초기화 필요 (`openMocks` 또는 MockitoExtension)
        

---

# 3. CF

## 3.1. @Mock vs @Spy

|항목|`@Mock`|`@Spy`|
|---|---|---|
|기본 동작|모든 메서드가 가짜 (stub 필요)|모든 메서드가 실제 동작|
|스텁 메서드 지정|필수 (`when` 없으면 0/null 등)|선택 (`when` 지정된 메서드만 스텁)|
|사용 목적|완전한 mocking|부분 mocking|

## 3.2. 참고

- [[Cf) @Mock을 활용한 단위 테스트 전략]]
- [[Cf) @Spy가 필요한 케이스 vs 일반 Mock]]
- [[Cf) MockitoExtension과 openMocks 차이]]