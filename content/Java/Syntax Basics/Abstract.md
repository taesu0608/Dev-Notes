# 1. 추상 클래스
- '추상화' + 클래스
- 하나 이상의 **추상 메서드**를 포함하는 클래스
## 1.1. 기본 문법
- `abstract` 키워드를 추상 클래스와 추상 메서드 앞에 붙임
	- 메서드의 구현부인 중괄호 미존재
``` java
public abstract class Shape {
	private String type;

	public Shape(String type){
		this.type = type;
	}

	public abstract void draw();
}
```
> 추상 클래스는 추상 메서드를 포함하고 있다는 것을 제외하곤 일반 클래스와 같다

# 2. 특징
## 2.1. 추상 클래스와 생성자
- 직접적인 인스턴스화가 불가능
- 하지만 자식클래스의 생성자에서 추상클래스의 생성자 호출 가능
```java
abstract class Shape {
	public String type;

	public Shape(String type){
		this.type = type;
	}

	// 추상 메서드
	public abstract void draw();
}

class Figure extends Shape{
	public String name;

	public Figure(String type1, String type2){
		super(type1);
		name = type2;
	}

	@Override
	public void draw() {...}
}

public class main {
	public static void main(String[] args){
	Figure f = new Figure("polygon", "square");
	f.name;
	f.type;
	}
}
```

## [[Cf) Different between abstract and interface]]