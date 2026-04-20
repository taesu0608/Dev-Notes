- https://gmlwjd9405.github.io/2018/08/15/algorithm-bfs.html
# 1. 너비 우선 탐색(BFS, Breadth-First Search)
- **정의**: 루트 노드(혹은 다른 임의의 노드)에서 시작해서 인접한 노드를 먼저 탐색 알고리즘
## 1.1. 탐색 방법
![[Pasted image 20260306171444.png]]
1. 시작 노드 A를 방문하고 방문 여부를 체크한다.
2. 시작 노드를 큐에 삽입(enqueue) 한다.
3. 큐에서 노드를 하나 꺼낸다(dequeue).
4. 꺼낸 노드와 인접한 노드들을 차례로 확인한다.
5. 아직 방문하지 않은 인접 노드를 방문 처리한 뒤 큐에 삽입(enqueue) 한다.
6. 위 과정을 큐가 빌 때까지 반복한다.
## 1.1. BFS(Breadth-First Search)의 특징
1. [[큐 (Queue)]] 사용
2. 방문 여부 검사

## 1.2. BFS(Breadth-First Search) 구현
### BFS 구현 예시
```java
import java.util.*;

public class BFSExample {
	static List<Integer>[] graph;
	static boolean[] visited;
	
	public static void bfs(int start) {
		Queue<Integer> q = new ArrayDeque<>();
		
		// 큐 삽입 전 방문 기록(true) 체크
		visited[start] = true;
		q.offer(start);
		
		while (!q.isEmpty()) {
			int cur = q.poll();
			System.out.print(cur + " ");
			
			for (int next : graph[cur]) {
				if (!visiteed[next]) {
					visited[next] = true;
					q.offer(next);
				}
			}
		}
	}
	
	public static void main(String[] args) {
		int n = 6;
		
		graph = new ArrayList[n + 1];
		visited = new boolean[n + 1];
		
		for (int i = 0; i <= n; i++){
			graph[i] = new ArrayList<>();
		}
		
		//그래프 예시
		graph[1].add(2);
		graph[1].add(3);
		graph[2].add(4);
		graph[2].add(5);
		graph[3].add(6);
		
		bfs(1);
	}
}
```

## 1.3. 시간 복잡도
| 그래프 표현 방식                    | 저장 구조                 | 이웃 노드 탐색 방식       | BFS 시간복잡도    | 공간복잡도    | 특징                |
| ---------------------------- | --------------------- | ----------------- | ------------ | -------- | ----------------- |
| **인접 리스트 (Adjacency List)**  | 각 정점에 연결된 이웃 노드 목록 저장 | 현재 노드의 연결된 노드만 순회 | **O(V + E)** | O(V + E) | 희소 그래프에 효율적       |
| **인접 행렬 (Adjacency Matrix)** | V × V 행렬에 연결 여부 저장    | 현재 노드에서 모든 노드 확인  | **O(V²)**    | O(V²)    | 구현 단순, 밀집 그래프에 유리 |
### 1.3.1 인접 행렬
- 노드들의 연결 여부가 행렬 형태로 저장
- 현재 노드의 이웃을 찾기 위해 모든 노드를 확인 필요
```
    1 2 3 4 5
1 [ 0 1 1 0 0 ]
2 [ 1 0 0 1 0 ]
3 [ 1 0 0 0 1 ]
4 [ 0 1 0 0 0 ]
5 [ 0 0 1 0 0 ]
```
- 노드 확인 * 탐색으로 인하여 시간 복잡도 `O(V²)`

# 2. BFS 특징
## 2.1.Level-order traversal (레벨 순회)
**정의**: 시작 노드(또는 루트)로부터의 **거리(깊이, level)** 가 같은 노드들을 같은 단계로 묶어 순서대로 방문하는 탐색 방식
- **가중치가 없는 그래프**에서 최단 거리를 구할 때 적합
- 깊이(레벨)별 탐색으로, 루트 노드를 기준으로 가까운 노드부터 순차적으로 탐색
#### Ex) 이진 트리 (Binary Tree)
![[Pasted image 20260412125949.png]]
- Level-order traversal 순서
	- A → B → C → D → E → F → G
- Level 별 노드
	- **Level 0** : `A`
	- **Level 1** : `B, C`
	- **Level 2** : `D, E, F, G`