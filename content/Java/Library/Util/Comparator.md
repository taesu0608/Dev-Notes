
# 1. Comparator
## 1.1. 정의
- 두 개의 객체를 비교하기 위한 인터페이스
```java
@FunctionalInterface
public interface Comparator<T>{
	int compare(T o1, To2);
}
```


---
# 2. 특징
## 2.1. 메서드
### 2.1.1. Comparator 추상 메서드

| 메서드 | 설명 | Version |
| ------ | ---- | ------- |
| `compare(T o1, T o2)` | 두 객체를 비교하여 정렬 순서를 반환 (음수: o1 < o2, 0: 같음, 양수: o1 > o2) | 추상 메서드 |

### 2.1.2. Comparator Default 메서드

| 메서드                                                                             | 설명                                                  | Version |
| ------------------------------------------------------------------------------- | --------------------------------------------------- | ------- |
| `reversed()`                                                                    | 현재 Comparator의 **정렬 순서를 반대로** 뒤집은 새로운 Comparator 반환 | Java 8+ |
| `thenComparing(...)`                                                            | 앞선 정렬 기준이 같을 경우, **추가 정렬 기준을 연결**                   | Java 8+ |
| `thenComparingInt(...)` / `thenComparingLong(...)` / `thenComparingDouble(...)` | 원시 타입에 특화된 추가 정렬 기준 연결                              | Java 8+ |

### 2.1.3. Comparator Static 메서드

| 메서드                                                                                        | 설명                                                       | Version |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------- | ------- |
| `comparing(Function keyExtractor)`                                                         | 주어진 키 추출 함수를 기준으로 Comparator 생성                          | Java 8+ |
| `comparingInt(ToIntFunction keyExtractor)` / `comparingLong(...)` / `comparingDouble(...)` | 원시 타입에 특화된 Comparator 생성                                 | Java 8+ |
| `naturalOrder()`                                                                           | 객체의 **자연 순서(Comparable)** 기준으로 정렬하는 Comparator 반환        | Java 8+ |
| `reverseOrder()`                                                                           | 자연 순서의 **역순 정렬 Comparator** 반환                           | Java 8+ |
| `nullsFirst(Comparator cmp)`                                                               | null 값을 **가장 앞에** 오도록 정렬, null이 아닌 값은 주어진 Comparator로 비교 | Java 8+ |
| `nullsLast(Comparator cmp)`                                                                | null 값을 **가장 뒤에** 오도록 정렬, null이 아닌 값은 주어진 Comparator로 비교 | Java 8+ |

---
## 2.2. 메서드 상세 설명
### compare()
```java
int compare(T o1, T o2);
```
- o1과 o2는 비교할 두 객체
- compare() 반환값의 부호에 따라 변환 결과를 결정지음
	- 음수: `o1`이 앞으로 정렬 (음수면 그대로)
	- 0: 순서 유지
	- 양수: `o2`가 앞으로 정렬 (양수면 바꾸기)
```java
Arrays.sort(arr, (x, y) -> 
	{ if (x[0] == y[0]) { 
		return x[1] - y[1]; 
	} else { 
		return x[0] - y[0]; 
		} 
	});
```

### comparing()
- [[메서드 체이닝 (Method Chaining)]]을 통해 중첩된 비교를 허용
-  `comparing()`은 내부적으로 `compareTo()`를 활용하지만, 객체의 특정 필드를 기준으로 정렬 기준(Comparator)을 더 유연하고 편하게 만들기 위해 사용
```java
static <T, U extends Comparable<? super U>> Comparator<T> comparing(Function<? super T, ? extends U> keyExtractor) 
    {
    Objects.requireNonNull(keyExtractor);
	    return (Comparator<T>) (c1, c2) ->
	    keyExtractor.apply(c1).compareTo(keyExtractor.apply(c2));
}

// 실제 사용 예시
Comparator<Person> comp = Comparator.comparing(Person::getName);
```
- `<T, U extends Comparable<? super U>> Comparator<T>`
	- 해당 메서드에서 2개의 T와 U 타입을 사용함을 정의
	- T: 대상 객체의 타입으로 사용
	- U: 비교 기준(key) 타입으로 사용
		- Comparable의 상속객체로 제한
			- U의 super 클래스들에 대해서만 제약
- `Function<? super T, ? extends U> keyExtractor`
	- Function<A, B>
		- A를 입력받아서 B를 반환하는 함수
- `Objects.requireNonNull(keyExtractor)`
	- `keyExtractor`가 null이면 NPE 발생
- `keyExtractor.apply()`
	- 해당 함수를 실행시키는 목적
## 2.2. 람다식과 Comparator
### 2.2.1. 람다식 축약 과정
#### 1. 익명클래스 방식
```java
List<Integer> list = Arrays.asList(5, 2, 9, 1);

list.sort(new Comparator<Integer>(){
	public int compare(Integer a, Integer b){
		return a - b; // 오름차순
	}
}
```
- `Comparator`는 [[함수형 인터페이스]] 이기에 생성자, 함수명이 불필요하다
	- 함수형 인터페이스의 주요 특징: 추상 메서드가 1개만 존재하는 인터페이스

#### 2. 람다식 기본형
```java
list.sort((Integer a, Integer b) -> {
	return a - b;
})'
```

#### 3. 람다식 축약
```java
list.sort((Integer a, Integer b) -> a - b);
```

#### 4. 더 축약
```java
list.sort((a, b) -> a - b);
```

#### Cf) 메서드 참조 (Comparable 구현체일 때)
```java
list.sort(Integer::compareTo);
```
---
