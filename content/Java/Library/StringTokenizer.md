***
# 1. StringTokenizer

## 1.1. 정의 

- The string tokenizer class allows an application to break a string into tokens. The tokenization method is much simpler than the one used by the `StreamTokenizer` class. The `StringTokenizer` methods do not distinguish among identifiers, numbers, and quoted strings, nor do they recognize and skip comments.
	- 식별자(identifiers), 숫자(number), 따옴표(quoted string) 를 구분하지 않음
	- 주석 또한 인식하거나 skip하지 않음
- An instance of `StringTokenizer` behaves in one of two ways, depending on whether it was created with the `returnDelims` flag having the value `true` or `false`:
	- If the flag is `false`, delimiter characters serve to separate tokens. A token is a maximal sequence of consecutive characters that are not delimiters.
	- If the flag is `true`, delimiter characters are themselves considered to be tokens. A token is thus either one delimiter character, or a maximal sequence of consecutive characters that are not delimiters.

## 1.2. 목적

- 구분자로 나뉜 문자열을 반복적으로 탐색하거나 분할할 때 유용하게 사용됨

***
# 2. 특징

## 2.1. 생성자
- 기본 생성자
	`StringTokenizer st = new StringTokenizer(String 문자열);`
- 전체 생성자
- 
## 2.1. 주요 메서드

| 메서드               | 반환타입    | 설명                           |
| ----------------- | ------- | ---------------------------- |
| `hasMoreTokens()` | boolean | 남은 토큰이 있는지 확인 (`boolean` 반환) |
| `nextToken()`     | String  | 다음 토큰을 반환                    |
| `countTokens()`   | int     | 남은 토큰의 개수를 반환                |

## 2.2. 기본 구분자
|문자|설명|
|---|---|
|`' '` (space)|공백|
|`'\t'`|탭|
|`'\n'`|줄바꿈 (LF)|
|`'\r'`|캐리지 리턴 (CR)|
|`'\f'`|폼 피드 (페이지 나눔)|
- `split()`과 다르게 [[정규표현식 (Regular Expression, Regex)]]을 지원하지 않음  
- 구분자를 연속적으로 사용하는 경우, 빈 문자열은 토큰으로 처리되지 않음  
- [[Enumeration]] 스타일로 동작 ([[Iterator Pattern]] 아님)

## 2.3. Q&A

### Q) `StringTokenizer`와 `split()`의 차이점은?  
###### A) `split()`은 정규표현식을 사용할 수 있고 배열로 결과를 반환하지만, `StringTokenizer`는 반복자처럼 하나씩 토큰을 꺼내는 방식이다. 또한 `split()`은 빈 문자열도 토큰으로 취급할 수 있다.

### Q) `Enumeration`와 `Iterator`의 차이점은?  
###### A) Enumeration은 내부적으로 snapshot(Deep copy) 수행, Iterator는 그렇지 않음 따라서 Enumeration은 thread 환경이 부적합하다.

| 항목       | `Enumeration` (`StringTokenizer`)                                      | `Iterator`                        |
| -------- | ---------------------------------------------------------------------- | --------------------------------- |
| 메서드      | `hasMoreElements()`, `nextElement()`→ `hasMoreTokens()`, `nextToken()` | `hasNext()`, `next()`, `remove()` |
| 사용 가능 여부 | `for-each` 불가                                                          | `for-each` 가능                     |
| Java 버전  | Java 1.0                                                               | Java 1.2 이상                       |
| 변경 가능성   | 요소 제거 불가                                                               | `remove()`로 제거 가능 (optional)      |


***
# 3. CF

- cf) Java 1.4 이후에는 `String.split()` 사용이 더 권장되며, `StringTokenizer`는 레거시(legacy) 클래스 취급을 받는다.
- cf) 반복적으로 탐색할 필요가 없다면 `split()`이 간편하고 유연함
- [[ Cf) String.split 과 StringTokenizer]]