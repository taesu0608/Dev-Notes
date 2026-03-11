
| 구분    | A.class   | new A()  |
| ----- | --------- | -------- |
| 정체    | Class 객체  | 인스턴스 객체  |
| 타입    | Class     | A        |
| 개수    | 클래스당 1개   | 생성한 만큼   |
| 역할    | 메타데이터 관리  | 실제 로직 수행 |
| 생성 주체 | JVM       | 개발자(new) |
| 메모리   | Metaspace | Heap     |
## 1. 클래스 객체
```java
Class<?> c = A.class;
```

## 2. 인스턴스 객체
```java
A a = new A();
```