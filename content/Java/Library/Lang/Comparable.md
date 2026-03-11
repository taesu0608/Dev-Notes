# 1. Comparable
## 1.1. 정의
```java
public interface Comparable<T>{}
```

## 1.2. compareTo()
```java
@Override
public int compareTo(T o){
	return this.var - o.var
}
```
- 대상 객체와의 비교의 결과를 양수,0,음수를 통해서 표현
	- **양수**: 구현 객체 > 대상 객체
	- **0**: 구현 객체 = 대상 객체
	- **음수**: 구현 객체 < 대상 객체

### Cf) 정수형을 통한 크기 비교시 주의할 점
- 직접 뺄셈 연산(`o1 - o2`)으로 대소 비교 시 정수 오버플로우 발생 가능
```java

`o1 = 1 o2 = -2,147,483,648  // int 최소값  return o1 - o2; // 기대값: 2,147,483,649  (int 범위 초과 → 오버플로우) // 실제값: -2,147,483,648 (잘못된 음수 반환)`
```
- 이 경우 **작아야 할 값이 오히려 크다고 잘못 판정**될 수 있음.

# 3. 예시
## 3.1. Queue에서 Comparable 사용
```java
// 우선순위 큐에 저장할 객체는 필수적으로 Comparable를 구현
class Student implements Comparable<Student> {
	String name;
	int priority;

	public Student(String name, int priority){
		this.name = name;
		this.priority = priority;
	}

	@Override //
	public int compareTo(Student user){
		// Student의 priority 필드값을 비교하여 우선순위를 결정하여 정렬
		if (this.priority < user.priority) {
			return -1;
		} else if (this.priority == user.priority){
			return 0;
		} else {
			return 1;
		}
	}

	@Override
	public String toString() {
		return "Student{" +
				"name='" + name + '\'' +
				", priority=" + priority +
				'}';
	}
}
```

```java
public static void main(String[] args) {

	// 오름차순 우선순위 큐
	Queue<Student> priorityQueue = new PriorityQueue<>();

	priorityQueue.add(new Student("주몽", 5));
    priorityQueue.add(new Student("세종", 9));
    priorityQueue.add(new Student("홍길동", 1));
    priorityQueue.add(new Student("임꺽정", 2));

	// 우선순위 대로 정렬되어 있음
	System.out.println(priorityQueue);

	// 우선순위가 가장 높은 값을 참조
	System.out.println(priorityQueue.peek());

	// 차례대로 꺼내기
	System.out.println(priorityQueue.poll());
	System.out.println(priorityQueue.poll());
	System.out.println(prioriryQueue.poll());
	System.out.println(priotityQueue.poll());
}
```
- compareTo 파라미터의 자료형이 implements Comparable<T>의 T 에서 정해짐