- https://inpa.tistory.com/entry/JAVA-%E2%98%95-%EC%9E%90%EB%B0%94-%EB%B0%B0%EC%97%B4Array-%EB%AC%B8%EB%B2%95-%EC%9D%91%EC%9A%A9-%EC%B4%9D%EC%A0%95%EB%A6%AC
# 1. 배열([[Array]])
- 같은 타입의 변수들로 이뤄진 유한 집합
- **배열 요소(element)**: 배열을 구성하는 각각의 값
- **인덱스(index)**: 배열에서 위치를 가르키는 숫자
	- 0 <= index

## 1.1. 배열 선언 & 초기화
- 자바(java)의 배열은 선언 시 **공간을 미리 지정**해야함
```java
// 1. 중괄호 초기화
int[] arr = {1, 2, 3, 4, 5};

// 2. new 키워드 + 중괄호 초기화
int[] arr = new int[]{1, 2, 3, 4, 5};

// 3. 크기 지정
int[] arr = new int[5];

// 4. 다차원 배열
int[][] matrix = {
	{1, 2, 3},
	{4, 5, 6}
};
```

## 1.2. 배열 출력
#### Ex) 배열객체의 참조 출력
``` java
System.out.println(iArr);

//출력결과
[i@iqfinin]
```
- (타입@주소) 가 출력됨

### 1.2.1. 배열 출력 방법
1. 하드코딩 with `for`
2. Arrays.toString()
	[a, b, c, d, e] 형태로 출력됨
##### `char` 형 배열은 println으로 바로 출력 가능

### Cf) Java는 배열의 끝을 어떻게 알까?
- C와 다르게 `\0` 으로 끝을 표시하지 않음
- Java의 배열은 배열 길이를 표시하는`length`가 존재

## 1.3. 배열 복사
- 배열 공간 부족시 배열 복사를 통하여 더 큰 크기의 배열로 변환하는 작업이 종종 발생함

### 1.3.1. 배열 복사 방법
1. , 하드코딩 with for
2. `Arrays.copyOf()`
	>Arrays.copyOf()는 내부적으로 `System.arrayCopy()`을 래핑한 함수


[[Cf) 얕은복사(shallow copy)와 깊은복사(deep copy)]]

## 1.4. 배열 정렬
`Arrays.sort()`
### 1.4.1. 배열 정렬 종류
1. `Array.sort(arr);`
- **정렬된 배열의 반환이 아닌** 자신의 배열을 정렬함
2. `Array.sort(arr, Collections.reverseOrder());`
3. `Array.sort(arr,fromIndex, toIndex)`
- **toIndex 는 미포함**

## 1.5. 배열 비교
`Array.equals()`

---
# 2. 다차원 배열
## 2.1. 다차원 배열 생성
```java
int[][] arr = new int[4][3];

int[][] arr2 = {
	{1,2,3},
	{1,2,3},
	{1,2,3},
	{1,2,3}
}
```

## 2.2. 2차원 배열 출력
- `Arrays.deeptoString()`

### Cf) Arrays.deeptoString()의 동작원리
- 재귀적으로 순회하며 내부요소가 배열일 경우 다시 deepToString() 호출

## 2.3. 2차원 배열 비교
- `Arrays.deepEquals()`

## 2.4. 가변 배열
- 2차원 배열이 정방 행렬일 필요 X
#### 정방행렬이 아닌 2차원 배열
```java
int[][] int = {
	{100, 100, 100, 100},
	{100},
	{100, 100, 100},
	{100, 100, 100, 100},
	{100, 100}
}
```

---
# 3. 객체 배열
## 3.1. 객체 배열 생성
```java
Object[] obj = new Object[3];
```
- 객체 또한 배열의 자료형이 될 수 있음

## 3.2. 객체 배열 복사
- `Arrays.copyOf`
##### 배열은 복사가 되나 요소는 참조 객체이기 떄문에 주의
- 깊은 복사(deep copy)는 하드코딩 필수

## 3.3. 객체 배열 정렬
- [[Comparable]] 인터페이스를 활용
```java
 class User implements Comparable<User> { 
            String name;
            int age;
            User(String name, int age) {
                this.name = name;
                this.age = age;
            }
            @Override
            public int compareTo(User user) {
                // 비교 로직을 구현
                if (this.age < user.age) {
                    return -1;
                } else if (this.age == user.age) {
                    return 0;
                } else {
                    return 1;
                }
            }
        }
        User[] users = {
            new User("홍길동", 32),
            new User("김춘추", 64),
            new User("임꺽정", 48),
            new User("박혁거세", 14),
        };
        Arrays.sort(users); // 나이순 정렬
        // Arrays.sort(users, Collections.reverseOrder()); // 역순 정렬
        
        for (User u : users) { // 출력
            System.out.println(u.name + " " + u.age + "세");
        }

```
- [[Comparator]] 인터페이스와 활용
```java
class User {
            String name;
            int age;
            User(String name, int age) {
                this.name = name;
                this.age = age;
            }
        }
        User[] users = {
            new User("홍길동", 32),
            new User("김춘추", 64),
            new User("임꺽정", 48),
            new User("박혁거세", 14),
        };
		// Arrays.sort(배열, new Comparator<>() { ... });
        Arrays.sort(users, new Comparator<User>() {
            @Override
            public int compare(User u1, User u2) {
                return Integer.compare(u1.age, u2.age); // Integer 클래스에 정의된 compare 함수로 두 가격 정수 원시값을 비교
            }
        });
        // java8 람다식으로 다음과 같이 축약이 가능
        Arrays.sort(users, (u1, u2) -> Integer.compare(u1.age, u2.age)); // 나이순 정렬
        
        // 출력
        for (User u : users) { 
            System.out.println(u.name + " " + u.age + "세");
        }

```

### Cf) [[Comparator]]의 중첩 조건 상황 확인