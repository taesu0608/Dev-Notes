## 1.1. 정의
- JDK 1.0
- java.util.String
- `String`은 **문자열을 표현하는 클래스**로, Java에서 가장 널리 사용되는 참조형 타입
- 내부적으로 문자 배열(char[])을 기반으로 구현됨
- **불변(immutable)**: 한 번 생성된 문자열은 변경 불가

## 1.2. 목적
- **문자열 저장 및 조작**: 문자들의 연속된 집합을 다루는 데 최적화된 기능 제공
- **일관된 동작 보장**: 불변 특성을 통해 스레드 간 안전성과 캐싱 최적화 가능
- **풍부한 내장 메서드**: 탐색, 수정, 분리, 치환 등의 기능 제공

---

# 2. 특징

## 2.1. 불변(Immutable)
- **정의**: 문자열 객체를 한 번 생성하면 내부 값이 절대 바뀌지 않음
- **목적**: 보안성, 스레드 안정성, 해시코드 캐싱 등의 이점
- **수정 시**: 항상 **새로운 문자열 객체**를 반환함

```java
String str = "hello";
str = str.replace("h", "j"); // 원본 "hello"는 변경되지 않음
System.out.println(str); // "jello"
```
![[Pasted image 20250727180344.png]]

## 2.2. 초기화

| 생성 방법   | 예시                              | 특징                  |
| ------- | ------------------------------- | ------------------- |
| 리터럴     | `String s = "abc";`             | JVM이 상수 풀에 저장, 재사용됨 |
| new 연산자 | `String s = new String("abc");` | 항상 새로운 객체 생성        |

## 2.3. 주요 메서드
| 메서드                                                            | 설명                  | 예시                                             |
| -------------------------------------------------------------- | ------------------- | ---------------------------------------------- |
| `charAt(int index)`                                            | 특정 인덱스의 문자 반환       | `"abc".charAt(1)` → `'b'`                      |
| `substring(int, int)`                                          | 부분 문자열 반환           | `"abc".substring(0, 2)` → `"ab"`               |
| `length()`                                                     | 문자열 길이 반환           | `"abc".length()` → `3`                         |
| `equals(Object)`                                               | 문자열 내용 비교           | `"a".equals("a")` → `true`                     |
| `indexOf(String)`                                              | 특정 문자/문자열 위치 반환     | `"hello".indexOf("e")` → `1`                   |
| `replace(String, String)`                                      | 문자열 치환              | `"abc".replace("a", "z")` → `"zbc"`            |
| `toCharArray()`                                                | 문자열을 `char[]`로 변환   | `"abc".toCharArray()` → `['a','b','c']`        |
| `getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin)` | 지정 범위를 `char[]`로 복사 | `"hello".getChars(0, 2, buf, 0)` → `['h','e']` |
## 2.4. String 정규식 관련 메서드
| 메서드 | 설명 | 예시 |
|---|---|---|
| `matches(String regex)` | 문자열 전체가 정규식 패턴과 일치하는지 검사 | `"123".matches("\\d+")` → `true` |
| `replaceAll(String regex, String replacement)` | 정규식 패턴에 일치하는 모든 문자열을 치환 | `"a1b2".replaceAll("\\d", "")` → `"ab"` |
| `replaceFirst(String regex, String replacement)` | 정규식 패턴에 일치하는 첫 번째 문자열만 치환 | `"a1b2".replaceFirst("\\d", "")` → `"ab2"` |
| `split(String regex)` | 정규식을 기준으로 문자열을 분리하여 배열 반환 | `"a,b,c".split(",")` → `["a","b","c"]` |

---

# 3. 메서드

## 3.2. substring()
```java
public String substring(int startIndex)
public String substring(int startIndex, int endIndex)
```
- `substring(3)`: `index(3)`부터 마지막 문자까지
- `substring(3,5)`: `index(3)`부터 `index(5)` 이전까지
	- 즉, index 3과 4 범위의 문자를 포함

### Cf) 많은 프로그래밍 개념에서 **시작은 포함, 끝은 미포함** 하는 경우가 많음

## 3.3. length()
```java
public int length(){
	return value.length; // java 8 이전
	return value.length >> coder; // java 9 + Compact String 적용 이후
}
```
-  java 8
	- `value`: `private final char[] value;`
- java 9
	- `value`: `private final char[] byte;`
	- `>>`:  오른쪽 Shift 연산
		- 수를 반으로 나눔
	- `coder`: `value`가 취급하는 자료형의 종류, 인코딩에 따라 `coder`의 수가 정해짐
		- Ex) 숫자일 경우 coder = 0, 영어일 경우 coder = 0, 한글일 경우 coder = 1
[[Cf) Differences between  length, length() and size()]]
### 3.3.1. String 내부 저장 방식

| coder 값 | 인코딩    | 설명                      |
| ------- | ------ | ----------------------- |
| `0`     | LATIN1 | 1바이트 문자 (영어, 숫자, 기호)    |
| `1`     | UTF16  | 2바이트 문자 (한글, 한자, 이모지 등) |

## 3.4. matches()
### 3.4.1. String.mathces() 정의
```java
public boolean matches(String regex) {  
	return Pattern.matches(regex, this);  
}
```
### 3.4.2. Pattern.matches() 정의
```java
public static boolean matches(String regex, CharSequence input) {  
	Pattern p = compile(regex);  
	Matcher m = p.matcher(input);  
	return m.matches();  
}
```

---
# 4. CF

## 3.1. String vs StringBuilder vs StringBuffer

| 항목       | `String`     | `StringBuilder` | `StringBuffer`    |
| -------- | ------------ | --------------- | ----------------- |
| 변경 가능 여부 | 불변           | 가변              | 가변                |
| 쓰레드 안전성  | 안전           | ❌               | ✅                 |
| 성능       | 느림 (매번 새 객체) | 빠름              | 상대적으로 느림          |
| 사용 예     | 일반 문자열 처리    | 단일 스레드에서 문자열 조작 | 멀티스레드 환경에서 문자열 조작 |

## 3.2. 참고
- [[Cf) new String() vs 리터럴 비교]]
- [[Cf) Different between toString() and String.valueOf()]]