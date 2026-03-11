# 1. 반복문
## 1.1. 개요
- 여러 반복문의 사용에서 상태 전달을 위한 패턴을 분류함
## 1.1. 반복문의 한계점
반복문은 한 실행문이 특정한 횟수만큼 시행되는 과정이다. 면밀하게 말하면 모든 Iteration(반복문의 한 사이클)의 집합이 하나의 반복문이다. 반복문은 기본적으로 Iteration간의 연관 여부에 따라 두가지의 종류로 나눌 수 있다. 각 반복문 사이에 변화된 값이 존재하는 `연관반복` 각 반복문 사이에 변화된 값이 존재하지 않는 `무관반복` 이라 하겠다.
여기서 변화된 값은 단순히 한 Iteration 내에서 수정된 변수, 객체의 값이 아닌 다음 반복문에 영향을 주는 값 만을 칭한다.

# 2. 연관반복
- 연관 반복은 한 이터레이터 내부 상태를 다음 이터레이터로 넘기는 것이 중요하다. 이에 몇가지 패턴을 나누면 다음과 같다.
### 2.1 외부 변수/배열 저장
- 변화된 값을 저장
```java
long sum = 0;
for (int x : arr) sum += x;
```

```java
int n = 10; // 구하고 싶은 n번째 피보나치 수
int[] dp = new int[n+1];

// 초기값
dp[0] = 0;
dp[1] = 1;

// 점화식 적용
for (int i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2]; // 이전 두 상태를 이용해 현재 값 계산
}

System.out.println(dp[n]); // n번째 피보나치 수
```

### 2.2. 큐로 반복 대상 변화
- 변화된 값과 변화되어지는 반복대상의 수를 저장
```java
//BFS
ArrayDeque<State> q = new ArrayDeque<>();
q.offer(init);
while (!q.isEmpty()) {
    State s = q.poll();
    for (State ns : expand(s)) q.offer(ns);
}
```

### 1.2.3. 상태로 반복 여부 변화
```java
boolean found = false;
for (int i = 0; i < arr.length; i++) {
    if (arr[i] == target) {
        found = true;
        break;
    }
}
if (found) System.out.println("찾았다!");
```