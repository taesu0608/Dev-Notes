- https://gmlwjd9405.github.io/2018/05/06/algorithm-insertion-sort.html
# 1. 삽입 정렬 (Insertion sort)
- 새로운 원소를 정렬된 원소 사이의 올바른 자리를 찾아 삽입
	- 새로운 원소와 정렬된 원소의 비교
	- 원소 삽입
### Cf) 왜 삽입 정렬은 `i = 1`부터 시작할까?

> 삽입 정렬은 원소를 교환(swap)하는 방식이 아니라,  
> 이미 정렬된 원소들 사이에 새로운 원소를 삽입하기 위해 기존 원소들을 이동(shift)시키는 방식이다.
> 
> 이 알고리즘은 초기 상태에서 5개의 원소가 한 번에 주어지더라도,  
> 버블 정렬이나 선택 정렬처럼 배열 전체를 대상으로  
> 비교와 교환을 반복하는 방식으로 동작하지 않는다.
> 
> 대신 삽입 정렬은 첫 번째 원소 하나를 정렬된 상태로 간주하고,  
> 나머지 원소들을 정렬된 부분 배열에 하나씩 삽입해 가며 정렬 상태를 유지한다.  
> 이러한 동작 방식은 빈 배열에 원소를 차례대로 삽입해 나가는 과정과 유사하다.
> 
> 따라서 첫 번째 원소는 비교나 이동이 전혀 필요하지 않으며,  
> 실제로 삽입 정렬의 핵심 로직은 두 번째 원소(`i = 1`)부터 시작된다.
> 
## 1.1. 삽입 정렬
1. 삽입할 원소 선택 (i = 1부터 시작)
2. 삽입할 원소(A)와 N 번째 전의 원소(B)와 비교 (N = 1, 2, 3, ...)
	- A >= B: A 원 위치에 A 삽입
	- A < B: B원소를 shift 1회 이후 위의 과정 반복
![[Pasted image 20260225023344.png]]

## 1.2. 특징
- 안정성 만족
	- Cf) [[선택 정렬 (Selection Sort)]]
### 1.2.1. 단점
- 비교적 많은 레코드들의 이동 필요
- 레코드 수가 많아질수록 전체 회전수와 각 회전마다 비교 및 이동의 횟수는 커짐
	- Ex) 이미 정렬된 데이터에 신규 원소 추가 시 이점이 큼

## 1.3. 시간 복잡도

| 구분              | 입력 상태  | 비교 횟수 | 이동(shift) 횟수 | 시간 복잡도 | 설명                                    |
| --------------- | ------ | ----- | ------------ | ------ | ------------------------------------- |
| 최선 (Best Case)  | 이미 정렬됨 | O(n)  | O(1)         | O(n)   | 각 원소가 바로 제자리에 삽입됨<br>이동없이 1번의 비교만 이뤄짐 |
| 최악 (Worst Case) | 역순 정렬  | O(n²) | O(n²)        | O(n²)  | 모든 원소가 정렬 구간 끝까지 이동                   |
### 1.3.1. Best Case
- 비교 횟수: `O(n) =n-1` 번

### 1.3.2. Worst Cast
- 비교 횟수: `(n-1) + (n-2) + … + 2 + 1 = n(n-1)/2 = O(n^2)`
- 교환 횟수:`n(n-1)/2 + 2(n-1) = (n^2+3n-4)/2 = O(n^2)`

# 2. 구현
## 2.1. Insertion Sort in Java
```java
public class InsertionSort {  
    /* 삽입 정렬  
    원소를 새로이 받으면서 알맞은 위치를 찾아가는 방식  
    7    9 8 7 6 5 4 3
    */
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        int loop = Integer.parseInt(br.readLine());  
        StringTokenizer st = new StringTokenizer(br.readLine());  
        int arr[] = new int[loop];  
  
        arr[0] = Integer.parseInt(st.nextToken());  
  
        for(int i = 1; i < loop; i++){  
            int n = Integer.parseInt(st.nextToken());  
            int j = i - 1;  
  
            while(j >= 0 && arr[j] > n){  
                arr[j+1] = arr[j];  
                j--;  
            }  
  
            arr[j + 1] = n;  
        }  
  
        for(int i = 0; i < loop; i++){  
            System.out.print(arr[i] + " ");  
        }  
    }  
}
```

### 2.1.1. 핵심 아이디어
삽입정렬은 두 단계로 이루어진다.  
1. i는 새로 삽입할 원소를 선택한다.  
2. j는 정렬된 영역에서 역방향으로 삽입 위치를 찾는다.  
`arr[j] > n` 인 동안  
큰 값들을 오른쪽으로 이동시키고 반복이 끝난 뒤 `j+1` 위치에 `n`을 삽입한다. 
- `arr[j]`: 기정렬된 배열
- `n`: 새로 삽입된 원소
j는 반복 과정에서 -1까지 내려갈 수 있는데,  
그 경우 j+1이 0이 되어 자연스럽게  
배열의 맨 앞 삽입도 처리된다. 
- `arr[j + 1] = n; `
또한 이동 연산이 항상 `arr[j+1]`을 기준으로 이루어져  
인덱스 처리 흐름이 매우 일관적이다.
