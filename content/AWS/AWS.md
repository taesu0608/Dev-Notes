
리전
- 지역 단위의 호스트 서버

AZ(Available zone)
- 가용가능한 물리적 공간

VPC
- 가상 네트워크 서비스 환경

서브넷
- Classless Inter-Domain Routing(CIDR): 0.0.0.1/16

인스턴스
- EC2 같은 가상 컴퓨터

AWS 보안 그룹(Security Group)
- EC2 인스턴스에 대한 인바운드 및 아웃바운드 트래픽을 제어하는 가상 방화벽입니다
- 모든 포트를 닫고 특정 포트를 여는 방식의 보안이 권장됨
``` terraform
ingress {
    from_port = 0
    to_port   = 0
    protocol  = "all"
    cidr_blocks = ["0.0.0.0/0"]
  }
```

권한의 모음 = 정책
정책을 부여하는 것 = 역할을 부여하는 것

---
1. dd 명령을 사용하여 루트 파일 시스템에 스왑 파일을 생성합니다.
- 명령에서 bs는 블록 크기이고 count는 블록 수입니다.
- 스왑 파일의 크기는 dd 명령의 블록 크기 옵션에 블록 수 옵션을 곱한 값입니다.
- 이러한 값을 조정하여 원하는 스왑 파일 크기를 결정합니다.
- 지정한 블록 크기는 인스턴스에서 사용 가능한 메모리보다 작아야 합니다.
- 그렇지 않으면 "memory exhausted" 오류가 발생합니다.
- 이 예제 dd 명령에서 스왑 파일은 4GB(128MB x 32)입니다.
```
sudo dd if=/dev/zero of=/swapfile bs=128M count=32
```

2. 스왑 파일의 읽기 및 쓰기 권한을 업데이트합니다.
```
sudo chmod 600 /swapfile
```

3. Linux 스왑 영역을 설정합니다.
```
sudo mkswap /swapfile
```

4. 스왑 공간에 스왑 파일을 추가하여 스왑 파일을 즉시 사용할 수 있도록 합니다.
```
sudo swapon /swapfile
```

5. 프로시저가 성공적인지 확인합니다.
```
sudo swapon -s
```

6. 루트 권한으로 변경
```
sudo su 
```

7. /etc/fstab 파일을 편집하여 부팅 시 스왑 파일을 시작합니다.
```
echo "/swapfile swap swap defaults 0 0" >> /etc/fstab
```

8. 재부팅 후 가상메모리 유지 되는지 확인
```
sudo reboot
```
---
 AWS 인증 정보를 찾는 우선순위
- jvm 옵션
- 환경 변수
- aws credential
	- aws configure list 명령어 입력시 credential-files 에 존재
- application yml
- I AM ROLE