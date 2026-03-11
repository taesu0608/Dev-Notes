# 1. 너비 우선 탐색(BFS, Breadth-first Search)

탐색을 할 때 너비를 우선으로 탐색을 수행하는 탐색 알고리즘

- 최단 경로를 찾음
- 큐([[큐 (Queue)]])

## 규칙
1. 큐에서 하나의 노드를 꺼낸다.
2. 해당 노드에 연결된 노드 중 방문하지 않은 노드를 방문하고, 차례대로 큐에 삽입한다.
3. 1, 2번을 반복한다.

# 2. 과정

### 1. 노드(1) 큐 삽입입

![[Pasted image 20250715170238.png]]
### 2. 노드(1) 방문 , 근접 노드(2,3) 큐 삽입
![[Pasted image 20250715170840.png]]
### 3. 노드(2) 방문, 근접 노드(4,5) 큐 삽입
![[Pasted image 20250715170853.png]]
### 4. 노드(3) 방문, 근접 노드(6,7) 큐 삽입
![[Pasted image 20250715170857.png]]
### 5. 나머지 노드 순차 방문(4,5,6,7)
![[Pasted image 20250715171002.png]]

# 3. 예시
```java
package algorithm.bfs;  
  
import java.util.ArrayDeque;  
import java.util.Arrays;  
  
public class BFSgrid {  
    // R, C는 맵의 상지ㅡ  
    static int R, C;  
    static char[][] map;  
    static int[][] dist;  
    // 위, 아래, 왼, 오 에 해당하는 증감값  
    static int[] dr = {-1,1,0,0};  
    static int[] dc = {0,0,-1,1};  
  
    static int bfs(int sr, int sc, int tr, int tc){  
        for (int i = 0; i < R; i++) Arrays.fill(dist[i], -1);  
        ArrayDeque<int[]> q = new ArrayDeque<>();  
        q.offer(new int[]{sr,sc});  
        dist[sr][sc] = 0;  
  
        while (!q.isEmpty()){  
            int[] cur = q.poll();  
            // 현재 row 와 column            int r = cur[0], c = cur[1];  
            if (r == tr && c == tc) return dist[r][c];  
  
            for (int k = 0; k < 4; k++){  
                //현재 r,c의 이동거리 + int nr = r + dr[k], nc = c + dc[k];  
                // 맵 바깥일 경우  
                if (nr < 0|| nr>=R || nc < 0|| nc>=C) continue;  
                // #은 벽을 의미  
                if (map[nr][nc] == '#') continue;  
                // 기탐험된 지역일 경우  
                if (dist[nr][nc] != -1) continue;  
                // 다음 위치에 현재 위치의 값 대입  
                dist[nr][nc] = dist[r][c] + 1;  
                // q에 다음 탐색위치 추가  
                q.offer(new int[]{nr,nc});  
            }  
        }  
        return -1;  
    }  
}
```