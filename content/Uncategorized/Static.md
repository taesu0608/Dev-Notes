# 2. Static
- 클래스 객체
### 2.1. static 변수 (클래스 변수)
```java
static int count;
```
- 클래시 로딩 시 메모리 할당
- 클래스에 한 개만 존재하며 모든 인스턴스가 공유

### 2.2. static 메서드
```java
static void hello() {}
```
- 객체 없이 호출 가능
### 2.3. static 초기화 블록
```java
static {
	// 클래스 로딩 시 한 번 실행
}
```
- [[초기화 블록]]
### 2.4. static 중첩 클래스 (static nested class)
```java
class Outer {
	static class inner {
	}
}
```
- `Outer` 클래스를 인스턴스 없이 사용 가능