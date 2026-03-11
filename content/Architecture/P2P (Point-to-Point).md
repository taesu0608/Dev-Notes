- [https://www.ibm.com/kr-ko/think/topics/end-to-end-testing](https://www.geeksforgeeks.org/system-design/peer-to-peer-p2p-architecture/?utm_source=chatgpt.com)

# 1. What is a Peer-to-Peer architecture?
- 네트워크 내 노드들이 동등한 관계를 가지는 분산 컴퓨팅 모델
- 각각의 노드들이 **직접적으로** 의사소통(communication)과 자원 공유(sharing resources)

## 1.1. P2P의 목적
- scalability, fault tolerance, resilience 도달
### 1.1.1. 확장성 (Scalability)
- 노드 수에 따라 시스템 처리 능력이 같이 증가함
- [[Client - Sever]]는 노드 수 증가에 따라 서버 능력 향상(scale out)이 요구됨
### 1.1.2. 장애 허용성 (Fault Tolerance)
- 일부 노드가 fault가 되어도 시스템이 멈추지 않음
### 1.1.3. 회복 탄력성 (Resilience)
- 장애를 겪은 뒤에도 스스로 회복하며, 정상 상태로 돌아가는 능력
	- fault tolerance 보다 더 한단계 높은 개념
1. topology 재구성
	- 끊어진 노드들의 연결 경로를 탐색후 경유하여 재연결
	- ex) 라우팅 경로 재구성
2. 데이터 재복제
	- 데이터를 들고 있던 노드가 사망, 복제본 수가 기준 이하로 감소
	- 살아있는 노드가 새로운 replica 생성
3. 역할 재선정 / 책임 재할당
	- 장애가 난 노드의 역할을 다른 노드들이 자동으로 이어받는 것
	- ex) Kafka의 leader election

## 1.2. P2P의 특징
1. 분산 (Decentralization)
	- 중앙 권한 없이 P2P 네트워크가 동작
2. 확장성 (Scalability)
	- 중앙화 된 인프라 없이 많은 수의 노드들을 쉽게 scale out 함
3. 장애 허용성 (Fault Tolerance)
4. 자원 공유 (Resource Sharing)
	 - 노드끼리 의사소통과 자원공유를 직접적으로 함
5. 자율성 (Autonomy)
	- P2P 네트워크에서 각 노드는 자신의 자원과 의사결정에 대해 자율성을 가짐
	-  자율성은 네트워크 전체의 회복력(resilience)과 유연성(flexibility)을 높임

## 1.3. P2P 시스템의 주요 요소
### 1.3.1. Peer Nodes
- P2P 네트워크의 개별 참여자들로,  각 노드는 서로에게 Client - Server 역할을 수행
### 1.3.2. Overlay Network
- 피어 노드들을 연결하여  통신과 자원 공유를 가능하게 하는 **가상(논리적) 네트워크 구조**이다.
### 1.3.3. Indexing Mechanisms
- 공유 자원을 인덱싱하여, 효율적인 검색과 조회가 가능하도록 하는 시스템
### 1.3.4. Bootstrapping Mechanisms
- 새로운 노드가 네트워크에 참여할 수 있도록 하는 **노드 발견 및 네트워크 초기화 과정**

## 1.4. Bootstrapping in P2P Networks
- 부트스트래핑 절차는 새로운 노드를 추가하거나 발견했을때 실행함
- 실행 작업
	- 노드 탐색
	- 네트워크 구성
	- 프로토콜 연결
- 일반적인 부트스트래핑 방법
	- 중앙 집중식 부트스트랩 서버
	- [[분산 해시 테이블 (distributed hash tables)]]
	- 피어 교환 프로토콜
# 2. Types of Peer-to-Peer (P2P) Networks
## 2.1. Pure P2P Networks
- 어떠한 중앙 권한, 중앙 인프라 없이 수행

## 2.2. Hybrid P2P Networks
- 분산 아키텍처와 중앙 아키텍처가 결합된 네트워크
1. 중앙 서버나 super peer가 네트워크에 포함되어 리소스 관리 혹은 추가적인 서비스를 제공한다.
2. 분산과 효율성 사이의 균형을 도달하기 위함
- ex) Skype and eDonkey

## 2.3. Overlay P2P Networks
- 기존 인프라 위에 가상의(논리적인) 네트워크 구성
	- 자원 공유와 의사소통을 촉진시키는 오버레이 구조를 형성
- 자원을 효율적으로 탐색하고 가져오기 위해 분산 해시 테이블 (DHT)나 라우팅 메커니즘을 자주 사용

## 2.4. Structured P2P Networks
-  구조화된 P2P 네트워크는 특정한 topology 혹은 구조체(별형, 트리형, 메쉬형) 내에서 Peer로 구성된다.
- Peer는 라우팅 테이블이나 데이터 구조를 유지
	- 효율적인 리소스 탐색, 데이터 반환을 위해
	- **예측가능한** 퍼포먼스와 확장성 제공
		- 추가적인 오버헤드 필요

## 2.5. Unstructured P2P Networks
- 특정한 topology나 peer들끼리의 연결을 구성할 수 없음
- 해당 네트워크 내에서는 **전파(flooding)** 이나 **무작위 탐색 알고리즘**에 의지하여 자원을 탐색
	- 효율성은 낮지만, 높은 유연성과 단순함

# 3. P2P networks의 데이터 관리
- 저장(storage), 회수(retrieval), 복제(replication), 일관된 관리(consistency maintenance)
### 3.1.1. 분산형 저장소 (Decentralized Storage)
- 단일 장애 지점(SPOF)에 대한 의존성을 제거
- 데이터 가용성 향상
	- 데이터 가용성(data availability): 데이터를 요청했을 때 시스템이 살아있는 노드를 통해 데이터를 제공할 수 있는 확률

### 3.1.2. 데이터 회수 (Data Retrieval)
- 