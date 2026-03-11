# 1. Java Collections Framework
## 1.1. 정의
- 자바에서 데이터를 저장,관리,처리하기 위한 
  인터페이스 + 구현 클래스 + 유틸리티 클래스
### [[Cf) Collection과 Collections의 차이]]
## 1.2. 특징
### 장점
- 추상화 및 다형성을 목적으로한 설계 > 사용이 편리하고 재사용성이 높다.
- 데이터 구조 및 알고리즘 최적화
- 관련없는 API들 또한 업캐스팅을 통하여 상호 운용성을 제공한다.
```java
List<String> arrayList = new ArrayList<>();
List<String> linkedList = new LinkedList<>();
List<String> vector = new Vector<>();
```
	- arrayList, linkedList, vector를 상위 타입인 List로 취급함
- 새로운 자료구조 필요시, 컬렉션들을 재활용하여 새로운 알고리즘을 생성

Cf) 컬렉션이 다루는 데이터의 형태
```
컬렉션 프레임워크에 저장할 수 있는 데이터는 오로지 객체(Object) 뿐이다.   
즉, primitive 타입(int, long)은 적재를 못한다는 말이다.
따라서 primitive 타입을 wrapper 타입으로 변환하는 박싱(Boxing)이 필요하다.
또한 객체를 담는 다는 것은 곧 주소값을 담는다는 것이니, null도 저장이 가능하다.
```


![[Pasted image 20250629164305.png]]

---
# 2. 구성요소

## 2.1. Iterable [interface]
- iterater: 되풀이하다, 반복하다
### 2.1.1. 특징
- 컬렉션 인터페이스들의 최상위 인터페이스
- 컬렉션 자료 순회를 목적
### 2.1.2. 메서드

| 메서드                                                | 설명                                                                            |
| -------------------------------------------------- | ----------------------------------------------------------------------------- |
| `default void forEach(Consumer<? super T> action)` | 함수형 프로그래밍 전용 루프 메서드                                                           |
| `Iterator<T> iterator()`                           | 컬렉션에서 이터레이터를 구현                                                               |
| `default Spliterator<T> spliterator()`             | - split + iterator<br>- 파이프라이닝 관련 메서드<br>- 데이터 흐름을 여러 처리 단계(연산)로 나눠서 순차적으로 연결 |


## Cf) 파이프라이닝과 지연 실행: 질문 중심 흐름 정리

### 1. 파이프라이닝이란 무엇인가?
- 메서드 체이닝 방식으로, 연산 결과가 다시 스트림 객체로 반환되며 이어지는 구조
- 정리
    - 여러 연산을 연결(체이닝)하여 순차적으로 처리하는 방식
    - 스트림 연산은 중간 단계에서 새로운 스트림을 반환하며, 연속된 처리 라인을 구성함
	- 스트림 API 내부, 특히 **병렬 스트림** 생성 시 핵심적으로 사용

### 2. 파이프라이닝 간의 스트림 객체는 계속 유지되는가?
-  각 중간 연산은 새로운 스트림 객체를 반환하지만, 논리적으로는 동일한 파이프라인
- 정리
    - 중간 연산(filter, map 등)은 모두 **Stream** 객체를 반환하며, **지연 실행**됨
    - 최종 연산(forEach, collect 등)이 호출되기 전까지 실제 데이터 처리 X
        
### 3. stream() 메서드는 어디에 정의되어 있는가?
- stream()은 `Collection` 인터페이스의 디폴트 메서드
- 정리
    - `List`, `Set` 등 대부분의 컬렉션이 사용 가능
    - `Map`은 `Collection`을 구현하지 않으므로 직접 `stream()`은 없음
        
### 4. Map에서 stream을 사용할 수 있는가?
- Map의 stream() 사용
- Map은 Collection을 상속받지 않기에 stream() 사용 불가
    - `Map` 자체에는 없음
    - `entrySet()`, `keySet()`, `values()` 등을 통해 **간접적으로 스트림 사용 가능**
- ex)
    `map.entrySet().stream() map.keySet().stream() map.values().stream()`

