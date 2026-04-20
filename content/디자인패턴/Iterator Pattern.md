https://inpa.tistory.com/entry/GOF-%F0%9F%92%A0-%EB%B0%98%EB%B3%B5%EC%9E%90Iterator-%ED%8C%A8%ED%84%B4-%EC%99%84%EB%B2%BD-%EB%A7%88%EC%8A%A4%ED%84%B0%ED%95%98%EA%B8%B0
# 1. Iterator Pattern
- 일련의 데이터 집합에 대하여 순차적인 접근(순회)을 지원하는 패턴
- **데이터 집합**: 객체들을 그룹으로 묶어 자료의 구조를 취하는 컬렉션
	-  Ex) 컬렉션: 리스트, 트리, 그래프, 테이블
- 비선형적인 컬렉션의 경우 순회의 경우의 수가 다양함
- **목적**: 복잡하게 얽혀있는 자료 컬렉션들을 순회하는 알고리즘 전략으로 정의

![[Pasted image 20260315234015.png]]
- [[Java Collections Framework (JCF)]] 내부에 미리 이터레이터 패턴이 적용되어 있음
## 1.1. Iterator Pattern 구조
![[Pasted image 20260316204814.png]]
- **Aggregate(인터페이스)** : Concreatelterator 객체를 반환하는 인터페이스 제공
	- `iterator()`: Conreatelterator 객체를 만드는 팩토리 메서드
- ConcreateAggregate(클래스): 여러 요소들이 이루어져 있는 데이터 집합체
- **Iterator(인터페이스)**: 집합체 내의 요소들을 순서대로 검색하기 위한 인터페이스를 제공
	- `hasNext()`: 순회할 다음 요소가 있는지 확인 (true / false)
	- `next()`: 요소를 반환하고 다음 요소를 반환할 준비를 하기 위해 커서를 이동시킴
- **ConcreteIterator(클래스)**: 반복자 객체
	- ConcreateAggregate가 구현한 메서드로부터 생성되며, ConcreateAggregate의 컬렉션을 참조하여 순회
	- 순회 전략 구체화

### 1.1.1. Iterator Pattern 예제
#### 클래스 구성
```java
// 집합체 객체 (컬렉션)
interface Aggregate {
    Iterator iterator();
}

class ConcreteAggregate implements Aggregate {
    Object[] arr; // 데이터 집합 (컬렉션)
    int index = 0;

    public ConcreteAggregate(int size) {
        this.arr = new Object[size];
    }

    public void add(Object o) {
        if(index < arr.length) {
            arr[index] = o;
            index++;
        }
    }

    // 내부 컬렉션을 인자로 넣어 이터레이터 구현체를 클라이언트에 반환
    @Override
    public Iterator iterator() {
        return new ConcreteIterator(arr);
    }
}
```

``` java
interface Iterator {
	boolean hasNext();
	Object next();
}

class ConcreteIterator implements Iterator {
	Object[] arr;
	private int nextIndex = 0;
	
	// 생성자로 순회할 컬렉션을 받아 필드에 참조 시킴
	public ConcreteIterator(Object[] arr) {
		this.arr = arr;
	}
	
	// 순회할 다음 요소가 있는지 true/ false
	@Override
	public boolean hasNext() {
		return nextIndex < arr.length;
	}
	
	// 다음 요소를 반환하고 커서를 증가시켜 다음 요소를 바라보도록 한다.
	@Override
	public Object next() {
		return arr[nextIndex++];
	}
}
```

#### 클래스 흐름
``` java
public static void main(String[] args) {
    // 1. 집합체 생성
    ConcreteAggregate aggregate = new ConcreteAggregate(5);
    aggregate.add(1);
    aggregate.add(2);
    aggregate.add(3);
    aggregate.add(4);
    aggregate.add(5);

    // 2. 집합체에서 이터레이터 객체 반환
    Iterator iter = aggregate.iterator();

    // 3. 이터레이터 내부 커서를 통해 순회
    while(iter.hasNext()) {
        System.out.printf("%s → ", iter.next());
    }
}
```


## 1.2. Iterator Pattern 특징
### 1.2.1. 패턴 사용 시기
- 컬렉션에 상관없이 객체 접근 순회 방식을 통일하고자 할 경우
- 컬렉션을 순회하는 다양한 방법을 구현 할 경우
- 컬렉션의 복잡한 내부 구조를 클라이언트로 부터 숨길 경우
- 데이터 저장 컬렉션 종류가 변경 가능성이 있을 경우
	- **[[의존성 역전 원칙 (DIP)]]** 을 지원하고 싶을 경우

