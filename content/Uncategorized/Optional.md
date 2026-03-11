## 1.1. 정의

- `Optional<T>`는 Java 8에서 도입된 **null-safe 컨테이너 클래스**로, **값이 있을 수도 없을 수도 있음**을 명시적으로 표현할 수 있도록 설계됨
- `null` 참조를 직접 다루는 대신, Optional 객체를 통해 null 여부를 판단하고 처리한다.


```java
Object obj = null; Optional<Object> opt = Optional.ofNullable(obj);
```
---

## 1.2. 목적
- [[NPE]] 방지
- 코드 가독성 향상
- 함수형 프로그래밍 지원

---

# 2. Optional API

## 2.1. 메서드

### 2.1.1. 생성 메서드

|메서드|설명|
|---|---|
|`of(T)`|null이 아닌 객체로 Optional 생성 (null이면 예외 발생)|
|`ofNullable(T)`|null 여부와 상관없이 Optional 생성|
|`empty()`|비어 있는 Optional 반환|

---
### 2.1.2. Null 확인

|메서드|설명|
|---|---|
|`isPresent()`|값이 존재하는지 여부 반환|
|`ifPresent(Consumer)`|값이 존재할 때만 로직 실행|

---
### 2.1.3. Null 처리

| 메서드                     | 설명                       |
| ----------------------- | ------------------------ |
| `orElse(T)`             | 값이 존재하지 않을 경우 지정한 기본값 반환 |
| `orElseGet(Supplier)`   | 값이 없을 경우 람다 실행 후 반환      |
| `orElseThrow(Supplier)` | 값이 없을 경우 예외 발생           |
-  `orElse` vs `orElseGet` 차이

```java
public static String getStr() {     
System.out.println("I am being evaluated");     return "Hi!"; }  

Optional<String> str = Optional.of("I exist"); 
String a = str.orElse(getStr());         // getStr() 실행됨 
String b = str.orElseGet(() -> getStr()); // getStr() 실행 안됨
```

---
### 2.1.4. 고급 API

|메서드|설명|
|---|---|
|`map(Function)`|Optional 내부 값을 변환|
|`filter(Predicate)`|조건에 맞는 값만 유지|
|`get()`|값 반환 (존재하지 않으면 예외 발생 – 사용 지양)|

```java
Optional<String> opt = Optional.of("Hi there"); 
int len = opt.map(String::length).orElse(0);  
opt.filter(s -> s.endsWith("java")).ifPresent(System.out::println);
```
---
## 2.2. Optional 실용
### 2.2.1. 캐시

```java
public enum ObjectCache {     
	INSTANCE;      
	private final Map<String, Object> objectMap = new HashMap<>();      
	public Optional<Object> get(String key) {         
		return Optional.ofNullable(objectMap.get(key));     
		}      
	public void add(String key, Object value) {         
		objectMap.put(key, value);     
		}      
	public Optional<Object> delete(String key) {         
		return Optional.ofNullable(objectMap.remove(key));     
		}
	}
```

- 캐시에 값이 없을 수 있으므로 Optional을 사용해 안전하게 조회 
---
### 2.2.2 Spring JPA Repository

```java
@Repository 
public interface UserRepository extends JpaRepository<User, String> {
	Optional<User> findByUsername(String username);     
	Optional<User> findByEmail(String email); 
	}
```
- 데이터가 존재하지 않을 수 있으므로 Optional로 반환
- Service 계층에서 `orElseThrow()` 등으로 해제
---
## 2.3. Anti Pattern
### 1) isPresent() - get() -> orElse()/orElseGet()/orElseThrow()

```java
// as is 
Optional<Member> member = ...;  
if (member.isPresent()) {  
    return member.get();  
} else {  
    return null;  
}  
  
// to be
Optional<Member> member = ...;  
return member.orElse(null);  
  
  
  
// as is
Optional<Member> member = ...;  
if (member.isPresent()) {  
    return member.get();  
} else {  
    throw new NoSuchElementException();  
}  
  
// to be
Optional<Member> member = ...;  
return member.orElseThrow(() -> new NoSuchElementException());
```

### 2) 무지성 get 금지
```java
// as is
Optional<Member> member = memberRepository.findById(memberId);
member.get();

// to be
Optional<Member> member = memberRepository.findById(memberId);
Member user = member.orElseThrow(() -> new NoSuchElementException("해당 회원이 존재하지 않습니다."));
```
---
# 3. CF


