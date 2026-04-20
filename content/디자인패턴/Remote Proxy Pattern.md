- https://medium.com/@snigdhasanat/remote-proxy-pattern-397a89e2f794

# Remote Proxy Pattern

Remote Proxy는 여러 Proxy의 종류 중 하나이다.  
**(네트워킹 되어 있는) 서로 다른 메모리에 존재하는 객체를 동기화**하기 위한 목적을 가진다.  
이해를 돕기 위해, **서버-클라이언트 상황을 상정**하여 설명하겠다.

---

## 객체 관계도
---
![[1_CWaLGkDWgmP7WdIGkSjDpw.webp]]
## 객체 관계도 (Detail)
![[1_Cse7EzgXKHXCIbYth-WHmQ.webp]]
Remote Proxy의 목적은

> **물리적으로 다른 공간(다른 JVM 메모리)에서 실행되고 있는 객체를 마치 로컬 객체처럼 사용하는 것**.

---

## 프록시와 Runtime Memory
![[1_Fd7epEd9kC10LJu5mIt0AA.webp]]
- `Client Runtime`과 `Server Runtime`은 **서로 다른 메모리 공간**에서 실행되고 있다.
    
- 서버 측에는 실제 서비스를 수행할 객체인 `SalesOffice`가 있고,  
    클라이언트 측에는 그것을 프록시 형태로 사용하는 `LocalOffice`가 존재한다.
    

기본적인 로직은 다음과 같다:

> **LocalOffice의 메서드 호출 → SalesOffice에 전달되어 실제 동작 수행**

---

## Interface (프록시 정의부)

```java

import java.rmi.Remote;  
import java.rmi.RemoteException;  

public interface SalesOfficeRemote extends Remote {  
    void showCatalog() throws RemoteException;  
    double provideQuote() throws RemoteException;  
    void sell() throws RemoteException;  
    void providePostSalesService() throws RemoteException;  
}
```
### 설명:

- `Remote`: Java RMI에서 Remote Proxy 기능을 위해 반드시 상속받아야 한다.
    
- `SalesOfficeRemote`: Remote Proxy에서 **사용 가능한 메서드 목록을 명시**한다.  
    즉, 이 인터페이스가 **클라이언트와 서버 양측의 통신 규약**이 된다.
    

---

## 서버 측 구현 (SalesOffice)

```java
public class SalesOffice implements SalesOfficeRemote {  

    double quote = 100000;  

    @Override  
    public void showCatalog() {  
        System.out.println("showCatalog() called in remote");  
    }  

    @Override  
    public double provideQuote() {  
        System.out.println("provideQuote() called in remote");  
        return this.quote;  
    }  

    @Override  
    public void sell() {  
        System.out.println("sell() called in remote");  
    }  

    @Override  
    public void providePostSalesService() {  
        System.out.println("providePostSalesService() called in remote");  
    }  
}
```

### 설명:

- 실제 서버에서 동작할 객체
    
- 인터페이스인 `SalesOfficeRemote`를 구현하여 **클라이언트가 호출할 수 있는 모든 메서드**를 제공
    

---

## 클라이언트 측 (LocalOffice)

```java
public class LocalOffice {  
    SalesOfficeRemote salesOfficeRemote;  

    public LocalOffice(SalesOfficeRemote salesOfficeRemote){  
        this.salesOfficeRemote = salesOfficeRemote;  
    }  

    void showCatalogLocal() throws RemoteException {  
        System.out.println("Calling showCatalog() from local");  
        this.salesOfficeRemote.showCatalog();  
    }  

    double provideQuoteLocal() throws RemoteException {  
        double quote = this.salesOfficeRemote.provideQuote();  
        System.out.println("Calling provideQuote() from local");  
        return quote;  
    }  

    void sellLocal() throws RemoteException {  
        System.out.println("Calling sell() from local");  
        this.salesOfficeRemote.sell();  
    }  

    void providePostSalesServiceLocal() throws RemoteException {  
        System.out.println("Calling providePostSalesService() from local");  
        this.salesOfficeRemote.providePostSalesService();  
    }  
}

```

### 설명:

- 클라이언트 측 코드에서의 프록시
    
- `SalesOfficeRemote`를 주입받아 **마치 로컬 객체처럼 사용**하지만, 실제 동작은 서버에서 수행된다.
    

---
## RMI Registry

> 동기화될 프록시의 **직접적인 작업을 수행해주는 객체**  
> 즉, Remote 객체의 레지스트리 등록소 역할을 한다.  
> **서버 측에서 실행된다.**

---

