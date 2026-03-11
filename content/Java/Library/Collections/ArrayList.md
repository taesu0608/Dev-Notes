# 1. ArrayList
-  java.util.ArrayList
- [[Java Collections Framework (JCF)]]의 일부

**ArrayList는 가변 길이 배열이다.**

## 1.1. ArrayList 생성 방식
### 1.1. 기본 생성자
``` java
ArrayList<Integer> list = new ArrayList<>();
// init capacity 지정 (default: 10)
ArrayList<Integer> list = new ArrayList<>(100);
```

### 1.2. 컬렉션
``` java
List<Integer> origin = List.of(1,2,3);
ArrayList<Integer> list = new ArrayList<>(origin);
```
- 기존 컬렉션 deep copy

### 1.3. Arrays.asList 사용
``` java
ArrayList<Integer> list = new ArrayList<>(Arrays.asList(1,2,3));
```
1. 고정 리스트 생성: `Arrays.asList(1,2,3)`
2. 새로운 가변 리스트 복사 생성: `new ArrayList<>(...)`

### 1.4. List.of
``` java
ArrayList<Integer> list = new ArrayList<>(List.of(1,2,3));
```

### 1.5. 스트림 사용
```java
ArrayList<Integer> list =
	IntStream.range(1, 6)
				.boxed() // 기본형을 맞는 wrapper 클래스로 형변환
				.collect(Collectors.toCollection(ArrayList::new));
```

### 1.6. 익명 클래스 방식
```java
ArrayList<Integer> list = new ArrayLIst<>() {
//인스턴스 초기화 블록
	{
		add(1);
		add(2);
	}
}
```
- [[초기화 블록]]

## 1.2. 메서드
### 1.2.1. 생성
| 메서드                              | 반환 타입   | 설명                 |
| -------------------------------- | ------- | ------------------ |
| `ArrayList()`                    | 생성자     | 기본 용량(10)으로 리스트 생성 |
| `ArrayList(int initialCapacity)` | 생성자     | 초기 용량 지정           |
| `size()`                         | int     | 요소 개수 반환           |
| `isEmpty()`                      | boolean | 리스트가 비어있는지 확인      |

### 1.2.2. 요소 추가 / 수정
| 메서드                   | 반환 타입   | 설명                    |
| --------------------- | ------- | --------------------- |
| `add(E e)`            | boolean | 리스트 끝에 요소 추가          |
| `add(int index, E e)` | void    | 지정 위치에 요소 삽입          |
| `set(int index, E e)` | E       | 해당 인덱스 값 수정 (기존 값 반환) |

### 1.2.3. 요소 조회
| 메서드                     | 반환 타입   | 설명             |
| ----------------------- | ------- | -------------- |
| `get(int index)`        | E       | 해당 인덱스 요소 반환   |
| `indexOf(Object o)`     | int     | 처음 등장하는 인덱스 반환 |
| `lastIndexOf(Object o)` | int     | 마지막 등장 인덱스 반환  |
| `contains(Object o)`    | boolean | 포함 여부 확인       |
### 1.2.4. 반복 / 변환
|메서드|반환 타입|설명|
|---|---|---|
|`iterator()`|Iterator|반복자 반환|
|`toArray()`|Object[]|배열로 변환|
|`toArray(T[] a)`|T[]|지정 타입 배열로 변환|
|`forEach(Consumer)`|void|람다 반복 처리|

### 1.2.5. 정렬 / 검색
| 메서드                          | 반환 타입 | 설명            |
| ---------------------------- | ----- | ------------- |
| `sort(Comparator)`           | void  | 정렬            |
| `Collections.sort(list)`     | void  | 오름차순 정렬       |
| `Collections.binarySearch()` | int   | 이진 탐색 (정렬 필요) |

### 1.2.6. 용량 관리
| 메서드                               | 반환 타입 | 설명               |
| --------------------------------- | ----- | ---------------- |
| `ensureCapacity(int minCapacity)` | void  | 최소 용량 확보         |
| `trimToSize()`                    | void  | 사용 중인 크기만큼 용량 축소 |

### 1.2.7. 서브 리스트
| 메서드                         | 반환 타입 | 설명                  |
| --------------------------- | ----- | ------------------- |
| `subList(int from, int to)` | List  | 부분 리스트 반환 (원본과 연결됨) |

# 2. 특징
- 동적 배열
- 인덱스 접근
- 중복 허용
- 비동기적
