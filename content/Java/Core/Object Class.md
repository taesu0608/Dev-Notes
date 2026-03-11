- https://inpa.tistory.com/entry/JAVA-%E2%98%95-Object-%ED%81%B4%EB%9E%98%EC%8A%A4%EC%99%80-%EC%83%81%EC%9C%84-%EB%A9%94%EC%84%9C%EB%93%9C-%EC%9E%AC%EC%A0%95%EC%9D%98-%ED%99%9C%EC%9A%A9-%EC%B4%9D%EC%A0%95%EB%A6%AC
# 1. Object Class
- 모든 클래스의 조상 클래스
## 1.1. Object Class의 특징
### Cf) Object Class가 모든 클래스의 상위가 되는 방식
- 클래스 작성시 자동적으로 Object 클래스가 `extends` 됨
- 다른 클래스 상속시 `extends Object`는  사라짐, 하지만 부모 클래스에서 `Object`를 상속받고 있음

# 2. 메서드
## 2.1. Object 클래스 메서드
| 접근제어자       | 반환 타입      | 메서드명                            | 설명                   |
| ----------- | ---------- | ------------------------------- | -------------------- |
| `public`    | `String`   | `toString()`                    | 객체의 문자열 표현 반환        |
| `public`    | `boolean`  | `equals(Object obj)`            | 객체 동등성 비교            |
| `public`    | `int`      | `hashCode()`                    | 객체의 해시값 반환           |
| `public`    | `Class<?>` | `getClass()`                    | 객체의 클래스 정보 반환        |
| `protected` | `Object`   | `clone()`                       | 객체 복사 (얕은 복사)        |
| `protected` | `void`     | `finalize()`                    | GC 전 호출 (Deprecated) |
| `public`    | `void`     | `wait()`                        | 스레드 대기               |
| `public`    | `void`     | `wait(long timeout)`            | 지정 시간 대기             |
| `public`    | `void`     | `wait(long timeout, int nanos)` | 나노초 단위 대기            |
| `public`    | `void`     | `notify()`                      | 대기 중인 스레드 하나 깨움      |
| `public`    | `void`     | `notifyAll()`                   | 대기 중인 스레드 전부 깨움      |
- `clone()`, `equals()`, `hashCode()`, `toString()`
## 2.2. Object 클래스 메서드 재정의
### 2.2.1. toString 메소드
- 기본적으로 Object 클래스의 `toString()` 메소드 반환
	- 해당 인스턴스 정보와 주소(해시코드)를 문자열로 반환
	- Ex) `Object@251a69d7`
		- 251a69d7
			- 뒤 해시코드 값은 인스턴스의 주소를 해싱한 변환값
			- 고유성을 지님
- 객체의 이름이나 주소값이 아닌 객체의 고유 정보를 출력하고 싶을 때 `toString` 메서드를 재정의하여 반환값을 다르게 설정
- 기본적으로 객체 출력시 `toString()`을 호출하지 않아도 자동으로 붙여 호출

```java
class Person {
	String name;
	int age;
	
	public Person(String name. int age){
		this.name = name;
		this.age = age;
	}
	
	// @Overriding
	public String toString() {
		return String.format("이름 : %s, 나이 : %d세",this.name,this.age);
	}
}

public class Main{
	public static void main(String[] args) {
		Person p1 = new Person("홍길동",54);
		
		// p1 객체를 출력하면 이름과 나이가 출력
		System.out.println(p1); // 이름: 홍길동, 나이: 54세
	}
}
```

### 2.2.2. equals메서드
- 객체의 비교는 기본적으로 주소값을 통한 비교
	- 이는 모든 인스턴스를 철저히 구분함
- 다른 고유의 값을 통해 비교하도록 하기위해 `equals()`메서드를 `오버라이딩(Override)`하여 사용

```
import java.util.Objects;

class Person {
	String name;
	
	public Person(String name){
		this.name = name;
	}
	
	// 객체 주소 비교가 아닌 Person 객체의 사람 이름이 동등한지 비교로 재정의
	public boolean equals(Obeject 0) {
		if (this == 0) return true; //
		if (!(0 instanceof Person)) return false;
		Person person = (Person) o;
		return Obejects.equals(this.name, person.name);
	}
}

public class Main {
	public static void main(String[] args) {
		Person p1 = new Person("홍길동");
		Person p2 = new Person("홍길동");
		
		System.out.println(p1.equals(p2));
	}
}
```


### Cf) String 클래스의 equals 오버라이딩
```java
public boolean equals(Object anObject) {
	if (this == anObject) {
		reutnr true;
	}
	
	if (anObject instanceof String) {
		String anotherString = (String) anObject;
		int n = value.length;
		if (n == anotherString.value.length) {
			char v1[] = value;
			char v2[] = anotherString.value;
			int i = 0;
			while (n-- != 0){
				if (v1[i] != v2[i])
					return false;
				i++;
			}
			return true;
		}
		
	}
}
```