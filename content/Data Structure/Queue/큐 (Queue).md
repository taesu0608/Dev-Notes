# 1. Queue (선입선출, FIFO)
- 큐(Queue)는 FIFO(First In First Out) 구조의 선형 자료구조

![[Pasted image 20250630151744.png]]
## 1.1. 구조
### 1.1.1. 주요 포인터
| 위치 / 연산          | 설명                             |
| ---------------- | ------------------------------ |
| **rear**         | 가장 마지막에 들어온 데이터가 위치하는 곳        |
| **enqueue**      | 데이터를 큐의 rear 위치에 삽입            |
| **front**        | 가장 먼저 들어온 데이터가 위치하는 곳          |
| **dequeue**      | front 데이터를 제거하고 반환             |
| **peek (front)** | front 데이터를 제거하지 않고 조회          |
| **empty**        | 큐가 비어있는지 확인                    |
| **full**         | 큐가 가득 찼는지 확인 (배열 기반 큐에서 주로 사용) |
##### rear와 front는 큐를 사용하는 관점에서 정의된 위치로, 데이터는 rear에서 입력되고 front에서 출력된다.
	
### Cf) 변형 큐
[[원형 큐 (Circular Queue)]]
# 2. 특징

## 2.1. 큐의 특징
### 2.1.1. 장점
1. 순서보장
2. 간단한 구현
	- 배열, 연결 리스트, 데크 등 다양한 자료구조로 쉽게 구현
3. 동기화/버퍼링에 유리
4. 메모리 관리 효율성
	- 원형 큐, 연결 리스트 기반 구현 시 메모리 낭비 최소화

### 2.1.2. 단점
1. 임의 접근 불가
	- `front`부터 순차적 출력 강제
2. 삽입, 삭제 위치 제한
3. **고정 크기 문제**
	- 크기 초과시, 재할당 혹은 데이터 이동 필요
4. 탐색 성능 저하
	- 검색시 시간복잡도 O(N)
## 2.3. 주요 연산

| 메서드        | 동작 위치    | 동작 내용           | 예외 발생 여부                              |
| ---------- | -------- | --------------- | ------------------------------------- |
| `offer(e)` | rear(뒤)  | 요소 삽입           | 실패 시 `false` 반환                       |
| `add(e)`   | rear(뒤)  | 요소 삽입           | 실패 시 `IllegalStateException` 발생       |
| `poll()`   | front(앞) | 요소 제거 + 반환      | 큐가 비어 있으면 `null` 반환                   |
| `remove()` | front(앞) | 요소 제거 + 반환      | 큐가 비어 있으면 `NoSuchElementException` 발생 |
| `peek()`   | front(앞) | 요소 **제거 없이** 반환 | 큐가 비어 있으면 `null` 반환                   |

## 2.4. 시간 복잡도
	- 삽입: Insertion O(1)
	- 삭제: Deletion O(1)(dequeue) / O(N)(remove/전체삭제)
	- 검색: Search O(N)

## 2.3. Java에서 자주 사용하는 Queue 구현체

| 구현체                         | 특징                                                                                 | 주 사용 용도                |
| --------------------------- | ---------------------------------------------------------------------------------- | ---------------------- |
| **`LinkedList`**            | - `Queue`, `Deque`, `List` 인터페이스 모두 구현- 양방향 연결 리스트 기반 → 삽입/삭제 O(1)- **null 저장 가능** | 일반적인 큐, 리스트 기능도 같이 쓸 때 |
| **`ArrayDeque`**            | - 배열 기반의 `Deque` 구현체- **성능 좋음**: `LinkedList`보다 빠름- **null 저장 불가**                 | 스택/큐/덱 모두 가능한 범용 구조    |
| **`PriorityQueue`**         | - 우선순위 큐- 자동 정렬 (작은 값 먼저 나오게)                                                      | 최소/최대값 기반 큐            |
| **`ConcurrentLinkedQueue`** | - **멀티스레드 환경에서 안전**- 락 없는 큐                                                        | 병렬 처리, 멀티스레드 큐         |

# 3. 메서드

| 메서드 이름       | 반환 타입     | 설명                                       | 예외 여부                           |
| ------------ | --------- | ---------------------------------------- | ------------------------------- |
| `offer(E e)` | `boolean` | 큐의 **뒤에 요소 추가** (공간 부족 시 `false` 반환)     | 예외 발생 안 함                       |
| `add(E e)`   | `boolean` | 큐의 **뒤에 요소 추가** (`offer()`과 동일하지만 예외 발생) | 공간 부족 시 `IllegalStateException` |
| `poll()`     | `E`       | 큐의 **앞 요소 제거 후 반환** (비어있으면 `null`)       | 예외 발생 안 함                       |
| `remove()`   | `E`       | 큐의 **앞 요소 제거 후 반환** (비어있으면 예외 발생)        | `NoSuchElementException`        |
| `peek()`     | `E`       | 큐의 **앞 요소 조회 (제거 X)** (비어있으면 `null`)     | 예외 발생 안 함                       |
| `element()`  | `E`       | 큐의 **앞 요소 조회 (제거 X)** (비어있으면 예외 발생)      | `NoSuchElementException`        |
| `size()`     | `int`     | 큐에 현재 저장된 요소 수 반환                        | 예외 발생 안 함                       |

### Queue 메서드 사용 예시
```java
public class Queue {
    public static void main(String[] args) {
        // Queue 선언 (LinkedList 사용)
        Queue<String> queue = new LinkedList<>();

        // 1. offer() - 요소 추가
        queue.offer("A");
        queue.offer("B");
        queue.offer("C");

        System.out.println("Queue 상태: " + queue); // [A, B, C]

        // 2. peek() - 가장 앞 요소 확인 (제거 X)
        System.out.println("peek(): " + queue.peek()); // A

        // 3. poll() - 가장 앞 요소 꺼내기 (제거 O)
        System.out.println("poll(): " + queue.poll()); // A
        System.out.println("Queue 상태 (after poll): " + queue); // [B, C]

        // 4. element() - peek()과 같지만, 비었을 때 예외 발생
        System.out.println("element(): " + queue.element()); // B

        // 5. remove() - poll()과 같지만, 비었을 때 예외 발생
        queue.remove(); // B 제거
        System.out.println("Queue 상태 (after remove): " + queue); // [C]

        // 6. size(), isEmpty()
        System.out.println("size(): " + queue.size()); // 1
        System.out.println("isEmpty(): " + queue.isEmpty()); // false

        // 7. clear()
        queue.clear();
        System.out.println("Queue 상태 (after clear): " + queue); // []

        // 8. poll() vs remove() 비교 (큐가 비었을 때)
        System.out.println("poll() on empty: " + queue.poll()); // null
        try {
            queue.remove(); // 예외 발생
        } catch (Exception e) {
            System.out.println("remove() on empty: 예외 발생 - " + e);
        }
    }
}
```