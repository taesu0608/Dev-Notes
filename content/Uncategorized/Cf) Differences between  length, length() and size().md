### length, length(), size() 사용
```java
// 배열의 크기
arr.length;
// 문자열의 크기
string.length();
// 컬렉션의 크기
list.size();
```

### 휴리스틱
- 배열의 크기는 length 필드를 통해 확인하며, 메서드가 아니라 필드이므로 변수처럼 접근
- 문자열은 내부적으로 배열의 `length`를 호출
- 컬렉션은 선형구조가 아니기에 `length`(길이) 가 아닌 `size`(크기)가 적합함