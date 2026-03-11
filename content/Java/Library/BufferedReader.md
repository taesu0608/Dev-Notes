
***
# 1. BufferedReader
## 1.1. 정의  

- Reads text from a character-input stream, buffering characters so as to provide for the efficient reading of characters, arrays, and lines.
	- 한 글자(char), 배열(char[]), 한 줄(String) 단위로 읽음
	- [[Buffer]]를 사용
	- 문자 기반 입력 스트림(Reader)

## 1.2. 목적  
- 반복적인 입출력 동작에서 성능 저하를 막기 위해 버퍼링을 활용해 효율적으로 문자 데이터를 읽는다.  
- 대량의 데이터를 읽을 때 성능 향상을 꾀할 수 있다.

***
# 2. 특징

## 2.1. readLine()

- 줄바꿈 문자(`\n`)를 기준으로 한 줄 전체를 읽는다. 
	- **개행문자**를 제거한 문자열 `return`
- 읽은 문자열은 `StringTokenizer`나 `String.split()` 등을 활용해 토큰 단위로 분리할 수 있다.  
- 반환 타입은 **String**으로 고정되어 있어 필요한 경우 **타입 변환이 필요하다.**  
- 예외 처리 필수: `try/catch` 또는 `throws IOException`을 사용해야 한다.

## 2.2. 초기화

```java
//BufferReader 초기화
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
```

## 2.3. 메서드


| 메서드                                   | 반환 타입            | 설명                                            |
| ------------------------------------- | ---------------- | --------------------------------------------- |
| `close()`                             | `void`           | 스트림을 닫고 내부 버퍼를 비운다. 명시적으로 호출하는 것이 권장된다.       |
| `lines()`                             | `Stream<String>` | 라인 단위로 처리할 수 있는 스트림을 반환한다.                    |
| `mark(int readAheadLimit)`            | `void`           | 현재 스트림의 위치를 마크하여 이후 `reset()`으로 되돌릴 수 있도록 한다. |
| `markSupported()`                     | `boolean`        | 현재 스트림이 `mark()` 기능을 지원하는지 여부를 반환한다.          |
| `read()`                              | `int`            | 한 문자를 읽고 해당 문자의 정수값(Unicode)을 반환한다.           |
| `read(char[] cbuf, int off, int len)` | `int`            | `cbuf` 배열의 `off`부터 `len` 길이만큼 문자를 읽는다.        |
| `readLine()`                          | `String`         | 한 줄을 읽고 문자열로 반환한다. 줄바꿈 문자는 포함하지 않는다.          |
| `ready()`                             | `boolean`        | 스트림이 입력을 읽을 준비가 되어 있는지를 반환한다.                 |
| `reset()`                             | `void`           | 가장 최근 마크된 위치로 스트림을 되돌린다.                      |
| `skip(long n)`                        | `long`           | 입력 스트림에서 `n`개의 문자를 건너뛴다.                      |

- Java에서는 가비지 컬렉터(Garbage Collector)가 자원을 회수하긴 하지만,  
  **close()를 명시적으로 호출하지 않으면 리소스가 오랫동안 점유될 수 있다.**  
  → 가능한 한 `close()`를 호출하여 리소스를 명확히 해제하는 것이 바람직하다.

### Q) `off`번째 문자부터 읽는 `read(char[] cbuf, int off, int len)`의 연산 과정은 어떻게 되나요?  
###### A) 배열 `cbuf`의 `off` 인덱스부터 최대 `len` 개수만큼 데이터를 읽어들인다. 버퍼 내부에 읽을 데이터가 충분하지 않을 경우, 읽은 문자 수는 `len`보다 작을 수 있으며, 실제 읽은 개수가 반환된다.

***
# 3. CF

- [[Cf) Scanner와 BufferedReader]]