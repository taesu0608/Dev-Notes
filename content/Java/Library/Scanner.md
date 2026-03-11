
***
# 1. Scanner
## 1.1. 정의

- A simple text scanner which can parse primitive types and strings using regular expressions.
	- 원시 타입 parshing
	- [[정규표현식 (Regular Expression, Regex)]] 사용
## 1.2. 목적

***
# 2. 특징

## 2.1. next() 메서드

| 메서드             | 반환 타입     | 설명                                           |
| --------------- | --------- | -------------------------------------------- |
| `next()`        | `String`  | 공백 기준으로 한 단어를 읽음. 공백 전까지의 문자열 반환.            |
| `nextLine()`    | `String`  | 한 줄 전체를 읽어서 문자열로 반환. 개행 문자까지 포함하여 종료.        |
| `nextInt()`     | `int`     | 다음 토큰을 정수(`int`)로 읽음.                        |
| `nextLong()`    | `long`    | 다음 토큰을 `long` 타입으로 읽음.                       |
| `nextDouble()`  | `double`  | 다음 토큰을 `double` 타입으로 읽음.                     |
| `nextFloat()`   | `float`   | 다음 토큰을 `float` 타입으로 읽음.                      |
| `nextBoolean()` | `boolean` | 다음 토큰을 `boolean` 타입으로 읽음 (`true` / `false`). |
| `nextShort()`   | `short`   | 다음 토큰을 `short` 타입으로 읽음.                      |
| `nextByte()`    | `byte`    | 다음 토큰을 `byte` 타입으로 읽음.                       |

###### Q) 나의 질문
###### A) 답변

***
# 3. CF
[[Cf) Scanner와 BufferedReader]]