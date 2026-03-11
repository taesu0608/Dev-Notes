- https://code-lab1.tistory.com/62
# 1. Red-Black Tree
**정의**: 레드-블랙 트리(Red-Black Tree)는 자가 균형 이진 탐색 트리(Self-Balancing Binary Search Tree)
## 1.1. 구조


![[Pasted image 20260309181302.png]]
### 1.1.1. Red-Black Tree 조건
-  모든 노드가 빨간색 혹은 검은색
- 루트 노드는 검은색
- 모든 리프 노드(NIL)은 검은색
	- NIL: null leaf, 자료를 갖지 않고 트리의 끝을 나타내는 노드
- 빨간색 노드의 자식은 검은색
	- No Double Red
- 모든 리프 노드에서 Black Depth는 같다
	- 리프 노드에서 루트 노드 까지 가는 경로에서 만나는 검은색 노드의 개수가 동일

## 1.2. Red-Black Tree 삽입 과정

### 1. 새로운 노드 삽입 시
![[Pasted image 20260309181947.png]]
- 새로운 노드는 항상 빨간색으로 삽입한다.

### 2. Double Red 발생시
![[Pasted image 20260309182145.png]]
- N(new): 새로 삽입할 노드
- P(Parent): 부모 노드
- G(Grand Parent): 조상 노드
- U(Uncle): 삼촌 노드

Double Red 발생 시
- 삼촌 노드가 검은색 이라면 > Restructuring
- 삼촌 노드가 빨간색 이라면 > Recoloring

### Restructuring
1. 새로운 노드(N), 부모 노드(P), 조상 노드(G)를 오름차순으로 정렬한다.  
2. 셋 중 중간값을 부모로 만들고 나머지 둘을 자식으로 만든다.  
3. 새로 부모가 된 노드를 검은색으로 만들고 나머지 자식들을 빨간색으로 만든다.
![[Pasted image 20260309182808.png]]
- NIL은 생략되어 있음

### Recoloring
새로운 노드(N)의 부모(P)와 삼촌(U)을 검은색으로 바꾸고 조상(G)을 빨간색으로 바꾼다.
	- 조상(G)이 루트 노드라면 검은색으로 바꾼다.
	- 조상(G) 빨간색 변경 이후 DoubleRed가 발생한다면 Recoloring 혹은 Restructuring 재시도

#### 기본 Recoloring
![[Pasted image 20260309183241.png]]

#### 조상노드가 루트노드일 경우
![[Pasted image 20260309183322.png]]

#### 조상노드를 빨간색 변경이후 Red Double 발생
![[Pasted image 20260309183352.png]]
- 해당 경우는 Recoloring으로 해결하였지만, Restructuring으로 해결해야 할 경우도 존재
---
# 2. 실사용
|사용처|이유|
|---|---|
|TreeMap / TreeSet|정렬된 Map / Set|
|C++ STL map|정렬 Map|
|C++ STL set|정렬 Set|
|Linux kernel|scheduler, memory|
|Java HashMap|bucket이 많아지면 tree로 변환|
