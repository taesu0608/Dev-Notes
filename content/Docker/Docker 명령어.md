
## 이미지 생성
```Docker
docker build -t [이미지명]:[tag번호] .
```

## 이미지 실행
```Docker
docker run -d -p 8080:8080 --name 컨테이너이름 이미지이름:태그
```

## 이미지 push
```Docker
docker push [이미지명]:[tag번호]
```
- Docker 허브의 push시 이미지명 처음 uri와 사용자 명이 같아야함
	- ex) **taesu0608**/app = 이미지명

## 이미지 ll
```Docker
docker push [이미지명]:[tag번호]
```

- ex) docker pull ghcr.io/prgrms-web-devcourse-final-project/schs:latest
