
## 1. 함수형 인터페이스 계열

| 인터페이스명     | 설명                                            | 계열 내 예시                                                                            |
|:-----------------|:------------------------------------------------|:----------------------------------------------------------------------------------------|
| Runnable         | 매개변수 없고 반환값 없음                       | Runnable                                                                                |
| Callable<T>      | 반환값이 있는 작업 처리                         | Callable<T>                                                                             |
| Comparator<T>    | 정렬 기준 제공 (외부 정렬 기준 정의)            | Comparator<T>, Comparator.comparing, thenComparing                                      |
| Comparable<T>    | 객체 자체의 정렬 기준 정의 (`compareTo()` 구현) | Comparable<T>                                                                           |
| Function<T, R>   | T → R 변환                                      | Function, BiFunction, UnaryOperator, BinaryOperator, IntFunction                        |
| Consumer<T>      | 소비형 연산 (반환 없음)                         | Consumer, BiConsumer, IntConsumer, LongConsumer, DoubleConsumer                         |
| Supplier<T>      | 공급형 연산 (매개변수 없음)                     | Supplier, BooleanSupplier, IntSupplier, LongSupplier, DoubleSupplier                    |
| Predicate<T>     | 조건 판별용 boolean 반환                        | Predicate, BiPredicate, IntPredicate, LongPredicate, DoublePredicate                    |
| Operator 계열    | 입력과 반환이 같은 변환 연산자                  | UnaryOperator, BinaryOperator, IntUnaryOperator, LongUnaryOperator, DoubleUnaryOperator |
| ToXxxFunction    | 입력 → 원시 타입 반환                           | ToIntFunction, ToLongFunction, ToDoubleFunction                                         |
| XxxToYyyFunction | 원시 타입 입력 → 반환                           | IntToLongFunction, IntToDoubleFunction, LongToIntFunction 등                            |
| ObjXxxConsumer   | 객체 + 원시타입 소비                            | ObjIntConsumer<T>, ObjLongConsumer<T>, ObjDoubleConsumer<T>                             |
## 2. Function로 인터페이스 우회표현

| 원 인터페이스        | Function 계열로 표현        |
| -------------- | ---------------------- |
| `Predicate<T>` | `Function<T, Boolean>` |
| `Consumer<T>`  | `Function<T, Void>`    |
| `Supplier<T>`  | `Function<Void, T>`    |
| `Runnable`     | `Function<Void, Void>` |

```java
// Predicate → Function 예시
Function<String, Boolean> isEmpty = str -> str.isEmpty();

// Supplier → Function 예시 (권장 X)
Function<Void, String> getName = v -> "ChatGPT";

// Consumer → Function 예시 (권장 X)
Function<String, Void> printer = s -> {
    System.out.println(s);
    return null;
};
```

---

## 3. Function 계열이 표현할 수 없는 함수형 인터페이스 조건

| 표현 불가한 경우 | 설명 | 대안 인터페이스 |
|------------------|------|------------------|
| 입력 없음         | Function은 최소 1개의 입력 필요 | `Supplier<T>`, `Runnable` |
| 반환 없음         | Function은 반드시 반환값을 요구 | `Consumer<T>`, `Runnable` |
| 입력/출력 없음    | Function은 입력과 반환이 있어야 함 | `Runnable` |
| 표현은 가능하나 의미 부적절 | Boolean 반환 등은 Function으로 가능하지만 의미 혼란 | `Predicate<T>`, `Supplier<T>`, `Consumer<T>` 등 |

---

## 4. Function 계열이 타 계열을 표현할 수 있는 조건

> Function 계열이 다른 함수형 인터페이스를 표현하려면 아래 조건을 **모두** 만족해야 함:


1. **입력값이 1개 혹은 2개 (BiFunction 활용)**  
2. **반드시 반환값이 존재해야 함 (`void` 불가)**  
---

#### Ex) 조건 만족 여부 요약

| 인터페이스              | Function 계열로 표현 가능? | 이유           |
| ------------------ | ------------------- | ------------ |
| `Predicate<T>`     | ✅ (표현 가능)           | 의미상 분리 필요    |
| `Consumer<T>`      | ⚠️ (억지 가능)          | 반환 없으므로 부적절  |
| `Supplier<T>`      | ⚠️ (Void 인자 필요)     | 비권장          |
| `Runnable`         | ❌                   | 입력/반환 모두 없음  |
| `BiConsumer<T, U>` | ❌                   | 반환 없고, 입력 2개 |
| `BooleanSupplier`  | ❌                   | 입력 없음        |

---


> Function 계열은 **가장 범용적인 함수형 인터페이스**지만,  
  **모든 함수형 구조를 표현할 수는 없다.**

>특히 **입력이 없거나 반환이 없는 구조**는 Function 계열로 표현할 수 없으며,  
  의미상도, 사용성 면에서도 **대체보다는 분리된 인터페이스 사용이 바람직**하다.