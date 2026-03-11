- https://inpa.tistory.com/entry/JAVA-%E2%98%95-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4Interface%EC%9D%98-%EC%A0%95%EC%84%9D-%ED%83%84%ED%83%84%ED%95%98%EA%B2%8C-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC
# 1. Interface
## 1.1. in Oracle
There are a number of situations in software engineering when it is important for disparate groups of programmers to agree to a "contract" that spells out how their software interacts. Each group should be able to write their code without any knowledge of how the other group's code is written. Generally speaking, _interfaces_ are such contracts.
- 소프트웨어 엔지니어링에는, 서로 다른 그룹의 프로그래머들이 자신들의 소프트웨어가 어떻게 상호작용할지를 명시하는 "계약"에 동의하는 것이 중요한 상황들이 많이 있다.  
- 각 그룹은 다른 그룹의 코드가 어떻게 작성되었는지 전혀 모른 채로 자신의 코드를 작성할 수 있어야 한다.  일반적으로 말해서, 인터페이스는 이러한 계약의 역할을 한다.

In the Java programming language, an _interface_ is a reference type, similar to a class, that can contain _only_ constants, method signatures, default methods, static methods, and nested types. Method bodies exist only for default methods and static methods. Interfaces cannot be instantiated—they can only be _implemented_ by classes or _extended_ by other interfaces. Extension is discussed later in this lesson.
- 자바 프로그래밍 언어에서, 인터페이스는 클래스와 유사한 참조 타입(reference type)이며,  
- 상수, 메서드 시그니처, 기본 메서드(default method), static 메서드, 중첩 타입(nested type)만을 포함할 수 있다.  
- 메서드의 본문(구현부)은 기본 메서드와 static 메서드에서만 존재할 수 있다.  
- 인터페이스는 직접 인스턴스화할 수 없고, 오직 클래스에 의해 구현되거나 다른 인터페이스에 의해 확장될 수만 있다.  인터페이스의 확장(extends)은 이 강의의 후반부에서 다룬다.

## 1.2. 정의
- **interface = "계약"**
1. 추상 메서드 집합
2. 상수(final)만 가능
3. `public static final` 과 `public abstract` 제어자 생략 가능
	**컴파일 시 컴파일러에 의해 자동 추가**
## 1.3. 목적
- 상속 및 추상 메서드 강제 구현
- 여러 프레임워크에서 클래스끼리 통신
- [[OOP]]에서 결합도를 낮춰 유지보수성 향상

# 2. 특징

## 2.1. 구현
### 2.1.1. 인터페이스 구현
- 인터페이스, 추상클래스 > 클래스 > 인스턴스
- 다중 상속 가능
- 하나의 클래스에 상속(extends), 구현(implements) 동시 적용 가능
- 생략된 키워드
	- 메서드: `public abstract`가 생략됨
	- 필드: `public static final`가 생략됨

### 2.1.2. 인터페이스 일부 구현
- 인터페이스의 메서드중 일부만 구현시 `abstract`를 붙여서 추상 클래스로 선언
```java
interface Animal {
	void walk();
	void run();
	void breed();
}

abstract class Mamalia implements Animal {
	public void walk() {...}
	public void run() {...}
}

class Lion extends Mammalia {
	public void breed() { ... }
}
```

### 2.1.3. 인터페이스 상수 필드 상속 관계
- 클래스의 상속일 경우 클래스 필드 멤버끼리 상속되어 덮어 씌워지지만, 인터페이스의 필드들은 모두 public static final 이기에, 서로 상속을 해도 독립적으로 운용
```java
interface Iflower {
	int ex = 10; //각각 public static final
}
interface IPlant extends Iflower {
	int ex = 20; //각각 public static final
}
class Tulip implements IPlant {
	int ex = 30; // 그냥 인스턴스 변수
}

public class Main {
	public static void main(String[] args) {
	//클래스 타입 객체로 ex멤버에 접근하면, 클래스 인스턴스 변수로 접근
	Tulip t = new Tulip();
	System.out.println(t.ex); //30

	//인터페이스 타입 객체로 멤버에 접근하면, 인터페이스 static 상수로 접근
	Iflower a = new Tulip();
	System.out.println(a.ex); // 10 - 좋지않은 방법
        System.out.println(Iflower.ex); // 10 - 클래스 static 처럼 '인터페이스.멤버' 로 접근
        IPlant b = new Tulip();
        System.out.println(b.ex); // 20 - 좋지않은 방법
        System.out.println(IPlant.ex); // 20 - 클래스 static 처럼 '인터페이스.멤버' 로 접근
	}
}
```

## 2.2. 메서드
### 2.2.1. Java
- [[JDK]] 8.0
	- interface에 default method와 static method를 통해 추상 클래스 처럼 구현 메서드를 정의 가능하게 됨
- [[JDK]] 9.0

### 2.2.2. Default 메서드
```java
(public) default method() { ... } 
```
**목적**
- 인터페이스 모든 구현체에게 수정 없이 광역으로 함수를 만들어주고 싶을 때 사용
	- `@implSpec` 을 통해 구현 목적을 알림
**특징**
- `default` 키워드
- 구현부 { ... } 존재
- 생략된 접근제어자 `public`
- 자식 클래스(구현체)에서 default 메서드를 오버라이딩하여 재정의 가능

