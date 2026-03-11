# 1. Dockerfile

## 1.1. 정의

- **Dockerfile**은 Docker 이미지 생성을 자동화하기 위한 **텍스트 기반의 스크립트 파일**로,  
    명령어(Instructions)들을 조합하여 애플리케이션을 실행 가능한 Docker 이미지로 변환하는 빌드 레시피다.
    
- in Docker
    
    > _"A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image."_
    

## 1.2. 목적

- 애플리케이션이 실행되기 위한 모든 "환경 조건 + 실행 절차"를 코드로 기술하여, 개발 → 테스트 → 배포에 이르기까지의 전체 과정을 자동화하고, 어디서나 재현 가능하게 만드는 것.


---

# 2. 특징

## 2.1. 주요 인스트럭션

| 명령어          | 설명                                                         |
| ------------ | ---------------------------------------------------------- |
| `FROM`       | 기반이 되는 base 이미지 지정 (ex. OS, JDK, Node 등)                   |
| `RUN`        | 이미지 빌드 중 실행할 커맨드 (셸 명령 등)                                  |
| `COPY`       | 호스트의 파일/디렉토리를 이미지에 복사 (정확하고 안전)                            |
| `ADD`        | COPY처럼 파일 추가, 하지만 URL 지원 및 압축 해제 기능 포함                     |
| **`ENV`**    | 환경 변수 설정. `$VAR`, `${VAR}` 형태로 사용 가능. 기본값 지정도 가능.          |
| `EXPOSE`     | 컨테이너가 사용할 네트워크 포트 지정                                       |
| `CMD`        | 컨테이너 시작 시 기본 실행 커맨드 (실행 타이밍은 run-time)                     |
| `ENTRYPOINT` | 컨테이너 실행 시 강제적으로 실행되는 커맨드 지정                                |
| `WORKDIR`    | 명령어 실행 시 기준이 되는 작업 디렉토리 설정                                 |
| `VOLUME`     | 데이터 영속성을 위한 외부 볼륨과 연결 (호스트 ↔ 컨테이너)                         |
| 기타           | `USER`, `ARG`, `LABEL`, `SHELL`, `HEALTHCHECK` 등 다양한 설정 가능 |

## 2.1.2 ENV 예시 설명

```dockerfile
# 여기서 설정한 변수는 $name, ${name}의 형태로 사용할 수 있음
ENV VERSION 1.0
RUN echo $VERSIONtext        # 빈 문자열 출력 (VERSIONtext 변수 없음)
RUN echo ${VERSION}text      # '1.0text' 출력 (VERSION 변수에 'text' 붙음)
```

- `${VAR}` 형태로 감싸면 **변수명 경계가 명확**해져 문자열 연결이 안전해짐  
- `$VERSIONtext`는 존재하지 않는 변수로 인식되어 출력이 없음  
- `${VERSION}text`는 `VERSION=1.0`이므로 `1.0text`가 출력됨

```dockerfile
# ${name:-else} : name이 정의가 안되어 있다면 `else`가 사용됨
RUN echo ${MY_VAR:-default_value}
```

- `MY_VAR`가 설정되어 있지 않으면, `default_value`가 출력됨  
- 이 구문은 **기본값 설정**에 유용함



---

# 3. CF

### cf) Dockerfile 생명주기 개요

| 단계               | 설명                                                  |
| ---------------- | --------------------------------------------------- |
| 1. Dockerfile 작성 | 필요한 명령어들을 정의하여 실행 환경 및 앱을 구성                        |
| 2. docker build  | Dockerfile을 기반으로 이미지 생성 (`docker build`)            |
| 3. docker run    | 이미지를 기반으로 컨테이너 생성 및 실행 (`docker run`)               |
| 4. 컨테이너 종료       | 컨테이너가 종료되면 정지 상태로 전환 (`docker stop`)                |
| 5. 삭제            | 필요 없는 이미지/컨테이너는 수동으로 삭제 (`docker rm`, `docker rmi`) |

### cf) 생명주기 명령어 요약

|목적|명령어|
|---|---|
|컨테이너 정지|`docker stop [컨테이너명]`|
|컨테이너 삭제|`docker rm [컨테이너명]`|
|이미지 삭제|`docker rmi [이미지명]`|
|모든 정지 컨테이너 삭제|`docker container prune`|
|모든 미사용 이미지 삭제|`docker image prune` 또는 `docker system prune`|
