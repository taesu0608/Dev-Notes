- Cf) https://inpa.tistory.com/entry/JAVA-%E2%98%95-Vector-%EC%82%AC%EC%9A%A9%EB%B2%95-%EB%8F%99%EA%B8%B0%ED%99%94-%EB%AC%B8%EC%A0%9C%EC%A0%90-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0
Vector와 ArrayList와 기능, 메서드 구성등은 거의 동일하다.

하지만 Vector는 메서드에 [[synchronized]]` 키워드가 걸려있다.

![[Pasted image 20250727214010.png]]

`sychornized` 키워드는 멀티 쓰레드 환경에서 두개 이상의 쓰레드가 하나의 변수에 동시에 접근 할 때 Race condition(경쟁상태)이 발생하지 않도록 한다.
- 쓰레드가 해당 메서드를 실행하는 동안 **다른 쓰레드가 접근하지 못하도록 메서드를 잠금(lock)**을 거는 것

##### 하지만 Vector는 완벽한 동기화가 아니다. 몇가지 치명적인 문제점이 존재한다.

# Vector 동기화의 문제점
## 1. 강제 동기화로 인해 느려진 성능
- Race condition(경쟁상태)가 무관한 환경에서 일반적인 메서드보다 Overhead가 발생한다.

## 2. 완벽하지 않다.
- **Vector의 메서드**에 대해서는 동기화처리가 되어있지만, **Vector 인스턴스** 자체는 동기화 처리가 되어있지않다.
### 


[[]]