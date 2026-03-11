***
# 1. Buffer
## 1.1. 정의
 
- a data buffer (or just buffer) is a region of memory used to store data temporarily while it is being moved from one place to another.
	- 일시적인 데이터 저장
	- 메모리 구역
- Buffers can be implemented in a fixed memory location in hardware or by using a virtual data buffer in software that points at a location in the physical memory.
	- 하드웨어 버퍼, 가상 소프트웨어 버퍼로 구현되지만 물리적 메모리는 필수
- The majority of buffers are implemented in [software](https://en.wikipedia.org/wiki/Software "Software"), which typically use [RAM](https://en.wikipedia.org/wiki/Random-access_memory "Random-access memory") to store temporary data because of its much faster access time when compared with [hard disk drives](https://en.wikipedia.org/wiki/Hard_disk_drive "Hard disk drive").
	- 버퍼는 주로 가상 소프트웨어 버퍼로 구현된다.
	- 물리적 메모리는 [[RAM]]을 주로 사용
		- cause) [[HDD]] 사용보다 빠르다.
## 1.2. 목적

- 데이터 전송 시 두 노드 간의 전송 속도 혹은 처리 속도의 차이를 보강하기 위한 임시 기억 장치
***
# 2. 특징

## 2.1. 자료구조
- [[큐 (Queue)]]

## 2.2. Q & A
### Q) 버퍼링의 최적환경
###### A) 출력속도가 더 빨라야 안정성이 보장된다.

| 상황      | 결과                   |
| ------- | -------------------- |
| 입력 >출력  | 버퍼 오버플로우 → 데이터 손실 가능 |
| 입력 < 출력 | 버퍼 효율적 처리 → 지연 최소화   |
### Q) 출력이 더 빠를 때 버퍼의 역할
###### A) 예외 경우 효율적이고 안정적인 데이터 흐름을 만들어줌
	예외상황
	- 갑자기 입력이 몰릴 때 (스파이크)
	- 네트워크 지연으로 인한 순간적인 밀림 현상

### Q) 왜 [[burstBuffer]]는 SSD를 물리적 메모리로 사용할까?
###### A) Buffer는 일반적으로 RAM을 기반으로 구현되며, 이는 빠른 접근 속도를 위해 사용된다. 그러나 분산 컴퓨팅 시스템이나 영상 스트리밍과 같이 대용량 데이터 스트림이 입력되는 경우, 순간적인 처리 속도를 높이는 것보다 병렬성과 데이터 수용 능력을 확대하는 방식이 더 효율적이다. 이러한 이유로, 처리 속도는 RAM보다 낮지만 용량이 크고 가격이 저렴한 SSD와 같은 저장 장치가 버스트 버퍼 등에서 물리적 저장 매체로 사용된다.

### Q) 왜 병렬 처리의 규모를 키우는 것이 직렬 처리의 속도를 높이는 것보다 더 효율적인가?

###### A) 직렬 처리 속도는 클럭 속도, 발열, 전력 소모 등 물리적인 한계에 부딪히기 때문에 성능 향상에 제한이 있다. 반면, 병렬 처리는 작업을 나누어 여러 연산 단위에서 동시에 처리할 수 있어 처리량이 선형 혹은 지수적으로 증가할 수 있다. 특히 대용량 데이터 처리나 실시간 스트리밍 환경에서는 전체 처리 성능을 높이기 위해 제한된 처리 속도보다 병렬적으로 데이터를 수용할 수 있는 구조를 갖추는 것이 더 효율적이다.

### Q) 병렬 처리에서 동시에 도착하는 데이터의 충돌 문제는 어떻게 해결하나? 최신 기법은 무엇인가?

###### A) 병렬 처리에서는 동시에 접근하는 데이터의 충돌이나 순서 문제를 방지하기 위해 전통적으로 [[flag]], 락([[Mutex]]), [[Semaphore]] 등을 사용해왔다. 하지만 최근에는 성능과 안정성을 모두 고려한 다양한 동기화 기법이 활용되고 있다. 대표적으로는 락 프리 알고리즘(CAS 기반), 멀티버전 동시성 제어(MVCC), 액터 모델(Actor Model), 소프트웨어 트랜잭셔널 메모리(STM), 그리고 비동기 태스크 기반 처리(async/await + 스케줄러) 방식 등이 있다. 이들은 데이터 충돌을 원천적으로 방지하거나 효율적으로 해결함으로써, 병렬 환경에서도 안정적이고 빠른 처리를 가능하게 한다.
***
# 3. CF

---
