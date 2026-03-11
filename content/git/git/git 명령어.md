
## init

```git
git init                 # 현재 디렉토리를 Git 저장소로 초기화
```
## clone

```git
git clone <repo-url>     # 원격 저장소를 로컬로 복제
```
### git history 없이 프로젝트 clone
``` git
1. 파일 탐색기로 해당 프로젝트를 복사할 위치 이동
2. 마우스 우클릭으로 git bash 열기

git clone <Repository주소> .

3. IDEA로 해당 프로젝트를 연 뒤 .git 제거

rm -rg .git

git init

git add .

git remote add origin <새 Repository 주소>
```
## status

```git
git status               # 변경사항, 스테이징 상태 확인
```
## add

```git
git add <파일명>         # 특정 파일을 스테이징
git add .                # 현재 디렉토리 전체 변경사항 스테이징
```
## commit

```git
git commit -m "메시지"    # 메시지를 붙여 커밋
```
## push

```git
git push origin main     # 로컬 main 브랜치를 원격 저장소에 푸시
```
## pull

```git
git pull origin main     # 원격 main 브랜치의 변경사항을 로컬에 가져옴
```
## branch
### 브랜치 생성
```git
git branch              # 현재 존재하는 브랜치 목록 확인
git branch <브랜치명>    # 새로운 브랜치 생성
```
### 브랜치 확인
``` git
# 원격 브랜치 확인
git branch -r
# 전체 브랜치 확인 (로컬 + 원격)
git branch -a
```
## checkout

```git
git checkout <브랜치명>  # 해당 브랜치로 이동
git checkout -b <이름>   # 브랜치 생성과 동시에 이동
```
## merge

```git
git checkout main             # main 브랜치로 이동
git merge <로컬 브랜치명>       # 로컬 브랜치를 main에 병합
```
## log

```git
git log                       # 커밋 로그 보기
git log --oneline             # 간략한 커밋 로그
```

## revert
``` git
git revert                    #과거 커밋을 취소하는 커밋을 생성
```

## reset

```git
git reset --soft HEAD~1       # 커밋만 취소
```
- 스테이징 유지, 커밋 취소
```git
git reset --mixed HEAD~1      # 마지막 커밋 삭제 및 되돌림
```
- 언스테이징 처리, 커밋 취소
```git
git reset --hard HEAD~1       # 마지막 커밋 삭제 및 되돌림
```
- 스테이징 삭제, 변화된 작업 디렉토리 삭제, 커밋 삭제
```git
git reset --keep HEAD~1       # 마지막 커밋 삭제 및 되돌림
```
- 스테이징 초기화(충돌 없을시), 작업 디렉토리 초기화(추가 파일 초기화, 수정 파일 유지)
```git
git reset --hard HEAD~1       # 마지막 커밋 삭제 및 되돌림
```
- 스테이징(충돌 감지), 작업 디렉토리(변경 사항 유지 시도)
## stash

```git
git stash                     # 변경사항 임시저장
git stash pop                 # 임시저장한 내용 다시 적용
```
## remote

```git
git remote -v                 # 연결된 원격 저장소 확인
git remote add origin <url>  # 원격 저장소 origin으로 등록
```
## fetch

```git
git fetch (origin)              # 원격 저장소의 변경사항 가져오기
```
## rebase

### 리베이스
```git
git rebase main               # 현재 브랜치를 main 위에 재적용
```
### 강제 리베이스
```git
# 강제로 덮어쓰기 (로컬 변경 날아감)
git rebase -f origin/kjw             
```

## config

```git
# 
git config user.name "홍길동"
git config user.email "hong@example.com"
```
