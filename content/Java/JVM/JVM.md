https://inpa.tistory.com/entry/JAVA-%E2%98%95-JVM-%EB%82%B4%EB%B6%80-%EA%B5%AC%EC%A1%B0-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EC%98%81%EC%97%AD-%EC%8B%AC%ED%99%94%ED%8E%B8
### Cf) 학습이유
1. JAVA에서 파생된 모던 언어(Kotlin,Scalar) 또한 JVM을 따름
JVM(Java Virtual Machine)
2. 자바 바이트 코드가 어떠한 처리를 거쳐 프로그램이 실행되는지 탐색
# 1. JVM 

![[Pasted image 20250520115718.png]]

## 1.1. JVM 동작순서
0. 자바 프로그램 실행시 JVM은 OS로부터 메모리를 할당받음
1. 컴파일 (`.java` > `.class`)
	 자바 바이트 코드(.class)파일 생성
		- 자바 바이트 코드 +
		- 바이트 코드의 각 명령어는 1바이트 크기의 `Opcode`(연산코드)와 추가 피연산자로 구성
2. [[클래스 로더 (Class Loader)]]의 동적로딩(Dynamic Loading)
	- **로딩(Loading)**: `Class` 객체를 만듬
	- **링킹(Linking)**: 로딩된 클래스 검증(Verify), 참조 준비/해결(Prepare/Resolve)
	- i.e.) JVM 메모리 로드
3. 실행 엔진 (Execution Engine)
- JVM 메모리에 적재된 바이트 코드들을 명령어 단위로 하나씩 가져와 실행
	3.1. Runtime Data Area에 로딩 된 바이트 코드 해석
	3.2. Execution Engine에 의해 Garbage Collector의 작동과 Thread 동기화
	- 실행 엔진은 두가지 방식을 혼용
		- **인터프리터(Interpreter)**: 바이트 코드 명령어를 하나씩 읽어서 해석하고 실행
			- 단문의 실행은 빠르나, 전체적인 실행 속도가 느림
		**JIT 컴파일러(Just-In-Time Compiler)**: 한번의 컴파일로 바이트 코드 전체를 네이티브 코드로 변환하여 이후에는 해석 없이 실행함

# 2. JVM 특징
## 2.1. JVM 구성요소
1. 클래스 로더 (Class Loader)
2. 실행 엔진 (Excution Engine)
	- 인터프리터 (Interpreter)
	-  JIT 컴파일러 (Just-in-Time)
	- 가비지 콜렉터 (Garbage collector)
3. 런타임 데이터 영역 (Runtime Data Area)
4. JNI (Native Method Interface)
5. 네이티브 메소드 라이브러리 (Native Method Library)
![[Pasted image 20260220064119.png]]

## 2.2. 클래스 로더 (Class Loader)
- 클래스 파일의 로딩 순서
	- Loading > Linking > Initialization
![[Pasted image 20260121195856.png]]

### 2.2.1. 클래스 로더 세부 동작
1. 로드(Loading): 클래스 파일을 가져와서 JVM의 메모리에 로드
2. 링크(Linking)
	- 검증(Verifying): 자버 언어 명세(Java Language Specification) 및 JVM 명세에 명시된 대로 구성되어 있는지 검사
	- 준비(preparing): 클래스가 필요로 하는 메모리 할당 (field, method, interface)
	- 분석(Resolving): 클래스의 상수 풀 내 모든 심볼릭 레퍼런스를 다이렉트 레퍼런스로 변경
3. 초기화: 클래스 변수들을 적절한 값으로 초기화 ([[Static]] 필드)

# 2.3. 실행 엔진 (Execution Engine)
- 바이트 코드를 명령어 단위로 읽어서 실행
- 인터프리터(Interpreter), JIT 컴파일러(Just-In-Time Compiler)

### 2.3.1. 인터프리터 (Interpreter)
- 바이트 코드 명령어를 하나씩 읽어서 해석하고 바로 실행
- 전체적인 속도가 느림
	- 반복되는 메소드 또한 매번 해석하며 실행

### 2.3.2. JIT 컴파일러(Just-In-Time Compiler)
- 바이트 코드 전체를 컴파일하여 Native Code로 변경 후, 반복되는 메서드는 캐싱하여 실행
	- **네이티브 코드(Native Code)**: C, C++, 어셈블리어

## 2.4. 가비지 컬렉터 (Garbage Collector, GC)
- Heap 메모리 영역에는 더는 사용하지 않는 메모리를 자동을 회수
- 일반적으로 자동으로 실행됨(GC가 실행되는 시간은 정해져 있지 않음)
- Full GC시, GC를 제외한 모든 스레드가 중지됨
### Cf) 수동으로 GC 실행은 System.gc() 메서드를 사용 가능

# 3. 런타임 데이터 영역 (Runtime Data Area)
## 3.1. Method Area (Static Area)

#### 용도
- 클래스와 인터페이스의 런타임 상수 풀
- 클래스 메타데이터 (클래스 이름, 상속 정보, 접근 제어자)
- 필드 정보
- static 변수
- 메서드 정보 및 메서드 바이트코드
#### 사용 기간
- JVM 시작 시 생성
- 프로그램 종료 시까지 유지
- (HotSpot 기준) 명시적 null 선언 시 GC 대상 가능
#### 스레드 공유
- 모든 스레드에서 공유
## 3.2. Runtime Constant Pool

#### 용도
- 클래스 파일의 Constant Pool을 런타임에 적재한 영역
- 리터럴 값, 클래스/메서드/필드 참조 정보 저장
- 동적 상수(String.intern 등) 관리
#### 사용 기간
- 클래스 로딩 시 생성
- 클래스 언로드 시 소멸
#### 스레드 공유
- 모든 스레드에서 공유
## 3.3. Heap Area
#### 용도
- new 키워드로 생성된 객체 및 배열 저장
- 인스턴스 변수 저장
#### 사용 기간
- 객체 생성 시 할당
- 참조가 제거되면 GC 대상
#### 스레드 공유
- 모든 스레드에서 공유
## 3.4. Stack Area (Java Stack)

#### 용도
- 메서드 호출 시 생성되는 스택 프레임 저장
- 저장 내용
  - 지역 변수
  - 매개변수
  - 연산 중간 결과
  - 반환 주소
#### 사용 기간
- 스레드 생성 시 생성
- 스레드 종료 시 소멸
- 메서드 종료 시 스택 프레임 제거
#### 스레드 공유
- 스레드별 독립적

## 3.5. PC Register (Program Counter Register)

#### 용도
- 현재 실행 중인 바이트코드 명령어 주소 저장
- 다음에 실행할 명령어 위치 추적
#### 사용 기간
- 스레드 생성 시 생성
- 스레드 종료 시 소멸
#### 스레드 공유
- 스레드별 독립적

## 3.6. Native Method Stack

#### 용도
- Native 코드(C/C++) 실행 정보 저장
- JNI(Java Native Interface) 호출 시 사용
#### 사용 기간
- 스레드 생성 시 생성
- 스레드 종료 시 소멸
#### 스레드 공유
- 스레드별 독립적



## 4. 스레드 공유 여부 요약

| 영역 | 공유 여부 |
|---|---|
| Method Area | 공유 |
| Heap | 공유 |
| Runtime Constant Pool | 공유 |
| Stack | 스레드별 |
| PC Register | 스레드별 |
| Native Method Stack | 스레드별 |

---
