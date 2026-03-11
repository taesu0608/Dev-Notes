
# [[EOF]](End Of File)

- 데이터 소스로부터 더이상 읽을 수 있는 데이터가 없는 상태
---
## 1. [[Scanner]]
```java
// hasNext()를 통하여 파일 EOF를 판단한다.
Scanner sc = new Scanner(System.in);

while (sc.hasNextLine()) {
    sc.nextLine();
}

while (sc.hasNext()) {
    sc.next();
}
```
-  `hasNext()` 또는 `hasNextLine()`을 통해 EOF를 판단한다.
- 내부적을 정규 표현식을 사용해 불변 객체인`String`을 생성하므로, 파싱이 유연하지만 성능은 떨어진다.
---
## 2. [[BufferedReader]]

```java

BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
String input = "";

// 1. EOF만 판단
while ((input = br.readLine()) != null) { }

// 2. EOF + 공백 입력까지 제외
while ((input = br.readLine()) != null && !input.isEmpty()) { }

// 3. 빈 문자열이면 종료 (주의: null일 경우 NPE 발생 가능)
while (!(input = br.readLine()).equals("")) { }
```
- `EOF` 도달시 `readLine()`이 `null`을 반환
-  내부적으로 가변적인 `char[]` 버퍼를 사용하여 **데이터를 효율적으로 처리**하므로,  메모리 효율성과 속도 측면에서 Scanner보다 우수하다.

---

**[[File]] Handling**
- EOF(End of File) 상태에 도달하면 `null`이 반환된다.

**[[Standard Input]] Handling**
- EOF 상태에 도달시 `null`이 반환된다.
- 하지만 사용자의 입력이 멈춘 상황에서는 EOF와 단순 엔터 입력을 구분할 기준이 필요하다.

표준 입력 종료 판단 방법

|방식|설명|주의사항|
|---|---|---|
|`isEmpty()`|입력된 문자열이 공백인지 판단|-|
|`equals("")`|입력이 빈 문자열인지 판단|`null`일 경우 NPE 발생 가능|
