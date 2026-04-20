- https://inpa.tistory.com/entry/JAVA-%E2%98%95-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4Interface%EC%9D%98-%EC%A0%95%EC%84%9D-%ED%83%84%ED%83%84%ED%95%98%EA%B2%8C-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC

- 인터페이스([[interface]])의 Default 메서드가 추가되면서, [[죽음의 다이아몬드 (The Deadly Diamond of Death)]] 현상 발생가능성이 생겼다.
- 이를 방지하기 위해 Java는 다음과 같은 규칙을 따른다.

## 1. 다중 인터페이스들 간의 Default 메서드 충돌
- Default 메서드 중복 시, **컴파일 불가**
- inteface를 구현한 클래스에서 Default 메서드를 오버라이딩함

## 2. 인터페이스의 Default 메서드와 부모클래스 메서드 간의 충돌
- 부모 클래스의 메서드 > Default 메서드
