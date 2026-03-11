
# 1. StringBuilder

## 1.1. 정의

`StringBuilder`는 `java.lang` 패키지에 포함된 클래스이며, 문자열을 효율적으로 조작할 수 있도록 설계된 **가변(mutable)** 문자열 클래스이다.  
`String` 클래스는 **불변(immutable)** 특성을 가지므로, 문자열을 변경할 때마다 새로운 객체가 생성된다. 반면 `StringBuilder`는 내부 버퍼를 수정하여 문자열을 직접 변경하므로, **문자열 추가/수정/삭제가 빈번한 상황에서 성능상 유리**하다.

---

# 2. 특징

- 문자열을 직접 조작할 수 있는 **가변 클래스**
- `String`보다 **메모리와 성능 면에서 효율적**
- **단일 스레드 환경**에서 사용 권장  
  → 멀티스레드 환경에서는 동기화된 `StringBuffer` 사용 권장

## 2.1. 주요 메서드 정리

| 메서드                                       | 설명                            | 예시                               |
| ----------------------------------------- | ----------------------------- | -------------------------------- |
| `append(String str)`                      | 문자열 끝에 문자열 추가                 | `sb.append("Hello");`            |
| `insert(int offset, String str)`          | 지정 위치에 문자열 삽입                 | `sb.insert(5, "World");`         |
| `delete(int start, int end)`              | 지정 범위(start 이상, end 미만) 삭제    | `sb.delete(5, 10);`              |
| `deleteCharAt(int index)`                 | 지정 인덱스 문자 삭제                  | `sb.deleteCharAt(3);`            |
| `replace(int start, int end, String str)` | 범위 내 문자열을 새 문자열로 교체           | `sb.replace(0, 5, "Hi");`        |
| `reverse()`                               | 문자열 뒤집기                       | `sb.reverse();`                  |
| `toString()`                              | `StringBuilder` → `String` 변환 | `String result = sb.toString();` |
| `capacity()`                              | 현재 버퍼 용량 반환                   | `sb.capacity();`                 |
| `ensureCapacity(int minimumCapacity)`     | 최소 용량 확보                      | `sb.ensureCapacity(100);`        |
| `setLength(int newLength)`                | 문자열 길이 설정                     | `sb.setLength(3);`               |
| `charAt(int index)`                       | 특정 문자 반환                      | `sb.charAt(2);`                  |
| `setCharAt(int index, char ch)`           | 특정 문자 변경                      | `sb.setCharAt(0, 'Y');`          |

## 2.3. Q&A
### Q) StringBuilder 객체를 String으로 변환 시, toString()과 String.valueOf() 중 무엇이 더 나은가?
###### A) String.valueOf() = toString() + null 체크
- String.valueOf()가 내부적으로 toString을 출력을 하여 대부분의 경우 toString() 사용이 유리하다.

---
# 3. CF


---

## 예제 코드

```java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");          // "Hello World"
sb.insert(5, ",");            // "Hello, World"
sb.replace(0, 5, "Hi");       // "Hi, World"
sb.delete(3, 6);              // "Hi World"
String result = sb.toString(); // "Hi World"
```