### 1.2.2. 장점
- 다양한 컬렉션들에 대해 동일한 순회 방법 적용
- 컬렉션의 내부 구조 및 순회 방식 캡슐화
- 컬렉션의 구현, 접근 처리 부분을 분리하여 결합도를 낮춤
- [[단일 책임 원칙 (SRP)]]을 준수
	- 컬렉션은 데이터 저장의 책임만 가지도록 하고 순회 로직은 Iterator 객체로 분리
- [[OCP (Open-Closed Principle, 개방 폐쇄 원칙)]] 준수
	- 데이터 컬렉션의 종류가 변경되어도 클라이언트 구현 코드는 손상되지 않음

### 1.2.3. 단점
- 클래스가 늘어나고 복잡도가 증가
	- 이터레이터의 효율성보다 복잡도가 낮은 경우 필요성이 퇴색
- 구현 방법에 따라 캡슐화 위배
	- 클라이언트에게는 캡슐화를 제공하지만 Iterator 구현은 Collection 내부 구조에 의존
---
# 2. Fail - Fast
- **정의**: 컬렉션을 순회하는 도중 **구조적 변경(structural modification)** 이 발생하면즉시 `ConcurrentModificationException` 을 발생시키는 방식
- **목적**
	- 잘못된 순회/수정 로직 **즉시 감지**
	- 데이터 불일치, 예측 불가능한 동작 방지

## 2.1. Iterator.remove()
- Fail-Fast를 회피하는 안전한 수정 방식
- 컬렉션을 직접 수정하지 않고 **Iterator**를 통해 수정 
```java
Iterator<String> it = list.iterator();

while (it.hasNext()){
	String s = it.next();
	if (s.equals("A")) it.remove;
}
```

### 2.1.1. ConcurrentModificationException 이 발생하지 않는 이유
- `expectedModCount`를 같이 갱신하기 때문
1. Iterator 생성 시
	 - expectedModCount = modCount
 2. iterator.remove() 호출 시
	 - 내부적으로 collection.remove() 수행
	 - **modCount** 증가
	 - **expectedModCount**도 동일하게 증가

## 2.2. modCount
- **modCount**: 실제 컬렉션의 수정 횟수
- **expectedModCount**: Iterator가 알고 있는 수정 횟수
##### modCount는 Iterator의 Fail - Fast 를 위해 설계된 변수
### 2.2.1. Fail - Fast 동작 조건
```java
if (modCount != expectedModCount) {
	throw new ConcurrentModificationException();
}
```

---
# 3. for-each / Stream API
- 실무에서는 `Iterator` 를 통한 방식으로 순회기능을 구현하지 않는다.
# 3.1. for-each  
- `Iterator` 를 직접 사용하지 않고 컬렉션을 순회할 수 있는 문법  
- 내부적으로는 `Iterator` 를 이용하여 동작하는 **syntactic sugar(문법적 편의 기능)** 
- 컬렉션이 `Iterable` 인터페이스를 구현하고 있으면 사용 가능  
- 컬렉션의 내부 구조를 몰라도 순회 가능하다는 장점 
### 3.1.1. 특징  
- 코드가 간결함  
- 순회 구조가 명확함  
- 인덱스가 필요 없는 경우 가장 많이 사용됨  
- 내부적으로 `Iterator` 를 사용하므로 구조적 수정 시 `ConcurrentModificationException` 이 발생할 수 있음  
  
### 3.1.2. 구현 예시
#### for-each 구현
``` java  
List<String> list = new ArrayList<>();  
  
list.add("A");  
list.add("B");  
list.add("C");  
  
for (String s : list) {  
System.out.println(s);  
}
```
#### for-each 내부 동작
```java
Iterator<String> it = list.iterator();

while(it.hasNext()){
	String s = it.next();
	System.out.println(s);
}
```
## 3.2. Stream API
- [[Stream API]]: Java 8에서 도입된 컬렉션 데이터 처리용 선언형 API
- **internal iteration(내부 반복)**: 라이브러리가 내부적으로 순회 로직 수행

### 3.2.1. 특징
- 선언형 스타일 코드 작성 가능
- 함수형 프로그래밍 지원 (`lambda`)
- 파이프라인 방식 데이터 처리
- 병렬 처리 지원 (`parallelStream`)
- 순회 로직을 숨겨 캡슐화 수준 향상

#### Steam API 구현
```java
List<String> list = List.of("A", "B", "C");

list.stream()
	.filter(s -> !s.equals("B"))
	.forEach(System.out::println);
```