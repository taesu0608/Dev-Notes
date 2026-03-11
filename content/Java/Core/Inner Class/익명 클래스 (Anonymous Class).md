- https://inpa.tistory.com/entry/JAVA-%E2%98%95-%EC%9D%B5%EB%AA%85-%ED%81%B4%EB%9E%98%EC%8A%A4Anonymous-Class-%EC%82%AC%EC%9A%A9%EB%B2%95-%EB%A7%88%EC%8A%A4%ED%84%B0%ED%95%98%EA%B8%B0
# 1. 익명 클래스
- 익명 클래스는 [[Inner class]](내부 클래스) 일종
- 일회용 **자식** 클래스
### Cf) 일반적인 자식 객체 사용과 익명클래스 차이점
- 일반적인 자식 객체사용
> 상속받은 클래스 재정의 - 객체 인스턴스 초기화
- 익명클래스
> 클래스 정의와 객체화를 동시에 사용

## 사용예시
```java
// 일반적인 자식 객체 사용

// 부모 클래스
class Animal {
	public String bark() {
		return "동물이 웁니다.";
	}
}

// 자식 클래스
class Dog extends Animal {
	@Override
	public String bark() {
		return "개가 짖다.";
	}
}

public class Main {
	public static void main(String[] args){
	Animal a = new Dog();
	a.bark();
	}
}
```

``` java
// 부모 클래스
class Animal {
	public String bark() {
		return "동물이 웁니다.";
	}
}

public class Main {
	public static void main(String[] args){
		// 익명 클래스 : 클래스 정의와 객체화를 동시에. 일회성으로 사용
		Animal dog = new Animal() {
			@Ovveride
			public String bark() {
				return "개가 짖습니다.";
			}
		};

		dog.bark();
	}
}
```

**익명클래스는 기본생성자조차 생기지 않는다.**

---
# 2. 특징

## 2.1. 다형성의 법칙
- 참조 변수의 타입이 결정하는 것은 '보이는 것'이고, 실제 객체가 결정하는 것은 행동 방식이다.
```java
Parent p = new Child();
```
- `p`는 Parent 타입이기에, **Parent에 정의된 메서드만 호출 가능**
- 실제 객체는 Child는 Child 에만 있는 메서드는 직접 호출 불가
- 익명 클래스 또한 해당 법칙을 따름
```java
Animal animal = new Animal("Dog") {
	void sound() {
		System.out.println("Bark");
	}

	void run() {
		System.out.println("Run");
	}
};

animal.sound(); // Pass
animal.run(); // Error X_X
```
- **Thus) 부모클래스에 정의되지 않은 익명클래스의 메서드는 외부에서 사용 불가하다.**

### 2.1.1 내부에서의 사용법
- 외부스코프와 다르게 익명 클래스 내부에선 사용이 가능하다.
``` java
Animal animal = new Animal(){
	@Override
	public Stirng bark() {
		run(); 
//내부 스코프에서의 새로운 메서드의 호출은 가능하다
		return "개가 짖습니다.";
	}

	// 새로 정의한 메서드
	public String run() {
		return "달리기";
	}
}
```

## 2.2. 익명 클래스 선언 위치
- 일반적인 목적: **자식 객체의 정의부가 필요가 없다.**
### 2.2.1. 클래스 필드로 이용
1.  특정 클래스 내부에서 여러 메서드에서 이용될 때
``` java
class Animal {}
class Creature {
	// 필드에 익명자식 객체를 생성하여 이용
	Animal dog = new Animal() {
		public String bark() {
			return "짖는 소리";
		}
	};

	pulic void method() {
		dog.bark();
	}

	public void method2() {
		dog.bark();
	}
}
```

2. 지역 변수로서 이용
```java
class Animal {...}

class Creature {
	public void method() {
		// 지역 변수같이 클래스를 선언하여 일회용으로 사용
		Animal dog = new Animal() {
			public String bark() {
				return "짖는 소리";
			}
		};
		dog.bark();
	}
}
```

