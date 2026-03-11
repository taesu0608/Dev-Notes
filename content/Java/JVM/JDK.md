
- Java Development Kit

| 출시 연도 | 버전            | 주요 추가 기능                                                                                                |
| ----- | ------------- | ------------------------------------------------------------------------------------------------------- |
| 1996  | JDK 1.0       | 자바 최초 버전, 기본 API (`java.lang`, `java.util` 등)                                                           |
| 1998  | JDK 1.2       | 컬렉션 프레임워크, Swing, JIT 컴파일러                                                                              |
| 2000  | JDK 1.3       | Java Sound, HotSpot VM 통합                                                                               |
| 2002  | JDK 1.4       | `assert`, NIO, XML 처리 API                                                                               |
| 2004  | JDK 5.0 (1.5) | **Generics**, **Enum**, **Annotations**, **for-each**, **autoboxing**                                   |
| 2006  | JDK 6.0       | 웹서비스 API, 스크립팅(JavaScript), 성능 향상                                                                       |
| 2011  | JDK 7.0       | `try-with-resources`, NIO.2, `diamond operator (<>)`, `switch`문에서 String 지원                             |
| 2014  | JDK 8.0       | **[[람다식 (Lambda Expression)]]**, **[[Stream API]]**, **[[Optional]]**, `java.time` 패키지, **Default 메서드** |
| 2017  | JDK 9.0       | **모듈 시스템 (JPMS)**, JShell(REPL), 개선된 GC                                                                 |
| 2018  | JDK 10.0      | **`var` 키워드 (지역 변수 타입 추론)**                                                                             |
| 2018  | JDK 11.0      | **LTS 버전**, `HttpClient`, 문자열 개선, `var` in lambda                                                       |
| 2019  | JDK 12.0      | Switch Expressions (프리뷰), Shenandoah GC                                                                 |
| 2019  | JDK 13.0      | 텍스트 블록 (프리뷰), 동적 CDS                                                                                    |
| 2020  | JDK 14.0      | `record` 클래스(프리뷰), `instanceof` 개선                                                                      |
| 2020  | JDK 15.0      | `sealed class` (프리뷰), ZGC 정식화                                                                           |
| 2021  | JDK 16.0      | `record` 정식화, 패턴 매칭                                                                                     |
| 2021  | JDK 17.0      | **LTS 버전**, `sealed class` 정식화, 새로운 macOS 렌더링                                                           |
| 2022  | JDK 18.0      | `UTF-8` 기본 인코딩, Simple Web Server                                                                       |
| 2022  | JDK 19.0      | Virtual Threads (프리뷰), Structured Concurrency (프리뷰)                                                     |
| 2023  | JDK 20.0      | Virtual Threads 개선, Record Patterns (프리뷰)                                                               |
| 2023  | JDK 21.0      | **LTS 버전**, **Virtual Threads 정식화**, String Templates, Pattern Matching                                 |
# JDK 8.0
## 인터페이스의 default method와 static method가 추가됨
- [[Interface]] 확인 요망
### Cf) 왜 default method를 추가했는가
> 람다표현식은 추상메서드를 단 하나만 가지는 인터페이스를 기준으로 설계가 됨
> 람다표현식이 추상메서드를 하나만 가지는 인터페이스가 조건인 이유는 익명클래스의 익명메서드를 간략히 표현하고자 하는 것이 람다 표현식의 목적이기에
> 두 개의 추상메서드 존재시 람다식에서 구분히 불가해짐
> 하지만, 이 후 각 인터페이스의 부가기능의 메서드의 선언이 필요해짐
> 따라서 보수적인 업데이트의 목적으로 기존재하는 예약어인 default를 통해 익명메서드와 부가메서드를 구분할 수 있게하여 람다식의 충돌을 방지하고 활용성을 높임

**접근지정자 default와 구분할 것!**
### Cf) 왜 static mothod를 추가했는가
> static 메서드 부재시 해당 인터페이스가 아닌 다른 클래스에 해당 인터페이스와 특정 메서드를 선언해야 했음
> 이는 기능의 응집성을 떨어뜨리는 결과를 초래함
> 따라서 인터페이스 내 static method를 허용하므로써 인터페이스 내  부가기능을 허용함

### Cf) 인터페이스 내 default와 static 설계는 어떠한 기준으로 해야될까?
> 인스턴스에 따라 해당 기능이 달라질 수 있으면 default
> 공통적인 기능을 제공시 static 사용


# JDK 9.0
### Cf) 인터페이스에 왜 `private` 메서드가 도입됐는가
> 일반 클래스의 메서드 내부 중복 제거를 위해 private 메서드가 사용되곤 했음

> 이 목적을 위해 interface에도 private 메서드가 구현가능하게 업데이트 됨