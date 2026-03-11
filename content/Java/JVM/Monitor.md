- [[Mutex]]나 [[Semaphore]]보다 더 고수준의 동기화 기법
- https://www.youtube.com/watch?v=Dms1oBmRAlo
- https://devdebin.tistory.com/335
# 2. 특징
- **모든 자바 객체는 모니터를 가진다.**
	- JVM 수준에서 구조 내부에 있음
- 여러 쓰레드([[Thread]])가 객체의 임계 영역에 진입하려고 할 때
  -> JVM은 모니터를 사용해 스레드 간 동기화를 제공
- 자바의 모니터 제공 기능
	1. **상호 배제(Mutual Exclusion)**
		-  synchronized 블록은 해당 객체의 모니터를 획득 가능하며, 모니터를 획득한 스레드만 **임계영역(Critical Section)** 에 접근 가능
		- JVM은 synchronized 키워드를 사용해 **Mutex** 동기화를 암묵적으로 처리
	2. **협력(Cooperation)**
		- 스레드간 협업을 통해 특정 조건을 만족할 때까지 실행을 제어하기 위한 동기화 메커니즘
		- 모니터의 **조건 변수(Condition Variable)** 를 활용
		- Object 클래스의 native 메서드로 구현되어 있는 wait(), notify(), notifyAll()메서드를 사용
			- wait(): 특정 조건이 만족하지 않으면 현재 스레드는 락을 해제하고 대기 셋(Wait Set)에서 대기
			- notify(): 조건이 충족되었을 때, 대기 중인 스레드 중 하나를 깨워 다시 실행
			- notifyAll(): 대기 중인 모든 스레드를 깨워 실행할 기회를 부여
			

## 2.1. Monitor의 EntrySet 과 WaitSet

### 2.1.1. EntrySet(진입셋)
- critical section에 진입을 기다리는 큐
	- Mutex 락을 가지지 못한 스레드
-> 락 취득 이후 ciritical area 접근

### 2.1.2. WaitSet(대기셋)
- 조건 변수(사용자가 지정한)이 충족될 때까지 대기하는 스레드의 집합
-> 작업이후 특정 스레드 or 모든 스레드를 깨울수 있음
-> 깨우지 않을 시 락반환 이후 entry Queue에서 스레드 선입선출 진행

- 모니터를 소유하고 있는 스레드가 wait()호출 시
-> 해당 스레드는 본인의 락을 해제한 후, WaitSet에서 대기
-> WaitSet에서 깨어난 스레드는 EntrySet으로 이동

![[Pasted image 20250801160029.png]]
Bounded producer/ consumer problem
- Buffer의 공급자와 소비자가 공급가능한 상태인지 확인 하는 바쁜 대기(visit wait)임
