
### 1. Stack (후입선출, LIFO)
- **구조**
	- LIFO 형태의 선형 자료 구조
	- `top`: 가장 마지막 데이터가 입력 되는 곳, Stack의 맨 위
	- `bottom`: 첫 데이터가 저장 되는 곳, Stack의 맨 아래
- **주요 연산**
	- `push(e)`: 데이터 삽입
	- `pop()`: Top 데이터 제거 + 반환
	- `peek()`: (몰래 엿보다) Top 데이터 제거 X + 반환
- **시간 복잡도**
	- 삽입: Insertion O(1)
	- 삭제: Deletion O(1)(pop) / O(N)(remove)
	- 검색: Search O(N)
![[Pasted image 20250630151735.png]]
---

### 2. Queue (선입선출, FIFO)
- **구조**
	- FIFO 형태의 선형 자료구조
	- `rear`: 데이터가 입력되는 곳
	- `front`: 데이터가 출력되는 곳
	- `enqueue`: 데이터 삽입
	- `dequeue`: front 데이터 제거 + 반환
	- `empty`:  큐가 비었는지 확인
	- `full`: 큐가 가득 찼는지 확인 (배열 기반 큐에서 주로 사용)
	- `getFront`: 큐의 맨 앞(front) 데이터를 제거하지 않고 반환 (스택의 `peek`과 유사)
- **주요 연산**
  - `offer(e)` or `add(e)`: rear에 삽입
  - `poll()` or `remove()`: front에 데이터를 제거 + 반환
  - `peek()`:  front에 데이터를 제거 X + 반환
- **시간 복잡도**
	- 삽입: Insertion O(1)
	- 삭제: Deletion O(1)(dequeue) / O(N)(remove)
	- 검색: Search O(N)
![[Pasted image 20250630151744.png]]

---

### 3. Deque (Double-Ended Queue)
- **구조**
	- 양 방향 큐
	- Stack과 Queue를 한 자료구조에서 모두 사용할 수 있음
	- 배열 기반 또는 이중 연결 리스트 기반으로 구현됨
	-  front/rear: 데크의 맨 앞, 데크의 맨 뒤(혹은 L-bottom, R-bottom)
	- append, pop: 데크에 데이터 삽입, 삭제
	- scroll: 입력제한데크, 삭제 양쪽 가능, 삽입은 한쪽만 가능
	- shelf: 출력제한데크, 삽입 양쪽 가능, 삭제는 한쪽만 가능
	- empty/full: 데크가 비었는지 가득 찼는지 검사
	- size(level): 데크의 크기 리턴
- **주요 연산**:
  - `addFirst(e)` / `offerFirst(e)`: 앞쪽 삽입
  - `addLast(e)` / `offerLast(e)`: 뒤쪽 삽입
  - `removeFirst()` / `pollFirst()`: 앞쪽 제거
  - `removeLast()` / `pollLast()`: 뒤쪽 제거
  - `peekFirst()` / `peekLast()`: 앞/뒤 요소 확인
- **시간 복잡도**:
	- 삽입: Insertion O(1)
	- 삭제: Deletion O(1)(pop) / O(N)(remove)
	- 검색: Search O(N)

![[Pasted image 20250630151755.png]]

---
