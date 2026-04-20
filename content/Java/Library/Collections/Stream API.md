# 1. Stream API
## 1.1. in Oracle
A sequence of elements supporting sequential and parallel aggregate operations.
- **정의**: 요소들의 시퀀스로서, 순차적 및 병렬적인 집계 연산을 지원 

## 1.2. 특징
- Collection 프레임워크를 기반으로 사용됨
- JDK8 부터 도입
### 1.2.1. Stream API의 특징
- 원본의 데이터 변경 X
- 일회용
- 내부 반복으로 작업 처리

### 1.2.2 Stream API의 3가지 단계
1. 생성하기(최초 연산자)
	- Stream 객체를 생성하는 단계
	- Stream은 재사용이 불가하므로, 닫히면 다시 생성해야 함
2. 가공하기(중간 연산자)
	 - 원본의 데이터를 별도의 데이터로 가공하기 위한 중간 연산
3. 결과 만들기(최종 연산자)
	- Stream의 요소들을 소모하면서 연산이 수행되기 때문에 1번만 처리가능
---

## 2. 메서드

### 2.1. 대표적인 중간 연산자
| 메서드                                 | 설명                     |
| ----------------------------------- | ---------------------- |
| `filter(Predicate)`                 | 조건에 맞는 요소만 남김          |
| `map(Function)`                     | 요소를 변환                 |
| `flatMap(Function)`                 | 내부 스트림 펼침 (2차원→1차원)    |
| `distinct()`                        | 중복 제거                  |
| `sorted()` / sorted([[Comparator]]) | 정렬 (기본/사용자 정의 기준)      |
| `limit(n)`                          | 앞에서 최대 n개 추출           |
| `skip(n)`                           | 앞에서 n개 건너뜀             |
| `peek(Consumer)`                    | 디버깅 또는 로그용으로 중간에 요소 훑기 |

### 2.2. 대표적인 최종 연산자
| 연산자           | 반환 타입                    | 설명                          |
| ------------- | ------------------------ | --------------------------- |
| `forEach()`   | `void`                   | 각 요소에 대해 작업 수행 (출력 등 부수효과)  |
| `toArray()`   | `Object[]` 또는 지정 타입 배열   | 스트림을 배열로 변환                 |
| `collect()`   | 다양한 (주로 `List`, `Map` 등) | 요소들을 수집 (예: 리스트, 세트, 맵 등으로) |
| `reduce()`    | `Optional<T>` 또는 `T`     | 누적 연산 (합계, 곱, 최대 등)         |
| `count()`     | `long`                   | 요소 개수 반환                    |
| `anyMatch()`  | `boolean`                | 하나라도 조건에 맞는 요소가 있는지 확인      |
| `allMatch()`  | `boolean`                | 모든 요소가 조건에 맞는지 확인           |
| `noneMatch()` | `boolean`                | 모든 요소가 조건에 맞지 않는지 확인        |
| `findFirst()` | `Optional<T>`            | 첫 번째 요소 반환                  |
| `findAny()`   | `Optional<T>`            | 아무 요소나 하나 반환 (병렬 스트림에서 유리)  |
| `min()`       | `Optional<T>`            | 최소값 반환 (Comparator 필요)      |
| `max()`       | `Optional<T>`            | 최대값 반환 (Comparator 필요)      |


---

### Cf) Stream이 병렬 처리가 가능한 이유
 병렬 처리를 가능하게 하는 구조: **Spliterator + ForkJoinPool**
 [[Spliterator]]
- "Split + Iterator"
- 데이터 소스를 **자동으로 나눌 수 있는 반복자**
- Stream 내부에서 데이터를 **여러 청크(chunk)**로 나눌 수 있게 도와줌
- → 병렬 처리를 위해 **작업 분할이 가능한 구조**를 제공함

[[ForkJoinPoo]]
- 자바 7부터 도입된 병렬 작업 프레임워크
- 작은 작업 단위로 분할(fork)하고, 결과를 합침(join)
- Stream의 병렬 처리에서 **쓰레드를 관리하고 실행하는 엔진**

-> Spliterator로 데이터를 나누고 ForkJoinPool으로 병렬 실행하는 구조