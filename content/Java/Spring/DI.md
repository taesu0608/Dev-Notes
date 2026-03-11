DI(Dependency Injection)

DI는 디자인 패턴 중 하나이며 객체 간의 의존성을 자신이 아닌 외부에서 받아 느슨한 결합을 하여 유연성, 재사용성, 테스트 용이성을 개선시킨다.

## 의존관계
``` Java
public class A {
	B b = new B();
}
```
- A Class는 B Class에 의존한다.