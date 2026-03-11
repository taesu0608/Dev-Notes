-  https://developer.mozilla.org/en-US/docs/Glossary/Packet?utm_source=chatgpt.com#priority

# 1. Packet
- 네트워크를 통해 전달되는 정형화된 데이터 청크
- 주요 구성 요소
	- **control infomation** - header
	- **user data** = payload
	
## 1.1. TCP/IP Packet 구조
![[Pasted image 20251213014245.png]]

# 2. 구성요소

## 2.1. Hop limit(TTL)

| 프로토콜 | 필드명       |
| ---- | --------- |
| IPv4 | TTL       |
| IPv6 | Hop Limit |
- 다른 네트워크를 통과할 때마다 hop이 발생함
- hop 발생시 hop limit에 저장된 값이 1씩 감소함
- hop limit 0 도달시 전송 작업은 실패되고 packet은 소멸됨

##  2.2. Error decteion and correction

오류 검출 정정 유형
1. forward error correction 
	- 수신측이 자동적으로 오류를 정정함
2. backward error correction
	- 송신자에게 전체 데이터 유닛을 재전송토록 요청

## 2.3. Priority
- 패킷의 우선순위를 저장함
- 네트워크가 혼잡할 때 높은 우선순위 큐를 보다 빠르게 비워냄

## 2.4. Address
- 송수신 측의 Ip 주소를 저장
	- Source Address
	- Destination Address

## 2.5. User data (payload)
- 애플리케이션을 대신하여 전달되는 데이터
- 네트워크 프로토콜 혹은 네트워크 장비에 의해 최대크기가 정해짐
