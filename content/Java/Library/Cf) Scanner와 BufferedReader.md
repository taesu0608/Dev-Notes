# 1. Scanner
[[Scanner]]
- 데이터 유형과 문자열을 구문 분석 할 수 있는 텍스트 스캐너
	1. space(공란)과 \n(줄바꿈)이 경계값
	2. 입력 받는 즉시 자료형(데이터 타입)이 정해짐
- 문자열을 다양하게 구분이 어려움
- 다양한 데이터 타입 구분이 어려움

# 2.  BufferedReader
 [[BufferedReader]]
- [[InputStreamReader]]에 버퍼링 기능이 추가된 클래스
	1. \n(줄바꿈)만이 경계값
	2. return type: String
	3. Buffer size 8Kb
- 문자열 분리 방법이 필요
- 형변환이 필요

| 항목                  | Scanner             | BufferedReader     |
| ------------------- | ------------------- | ------------------ |
| Buffer Size         | 1KB                 | 8KB                |
| Operation           | 문자열 구분 및 파싱         | 단순 읽고 저장           |
| [[Synchronization]] | X → Single-threaded | O → Multi-threaded |
| IOException         | Catches IOException | Throws IOException |
# 3. CF
Cf) what is [[Buffer]]?
