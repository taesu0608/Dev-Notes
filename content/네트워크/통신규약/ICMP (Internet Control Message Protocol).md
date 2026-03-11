
1. IP(Internet Protocol)을 보완하여 추가적 기능 제공
2. 진단과 제어
3. 오류에 대한 응답
4. 오류에 대한 정보는 소스 IP 주소로 전송

- 인터넷 계층에 IP, TCP, UDP, ICMP 가 존재하나 실제 구현은 IP 레이어 위에 ICMP을 설계한다.
- 즉 IP 헤더 뒤에 ICMP 헤더가 붙는다.
- 이와 비슷하게 TCP, UDP 또한 IP 헤더 뒤에 TCP, UDP 헤더가 붙는다.
- 하지만 TCP와 UDP는 전송계층인 반면 ICMP는 인터넷 계층이다.

![[Pasted image 20251210144817.png]]

Protocol 패킷(Transport 패킷)에 그 다음 프로토콜이 무엇인지 표시한다.

ping 프로토콜
- icmp를 사용자가 직접 사용하도록 만들어진 응용프로그램
- echo request와 reply로 구성
- 