# 1. Function<T, R>
```java
Function<T, R>
```
- T: 입력 타입 (Input)
- R: 반환 타입 (Return)
- `T 객체`를 받아서 `R 객체` 리턴하는 함수


### Cf) 매개변수가 2개인 경우
```java
BiFunction<Integer, Integer, Integer> sum = (a,b) -> a + b;
```
- 매개변수 a, b
- 반환값: Integer