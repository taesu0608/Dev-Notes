- https://www.geeksforgeeks.org/dsa/bubble-sort-algorithm/
# 1. 버블 정렬
- **정의**: 인접한 두 요소를 비교하여 잘못된 순서일 경우 서로 교환하는 과정을 반복하여 정렬을 수행하는 가장 단순한 비교 기반 정렬 알고리즘
- **목적**: 작은 데이터 집합을 정렬하는데 사용

## 1.1. 버블 정렬
![[Pasted image 20260223090759.png]]
### 1.1.1. 정렬의 범위와 기준
- 정렬의 범위 설정에 관한 휴리스틱
> 정렬의 범위는 꽤나 직관적으로 받아들이기 어렵다. 초심자라면 말이다.
> 버블정렬은 정렬의 기초로 이중 반복 속 두 요소의 교환을 로직으로 하기에
> 반복의 범위와 두 요소의 교환을 생각함에 있어서 헷갈리기 쉽다.
> 여기서 주요한 인식은 인접한 두 요소 중 어느 한 요소로 기준점을 잡고 범위를 생각해야 된다는 것이다.

![[Pasted image 20260223090336.png]]
- 위의 그림은 인접한 요소중 **앞 요소**를 기준으로 반복의 범위를 정한 것이다.
- 총 n개의 요소는 **앞 요소**를 기준으로 n-1번의 교환이 이루어지면 된다.

![[Pasted image 20260223090649.png]]
- n개의 요소는 **앞 요소**를 기준으로 최대 n-1 회전의 교환이 이루어진다.
- Thus) 버블정렬의 이중 반복의 반복 모두 `n-1`만큼 횟수만 반복을 한다.
---
# 2. 특징

## 2.1. 장단점

| 구분  | 내용                                                                     |
| --- | ---------------------------------------------------------------------- |
| 장점  | 1. 이해와 구현이 쉽다.<br>2. 추가적인 메모리 공간이 필요 없다.<br>3. **안정 정렬 (Stable Sort)** |
| 단점  | 1. O(n²)의 느린 시간 복잡도를 가진다.<br>2. 실제 실무에서는 거의 사용되지 않는다.                  |
### 2.1.3. 안정 정렬 (Stable Sort)
**정의**: 같은 value일 경우 원래 key의 순서를 유지
> Ex) 같은 Value일 경우, 원 key의 순서를 유지
> 정렬 전
> (K , V) = (A , 90), (B, 90)
> 정렬 후
> (A , 90), (B, 90) 순서 보장

## 2.2. 시간 복잡도
- 시간 복잡도: $O(n^2)$
- 추가 메모리 사용량: $O(1)$
	- 교환(swap)을 위한 임시 저장소 필요

# 3. Bubble Sorting in Java

```java
import java.io.*;

class GFG{
	static void bubbleSort(int arr[], int n){
		int i, j, temp;
		boolean swapped;
		for (i = 0; i < n - 1; i++){
			swapped = false;
			for (j = 0; j < n - i - 1; j++){
				if (arr[j] > arr [j + 1]){
					temp = arr[j];
					arr[j] = arr[j + 1];
					arr[j + 1] = temp;
					swapped = true;
				}
			}
			
			// 더이상 swap이 발생하지 X = 정렬된 상태
			if (swapped == false)
				break;
		}
	}
	
	static void printArray(int arr[]. int size){
		int i;
		for (i = 0; i < size; i++)
			System.out.print(arr[i] + " ");
		System.out.println();
	}
	
	public static void main(String args[]){
		int arr[] = { 64, 34, 25, 12, 22, 11, 90};
		int n = arr.length;
		bubbleSort(arr, n);
		System.out.println("Sorted array:");
		printArray(arr, n);
	}
}
```