### 5. 파이프라이닝 이전에는 어떻게 조건 기반 반복을 구현했는가?
- 파이프라이닝 도입 전에는 해당 컬렉션들이 어떻게 순환적인 조건 로직을 구현했는지?
- `for` / `foreach` 루프 내부에 `if` 조건문을 사용하여 처리
```java
    for (String s : list) {     if (s.length() > 3) {
    result.add(s.toUpperCase());     } }`
```
### 6. 지연 실행은 왜 필요한가?
- 메서드 체이닝 + 조건문으로 지연 실행(lazy evaluation) 
    - **성능 최적화**: 모든 데이터를 일일이 처리하지 않고, 필요한 순간에만 연산 수행
    - **중간 연산의 연속성 유지**: filter → map 등 연결 구조 속에서 연산이 축적되지만, 실제 실행은 최종 연산에서 발생
- **실행 중단 제어**, **불필요한 연산 생략**, **리소스 절약**이 핵심 목적
### 7. 지연 실행과 조건문은 어떤 차이가 있는가?

-  메서드 체이닝과 조건문으로도 중단이나 제어가 되는데 왜 굳이 지연 실행?
    - 조건문은 명시적 흐름 제어이지만, 스트림은 **데이터 흐름 중심 추상화** 제공
    - filter, map 등이 **내부적으로 하나의 처리 체계로 구성**되며, 결과가 나올 때까지 **필요한 만큼만 수행**
---

## 3. Collection [interface]
- List, Set, Queue에 상속을 하는 실질적 최상위 컬렉션 타입

| 메서드                                 | 설명                                    |
| ----------------------------------- | ------------------------------------- |
| `boolean add(Object o)`             | 지정된 객체를 컬렉션에 추가                       |
| `boolean addAll(Collection c)`      | 지정된 컬렉션의 모든 요소를 현재 컬렉션에 추가            |
| `boolean contains(Object o)`        | 지정된 객체가 컬렉션에 포함되어 있는지 확인              |
| `boolean containsAll(Collection c)` | 지정된 컬렉션의 모든 요소가 포함되어 있는지 확인           |
| `boolean remove(Object o)`          | 지정된 객체를 컬렉션에서 제거                      |
| `boolean removeAll(Collection c)`   | 지정된 컬렉션에 포함된 모든 객체를 컬렉션에서 제거          |
| `boolean retainAll(Collection c)`   | 지정된 컬렉션에 포함된 객체만 남기고 나머지는 제거 (교집합 동작) |
| `void clear()`                      | 컬렉션의 모든 요소를 제거                        |
| `boolean equals(Object o)`          | 현재 컬렉션과 지정된 객체가 동일한지 비교               |
| `int hashCode()`                    | 컬렉션의 해시코드를 반환                         |
| `boolean isEmpty()`                 | 컬렉션이 비어있는지 여부 확인                      |
| `Iterator iterator()`               | 컬렉션을 순회할 수 있는 반복자 반환                  |
| `int size()`                        | 컬렉션에 포함된 요소의 개수 반환                    |
| `Object[] toArray()`                | 컬렉션의 요소들을 Object 배열로 반환               |
| `Object[] toArray(Object[] a)`      | 지정된 배열에 컬렉션의 요소들을 채워 반환               |

Cf) JDK 1.8부터는 함수형 프로그래밍을 위해 parallelStream, removeIf, stream, forEach 디폴트(default) 메서드가 추가되었다.

| 메서드                   | 소속           | 기능 요약                                        |
| --------------------- | ------------ | -------------------------------------------- |
| `stream()`            | `Collection` | 해당 컬렉션을 순차 처리 가능한 `Stream`으로 변환              |
| `parallelStream()`    | `Collection` | 컬렉션을 **병렬 처리** 가능한 `Stream`으로 변환 (멀티코어 활용)   |
| `forEach(Consumer)`   | `Iterable`   | 컬렉션의 각 요소에 대해 람다식으로 정의한 **행위(Consumer)를 수행** |
| `removeIf(Predicate)` | `Collection` | 조건에 맞는 요소를 **제거** (Predicate 만족 시 삭제)        |

---
## 3.1. [[List]] [interface]
- 연속적 또는 연결된 방식으로 요소를 저장하며, 인덱스를 통해 순차적 접근이 가능한 선형 자료구조
### 하위클래스
	- ArrayList
		- 배열기반
	- LinkedList
		- Node 기반
	- Vector
		- 배열기반
	- Stack
		- Vector기반

### 특징 
- 저장 순서 유지
- 중복 허용
- 요소 사이에 빈공간을 허용하지 않아 삽입/ 삭제 할때마다 배열 이동이 일어남
- 배열과의 비교
	- 공통점: **접근 방식**은 다르나 index를 통한 순차 접근
		- ##### Cf) List에 따라 순차처럼 보이는 랜덤접근 자료형 존재 -> ArrayList
	- 차이점: 배열은 자료형 길이가 고정, 리스트는 자료형 길이가 가변

### [[Cf) 배열(Array)와 리스트(List)의 접근 방식 차이]]


| 메서드                                        | 설명                                          |
| ------------------------------------------ | ------------------------------------------- |
| `void add(int index, Object element)`      | 지정된 위치(index)에 객체를 추가                       |
| `boolean addAll(int index, Collection c)`  | 지정된 위치에 컬렉션에 포함된 객체들을 모두 추가                 |
| `Object remove(int index)`                 | 지정된 위치의 객체를 삭제하고 반환                         |
| `Object get(int index)`                    | 지정된 위치의 객체를 반환                              |
| `Object set(int index, Object element)`    | 지정된 위치에 객체를 저장 (수정)                         |
| `int indexOf(Object o)`                    | 지정된 객체의 위치를 순방향으로 탐색하여 반환                   |
| `int lastIndexOf(Object o)`                | 지정된 객체의 위치를 역방향으로 탐색하여 반환                   |
| `List subList(int fromIndex, int toIndex)` | 지정된 범위의 객체들을 서브 리스트로 반환 (`from` 이상 `to` 미만) |
| `ListIterator listIterator()`              | 리스트의 처음부터 순회 가능한 ListIterator 반환            |
| `ListIterator listIterator(int index)`     | 지정된 위치부터 순회 가능한 ListIterator 반환             |
| `void sort(Comparator c)`                  | 지정된 비교자([[Comparator]])를 사용해 리스트 정렬         |
메서드 주요 기능
- index 기반 CRUD
	- 요소
	- 컬렉션
- 요소 기반 탐색
	- 순차 탐색
- 새로운 리스트 반환
	- 서브 리스트
	- 전체 Iterator
	- 부분 Iterator
- *정렬*
---
## 3.1.1. [[ArrayList]] [class]
### 2.4.1. 하위클래스
- X
### 2.4.2. 특징 
- 배열로 동작
	- 논리적, 물리적 메모리 연속
- 데이터 저장순서 유지
- 중복 허용
- 데이터량에 따라 공간(capacity)이 자동 가변
- 단방향 포인터 구조
	- 순차 접근에 유리
	- 조회가 빠름
- 삽입 / 삭제가 느림
	- 내부적으로 배열을 사용으로 변경된 주소 이후 배열의 위치가 변경되어야 함
- 단, 순차적으로 추가/삭제 하는 경우에는 가장 빠르다.
	- 마지막 배열에 추가를 하기 때문에 요소들의 이동이 불필요함

---
## 2.5. LinkedList [class]

### 2.5.1. 특징
- 노드(객체)통해 리스트처럼 만든 컬렉션 (배열 X)
	- 논리적으로 연속적으로 보이지만, 물리적으로 메모리가 연속되지 않음
- 데이터의 중간 삽입, 삭제가 빈번할 경우 빠른 성능
- 임의의 요소에 대한 접근 성능음 나쁨
	-  주소 연산이 아닌 직접 주소 접근을 통해 찾아가야 하기 때문
- Cf) Java의 LinkedList는 Double LinkedList(양방향 포인터 구조)
- LinkedList는 리스트 용도 이외에도 스택, 큐, 트리 모두 구현 가능
### LinkedList의 시간복잡도

- `LinkedList`는 노드 기반 연결 구조 → **순차 탐색 필요**
- 특정 위치 접근 시, **처음부터 해당 인덱스까지 하나씩 따라감**

`List<String> list = new LinkedList<>(); list.get(500); // 0 → 1 → 2 → ... → 500 (총 501번 이동)`
- 시간복잡도: **O(n)**  
    → 인덱스가 커질수록 느려짐

