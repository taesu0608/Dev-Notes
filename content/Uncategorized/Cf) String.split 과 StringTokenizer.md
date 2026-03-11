1.String.split
- 구분자가 아닌 정규식을 통해 문자를 받는다.
1. split()
```java
public String[] split(String regex);

public String[] split(String regex, int limit);
```
- split 문자열 구분 동작 실패하면 `PatternSyntaxException` 예외 발생

2.구분자로 문자열 분리
```java
String str = "A@B@C@D@E";
String[] splitter = str.split("@");

Stinrg[] spliiter2 = str.split("@",3) // limit 사용
```

3.여러개 구분자로 문자열 분리
```java
String str = "hello-world%A@B#C"
String[] splitter = str.split("[%-@#]");

for (int i = -; i < spliiter.length; i++){
	System.out.printf("%d 위치 : %s\n", i, spliiter[i]);
}
```

4. 구분자 사용시 주의사항
-  split 메서드는 정규표현식을 매개변수로 받기 때문에, 정규식으로 이미 약속된 기호를 그냥 사용하면 안된다.
	- `\\` 로 이스케이프 처리하여 인자로 전달 해야 한다.
```java
String str = "AB|BC|CD|DE|EF";
String[] splitter = str.split("|");

for (int i=0; i < splitter.length; i++) {
    System.out.printf("%d위치 : %s\n", i, splitter[i]);
}
```

```java
//출력 결과
0위치 : A
1위치 : B
2위치 : B
3위치 : C
...
```
