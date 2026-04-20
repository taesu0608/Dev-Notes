# 1. 슬라이딩 윈도우(Sliding Window)
**정의**: 슬라이딩 윈도우는 배열이나 문자열 같은 연속된 구간을 다룰 때, 구간의 시작점과 끝점의 `index`를 이동시키며 원하는 조건에 부합하는 부분을 찾는 알고리즘
- 창(window)이 왼쪽에서 오른쪽으로 미끄러지듯(sliding) 탐색
**목적**: 이전 구간의 정보를 활용하여 다음 구간을 연산하기 위함

# 2. 기본 구조
## 2.1. 고정 길이 슬라이딩 윈도우
- 윈도우 크기가 항상 일정함
- 단계별 구조는 다른 반복문으로 구현하는 것이 코드 명확성 향상
	1. 초기 윈도우 설정
	2. 동일 패턴 반복
### 2.1.1. Ex) 길이 `K`인 구간의 합
```java
int sum = 0;

// 처음 k개 합 (초기 윈도우 설정)
for (int i = 0; i < k; i++){
	sum += arr[i];
}

int max = sum;

// 동일 패턴 반복
for (int i = k; i < arr.length; i++) {
	sum += arr[i];
	sum -= arr[i - k];
	max = Math.max(max, sum);
} 
```

## 2.2. 투 포인터(Two Pointer)
**정의**: 투 포인터(Two Pointer)는 배열, 리스트, 문자열 등에서 두 개의 `index(pointer)`를 사용하여 문제를 해결하는 알고리즘 기법
### 2.2.1. 특징
- `(right, left)` 혹은 `(start, ent)` 라는 변수로 `index` 조작
	- `right`: 일반적으로 탐색 범위를 넓힘
	- `left`: 보통 조건을 복구하거나 범위를 줄임
### 2.2.2. Ex) 백준 no30804
- 서로 다른 과일 종류가 2개 이하인 가장 긴 연속 구간
```java
public class Main {
	public static void main(String[] args) throws IOException {  
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
  
		int n = Integer.parseInt(br.readLine());  
		int[] arr = new int[n];  
		int[] count = new int[10]; // 과일 번호 1~9  
  
		StringTokenizer st = new StringTokenizer(br.readLine());  
		for (int i = 0; i < n; i++) {  
		arr[i] = Integer.parseInt(st.nextToken());
		}  
				  
		int left = 0;  
		int kind = 0;  
		int max = 0;  
		  
		for (int right = 0; right < n; right++) {
			if (count[arr[right]] == 0) kind++; 
			count[arr[right]]++;  
			  
			// 입력된 과일의 수를 하나씩 줄여 1종을 삭제시킴
			while (kind > 2) {  
				count[arr[left]]--;  
				if (count[arr[left]] == 0) kind--;   
				left++;
			}
			  
			max = Math.max(max, right - left + 1);  
		}  
			  
		System.out.println(max);  
	}
}
```