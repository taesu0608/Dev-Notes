프록시 패턴(Proxy Pattern)은 대상 원본 객체를 대리하여 대신 처리하게 함으로써 로직의 흐름을 제어하는 행동 패턴이다.

대리자를 사용하는 이유로는 대상 클래스의 일부 정보 및 기능한 사용 및 조작을 하고 싶지만 원본 객체를 수정할 수 없는 상황일 때를 위함이다.
1. 보안(Security)
	- 프록시는 클라이언트가 작업을 수행할 수 있는 권한이 있는지 확인 후 대상(subject)에 전달
2. 캐싱(Chaching)
	- 프록시가 내부 캐시를 유지하여 사용, 캐시 데이터 미존재 혹은 강제 대상(subject) 접근의 경우에 대상(subject)에 작업 전달
3. 데이터 유효성 검사(Data validation)
	- 프록시가 입력을 대상(subject)으로 전달하기 전에 유효성 검사
4. 지연 초기화(Lazy initialization) 
	- 대상(subject)의 초기화 비용이 높을 경우 프록시를 통해 연기
5. 로깅(Logging)
	- 프록시는 메소드 호출 및 매개 변수를 인터셉트하고 이를 기록
6. 원격 객체(Remote objects)
	- 프록시는 원격 위치에 있는 객체를 가져와서 로컬처럼 보이게 함

The Proxy design pattern is a class functioning as an interface to another class or object
A Proxy could be for anything, such as a network connection, an object in memory,
a file, or anything else you need to provide an abstraction between.
- 프록시(Proxy) 디자인 패턴은 다른 클래스나 객체에 대한 인터페이스 역할을 하는 클래스를 의미합니다.  프록시는 네트워크 연결, 메모리 내 객체, 파일 등 무엇이든 될 수 있으며, 이들 사이에 추상화를 제공해야 할 때 사용됩니다.
## 2. 특징
## 2.1. Proxy pattern Structure
![[Pasted image 20250613014137.png]]
- 프록시는 실제 객체(Subject)에 대한 접근을 제어하는 대리 객체이다. 
- 프록시는 Subject와 동일한 인터페이스를 구현하며, 클라이언트는 프록시를 실제 객체처럼 사용할 수 있다.  
- 프록시는 클라이언트의 요청을 intercept하여 필요한 부가 작업(로깅, 접근 제어, 지연 초기화 등)을 수행한 후, 요청을 실제 객체에 **위임(delegate)** 하거나 자체적으로 처리할 수 있다.
## 2.2. Types of proxies
1.  Normal Proxy
2.  Virtual Proxy
	- An object that can cache parts of the real object, and then complete loading the full object when necessary.
3.  Protection Proxy
4. Logging Proxy
5. [[Remote Proxy Pattern]]
	- Can relay messages to a real object that exists in a different address space
	- ex) REST API 클라이언트, gRPC
6. Caching Proxy

## 2.2.5. Remote Proxy Pattern
**REST API 클라이언트**
```java
// RestTemplate이나 WebClient
public class UserClient {
    private final RestTemplate restTemplate = new RestTemplate();

    public User getUser(Long id) {
        return restTemplate.getForObject("http://server.com/users/" + id, User.class);
    }
}
```

**Unity의 gRPC**
```unity
// User 요청을 보내고 응답을 받기 위한 Stub 생성
UserServiceGrpc.UserServiceBlockingStub stub = UserServiceGrpc.newBlockingStub(channel);

// 조회할 User ID를 담은 요청 메시지 생성
UserRequest request = UserRequest.newBuilder().setId(1).build();

// UserService의 getUser RPC를 동기 호출하여 User 정보를 응답으로 수신
UserResponse response = stub.getUser(request);
```