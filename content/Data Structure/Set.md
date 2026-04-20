# 1. Set
**정의**: 중복된 원소를 허용하지 않으며, 원소의 순서를 보장하지 않는 자료구조

Set 인터페이스의 주요 구현체
- `HashSet`
- `LinkedHashSet`
- `TreeSet`

---

# 2. 특징
## 2.1. Set의 특징
1. **중복 요소 허용 X**
2. **순서 보장 X**  
   (구현체에 따라 다름)
3. **빠른 탐색**

패키지

```
java.util.Set
```

---

# 3. Java Set 구현체

| 구현체 | 내부 구조 | 특징 | 시간복잡도 |
|---|---|---|---|
| **HashSet** | HashMap | 순서 보장 없음, 가장 빠름 | O(1) |
| **LinkedHashSet** | HashMap + LinkedList | 삽입 순서 유지 | O(1) |
| **TreeSet** | RedBlackTree | 자동 정렬 | O(log n) |

---
# 4. HashSet

*정의*: 해시 테이블(Hash Table)을 기반으로 구현된 Set으로, 중복된 원소를 허용하지 않으며 순서를 보장하지 않는 자료구조
## 4.1. 특징
1. 중복 허용 X
    - 같은 데이터는 하나만 저장된다.
2. 순서 보장 X
    - 입력 순서나 정렬 순서를 유지하지 않는다.
    - 매 출력마다 순서가 동일하지 않음
3. 빠른 탐색 성능
    - 평균 시간복잡도 **O(1)**
4. Hash 기반 저장 방식
    - 데이터를 `hashCode()` 값 기반으로 버킷에 저장

##### HashSet<Cusom객체> 사용 시 주의점
직접 만든 객체를 Set에 저장할 경우 반드시 구현해야 하는 메서드
- `hashCode()`
- `equals()`
### 4.1.1. HashMap 기반

```
key   → 실제 데이터
value → dummy object
```

### 4.1.2. 초기 용량 (Initial Capacity)
- 초기용량 = 예상 데이터 수 / **Load factor**
- **Load factor**: 저장된 데이터 개수 / 해시 테이블 버킷 개수

|개념|의미|
|---|---|
|실제 load factor|현재 채워진 비율|
|Java loadFactor 변수|resize 기준 비율|
- Load factor가 크면 해시 충돌이 증가
- Load factor가 작으면 resizing이 빈번해짐
## 4.2. 시간 복잡도

| 연산 | 시간복잡도 |
|---|---|
| add | O(1) |
| contains | O(1) |
| remove | O(1) |
### Worst Case
- O(n)
	- 모든 데이터에서 해시 충돌 발생 시

---
# 5. LinkedHashSet

**정의**: HashSet의 특성은 유지하면서 삽입 순서를 보장하는 Set 구현체

## 5.1. 특징
1. 중복 허용 X
    - Set이므로 같은 데이터는 하나만 저장
2. 삽입 순서 유지
    - 데이터가 들어온 순서대로 iteration 된다
3. Hash 기반 구조
    - 내부적으로 **HashMap + Linked List 구조** 사용
4. 탐색 성능 유지
    - `HashSet`과 동일하게 평균 **O(1)**
### 5.1.1. 단점
- Linked List 관리로 인한 **추가 메모리 오버헤드**
### Cf) LinkedHashSet 구조

``` java
// LinkedHashSet 정의
public class LinkedHashSet<E> extends HashSet<E> implements Set<E>, Cloneable, java.io.Serializable  {  
		public LinkedHashSet() {  
		super(16, .75f, true);  
	}  
}
```

```java
public class HashSet<E> extends AbstractSet<E> implements Set<E>, Cloneable, java.io.Serializable {  
	private transient HashMap<E,Object> map;  
	private static final Object PRESENT = new Object();  
	
	...
	/// LinkedList 전용 생성자
	HashSet(int initialCapacity, float loadFactor, boolean dummy) {  map = new LinkedHashMap<>(initialCapacity, loadFactor);  
}
}
```

### 5.1.2. HashSet 내부 정의
```java
public class HashSet<E> extends AbstractSet<E> implements Set<E>, Cloneable, java.io.Serializable {  
	private transient HashMap<E,Object> map;  
	private static final Object PRESENT = new Object();  
}
```

## 5.2. 사용 예
- 장바구니
- 최근 방문 목록
- 입력 순서 유지 데이터

---
# 6. TreeSet

**정의**: [[HashSet]]의 특성을 유지하면서 **삽입 순서를 보장하는 Set 구현체**
## 6.1. 특징
- [[Red-Black Tree]] 기반
1. **자동 정렬 유지**
2. CRD 연산에서 **O(log n)** 보장

## 6.2. 시간 복잡도

| 연산 | 시간복잡도 |
|---|---|
| add | O(log n) |
| contains | O(log n) |
| remove | O(log n) |

---
# ConcurrentHashMap 기반 Set

**정의**: `ConcurrentHashMap`을 기반으로 구현된 **스레드 안전(Thread-safe) Set**으로,  
여러 스레드가 동시에 접근하여도 동기화 문제 없이 원소를 추가·삭제·조회할 수 있는 Set 구현체
## 7.1. ConcurrentHashMap 기반 Set

```
ConcurrentHashMap.newKeySet()
```

## 7.1. 특징
- 내부적으로 **ConcurrentHashMap 사용**
- 멀티스레드 환경에서 **높은 성능 제공**

### 동작 특징
- Lock을 **더 작은 단위로 분할**
- 일부 연산은 **lock-free 방식**
→ 멀티스레드 환경에서 **경쟁 감소**

---

[[Cf) HashSet vs ConcurrentHashMap.newKeySet() - 동시성 환경에서의 Set 선택]]
### Cf) HashSet은 순서를 보장할까?
- 보장하지 않는다
- 하지만 내부동작방식이 결정론적이기 때문에
- 같은 데이터, 같은 환경일 시 해시값 계산이나 버킷 위치 배정이 항상 같게 된다.
