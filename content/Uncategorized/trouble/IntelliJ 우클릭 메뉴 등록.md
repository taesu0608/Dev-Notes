# 1. IntelliJ 우클릭 메뉴 등록

## 1.1. 목적

탐색기 폴더 배경 우클릭 시 **"Open Folder as IntelliJ IDEA Project"** 메뉴를 추가하여 IntelliJ에서 빠르게 폴더 열기

---
# 2. 단계별 설정

## 2.1. 레지스트리 편집기 실행

- **단축키:** `Win + R` → `regedit` 입력 → 엔터
    
- **이동 경로:**
    
    `HKEY_CLASSES_ROOT\Directory\Background\shell`
    

## 2.2. IntelliJ IDEA 키 생성

1. `shell` 폴더에서 **우클릭 → 새로 만들기 → 키**
    
2. **이름:** `IntelliJ IDEA`
    

### 2.2.1. 기본값 변경

- 오른쪽 창에서 `(기본값)` 더블클릭
    
- **값:**
    
    `C:\Program Files\JetBrains\IntelliJ IDEA 2024.1\bin\idea64.exe`
    
### 2.2.2. 아이콘 설정

- 오른쪽 창에서 **우클릭 → 새로 만들기 → 문자열 값**
    
- **이름:** `Icon`
    
- **값 (예시):**
    
    `C:\Program Files\JetBrains\IntelliJ IDEA 2024.1\bin\idea64.exe`
    

## 2.3. command 키 생성

1. `IntelliJ IDEA` 키 선택
    
2. **우클릭 → 새로 만들기 → 키 → 이름:** `command`
    
3. `(기본값)` 더블클릭 → 아래 값 입력
    
    `"C:\Program Files\JetBrains\IntelliJ IDEA 2024.1\bin\idea64.exe" "%V"`
    

---

# 3. 적용 확인

## 3.1. 탐색기에서 테스트

- **아무 폴더의 빈 공간에서 우클릭**
    
- `"Open Folder as IntelliJ IDEA Project"` 메뉴가 보이면 성공
    

---

# 4. .reg 파일 내보내기

## 4.1. 내보내기 방법

1. **레지스트리 편집기에서** 해당 키(`IntelliJ IDEA`가 포함된 `shell` 경로)를 선택
    
    `HKEY_CLASSES_ROOT\Directory\Background\shell\IntelliJ IDEA`
    
2. **우클릭 → 내보내기**
    
3. 저장 위치 및 파일 이름 지정
    
    - **파일 형식:** `.reg`
        
    - 예: `open_with_intellij.reg`
        

## 4.2. 내보내기 목적

|목적|설명|
|---|---|
|백업|수동으로 등록한 우클릭 메뉴를 나중에 다시 쓰거나, 복원할 수 있음|
|복사|다른 PC에서도 동일한 설정을 쉽게 적용 가능|
|자동화|한 번 등록 후, `.reg` 파일만 실행하면 동일 설정을 반복해서 만들 수 있음|

---