|연산|시간복잡도|설명|
|---|---|---|
|get(i)|O(n)|처음부터 i번째 노드까지 순회 필요|
|add(i, e)|O(n)|위치 탐색 후 삽입 (노드 연결 필요)|
|remove(i)|O(n)|위치 탐색 후 제거|

---
## 2.6. Vector [class]
### 2.6.1. 하위클래스
- Stack
### 2.6.2. 특징
- ArrayList의 구형 버전 (내부 구성이 거의 비슷함)
- ArrayList와의 차이는 모든 메소드가 동기화(Synchronized) 되어있어 Thread-Safe하다는 점이다.

Cf) 컬렉션에 동기화가 필요할 경우, `Collections.synchronizedList()` 메서드를 사용해 ArrayList를 스레드 안전하게 래핑하여 사용한다.

---
## 2.7. Stack [class]

### 2.7.1. 특징
- 후입선출 LIFO (Last in First Out)
- push: 입력
- pop: 출력
Cf) Stack은 레거시한 Vector를 상속하여 비효율적
	-> 대신 ArrayDeque사용

---
## 2.8. [[큐 (Queue)]] [interface]
### 2.8.1. 하위클래스
- LinkedList
- PriorityQueue
- ArrayDeque

| 메서드                  | 동작            | 비어있을 때 동작                             | 설명                       |
| -------------------- | ------------- | ------------------------------------- | ------------------------ |
| `boolean add(E e)`   | 요소 추가         | 저장 공간 부족 시 `IllegalStateException` 발생 | 큐에 요소를 추가 (예외 발생 가능)     |
| `boolean offer(E e)` | 요소 추가         | `false` 반환                            | 큐에 요소를 추가 (예외 없음, 권장 방식) |
| `E remove()`         | 요소 제거 및 반환    | `NoSuchElementException` 발생           | 큐의 앞(front) 요소를 제거하고 반환  |
| `E poll()`           | 요소 제거 및 반환    | `null` 반환                             | 큐의 앞 요소를 제거하고 반환         |
| `E element()`        | 요소 확인 (읽기 전용) | `NoSuchElementException` 발생           | 큐의 앞 요소를 제거하지 않고 반환      |
| `E peek()`           | 요소 확인 (읽기 전용) | `null` 반환                             | 큐의 앞 요소를 제거하지 않고 반환      |

