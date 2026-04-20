# 1. 카프카 (Kafka)
- [[Event-Driven Programming]] 관점에서 파생된, 다량의 많은 이벤트 형식 데이터(Event)를 시간 순서(Log) 관리에 최적화된 플랫폼
	- [[P2P (Point-to-Point)]]
- Producer / Consumer 모델을 통해 책임을 분리, 데이터 생산과 소비의 결합을 낮춤
- **클러스터 메타데이터**와 **합의**를 관리하여  분산 환경에서도 **일관된 로그 처리**와 **장애 복구**를 가능하게 함
	- 클러스터 메타데이터
		- 클러스터: 여러 노드(Broker)를 묶어 하나의 시스템으로 다룸
	- 합의
		- 클러스터 메타데이터 변경에 대해 모든 브로커가 동일한 결론에 도달하도록 보장하는 절차
## 1.1. 카프카 클러스터

![[Pasted image 20260216055935.png]]

### 1.1.1. Producer / Consumer
- Producer(= 데이터 생산자, source application)
- Consumer(= 데이터 소비자, target application)

### 1.1.2. Kafka Cluster / Brokers
- Kafka는 여러 대의 서버(Broker)를 묶어 **클러스터(Cluster)** 단위로 동작
- 각 **Broker**는 클러스터를 구성하는 개별 노드
	- **Broker 역할**: 메시지를 저장, 전송하는 
  
#### Kafka Cluster  
- 여러 Broker를 하나의 논리적 시스템으로 묶은 단위  
- 장애 발생 시에도 일부 Broker만으로 서비스 지속 가능
- Kafka 클러스터를 구성하는 각 Broker에 파티션과 복제본이 분산 배치됨
	- 각 Broker가 이를 저장·처리한다.
  
#### Broker  
- Kafka 클러스터를 구성하는 서버 인스턴스 
- 하나 이상의 파티션 데이터를 디스크에 저장  
- Producer로부터 메시지를 수신, Consumer의 요청에 의해 메시지 전달  
- 파티션 구분
	- 리더 파티션 (Leader partition)
	- 팔로워 파티션 (follower partition)


## 1.2. Topic
- https://www.researchgate.net/figure/Kafkas-architecture-illustrated-with-3-partitions-3-replicas-and-5-brokers_fig2_326564203
![[Pasted image 20260310213235.png]]
### 1.3.1. topic