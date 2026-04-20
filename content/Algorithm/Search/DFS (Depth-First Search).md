- https://gmlwjd9405.github.io/2018/08/14/algorithm-dfs.html
# 1.깊이 우선 탐색(DFS, Depth-First Search)
**정의**: 그래프 또는 트리 구조에서 한 경로를 따라 가능한 깊게 탐색한 후, 진행 불가 시 이전 분기점으로 되돌아가 다른 경로를 탐색하는 알고리즘
## 1.1. 탐색 방법
![[Pasted image 20260313230635.png]]
1. 시작 노드를 방문
	- 방문한 노드를 방문처리
2. 현재 노드와 인접한 노드 중 방문하지 않는 노드가 있다면 그 노드로 이동
3. 이동한 노드를 시작 노드로 하여 위의 과정 반복
4. 더 이상 방문가능한 노드가 없을 시, 이전 노드로 돌아감
5. 되돌아간 노드 중 아직 방문하지 않은 인접노드가 있다면 해당 노드 탐색
6. 모든 노드 방문시, 탐색 종료

## 1.2. DFS(Depth-First Search)의 특징
- DFS 구현 방법
	1. 순환 호출
	2. 명시적인 스택
### 1.2.1. 순환 호출
```java
class Node{
	int value;
	boolean visited;
	List<Node> adjacent;
	
	Node(int value) {
		this.value = value;
		this.adjacent = new ArrayList<>();
	}
	
	void addAdjacent(Node node) {
		adjacent.add(node);
	}
}

public class DFSExample {
	// DFS 탐색
	public static void search(Node root) {
		if (root == null) return;
		
		// 1. 노드 방문
		visit(root);
		root.visited = true;
		
		// 2. 인접 노드 탐색
		for (Node n : root.adjacent) {
			if (!n.visted) {
				search(n);
			}
		}
	}
	
	//방문 처리
	public static void visit(Node node){
		System.out.print(node.value + " ");
	}
	
	public static void main(String[] args) {
		// 노드 생성
		Node A = new Node(1);
		Node B = new Node(2);
		Node C = new Node(3);
		Node D = new Node(4);
		NOde E = new Node(5);
		
		// 그래프 연결
		A.addAdjacent(B);  
		A.addAdjacent(C);  
  
		B.addAdjacent(D);  
		B.addAdjacent(E);  
  
		C.addAdjacent(E);  
  
		// DFS 시작  
		search(A);
	}
}
```