---

## 2.9. PriorityQueue [class]
### 2.9.1. 특징
- 우선 순위 큐
- 우선 순위가 높은 순으로 정렬 됨
- 다수 작업, 제한된 시간의 경우 우선순위에 따라 job 실행
	- Ex) 네트워크 제어, 작업 스케줄링
- 우선순위 큐에 저장할 객체는 필수적으로 [[Comparable]] 인터페이스를 구현해야함. compareTo() 메서드 로직에 따라 자료 객체의 우선순위 결정
- 저장공간으로 배열을 사용, 각 요소를 힙([[Binary heap]]) 형태로 저장
- null 저장 불가능
---

Deque 인터페이스
- Deque(Double-Ended Queue)는 양쪽 모두 입출력이 가능한 큐
- 스택과 큐를 하나로 합쳐놓은 것과 같음
- Queue에서 파생됨
- 구현체
	- ArrayDeque
	- LinkedList

ArrayDeque 클래스
- 스택으로 사용할 때 Stack 클래스보다 빠르며, 대기열로 사용할 때는 LinkedList보다 빠름
	- Stack은 내부적으로 Vector를 사용함
		- Vector는 synchronized가 되어있어 단일 쓰레드 환경에서 느림
	- LinkedList
		- 데이터 + 포인터 형태로 물리적 메모리는 거리가 있게 저장됨
			- CG 부하가 높고, 캐시 적중률이 낮아짐
	- ArrayDeque는
		- 연속된 배열 기반
