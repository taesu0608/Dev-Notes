
***
# 1. BufferedWriter
## 1.1. 정의

- Writes text to a character-output stream, buffering characters so as to provide for the efficient writing of single characters, arrays, and strings.
	-  한 글자(char), 배열(char[]), 한 줄(String) 단위로 씀
	- [[Buffer]]를 사용
	- 문자 기반 출력 스트림

## 1.2. 목적

***
# 2. 특징

## 2.1. 메서드

| 메서드                                            | 반환 타입    | 설명                                  |
| ---------------------------------------------- | -------- | ----------------------------------- |
| `close()`                                      | `void`   | 스트림을 닫고 버퍼에 남아 있는 데이터를 모두 출력합니다     |
| `flush()`                                      | `void`   | 버퍼에 있는 내용을 강제로 출력합니다                |
| `newLine()`                                    | `void`   | 새 줄을 추가합니다 (`\n` 또는 시스템 줄바꿈)        |
| `write(int c)`                                 | `void`   | 하나의 문자를 씁니다                         |
| `write(char[] cbuf, int off, int len)`         | `void`   | 문자 배열에서 일부 문자를 씁니다                  |
| `write(String s, int off, int len)`            | `void`   | 문자열에서 일부 문자를 씁니다                    |
| `write(char[] cbuf)`                           | `void`   | 문자 배열 전체를 씁니다                       |
| `write(String s)`                              | `void`   | 문자열 전체를 씁니다                         |
| `append(char c)`                               | `Writer` | 문자를 추가합니다 (`Writer` 반환)             |
| `append(CharSequence csq)`                     | `Writer` | `CharSequence`를 추가합니다 (`Writer` 반환) |
| `append(CharSequence csq, int start, int end)` | `Writer` | `CharSequence`의 일부분을 추가합니다          |

### Q) 나의 질문
### A) 답변

***
# 3. CF
