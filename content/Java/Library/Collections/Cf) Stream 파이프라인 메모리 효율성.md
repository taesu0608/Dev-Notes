- https://medium.com/@kuldeep_singh739/mastering-java-stream-pipelines-and-operations-a-memory-hack-for-effortless-learning-24edb0b35994
#### Stream Pipelines and Operations
![[Pasted image 20250809162601.png]]

현대 자바 어플리케이션이 동작할때, 스트림 마스터링은 꽤 향상 시킬수 있다 너의 데이터를 효율적으로 핸들하는 능력을. 스트림들은 너가 큰 Collections 데이터들을 처리할수 있도록한다 선언적 방법 속에서. 그리고, 사용 가능한 풍부한 스트림 연산자과 함께, 그것은 떄때로 압도적이게 될 수 있다 모두 똑바로 유지하기 위해. 이 기사는 너가 걸을 수 있도록한다.
키 스트림 개념을 통해 간단한 hack과 함께 그들이 쉽게 기억하도록하기 위해 그리고 적용하기 위해 너의 코드에.

# Introduction to Stream Pipelines"
자바 스트림은 데이터 요소의 시퀀스이다 그리고 그것은 너가 연산자를 수행하도록한다. 그 연산자는 필터링, 매핑, 리듀싱, 깔끔하고 연속적이고 병렬적인 방법속에서. 어떤 스트림 프로세스의 핵심은 스트림파이프라인이다.

그리고 그것은 구성되어있다.
- 대상 (like a collection or an array)
- 중간 연산자 (한단계씩 데이터를 처리하기 위한)
- 최종 연산자 (최종 결과 생산을 위해)

기억법: 수도꼭지에서 물이 흐르는 것과 같은 파이프 라인을 생각해라, 다른 필터를 통과하는, 그리고 최종적으로 유리잔을 채운다.

## Stream Laziness: Why It's a Good Thing
스트림들은 느리다, 이것은 의미한다 fliter()나 맵과 같은 즉각적인 연산자는 실행될수 없다 때 까지 collect와 redue와 같은  최종연산자가 깨어날때까지 이 지연은 도울 수 있다 최적 수행능력을, 그 필요한 데이터만 처리되기 때문에

기억법: 상상해러 도미노라인을 - 아무것도 일어나지 않은 너가 가장 최근 것을 건들이기 전까지. 그 푸시는 최종연산자이다. 모든 동작을 설정하는

## Creating Streams
 - 몇몇의 방법이 있다 자바에서 스트림을 만들기 위한
. 사용 가능한 방법
1. `Stream.of(1,2,3)`
- 직접 스트림 객체 생성
```java
@SafeVarags
// 제네릭 타입을 안전하게 사용한다는 것을 컴파일러에게 알려줌
@SuppressWarnings("varargs")
// varargs 관련 경고를 무시하도록 지시하는 컴파일러 지시어
static <T> Stream<T> of(T... values) {
    return Arrays.stream(values);
}
```
2. `Arrays.stream(new int[]{1, 2, 3})`
- Array
2. `List.stream()` for collections
3. `Stream.generate(Math::random)` for infinite streams of random numbers
4. `Stream.iterate (0 , n -> n + 1)` for generationg sequences
5. `Files.lines(Paths.get("file txt"))` to process files as a streams