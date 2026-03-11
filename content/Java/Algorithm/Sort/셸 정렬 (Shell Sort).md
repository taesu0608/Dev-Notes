- https://gmlwjd9405.github.io/2018/05/08/algorithm-shell-sort.html
# 1. 셸 정렬 (Shell Sort)
- `Donald L. Shell`이라는 사람이 제안한 방법으로, 삽입정렬을 보완한 알고리즘
### Cf) 삽입 정렬의 문제점
- 삽입 정렬은 원소를 한 칸씩만 이동시키기에 worst case 경우 이동 비용이 큼
- 셸 정렬은 gap을 통해 먼 원소를 먼저 이동시켜 이를 보완
# 1.1. 셸 정렬
1. 정렬해야할 리스트를 gap에 따라 여러 부분리스트로 생성
2. 각 부분 리스트를 삽입 정렬을 이용하여 정렬
3. gap의 크기를 줄인 후 위 과정을 반복 (`gap == 1` 일 경우 종료)
	- gap은 홀수일 경우 성능이 좋음
	- thus) gap은 이전 gap의 절반이 짝수 일 경우 + 1을 함

### Cf) 왜 gap은 짝수일 경우 효율이 낮은가.
5, 6, 7, 8, 1, 2, 3, 4 를 gap 4 > 2 > 1 순으로 진행
- gap 4 (result: 1, 2, 3, 4, 5, 6, 7, 8)
	- 5 ,1 > 1 ,5
	- 6, 2 > 2, 6
	- 7, 3 > 3, 7
	- 8, 4 > 4, 8
- gap 2 (result: 1, 2, 3, 4, 5, 6, 7, 8)
	- 1, 2, 3, 4
	- 5, 6, 7, 8
>gap 4 정렬 과정에서 일부 경우 gap 2 정렬의 효과가 이미 발생할 수 있다.

![[Pasted image 20260226160105.png]]![[Pasted image 20260226160108.png]]

## 1.2. 특징
- 안정 정렬(Stable Sort) X
- gap sequence에 영향 많이 받음
### 1.2.1. 장점
- 먼 원소끼리의 비교 및 교환이 빠름


## 1.3. 시간복잡도
| 구분           | 시간 복잡도        | 설명                          | 근거                                |
| ------------ | ------------- | --------------------------- | --------------------------------- |
| Best case    | $O(n)$        | 이미 정렬된 원소                   | 각 gap 단계에서 이동 발생 없음               |
| Worst case   | $O(n^2)$      | 역순으로 정렬된 원소                 | 각 단계에서 삽입 정렬이 최대 비용 발생            |
| Average case | $O(n \log n)$ | 일반적인 입력<br>(Shell sequence) | 전체 단계 수: $\log n$<br>각 단계 비용: $n$ |

---
### Cf) Avg 증명
가정: 이전 단계의 gap이 절반씩 줄어드는 gap sequence
$$cost(g_k) = 각\;gap\;단계에서\;수행되는\;삽입\;정렬의\;평균비용$$
O(N)은 해당 **gap sequence** 수행 시 한 단계의 임의의 비용

$$
cost(g_k) = O(N)
$$

$$
g_1 = N/2\;\;\;\;g_2 = N/4\;\;\;\;g_3 = N/4\;\;\;\; g_k ={N}/{2^k}$$

$$
g_k = \left\lfloor \frac{N}{2^k} \right\rfloor
$$

항상 최종단계 gap는 1이므로
 $g_k = 1$ 일 경우

$$
\left\lfloor \frac{N}{2^k} \right\rfloor = 1
$$

이를 부등식으로 바꾸면,
- 해당 Floor brackets($\left\lfloor\quad\right\rfloor$)은 내림 표현
- 내림표현을 범위로 재표현하면 아래의 식을 따름

$$
\qquad1 \le \frac{N}{2^k} < 2
$$

양변에 2^k를 곱하면,

$$
2^k \le N < 2^{k+1}
$$

로그를 취하면,

$$
k \le \log_2 N < k + 1
$$

따라서 패스의 개수는,

$$
k = \lfloor \log_2 N \rfloor
$$

즉 전체 gap 패스 수는 O(log N) 이다.
- **전체 시간복잡도 = 전체 패스 수 * 패스당 비용**

$$
T(N) = \sum_{k=0}^{\lfloor \log_2 N \rfloor} cost(g_k)
$$

여기에 cost(g_k) (패스당 비용) = O(N)을 대입하면,

$$
T(N) = \sum_{k=0}^{\lfloor \log_2 N \rfloor} O(N)
$$

$$
= O(N) \sum_{k=0}^{\lfloor \log_2 N \rfloor} 1
$$

$$
= O(N)(\lfloor \log_2 N \rfloor + 1)
$$

$$
= O(N \log N)
$$
# 2. gap sequence
- gap sequence란 Shell 정렬에서 원소들을 비교·이동할 간격 $g_k$ 의 수열

![[Pasted image 20260301052940.png]]

### 2.1. Shell sequence  
- Shell sequence는 Donald L. Shell이 처음 제안한 가장 기본적인 gap 수열이다.  
- 각 단계마다 gap을 이전 값의 **1/2로 감소**시키는 방식이다.  
- 일반적으로 다음과 같이 정의된다.  
$$g_k = \left\lfloor \dfrac{N}{2^k} \right\rfloor$$  
- gap은 점점 감소하며, 마지막 단계에서 $g_k = 1$ 이 되어 전체 정렬을 완성한다.