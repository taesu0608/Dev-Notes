# 1. Vector
- 컬렉션 프레임워크 출시 이전 **가변 개수의 배열 필요**시 사용
	- ArrayList 도입 이후 레거시 클래스들의 호환을 위해 남았을 뿐, 사용되지 않음

### Cf) Vector는 [[JDK]] 1.0 [[Java Collections Framework (JCF)]] 는 JDK 1.2에 도입됨


---

# 2. 특징

## 2.1. 동기화
- **[[Cf) Different between Vector and ArrayList]]**


---
# 3. 메서드

| 메서드                                         | 설명                               |
| ------------------------------------------- | -------------------------------- |
| `boolean add(E element)`                    | 벡터의 맨 뒤에 element 추가              |
| `void add(int index, E element)`            | 인덱스 index에 element를 삽입           |
| `int capacity()`                            | 벡터의 현재 용량 리턴                     |
| `boolean addAll(Collection<? extends E> c)` | 컬렉션 c의 모든 요소를 벡터의 맨 뒤에 추가        |
| `void clear()`                              | 벡터의 모든 요소 삭제                     |
| `boolean contains(Object o)`                | 벡터가 지정된 객체 o를 포함하고 있으면 true 리턴   |
| `E elementAt(int index)`                    | 인덱스 index의 요소 리턴                 |
| `E get(int index)`                          | 인덱스 index의 요소 리턴                 |
| `int indexOf(Object o)`                     | o와 같은 첫 번째 요소의 인덱스 리턴. 없으면 -1 리턴 |
| `boolean isEmpty()`                         | 벡터가 비어 있으면 true 리턴               |
| `E remove(int index)`                       | 인덱스 index의 요소 삭제                 |
| `boolean remove(Object o)`                  | 객체 o와 같은 첫 번째 요소를 벡터에서 삭제        |
| `void removeAllElements()`                  | 벡터의 모든 요소를 삭제하고 크기를 0으로 만듦       |
| `int size()`                                | 벡터가 포함하는 요소의 개수 리턴               |
| `Object[] toArray()`                        | 벡터의 모든 요소를 포함하는 배열 리턴            |

## 3.1. add(int index, E element)

``` java
void add(E element)
void add(int index, E element)
```
- index의 위치에 element를 삽입하고 뒷 index의 요소들을 한 칸씩 밀어냄

## 3.2. removeAllElements()
```java
void removeAllElements()
```
- 모든 요소를 제거하고 용량(capacity)도 0으로 만듬

## 3.3. capacity()
``` java
int capacity()
```
-  Vector 컬렉션의 용량을 반환

##### Cf) size는 요소의 수를 capacity는 최대 저장가능한 요소의 수를 반환