3. 메서드 Argument로 이용
``` java
class Animal {...}

class Creature{

	public void method(Animal dog){ // 익명 객체 매개변수를 받ㅇ ㅏ사용
		dog.bark();
	}
}

public class Main {
		public static void main(Stirng[] args){
		Creature monster = new Creature();

		// 메서드 아큐먼트에 익명 클래스 자체를 입력값으로 할당
		monster.method(new Animal()) {
			public String bark() {
				return "짖는 소리";
			}
		}
	}
}
```
---
### Cf) 익명클래스 컴파일
- 내부 클래스를 컴파일 하면 `$`기호가 들어간 클래스명 `.class` 파일을 얻게 된다.
- Ex) Main.java에서 Animal의 익명 객체를 정의 한다면
	- `Main.class`, `Animal.class`, `Animal$1.class`

---
## 3. 인터페이스 익명 구현 객체
- ##### 자바의 익명클래스의 진가는 인터페이스를 익명 객체로 선언하여 사용할 때

```java
//인터페이스
interface IAnimal {
	public String bark(); // 추상 메서드
	public String run();
}

public class Main {
	public staic void main(String[] args){
	// 인터페이스 익명 구현 객체 생성
	IAnimal dog = new IAnimal() {
		@Override
		public String bark() {
				return "짖는 소리";
			}
		}

		@Override
		public String run() {
			return "달린다.";
		}
	};

	// 인터페이스 구현 객체 사용
	dog.bark();
	dog.run();
}
```
>인터페이스 클래스 생성자 처럼 초기화하여 인스턴화 한 것 같이 보이지만, new 인터페이스명() 은 그렇게 보일 뿐이지, 자식 클래스를 생성해서 implements하고 클래스 초기화 한 것과 다름이 없다.

## 3.1. 익명 구현 객체 활용

1. Operate에서의 활용
```java
// 연산식을 추상화한 인터페이스
interface Operate {
	int operate(int a, int b);
}
```

``` java
// 계산을 담당하는 클래스
class Calculator {
	// 계산할 두 수를 저장하는 필드
	private final int a;
	private final int b;

	// 생성자
	public Calculator(int a, int b){
		this.a = a;
		this.b = b;
	}

	// 인터페이스 타입을 매개변수로 받는 메서드 (다형성)
	public int caculate(Operate op) {
		return op.operate(this.a, this.b) // 매개변수 객체의 메서드 실행하여 리턴
	}
}
```

```java
public class Main {
	public static void main(Stirng[] args){
	// 계산할 두 수
	int num1 = 20;
	int num2 = 10;

	// Calculator 클래스 생성하며 계산 할 수를 클래스 필드에 저장
	Calculator calculator = new Calculator(num1, num2);

	int result = calculator.caculate(new Operate() {
		public int operate(int a,int b){
			return a + b;
		}
	});

	System.out.println(result);

	int result2 = calculator.caculate(new Operate() {
		public int operate(int a, int b){
			return a - b;
		}
	});

	System.out.println(result2); // 1-
	}
}
```

2. Comparator - Arrays.sort()
```java
public class Main{
	public static void main(String[] args) {

		class User{
			String name;
			int age;

			User(String name, int age) {
				this.name = name;
				this.age = age;
			}
		}

		User[] users = {
			new User("찰스", 32),
			new User("포이리에", 32),
			new User("게이치", 32),
			new User("챈들러", 32),
		};

		// Arrays.sort(배열, Comparator 익명 구현 객체)
		Arrays.sort(users, new Comparator<User>()){
			@Override
			public int compare(User u1, User u2) {
				return Integer.compare(u1.age, u2.age);
				// Integer 클래스에 정의된 compare 함수로 두 가격 정수 원시값을 비교
			}
		}
	}
}
```

## 3.2. 익명 구현 객체 한계점

- 익명 구현 객체의 한계점은 오로지 **하나의 인터페이스만 구현 가능**하다
	- 인터페이스의 최대 장점 **다중 상속** 활용불가

---

### [[람다식 (Lambda Expression)]] 의 익명 객체 축소 과정을 확인하길 바란다.
