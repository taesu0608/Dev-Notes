- https://gmlwjd9405.github.io/2018/05/10/data-structure-heap.html
# 1. 힙(Heap)
## 1.1. 우선순위 큐
- **정의**: 데이터들이 우선순위를 가지고 있고 우선순위가 높은 데이터 먼저 출력
### 1.1.1. 우선순위 큐 이용사례
1. 시뮬레이션 시스템
2. 네트워크 트래픽 제어
3. 운영 체제에서의 작업 스케쥴링
4. 수치 해석적인계산

### 1.1.2. 힙과 우선순위 큐의 연관성
![[Pasted image 20260328222045.png]]
- 우선순위 큐를 구현하는 여러 방법들 중 힙을 사용한 방식이 가장 효율적이다.

## 1.2. 힙(heap)
- **완전 [[이진트리 (Binary Tree)]]의 일종**으로 우선순위 큐를 위하여 만들어진 자료구조
- 최댓값과 최솟값을 빠르게 찾기위해 만들어진 자료구조
- **반정렬 상태(느슨한 정렬 상태)** 를 유지
	- 부모 노드의 키값 >= 자식 노드의 키값 만 유지
	- 형제/사촌 끼리의 순서 보장 X

### 1.2.1. 힙의 종류
1. 최대 힙(max heap)
	- 부모 노드의 키 값이 자식 노드의 키 값보다 크거나 같은 완전 이진 트리
	- key(부모 노드) >= key (자식 노드)
2. 최소 힙(min heap)
	- 부모 노드의 키 값이 자식 노드의 키 값보다 크거나 같은 완전 이진 트리
	-  key(부모 노드) <= key (자식 노드)

## 1.3. 힙(heap)의 구현
- 힙 구현 표준적인 자료구조: **배열**
- 구현의 편의성을 위해 `index 0` 미사용
- 힙은 **배열 인덱스의 부모-자식 관계 규칙**은 고정,그러나 각 인덱스에 저장되는 값은 삽입·삭제 과정에서 변경 가눙
- 배열 인덱스의 부모-자식 관계 규칙
	- 왼쪽 자식 index = (부모 index) * 2
	- 오른쪽 자식의 index = (부모의 인덱스) * ( 2 + 1 )
	- 부모의 인덱스 = (자식의 인덱스) / 2

![[Pasted image 20260329000418.png]]

### 1.3.1. Heap in Java
```java
public class Heap<E> {
	private fianl Comparator<? super E> comparator;
	private static fianl int DEFAULT_CAPACITY = 10;
	
	private int size;
	
	private Object[] array;
	
	// 생성자 Type 1 (초기 공간 할당 X)
	public Heap() {
		this(null);
	}
	
	public Heap(Comparator<? super E> comparator){
		this.array = new Object[DEFAULT_CAPACITY];
		this.size = 0;
		this.comparator = comparator;
	}
	
	// 생성자 Type 2 (초기 공간 할당 O)
	public Heap(int capacity) {
		this(capacity, null);
	}
	
	public Heap(int capacity, Comparator<? super E> comparator) {
		this.array = new Object[capacity];
		this.size = 0;
		this.comparator = comparator;
	}
	
	// 받은 인덱스의 부모 노드 인덱스를 반환
	private int getParent(int index) {
		return index/2;
	}
	
	// 받은 인덱스의 왼쪽 자식 노드 인덱스를 반환
	private int getLeftChild(int index) {
		return index * 2;
	}
	
	// 받은 인덱스의 오른쪽 자식 노드 인덱스를 반환
	private int getRightChild(int index){
		return index * 2 + 1;
	}
}
```

### 1.3.2. Inserting of Heap in Java
```java
public void add(E value) {
	//용량 최대시 용량 추가
	if (size + 1 == array.length) {  
	resize(array.length * 2);  
	}  
  
	int index = ++size;  
	// 신규 값의 위치 찾는 과정
	while (index > 1) {  
		int parent = getParent(index);  
	  
		if (compare(value, (E) array[parent]) <= 0) {  break; }  
	  
		array[index] = array[parent];  
		index = parent;  
	}  
	  
	array[index] = value;  
}
```

### 1.3.3. Deleting of Heap in Java
- last 노드를 root 노드로 설정한뒤 알맞은 위치를 찾아가는 로직
```java
public E remove() {
	if (size == 0) {
		return null;
	}
	
	E root = (E) array[1];   //삭제할 루트값
	E last = (E) array[size];//마지막 노드값 저장
	array[size] = null; //마지막 노드 비움
	size--;
	
	if (size == 0){
		return root;
	}
	
	int index = 1;
	
	while (true) {
		int left = getLeftChild(index);
		int right = getRightChild(index);
		
		if (left > size){
			break; // 자식 없음
		}
		
		int largerChild = left;
		
		//right가 존재하고, right가 left 보다 크면
		if (right <= size && compare((E) array[right], (E) array[left]) > 0){
			largerChild = right;
		}
		
		// 마지막 노드 값이 자식노드 중 큰 값보다 크거나 같다면 
		if (compare(last, (E) array[largerChild]) >= 0) {break;}
		
		//마지막 노드 값이 자식노드 중 큰 값보다 작다면
		//루트노드를 largerChild로 변경
		array[index] = array[largerChild];
		// 마지막 노드(last)가 다음으로 내려가며 들어갈 위치로 이동
		index = largerChild;
		}
		
	array[index] = last;
	return root;
	}
```