## 서버측 - RMI 등록 코드

```java

public class LocalOffice {  
    SalesOfficeRemote salesOfficeRemote;  

    public LocalOffice(SalesOfficeRemote salesOfficeRemote){  
        this.salesOfficeRemote = salesOfficeRemote;  
    }  

    void showCatalogLocal() throws RemoteException {  
        System.out.println("Calling showCatalog() from local");  
        this.salesOfficeRemote.showCatalog();  
    }  

    double provideQuoteLocal() throws RemoteException {  
        double quote = this.salesOfficeRemote.provideQuote();  
        System.out.println("Calling provideQuote() from local");  
        return quote;  
    }  

    void sellLocal() throws RemoteException {  
        System.out.println("Calling sell() from local");  
        this.salesOfficeRemote.sell();  
    }  

    void providePostSalesServiceLocal() throws RemoteException {  
        System.out.println("Calling providePostSalesService() from local");  
        this.salesOfficeRemote.providePostSalesService();  
    }  
}

```
### 설명

- `UnicastRemoteObject.exportObject(...)`: 객체를 네트워크에서 호출 가능한 Remote 객체로 등록
    
- `registry.bind(...)`: RMI Registry에 `mySalesOffice`라는 이름으로 바인딩
    

---

## 클라이언트 측 - RMI 객체 탐색 및 사용

``` java
public class LocalClient {  
    public static void main(String[] args) {  
        try {  
            Registry registry = LocateRegistry.getRegistry(null); // null은 localhost 의미  

            SalesOfficeRemote salesOfficeRemoteProxy =  
                (SalesOfficeRemote) registry.lookup("mySalesOffice");  

            LocalOffice localOffice = new LocalOffice(salesOfficeRemoteProxy);  

            localOffice.showCatalogLocal();  
            localOffice.provideQuoteLocal();  
            localOffice.sellLocal();  
            localOffice.providePostSalesServiceLocal();  

        } catch (Exception e) {  
            System.err.println("Client exception: " + e.toString());  
            e.printStackTrace();  
        }  
    }  
}
```
### 설명:

- `registry.lookup("mySalesOffice")`: 이름으로 Remote 객체를 탐색하고 프록시(Stub)를 반환 받는다.

- `LocalOffice`에 주입하여 로컬처럼 사용

항목                 | 클라이언트 Proxy (Stub)                             | 서버 Proxy (Skeleton)
---------------------|----------------------------------------------------|-----------------------------------
위치                 | 클라이언트 JVM                                      | 서버 JVM
역할                 | 원격 객체의 메서드 호출을 가로채어 서버로 전달        | 전달받은 호출 요청을 실제 객체에 위임
구현 방식            | 인터페이스 기반 동적 생성, Stub 클래스              | Dispatcher로 자동 구현 또는 수동 처리
호출 정보 처리 방식  | 메서드와 파라미터를 reflection으로 추출 후 직렬화     | 역직렬화 후 reflection으로 실제 객체 실행
네트워크 처리        | TCP 소켓을 통해 호출 정보 전송                       | TCP 소켓으로 호출 정보 수신
통신 방식            | 요청(Request) 전송 (메서드명, 파라미터 포함)         | 응답(Response) 반환 (결과값 또는 예외)
핵심 클래스 예시     | RemoteStub, RemoteObjectInvocationHandler           | UnicastServerRef, (과거: Skeleton)



---
# Q&A)
### Q) RMI의 네트워크 통신 방식은?
###### A) `Registry`는 [[소켓 통신]] 을 기반으로 동작하는 객체 레지스트리

### Q) 클라이언트 프록시가 서버의 원격 객체 메서드 호출을 수행하는 방식
###### A) [[Reflection]] 과 직렬화를 통하여 메서드 및 매개변수를 전달한다.
1. 클라이언트가 프록시(Stub) 객체의 메서드를 호출
2. Stub 내부에서 호출된 메서드 정보(Method 객체)와 파라미터를 reflection으로 추출
3. 메서드 정보 + 파라미터를 직렬화
4. 직렬화된 호출 데이터를 네트워크 소켓을 통해 서버로 전송
5. 서버 측에서 호출 데이터를 수신하고 역직렬화
6. 역직렬화된 메서드와 파라미터를 기반으로 실제 객체에서 reflection으로 메서드 호출
7. 호출 결과(리턴값 또는 예외)를 직렬화
8. 결과 데이터를 다시 클라이언트로 전송
9. 클라이언트에서 결과를 역직렬화하여 로컬에서 메서드를 호출한 것처럼 처리