# 1. 이분 탐색 (Binary Search)
- 이분 탐색(Binary Search)은 정렬된 데이터에서 원하는 값을 빠르게 찾는 알고리즘
- 이분탐색/이진탐색
## 1.1. 이분 탐색 (Binary Search)
1. 중간값을 구한다.
2. 목표값(target)과 비교한다.
3. 범위를 절반으로 줄인다.
![[Pasted image 20260325122410.png]]

## 1.2. 시간 복잡도
- 시간복잡도:  $O(\log N)$

### 1.2.1. 시간복잡도 증명
1. 탐색 반복횟수($k$) 에 따른 잔여 범위
$$  
\frac{N}{2^k}  
$$
2. 탐색은 범위가 1이하시 종료 
$$  
\frac{N}{2^k} \leq 1  
$$
3. 양변에 $2^k$를 곱하면
  
$$  
N \leq 2^k  
$$  
  
4. 양변에 $\log_2$를 취하면
  
$$  
\log_2 N \leq k  
$$  

- $Big O$ = $O(log_2 N)$
## 2. 구현
## 2.1. Binary Search in Java
```java
int left = 0;
int right = arr.length - 1;

while (left <= right) {
	int mid = (left + right) / 2;
	if (arr[mid] == target) {return mid;}
	else if (arr[mid] < target) {left = mid + 1;}
	else {right = mid - 1;}
}
```
- `mid`는 이미 비교가 완료된 값이므로, 탐색 범위를 줄일 때 제외된다.