**default 메서드의 super**
- 기존의 `super` 호출 방식과 다름
#### Ex) Default 메서드의 super
```java
interface IPrint {
	default void print() {
		System.out.println("인터페이스 디폴트 메서드");
	}
}

class MyClass implements IPrint{
	@Override
	public void print() {
		IPrint.super.print();
		System.out.println("오버라이딩 메서드")
	}
}

public class Main {
		public static void main(String[] args){
		MyClass cls = new MyClass();
		cls.print();
	}
}
```
### Cf) @implSpec
- 개발자에게 구현 보장을 알림
#### Ex) @implSpec
```java
/**
 * 문자열을 비교합니다.
 *
 * @implSpec
 * 이 구현은 대소문자를 무시하지 않으며,
 * null 값을 허용하지 않습니다.
 */
default int compare(String a, String b) {
    return a.compareTo(b);
}
```
### [[Cf) Default 메서드 다중 상속 문제]]

### 2.2.3. static 메서드
```java
interface Caculator {
	public static void smethod(){ ... }
}
```
**목적**
- 해당 인터페이스와 관련된 utility 성 메서드 제공시 사용
**특징**
- 인스턴스 생성과 상관없이  interface 타입으로 접근해 사용할 수 있는 메서드
- 일반 클래스의 static 메서드와 똑같음
### 2.2.4. private 메서드
**목적**
- 인터페이스의 `default`, `static` 메서드의 **공통된 로직을 재사용** 하기 위해 생긴 메서드
```java
interface Calculator {
    public int plus(int i, int j);
    public int multiple(int i, int j);
    // private 메서드
    private void printf() {
        System.out.println("private 메서드는 default 내부에서만 호출이 가능합니다.");
    }
    // private 스태틱 메서드
    private static void printfStatic() {
        System.out.println("private static 메서드는 static 메서드 내부에서만 호출이 가능합니다.");
    }
    // 디폴트 메서드
    default void callPrivate() {
        printf(); // private 메서드 호출
    }
    // 스태틱 메서드
    static void callPrivateStatic() {
        printfStatic(); // private 스태틱 메서드 호출
    }
}
```
##### 인터페이스의 상수는 private 불가
> 인터페이스의 필드는 자동으로 public static final로 됨

## 2.3. 인터페이스 다형성
- [[OOP]]의 특징 중 하나
- **다형성(Polymorphism)**
	- 하나의 인스턴스가 자신이 **상속하거나 구현한 클래스 또는 인터페이스 타입**으로 다뤄질 수 있는 성질.

### Cf) 인터페이스 기반 설계의 원칙
1. 객체는 인터페이스를 사용해 참조해라
2. 적당한 인터페이스가 있다면 매개변수 뿐 아니라, 반환값, 변수, 필드 전부 인터페이스 타입으로 선언하라
3. 객체의 실제 클래스를 사용할 상황은 '오직' 생성자로 생성할 때 뿐이다.
4. 매개변수 타입으로는 클래스보다 인터페이스를 활용하라
#### Ex) 인터페이스 기반 설계 예시
```java
// badcase
LinkedHashSet<Object> s = new LinkedHashSet<>();

// goodcase
Set<Object> s = new LinkedHashSet<>();
```

### 2.3.1. 형제관계
- 관계 없는 클래스들에게 하나의 인터페이스를 공통적을 구현하도록 함으로써 관계를 맺어 줄 수 있다.

### 2.3.2. 타입 접근 제한
- 같은 부모 클래스를 가진 자식 클래스 간에도 타입을 구별하도록 도와준다.

### 2.3.3. 메서드 접근 제한
- 여러 인터페이스를 구현한 하나의 클래스를 한 인터페이스 타입으로 다루면서 해당 인터페이스의 메서드만 사용하도록 제한
``` java
interface PlayMovie{
	void play();
}
interface ViewImage{
	void view();
}
interface VolumeUpDown{
	void volume();
}

class MP3 implements PlayMovie, ViewImage, VolumeUpDown {
	public void play() {}
	public void view() {}
	public void volume() {}
}

public class Main {
	public static void main(Stringp[] args){
		PlauMovie mp3 = new MP3();
		mp3.play();
	}
}
```

### 2.3.4. 의존성 제거(decoupling)
- 클래스의 관계를 상속(extends)가 아닌 구현(implements)으로 인터페이스 확장한다면, 객체간의 의존성이 줄어든다.
#### Ex) decoupling을 활용한 Framwork
- MVC, MVVM 패턴등으로 승화
- depedency injection등의 기술로 사용됨

#### Ex) 인터페이스 타입으로 통신
```java
interface ClubStore{
	int getNum();
}

class ServiceLogic {
	public void printInt(ClubStore cls) {
		int num = cls.getNum() * 2;
		System.out.println(num);
	}
}

class MapStore implements ClubStore{
	private int num = 10;

	public int getNum(){
		return this.num;
	}
}
```

## 2.4. 마커 인터페이스
- 기존의 instanceof 대신 **타입 체크용**으로 사용
``` java
interface Breedable {}
class Animal {
    public static void born(Animal a) {
        if(a instanceof Breedable) {
            System.out.println("새끼를 낳았습니다.");
        } else {
            System.out.println("알을 낳았습니다.");
        }
    }
}
class Lion extends Animal implements Breedable { }
class Chicken extends Animal { }
class Snake extends Animal { }
```
- Ex) [[Serializable]], [[Clonealbe]]