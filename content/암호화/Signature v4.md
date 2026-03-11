# AWS 요청 서명 방식 - Signature v4

Secret Access Key를 이용해 요청에 서명을 추가하고, 이를 받은 AWS가 해당 서명을 검증하여 신뢰성을 판단함.

---

## 1. 개요

- **Secret Access Key**: 비밀 키로 요청을 서명
- **Signature v4**: AWS에서 사용하는 대표적인 요청 서명 방식
- 공개키 서명인증 방식

---

## 2. 인증 흐름 요약

### 클라이언트 측 처리

1. 요청(request) 구성  
   예: `GET https://s3.amazonaws.com/mybucket`

2. 요청 정보를 기반으로 **Canonical Request** 생성  
   - 메서드  
   - URI  
   - 쿼리 스트링  
   - 헤더  
   - 바디 해시 등 포함

3. **String to Sign** 생성  
   - 날짜  
   - Credential Scope  
   - Canonical Request의 해시 등 포함

4. **HMAC-SHA256**을 사용해 **Secret Access Key**로 서명 생성  
   → 이게 최종 **Signature**

5. **Authorization 헤더**에 서명 포함  
   예:
   ```
   Authorization: AWS4-HMAC-SHA256 Credential=..., SignedHeaders=..., Signature=...
   ```

---

### 서버(AWS) 측 처리

6. **Authorization 헤더**에서 Access Key ID 확인

7. 클라이언트와 동일한 방식으로 Signature 재생성

8. 클라이언트가 보낸 Signature와 비교

9. Signature가 **일치하면 인증 통과**, 일치하지 않으면 **실패**

---
## 3. QnA
### Q) 서버는 클라이언트의 서명 방식을 어떻게 아는가?
###### A) 서명(Signature)은 두가지 정보를 기반으로 생성된다.
1. Authorization 내의 정보
- 인증 요청시 request header에 포함
2. Secret Access Key
- IAM(Identity and Access Management)를 통해 이미 등록된 상태