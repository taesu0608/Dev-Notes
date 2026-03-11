# 1. 메서드 참조 (Method Reference)

- 메소드를 참조하여, (1) 매개변수 정보, (2) 리턴 타입을 확인하여 선언시 생략하는 것
#### Ex) Math 클래스의 max()
``` java
(x, y) -> Math.max(x, y)
```
- (x, y) 중복
```java
Math::max;
```


### Cf) 메서드 참조를 변수에 담는 방법
- 메서드 참조는 **매개변수의 타입, 개수, 반환형**에 따라 대응되는 **함수형 인터페이스의 [[시그니처 (Signature)]]** 와 일치해야 함
#### 1. 매개변수 → 반환값 (입력 1개)

| 인터페이스                 | 시그니처          | 예시                  | 설명            |
| --------------------- | ------------- | ------------------- | ------------- |
| `Function<T, R>`      | `T -> R`      | `String::length`    | 문자열을 받아 길이 반환 |
| `ToIntFunction<T>`    | `T -> int`    | `String::length`    | 기본형 반환        |
| `ToLongFunction<T>`   | `T -> long`   | `MyObj::getId`      |               |
| `ToDoubleFunction<T>` | `T -> double` | `Product::getPrice` |               |
#### 2. 입력 2개 → 반환값

| 인터페이스                   | 시그니처            | 예시                            |
| ----------------------- | --------------- | ----------------------------- |
| `BiFunction<T, U, R>`   | `(T, U) -> R`   | `String::concat`, `Math::pow` |
| `ToIntBiFunction<T, U>` | `(T, U) -> int` | 직접 정의 필요 (JDK에는 없음)           |
#### 3. 입력 → boolean (조건 판단)

| 인터페이스               | 시그니처                | 예시                |
| ------------------- | ------------------- | ----------------- |
| `Predicate<T>`      | `T -> boolean`      | `String::isEmpty` |
| `BiPredicate<T, U>` | `(T, U) -> boolean` | `Objects::equals` |
####  4. 입력만 있고 반환값 없음

| 인터페이스              | 시그니처             | 예시                    |
| ------------------ | ---------------- | --------------------- |
| `Consumer<T>`      | `T -> void`      | `System.out::println` |
| `BiConsumer<T, U>` | `(T, U) -> void` | `Map::put`            |
####  5. 매개변수 없음 → 반환값

| 인터페이스         | 시그니처      | 예시                                   |
| ------------- | --------- | ------------------------------------ |
| `Supplier<T>` | `() -> T` | `LocalDate::now`, `UUID::randomUUID` |
####  6. 기본형 특화 (입력, 출력 모두 기본형)

| 인터페이스                  | 시그니처                         | 예시                       |
| ---------------------- | ---------------------------- | ------------------------ |
| `IntUnaryOperator`     | `int -> int`                 | `Math::abs`              |
| `IntBinaryOperator`    | `(int, int) -> int`          | `Math::min`, `Math::max` |
| `DoubleUnaryOperator`  | `double -> double`           | `Math::sqrt`             |
| `DoubleBinaryOperator` | `(double, double) -> double` | `Math::pow`              |

# 2. 특징

## 2.1. 메소드 참조 문법 조건
- 1) 함수형 인터페이스의 매개변수 타입 == 메소드의 매개변수 타입
- 2) 함수형 인터페이스의 매개변수 개수 == 메소드의 매개변수 개수
- 3) 함수형 인터페이스의 반환 타입 == 메소드의 반환타입