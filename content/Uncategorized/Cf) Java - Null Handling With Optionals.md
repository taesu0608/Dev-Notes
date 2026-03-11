In this article, we are going to cover one of the essential topics of java, null handling, and we are going to do this with Optionals that was introduced in Java 8 and we will be doing that in full detail with examples.
- 이 글에서, 우리는 자바의 주된 주제 중 하나인 널 헨들링에 대해서 다룰 것이다. 그리고 우리는 이것을 Optional과 함께 that was 를 어떻게 해석?
We are going to create Optional returning methods and also see the Spring way of using Optionals for database operations. Firstly, let’s remember what NullPointerException is and then look at what Optionals are.
- 우리는 옵셔널 반환 메서드를 만들것이다 그리고 또한 볼 것이다. 데이터 베이스 진행을 위해 옵셔널이 사용되는 spring 방법을 볼 것이다. 첫째로, 기억해라 npe이 존재한다는 것을 그리고 살펴봐라 옵셔널이 존재하는 것은
In Java, if we want to create a variable, we first declare it and then initialize it. When we use a reference that points nowhere in the memory (uninitialized) and operate over it (e.g. calling methods), we get NullPointerException. You can see an example below.
- 자바에서, 만약 우리가 변수를 만드길 원한다면, 우리는 첫쨰로 정의해야된다 그것을 그리고 그것을 초기화 해야된다. 우리가 한 참조객체를 사용할때 메모리에 도입점이 존재하지 않는 (즉 초기화 되지 않은) 그리고 그것이 실행될때 (즉 메서드 호출), 우리는 NullPointerException을 가진다. 너는 볼 수 있다 아래 예제를
```java
```Object someObject = null; // created null variable  
someObject.toString(); // method call over null variable
```

Here, we have uninitialized object called someObject and tried to call toString method over it. As it is not initialized and refers to nowhere in the memory, it will end up throwing [NullPointerException](https://javarevisited.blogspot.com/2013/05/ava-tips-and-best-practices-to-avoid-nullpointerexception-program-application.html). Now, if we refreshed our memory, we can get to Optionals.
- 여기, 우리가 초기화하지 않았던 객체를 가진다 someObject라고 불렸던 그리고 to String으로 호출 시도를 했다. 그것은 초기화되지 않았고 어느 메모리에서 refer 되지 않았기 때문에, 그것을 NPE예외를 던지면서 종료할 것이다. 지금, 만약 우리가 우리의 메모리를 새로고친다면, 우리는 Optional을 얻을수 있다.
## 1- What is Optional?

Optional class provides a way to handle nullable objects in a elegant way with fluent API. With the provided API, we will process over the object if the object is present (not null). Let’s see what it looks like
- 옵셔널 클래스는 제공한다 방법을 핸들링하기 위한 널 객체들을 유동적인 api와 함께 고급진 방법에서, 그 제공되는 api화 함께, 우리는 진행시킬 수 있다 객체 전반에 만약 그 객체가 존재한다면(널이 아닌채로) 보게한다 보이는대로
```java
Object someObject = null;  
Optional<Object> objectOptional = Optional._ofNullable_(someObject);  
System._out_.println(objectOptional.isPresent()); // prints false
```
As you see above, we set the someObject variable to null and then created the [Optional object](https://javarevisited.blogspot.com/2017/04/10-examples-of-optional-in-java-8.html#axzz6ccm5KWKs) wrapping the null object. Then, we checked if the variable is null or not with the method isPresent. And let’s try with non-null object and see it is printing true as we pass non-null object to Optional wrapper.

우리가 위에 보는 것과 같이 우리는 someObject 변수를 설정한다. 널을 위한 그리고 옵셔널 객체를 널 오브젝트를 래핑한. 그리고, 우리는 체크한다 변수가 널인지 아닌지 isPresent 메소드로. 그리고 시도해라 널이아닌 아닌 개체와 할께 그리고 봐라 이것이 true가 출력되는 것을 우리가 널이 아닌 객체를 option 래퍼로 통과시킬때

```java
Object someObject2 = new Object();  
Optional<Object> objectOptional2 = Optional._ofNullable_(someObject2);  
System._out_.println(objectOptional2.isPresent()); // prints true
```

