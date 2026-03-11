# 1. OSI-7 계층
- 인터넷에 연결된 시스템 간 통신 규약의 표준
- International Organization for Standardization에서 제정

> Cf) 인터페이스, 규약, 프로토콜의 필요성
> - 표준화된 규약
> - 모듈화를 통한 개발 및 검증의 효율을 높임
> - 각 계층별 기능을 정의 (OSI - 7)

## 1.1. OSI - 7 계층 종류
| 계층  | 계층 이름                  | 주요 역할                  | 데이터 포맷 (PDU) | 예시                   |
| --- | ---------------------- | ---------------------- | ------------ | -------------------- |
| 7   | 응용 계층Application       | 사용자와 가장 가까운 계층, 서비스 제공 | **Data**     | HTTP, FTP, SMTP, DNS |
| 6   | 표현 계층<br>Presentation  | 인코딩, 압축, 암호화           | **Data**     | SSL/TLS, JPEG, ASCII |
| 5   | 세션 계층<br>Session       | 세션 생성, 유지, 종료          | **Data**     | NetBIOS Session      |
| 4   | 전송 계층<br>Transport     | 종단 간 통신, 신뢰성, 포트       | **Segment**  | TCP, UDP             |
| 3   | 네트워크 계층<br>Network     | 논리적 주소 지정, 경로 선택       | **Packet**   | IP, ICMP             |
| 2   | 데이터 링크 계층<br>Data Link | 물리적 주소, 오류 검출          | **Frame**    | Ethernet, ARP        |
| 1   | 물리 계층<br>Physical      | 비트 전송, 전기적 신호          | **Bit**      | 케이블, 허브              |

# 2. 계층별 특징
## 2.1. 물리 계층 (Physical Layer)
- 하드웨어적 전송 규약(물리적 신호)
- 데이터의 오류 확인 등은 상위 계층에서 진행
- 정교한 설계 요구

## 2.2. 데이터 링크 계층 (Data Link Layer)
### 2.2.1. 데이터 링크 계층 역할
- 흐름 제어: 송신 측과 수신 측의 속도 차이를 조정
- 오류 제어: 오류 검출과 회복
- 순서 제어: 프레임의 순서적 전송
- 프레임 동기화: 프레임의 시작과 끝을 구별하기 위한 동기화

### 2.2.2. 특징
- point to point 간의 신뢰성있는 전송 보장
	- MAC Address를 식별자로 하는 노드 간(point-to-point) 통신
	- **MAC Adddress**
		- 앞 24 비트: 제조사(OUI)
		- 뒤 24 비트: 해당 제조사의 기기 고유 번호
- 전기적 신호 전송간의 오류 처리
	- 수정 혹은 재전송 요구
- **전송 단위**: Frame


## 2.3. 네트워크 계층 (Network layer)
- 경로와 주소를 정하고 패킷을 전달해주는 것이 이 계층의 역할
- **전송 단위**: [[Packet]]/Datagram
- 