- 사이즈 제한이 없음
- null 요소는 저장 X

| 동작         | `Deque` 메서드   | `Queue` 메서드 | `Stack` 메서드 |
| ---------- | ------------- | ----------- | ----------- |
| rear에 삽입   | `offerLast()` | `offer()`   | `push()`    |
| front에서 제거 | `pollFirst()` | `poll()`    | —           |
| rear에서 제거  | `pollLast()`  | —           | `pop()`     |
| fromt에서 조회 | `peekFirst()` | `peek()`    | —           |
| rear에서 조회  | `peekLast()`  | —           | `peek()`    |

---
LinkedList는 List 인터페이스와 Queue 인터페이스를 동시에 상속받고 있기 때문에, 스택 / 큐 로서도 응용가능

Cf) Queue는 데이터를 꺼낼 때 항상 첫 번째 저장된 데이터를 삭제하므로, ArrayList와 같은 배열 기반 컬렉션 사용시, 데이터 반환떄마다 빈 공간을 채우기 위해 데이터의 이동 & 복사자 발생하므로 비효율적, 따라서 큐는 ArrayList보다 데이터의 추가/삭제가 용이한 LinkedList로 구현하는 것이 적합함

---

Set 인터페이스

- 데이터의 중복을 허용하지 않고 순서를 유지하지 않는 데이터의 집합 리스트
- `get(index)` 와 같은 메서드 X
- null 값 하나만 저장 가능

|메서드|설명|
|---|---|
|`boolean add(E e)`|주어진 객체를 저장 후 성공 시 `true`, 중복 객체일 경우 `false` 반환|
|`boolean contains(Object o)`|주어진 객체가 저장되어 있는지 여부를 반환|
|`Iterator<E> iterator()`|저장된 객체를 하나씩 가져올 수 있는 **반복자(Iterator)**를 반환|
|`boolean isEmpty()`|컬렉션이 비어 있는지 조사|
|`int size()`|저장되어 있는 전체 객체 수를 반환|
|`void clear()`|저장된 모든 객체를 삭제|
|`boolean remove(Object o)`|주어진 객체를 컬렉션에서 제거|

---
HashSet 클래스

- 배열과 연결 노드를 결합한 자료구조 형태
- 가장 빠른 임의 검색 접근 속도를 가진다.
- 추가, 삭제, 검색, 접근성이 모두 뛰어나다
- 대신 순서를 전혀 예측할 수 없다.
```java
Set<Integer> hashSet = new HashSet<>();
hashSet.add(10);
hashSet.add(20);
hashSet.add(30);
hashSet.add(10); // 중복된 요소 추가
hashSet.size(); // 3 - 중복된건 카운트 X
hashSet.toString(); // [20, 10, 30] - 자료 순서가 뒤죽박죽
```

---
LinkedHashSet 클래스
- 순서를 가지는 Set 자료
- 추가된 순서 또는 가장 최근에 접근한 순서대로 접근 가능
- 중복을 제거 + 순서 유지

---
TreeSet 클래스

- 이진 검색 트리(binary search tree) 자료구조의 형태로 데이터 저장
- 중복 허용 X
- 순서 X
- 데이터를 정렬하여 저장하고 있음


Cf) LinkedHashSet vs TreeSet

|항목|`LinkedHashSet`|`TreeSet`|
|---|---|---|
|**내부 구조**|`HashSet` + **이중 연결 리스트 (LinkedList)**|**이진 탐색 트리 (Red-Black Tree)** 기반|
|**정렬 기준**|**입력 순서 유지**|**자동 정렬** (기본 정렬 또는 `Comparator` 사용)|
|**null 허용**|`null` 요소 1개 허용|`null` 허용 ❌ (`NullPointerException` 발생)|
|**성능 (삽입/삭제)**|빠름 (`O(1)` 정도의 해시 성능)|느림 (`O(log n)` 트리 구조 탐색 필요)|
|**용도**|순서를 유지하면서 중복 제거가 필요할 때|정렬된 순서로 데이터 유지가 필요할 때|
|**예시**|`[B, A, C]` → 입력한 순서 그대로 유지|`[A, B, C]` → 정렬 순서로 유지|

