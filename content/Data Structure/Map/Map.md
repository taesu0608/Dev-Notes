# 1. Map
**정의**: Key와 Value를 하나의 쌍(entry)으로 저장, Key를 통해 Value를 조회하는 자료구조

# 2. 특징
## 2.1. Map의 특징
1. Key 중복 허용 X
2. Value 중복 허용 O
3. Key 기반 조회
4. 순서 보장 여부는 구현체에 따라 다름

# 3. Java Map 구현체
| 구현체                   | 내부 구조                | 특징                 | 시간복잡도    |
| --------------------- | -------------------- | ------------------ | -------- |
| **HashMap**           | Hash Table           | 순서 보장 없음, 가장 많이 사용 | O(1)     |
| **LinkedHashMap**     | HashMap + LinkedList | 삽입 순서 유지           | O(1)     |
| **TreeMap**           | [[Red-Black Tree]]   | Key 기준 자동 정렬       | O(log n) |
| **ConcurrentHashMap** | 분할/최적화된 Hash 기반 구조   | 스레드 안전             | O(1)     |
## 3.1. HashMap
**정의**: 해시 테이블(Hash Table) 기반으로 구현된 Map
- 삽입 순서, 정렬 순서 유지 X
- 평균 시간복잡도 $O(1)$
- Hash 기반 저장