- https://inpa.tistory.com/entry/OOP-%F0%9F%92%A0-%EC%95%84%EC%A3%BC-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8A%94-SRP-%EB%8B%A8%EC%9D%BC-%EC%B1%85%EC%9E%84-%EC%9B%90%EC%B9%99
# 1. 단일 책임 원칙 (Single Responsibility Principle)
- **정의**: 하나의 클래스(또는 모듈)은 오직 하나의 책임만 가져야 한다.

## 1.1. 단일 책임 원칙 특징

### 1.1.1. 단일 책임 원칙의 필요성
1. 높은 결합도
- 하나의 클래스내 여러 책임은 코드끼리 강하게 결합하게될 가능성이 높다.
- Thus) **모듈이 변경되는 이유는 한가지로 한다.**

2. 유지보수
- 적절이 분배된 책임은 코드 가독성을 향상시킨다.

### 1.1.2. 단일 책임 원칙의 범위
- SRP의 평범한 기준: 책임의 분리
	- 심층적 기준: 관심사의 분리
1. 단일 책임 원칙 위반
	- CRUD 클래스 내부에 데이터 처리와 로그 출력이 공존
```java
public class UserCrudService {  
	private final UserRepository userRepository = new UserRepository();  
  
	public void create(User user) {  
		userRepository.save(user);  
		System.out.println("[LOG] user created: " + user.getName());}  
  
	public User read(Long id) {  
		User user = userRepository.findById(id);  
		System.out.println("[LOG] user read: " + id);  
	return user;}  
  
	public void update(User user) {  
		userRepository.update(user);  
		System.out.println("[LOG] user updated: " + user.getName());}  
  
	public void delete(Long id) {  
		userRepository.delete(id);  
		System.out.println("[LOG] user deleted: " + id);}  
}
```

2. [[의존성 역전 원칙 (DIP)]] 으로 책임은 구분되지만, 관심사는 연결된 상태
```java
// Logger
public interface Logger {  
	void info(String message);  
}

// ConsoleLogger
public class ConsoleLogger implements Logger {  
	@Override  
	public void info(String message) {  
	System.out.println("[LOG] " + message);  
	}  
}

// UserCrudService
public class UserCrudService {  
  
	private final UserRepository userRepository;  
	private final Logger logger;  
	  
	public UserCrudService(UserRepository userRepository, Logger logger) {  
		this.userRepository = userRepository;  
		this.logger = logger;  
	}  
	  
	public void create(User user) {  
		userRepository.save(user);  
		logger.info("user created: " + user.getName());  
	}  
	  
	// 생략
}
```

3. 이벤트 방식으로 책임,관심사 모두 분리
```java
// 유저 이벤트 Created
public class UserCreatedEvent {
	private final String name;
	
	public UserCreatedEvent(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
}

// 이벤트 퍼블리셔
public interface EventPublisher {  
	void publish(Object event);  
}

// 유저 CRUD 서비스
public class UserCrudService {  
  
	private final UserRepository userRepository;  
	private final EventPublisher eventPublisher;  
  
	public UserCrudService(UserRepository userRepository, EventPublisher eventPublisher) {  
		this.userRepository = userRepository;  
		this.eventPublisher = eventPublisher;  
	}
  
	public void create(User user) {  
		userRepository.save(user);  
		eventPublisher.publish(new UserCreatedEvent(user.getName()));  
	}
}
```
