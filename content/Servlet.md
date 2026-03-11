# 1. Servlet
- Spring MVC의 **발전 과정**
- [10분 테코톡] 루키의 Servlet & Spring Web MVC(https://www.youtube.com/watch?v=h0rX720VWCg)
## 1.1. 배경
정적 컨텐츠 제공은 다양한 경험을 제공하지 못하여
동적 컨텐츠 제공 방식이 고안됨

## 2. CGI(Common Gate Interface)
- 동적인 데이터를 제공하기 위한 규약
![[Pasted image 20250721163913.png]]![[Pasted image 20250721163928.png]]
- 웹 서버가 CGI 프로그램을 실행만 하고, 결과를 받아 클라이언트에 전달하는 **단방향 위임 모델**
### CGI 특징
- 장점
	- 언어 제약 X
	- 격리된 구조
- 단점: 개별의 Client 요청 -> 개별의 Process가 필요 -> 개별의 CGI 구현체가 필요
## 2.1. 초기 Servlet
![[Pasted image 20250721164645.png]]
- 실행단위를 Process가 아닌 Thread로, 동일 구현체 생성(Process)을 Singleton 패턴을 적용
	- 재사용성이 높아져 메모리 절약

### 2.1.1. Servlet 특징
- 장점
	- 메모리 절약
	- HTTP 메서드(GET, POST 등) 자동 분기
- 단점
- JSP, Servlet 등에서 요청 URL마다 각기 다른 Servlet 매핑
	1. 여러 Servlet 생성시 service() 메서드에서 중복
	2. Servlet에 종속적인 구조를 가짐
	3. 이후, 각 컨트롤러에서 공통으로 처리해야하는 로직이 생기면 중복이 발생
> 즉 중복 발생 및 종속성 발생
> 이를 해결하기 위해 Front Controller Pattern 사용

### 2.1.2. HttpServlet의 service() 메서드 구조
```java
@Override
protected void service(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException {
    
    String method = req.getMethod();

    if (method.equals("GET")) {
        doGet(req, resp);
    } else if (method.equals("POST")) {
        doPost(req, resp);
    } else if (method.equals("PUT")) {
        doPut(req, resp);
    } else if (method.equals("DELETE")) {
        doDelete(req, resp);
    } else if (method.equals("HEAD")) {
        doHead(req, resp);
    } else if (method.equals("OPTIONS")) {
        doOptions(req, resp);
    } else if (method.equals("TRACE")) {
        doTrace(req, resp);
    } else {
        resp.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, method + " not supported");
    }
}
```

### 대표적인 WAS 종류
|WAS 이름|설명|
|---|---|
|**Tomcat**|가장 널리 쓰이는 서블릿 컨테이너 / 경량 WAS|
|**Jetty**|빠르고 가벼운 WAS, 내장 서버로 자주 사용|
|**Undertow**|비동기 기반 경량 WAS, Spring Boot 2.x 이후 내장 WAS 옵션|
|**JBoss/WildFly**|기업용 풀스택 WAS|
|**WebLogic, WebSphere**|Oracle/IBM의 상용 WAS|

## 3. Servlet + Front Controller Pattern
- Spring MVC의 DispathcerServlet
``` java
@Controller
public class UserController {
	@PostMapping("/login")
	public String login(){}

	@GetMapping("/list")
	public String list(){}
}
```

### 3.1. Front Controller 특징
- 장점
	- 중복되는 코드 재사용성 증가
	- Servlet 종속 구조 -> Model<String, Obeject>로 변경
### 3.2. Front Controller의 역할
![[Pasted image 20250722223855.png]]