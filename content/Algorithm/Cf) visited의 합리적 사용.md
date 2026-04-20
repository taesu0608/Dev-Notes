# 1. visited
**정의** :노드의 방문 여부를 기록하여 중복 탐색을 방지하는 상태 관리 구조
## 1.1. 합리적인 visited 사용
- `visited`는 탐색 이전 / 탐색 이후 상태 변경을 결정하는지가 중요
### 1.1.1. 탐색 전 방문 처리
```java
for (int next : graph[cur]) {
    visited[next] = true;       // 먼저 방문 처리
    if (next % 2 == 0) continue; // 조건 탈락
    q.offer(next);
}
// 조건을 탈락하였지만 
```
### 1.1.2. 탐색 후 방문 처리
```java
for (int next : graph[cur]) {
    if (next % 2 == 0) continue;
    if (!visited[next]) {
        visited[next] = true;
        q.offer(next);
    }
}
```