---
EnumSet 추상 클래스
- [[Enum]] 클래스와 함께 동작하는 Set 컬렉션
- 중복 되지 않은 상수 그룹
- 산술 비트 연산을 사용하여 구현 -> HashSet보다 훨씬 빠르며, 적은 메모리 사용
- enum 타입의 요소값만 저장할 수 있고, 모든 요소들은 동일한 enum 객체에 소속되어야 한다.
- EnumSet은 추상 클래스고 이를 상속한 ReqularEnumSet 혹은 JumboEnumSet 객체를 사용하게 된다.

Cf) EnumSet의 산술 비트 연산 동작 방식
```java
enum Day { MON, TUE, WED, THU, FRI, SAT, SUN}
```
- 각 상수는 내부적으로 0번부터 순차적인 ordinal 번호를 가짐
```
0b0000000  (아무 것도 없음)
0b0000001  (MON)
0b0000011  (MON, TUE)
0b0100100  (WED, SAT)
```
- 비트마스크로 Enum 값 지정
- 비트 연산을 통하여 add, remove, contains, clear 명령 수행

---
Map 인터페이스
Map
- HashMap
- LinkedHashNap
- Hashtable
- TreeMap

- 키(Key)와 값(Value)의 쌍으로 연관지어 이루어진 데이터의 집합
- 값(value)은 중복되서 저장될 수 있지만, 키(key)는 해당 Map에서 고유해야만 한다.
- 중복된 키 저장 시, 기본 키의 value는 없어지고 마지막 저장된 값이 남음
- 저장 순서가 유지되지 않음

|메서드|설명|
|---|---|
|`void clear()`|Map의 모든 객체를 삭제|
|`boolean containsKey(Object key)`|지정된 key 객체가 존재하는지 확인|
|`boolean containsValue(Object value)`|지정된 value 객체가 존재하는지 확인|
|`Set entrySet()`|모든 key-value 쌍을 `Map.Entry` 타입의 Set으로 반환|
|`boolean equals(Object o)`|다른 Map과 동일한지 비교|
|`Object get(Object key)`|지정된 key에 대응되는 value를 반환|
|`int hashCode()`|Map의 해시코드 반환|
|`boolean isEmpty()`|Map이 비어 있는지 확인|
|`Set keySet()`|모든 key 객체를 Set으로 반환|
|`Object put(Object key, Object value)`|key와 value를 매핑하여 저장|
|`void putAll(Map t)`|지정된 Map의 모든 key-value 쌍을 추가|
|`Object remove(Object key)`|지정된 key와 매핑된 key-value 쌍을 제거|
|`int size()`|Map에 저장된 key-value 쌍의 개수 반환|
|`Collection values()`|저장된 모든 value 객체를 Collection으로 반환|

---
Map.Entry 인터페이스
- Map 인터페이스 안에 있는 내부 인터페이스
- Map에 저장되는 key - value 쌍의 Node 내부 클래스가 이를 구현하고 있다.
- Map을 보다 객체지향적인 설계를 위해 존재한다.

|메서드|설명|
|---|---|
|`boolean equals(Object o)`|동일한 Entry인지 비교|
|`Object getKey()`|Entry의 key 객체를 반환|
|`Object getValue()`|Entry의 value 객체를 반환|
|`int hashCode()`|Entry의 해시코드를 반환|
|`Object setValue(Object value)`|Entry의 value를 지정된 객체로 변경|
```java
Map<String, Integer> map = new HashMap<>();
map.put("a", 1);
map.put("b", 2);
map.put("c", 3);
// Map.Entry 인터페이스를 구현하고 있는 Key-Value 쌍을 가지고 있는 HashMap의 Node 객체들의 Set 집합을 반환
Set<Map.Entry<String, Integer>> entry = map.entrySet();
System.out.println(entry); // [1=a, 2=b, 3=c]
// Set을 순회하면서 Map.Entry를 구현한 Node 객체에서 key와 value를 얻어 출력
for (Map.Entry<String, Integer> e : entry) {
    System.out.printf("{ %s : %d }\n", e.getKey(), e.getValue());
}
```

