
# 1. 조건 체크
```java
int index = 123;
int[] arr = new int[index];
if (index + 1 < arr.length && 원하는 조건)
```

# 2. for문 범위 조정
```java
for (int i = 0; i < arr.length - 1; i++) {
	if (원하는 조건) {continue;}
}
```

# 3. 마지막 인덱스와 조건 분기
```java
for (int i = 0; i < arr.length; i++) {
	if (i == arr.length - 1) {
	// 마지막 인덱스 처리
	continue;
	}

if (remainder <= arr[i + 1] * 9) {continue;}
}
```