
# 1. toString() vs String.valueOf()

## 1.1. 개요
- Java에서 문자열로 변환할 때 주로 쓰는 두 메서드로 모두 `java.lang` 패키지에 포함
- null **처리 방식**과 **대상**에서 차이
- 사용 목적
	- `toString()`: 객체를 문자열 표현으로 **사용자가 정의**하기 위함
	- `valueOf()`: 값을 객체로 바꾸기 위함

***
# 2. 특징

| 항목      | toString() | String.valueOf()                      |
| ------- | ---------- | ------------------------------------- |
| null 처리 | NPE 발생     | "null" 문자열 반환                         |
| 오버라이딩   | 필요         | 불필요 (내부적으로 자동 호출됨)                    |
| 지원 타입   | 객체만        | 객체 + 기본형 모두                           |
| 내부 처리   | 직접 호출      | obj == null ? "null" : obj.toString() |

## 2.1. Object.toString()
### 2.1.1. Object.toString() 선언

```java
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```
- `getClass().getName()` → 클래스 이름 (`MyObject`)
- `hashCode()` → 객체의 해시코드를 16진수로 변환한 값

### Cf) toString()의 사용 목적
>`toString()`의 목적
객체를 문자열로 “어떻게 표현할지”를 정의하고
그 표현을 모든 출력 상황에서 일관되게 사용하기 위함

***
# 3. 예제

```java
Object obj = null;

// System.out.println(obj.toString()); //  NPE
System.out.println(String.valueOf(obj)); //  "null"

StringBuilder sb = new StringBuilder("hello");
System.out.println(sb.toString());      // "hello"
System.out.println(String.valueOf(sb)); // "hello"

String msg = "결과: " + obj; // 내부적으로 String.valueOf(obj)
```

***
# 4. CF

- println(obj) → 내부적으로 valueOf(obj) 호출
- 의미 있는 출력 원할 경우 toString 오버라이딩 필요

```java
@Override
public String toString() {
    return "User{name='Kim'}";
}
```

***
# 5. 정리

| 상황                  | 추천 방식         |
|-----------------------|------------------|
| null 가능성 존재      | String.valueOf() |
| 의미 있는 출력 원함   | toString()       |
| 문자열 연산           | + 연산자 사용    |
***
