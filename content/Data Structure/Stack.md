# 1. Stack (후입선출, LIFO)
![[Pasted image 20250630151735.png]]
## 1.1. 구조
- **LIFO** 형태의 선형 자료구조
- `top`: 데이터가 **쌓이고(pop/push가 일어나는) 위치**
- `push`: 데이터 삽입
- `pop`: top 데이터 제거 + 반환
- `peek`: top 데이터 **제거 없이** 조회
- `empty` / `isEmpty`: 스택이 비었는지 확인
- `full`: 배열 기반(고정 크기) 스택에서 가득 참 여부 확인
- `search`: (Java `Stack`) 위에서부터의 상대적 위치 반환 (1부터 시작)
##### top은 **사용자 기준으로 보았을 때 입력/출력 모두 top에서 일어난다.**

## 1.2. 주요 연산
- `push(e)`: top에 삽입
- `pop()`: top에서 제거 + 반환
- `peek()`: top에서 제거 **X** + 반환
- `isEmpty()`, `size()`, (`search(o)` - `java.util.Stack` 전용)

## 1.3. 시간 복잡도
- **삽입(push)**: O(1)
- **삭제(pop)**: O(1)
- **조회(peek)**: O(1)
- **검색(search)**: O(N)

## 1.4. Java에서 자주 사용하는 Stack 구현체

|구현체|특징|주 사용 용도/권장 여부|
|---|---|---|
|**`ArrayDeque`**|- 배열 기반 `Deque` 구현체  <br>- **가장 권장되는 스택 대체**(빠르고 가벼움)  <br>- **null 저장 불가**|**권장** (현대 자바 표준 패턴)|
|**`LinkedList`** (as Deque)|- 연결 리스트 기반 `Deque` 구현체  <br>- 양방향 연결 리스트 → 삽입/삭제 O(1)  <br>- (리스트로는 null 가능)|스택/큐 겸용, 유연성 필요할 때|
|**`Stack`**|- `Vector` 상속(동기화, **구식/레거시**)  <br>- 메서드명(`push/pop/peek/search`)이 직관적이지만 **권장 X**|레거시 코드 호환, 교육용|
|**`ConcurrentLinkedDeque`**|- **멀티스레드 환경에서 안전(락-프리)**|병렬 환경에서 스택/덱 필요할 때|

### Q) Java에서 java.util.Stack 대신  import java.util.ArrayDeque를 사용하는 이유
##### A) Stack은 [[Vertor]] 기반 

---

# 2. 특징

- Stack은 요소가 음의 개수일 상태를 표기하지 못한다.
	- depth 변수를 설정하여 상태를 체크

---

# 3. 메서드

> 아래 표는 **Deque 기반(권장)** 과 **Stack(레거시)** 의 차이를 함께 표시했습니다.

|메서드 이름|반환 타입|설명|빈 스택 시|
|---|---|---|---|
|`push(E e)`|`void`(Deque) / `E`(Stack)|top에 요소 추가|예외 없음|
|`pop()`|`E`|top 요소 제거 + 반환|Deque: `NoSuchElementException`  <br>Stack: `EmptyStackException`|
|`peek()`|`E`|top 요소 **조회만** (제거 X)|Deque: `null` 반환  <br>Stack: `EmptyStackException`|
|`isEmpty()`|`boolean`|비었는지 확인|예외 없음|
|`size()`|`int`|요소 개수 반환|예외 없음|
|`search(Object o)`|`int`|(Stack 전용) **위에서부터 1-based index** 반환, 없으면 -1|-|
|`clear()`|`void`|전체 비우기|예외 없음|

### Stack 메서드 사용 예시 (권장: Deque / ArrayDeque)

java

복사편집

`import java.util.ArrayDeque; import java.util.Deque;  public class StackExampleWithDeque {     public static void main(String[] args) {         Deque<String> stack = new ArrayDeque<>();          // 1. push() - 요소 추가         stack.push("A");         stack.push("B");         stack.push("C");         System.out.println("stack: " + stack); // [C, B, A] (top이 앞쪽)          // 2. peek() - top 요소 확인 (제거 X)         System.out.println("peek(): " + stack.peek()); // C          // 3. pop() - top 요소 꺼내기 (제거 O)         System.out.println("pop(): " + stack.pop()); // C         System.out.println("stack (after pop): " + stack); // [B, A]          // 4. size(), isEmpty()         System.out.println("size(): " + stack.size());     // 2         System.out.println("isEmpty(): " + stack.isEmpty()); // false          // 5. clear()         stack.clear();         System.out.println("stack (after clear): " + stack); // []          // 6. pop() vs peek() on empty         System.out.println("peek() on empty: " + stack.peek()); // null         try {             stack.pop(); // 예외 발생         } catch (Exception e) {             System.out.println("pop() on empty: 예외 발생 - " + e);         }     } }`

### (레거시) `java.util.Stack` 사용 예시

java

복사편집

`import java.util.Stack;  public class LegacyStackExample {     public static void main(String[] args) {         Stack<Integer> stack = new Stack<>();          stack.push(10);         stack.push(20);         stack.push(30);          System.out.println("stack: " + stack); // [10, 20, 30]          System.out.println("peek(): " + stack.peek()); // 30         System.out.println("pop(): " + stack.pop());   // 30         System.out.println("stack (after pop): " + stack); // [10, 20]          System.out.println("search(10): " + stack.search(10)); // 2 (top에서 1-based)         System.out.println("isEmpty(): " + stack.empty()); // false          stack.clear();         try {             stack.peek(); // EmptyStackException         } catch (Exception e) {             System.out.println("peek() on empty: 예외 발생 - " + e);         }     } }`