---
HashMap 클래스
- Hashtable을 보완한 컬렉션
- 배열과 연결이 결합된 Hashing 형태로, 키(key)와 값(value)을 묶어 하나의 데이터로 저장
- 중복을 허용 X, 순서 보장 X
- 키와 값으로 null 허용
- 추가, 삭제, 검색, 접근성 모두 뛰어남
- HashMap은 비동기 동작 -> 멀티쓰레드 환경이 부적합
	- ConcurrentHashMap

Cf)  `HashMap`이 `Hashtable`을 보완한 점

|보완 항목|`Hashtable` (구식)|`HashMap` (보완 후)|
|---|---|---|
|**동기화**|모든 메서드가 `synchronized` → **과도한 락**|동기화 없음 → **단일 스레드에서 빠름**|
|**null 허용 여부**|`key`, `value` 모두 **null 허용 안 함**|`key 1개`, `value 여러 개` **null 허용**|
|**성능**|동기화로 인해 성능 저하|락이 없어 **성능 향상**|
|**설계 철학**|JDK 1.0 레거시 구조|Java Collections Framework에 통합된 설계|
|**확장성/유연성**|제네릭 미지원 (JDK 1.0 시절)|제네릭 지원 (`HashMap<K, V>`)|
### Q) HashMap의 같은 bucket 내 요소들도 순서를 보장하는가?
###### A) 리스트의 삽입 위치는 여러가지 상황에 따라 변경된다.
1. 해시 충돌 상황
2. 버킷 재해싱 (rehashing)
3. tree 로의 전환
4. 요소 추가/삭제로 인한 전체 배열 크기 변환
	- 모든 요소 rehashing

---
LinkedHashMap 클래스
- HashMap을 상속하기 때문에 흡사하지만, Entry들이 연결 리스트를 구성하여 데이터의 순서를 보장한다.

---
TreeMap 클래스
- 이진 검색 트리의 형태로 키와 값의 쌍으로 이루어진 데이터를 저장
- TreeMap은 SortedMap 인터페이스를 구현하고 있어 key값을 기준으로 정렬됨
- 검색(특히 범위검색)이 빠르다.
- 값의 저장과 동시에 정렬로 저장시간이 오래 걸린다.
- 정렬 기준
	- 알파벳 대문자 > 알파벳 소문자 > 한글

---
HashTable 클래스
- 자바 초기 버전에 나온 레거시 클래스
- Key를 특정 해시 함수를 통해 해싱한 후 나온 결과를 배열의 인덱스로 사용하여 Value를 찾는 방식으로 동작함
- HashMap보다 느리지만 동기화가 기본 지원된다.
- 키와 값으로 null이 허용
---
Properties 클래스
- Properties(String, String)의 형태로 저장하는 단순화된 key-value 컬렉션
- 주로 애플리케이션의 환경 설정과 관련된 속성 파일인 .properties를 설정하는데 사용

---
![[Pasted image 20250702184249.png]] 

-  ArrayList 
    - 리스트 자료구조를 사용한다면 기본 선택
    - 임의의 요소에 대한 접근성이 뛰어남
    - 순차적인 추가/삭제 제일 빠름
    - 요소의 추가/삭제 불리
- LinkedList
    - 요소의 추가/삭제 유리
    - 임의의 요소에 대한 접근성이 좋지 않음
- HashMap / HashSet
    - 해싱을 이용해 임의의 요소에 대한 추가/삭제/검색/접근성 모두 뛰어남
    - 검색에 최고성능 ( get 메서드의 성능이 O(1) )
- TreeMap / TreeSet
    - 요소 정렬이 필요할때
    - 검색(특히 범위검색)에 적합
    - 그래도 검색 성능은 HashMap보다 떨어짐
    
- LinkedHashMap / LinkedHashSet : HashMap과 HashSet에 저장 순서 유지 기능을 추가
- Queue : 스택(LIFO) / 큐(FIFO) 자료구조가 필요하면 ArrayDeque 사용
- Stack, Hashtable : 가급적 사용 X (deprecated)
