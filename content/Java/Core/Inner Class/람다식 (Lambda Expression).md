# 1. 람다식
## 1.1. 정의 (Ref. Oracle)

One issue with anonymous classes is that if the implementation of your anonymous class is very simple, such as an interface that contains only one method, then the syntax of anonymous classes may seem unwieldy and unclear. In these cases, you're usually trying to pass functionality as an argument to another method, such as what action should be taken when someone clicks a button. Lambda expressions enable you to do this, to treat functionality as method argument, or code as data.

익명 클래스의 한 가지 문제는, 해당 구현이 매우 단순할 경우(예: 단 하나의 메서드만 가진 인터페이스일 경우) 문법이 복잡하고 명확하지 않게 느껴질 수 있다는 점이다. 이러한 경우에는 보통 어떤 기능(예: 버튼 클릭 시 수행할 동작)을 다른 메서드의 인자로 전달하려는 상황이다. 람다 표현식을 사용하면 기능을 메서드의 인자로 전달하거나, 코드를 데이터처럼 다룰 수 있게 된다.

The previous section, Anonymous Classes, shows you how to implement a base class without giving it a name. Although this is often more concise than a named class, for classes with only one method, even an anonymous class seems a bit excessive and cumbersome. Lambda expressions let you express instances of single-method classes more compactly.

이전 섹션인 [[익명 클래스 (Anonymous Class)]]에서는 이름을 붙이지 않고 기본 클래스를 구현하는 방법을 설명한다. 이는 종종 명명된 클래스보다 더 간결하지만, 하나의 메서드만을 가진 클래스의 경우에는 익명 클래스조차도 다소 과도하고 번거롭게 느껴질 수 있다. 람다 표현식은 이러한 단일 메서드 클래스를 더욱 간결하게 표현할 수 있게 해준다.
## 1.2. [[함수형 인터페이스]]

- 람다는 오직 **함수형 인터페이스**를 구현하는 익명 클래스만 대체 가능

```java
// 기존 방식
Runnable run = new Runnable() {
    public void run() {
        System.out.println("Hello");
    }
};

// 람다식 방식
Runnable run = () -> System.out.println("Hello");
```

### 1.2.1. 함수형 인터페이스 예시
| 인터페이스명             | 설명                                 |
| ------------------ | ---------------------------------- |
| Runnable           | 매개변수 없고 반환값 없음                     |
| Callable<T>        | 반환값이 있는 작업 처리                      |
| [[Comparator]]<T>  | 정렬 기준 제공 (외부 정렬 기준 정의)             |
| [[Comparable]]<T>  | 객체 자체의 정렬 기준 정의 (`compareTo()` 구현) |
| [[Function]]<T, R> | T → R 변환                           |
| Consumer<T>        | 소비형 연산 (반환 없음)                     |
| Supplier<T>        | 공급형 연산 (매개변수 없음)                   |

### 1.2.2. 람다식을 위한 함수형 인터페이스 구현 흐름
#### 1단계) 원형 - [[익명 클래스 (Anonymous Class)]]
```java
Function<Integer, Integer> square = new Function<Integer, Integer>() {
    @Override
    public Integer apply(Integer x) {
        return x * x;
    }
};
```

#### 2단계) 람다 도입 - new 인터페이스 생략
```java
Function<Integer, Integer> square = (Integer x) -> {
	return x *x;
};
```
- 함수형 인터페이스는 메서드가 유일하므로 메서드 명도 불필요
#### 3단계) `return` + 중괄호 생략
``` java
Fuction<Integer, Integer> square = (Integer x) -> x * x;
```
- 실행문이 여러줄인 경우 생략 불가
#### 4단계) 매개변수 타입 생략
``` java
Function<Integer, Integer> square = (x) -> x * x;
```
- 타입추론(Contextual Type)이 불가한 경우 커마일 에러 발생
***
# 3. [[Stream API]]와 람다식

## 3.1. map(Function<T, R>)
- Object Mapping
- 기존 요소 `T`를 변형하여 새로운 요소 `R`로 변환
- 반환되는 스트림의 타입은 `R`의 생성자를 통해 생성됨
```java
List<EmployeeDTO> dtos = employees.stream()
	//기존요소 emp -> 새로운 요소 EmployeeDTO emp
    .map(emp -> new EmployeeDTO(emp))
    .collect(Collectors.toList());
```

## 3.2. 기타 주요 메서드
| 메서드                    | 설명              |
| ---------------------- | --------------- |
| filter(Predicate<T>)   | 조건에 맞는 요소 필터링   |
| forEach(Consumer<T>)   | 각 요소에 대해 실행문 수행 |
| reduce(BinaryOperator) | 누적 연산 수행        |


***
# 4. 예시

## 4.1. String → Integer
```java
List<String> strings = List.of("1", "2", "3");
List<Integer> ints = strings.stream()
    .map(s -> Integer.parseInt(s))
    .collect(Collectors.toList());
```

## 4.2. Employee → DTO
```java
List<EmployeeDTO> dtos = employees.stream()
    .map(emp -> new EmployeeDTO(emp))
    .collect(Collectors.toList());
```
***
