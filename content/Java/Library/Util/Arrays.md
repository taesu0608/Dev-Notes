# 1. Arrays
## In Oracle
This class contains various methods for manipulating arrays (such as sorting and searching). This class also contains a static factory that allows arrays to be viewed as lists.

The methods in this class all throw a `NullPointerException`, if the specified array reference is null, except where noted.

The documentation for the methods contained in this class includes briefs description of the _implementations_. Such descriptions should be regarded as _implementation notes_, rather than parts of the _specification_. Implementors should feel free to substitute other algorithms, so long as the specification itself is adhered to. (For example, the algorithm used by `sort(Object[])` does not have to be a MergeSort, but it does have to be _stable_.)

This class is a member of the **Java Collections Framework**.
- 이 클래스는 포함한다 다양한 메서드를 arrays 를 조작하기 위해 (정렬과 탐색 같은). 이 클래스는 또한 포함한다 배열이 리스트로 보여지도록 `static factory`를 
- 이 클래스내 메서드들은 모두 던진다 [[NPE]]를, 만약 그 명시된 `array reference`가 널이면,  언급된 경우를 제외하고

- 이 클래스에 포함된 메서드들을 위한 문서에는 구현에 대한 간략한 설명들이 포함되어 있다. 이러한 설명은 사양의 일부라기보다는 구현 참고 사항으로 간주되어야 한다. 구현자는 사양 자체가 준수되는 한, 다른 알고리즘으로 대체하는 데 있어 자유롭게 느껴야 한다. (예를 들어, `sort(Object[])`에서 사용되는 알고리즘은 반드시 MergeSort일 필요는 없지만, 안정적(stable)이어야 한다는 점은 지켜져야 한다.)
- 이 클래스는 [[Java Collections Framework (JCF)]]의 멤버이다.

# 2. Method
| 메서드                | 설명                             |
| ------------------ | ------------------------------ |
| `sort()`           | 배열을 오름차순으로 정렬함                 |
| `binarySearch()`   | 이진 탐색으로 요소의 위치를 찾음 (정렬된 배열 필요) |
| `equals()`         | 두 배열의 내용이 같은지 비교               |
| `fill()`           | 배열을 특정 값으로 채움                  |
| `copyOf()`         | 배열을 복사하여 새 배열 생성               |
| `copyOfRange()`    | 배열의 특정 범위만 복사하여 새 배열 생성        |
| `toString()`       | 배열을 문자열로 반환                    |
| `asList()`         | 배열을 고정 크기의 리스트로 변환             |
| `hashCode()`       | 배열의 해시코드 계산                    |
| `deepEquals()`     | 2차원 이상의 배열을 깊이 비교              |
| `deepHashCode()`   | 2차원 이상의 배열의 해시코드 계산            |
| `setAll()`         | 람다를 이용해 배열의 각 요소 설정            |
| `parallelSetAll()` | 병렬로 배열의 각 요소를 설정               |
## 2.1. fill(int[] a, int val)
- `a`: 값을 채울 대상 배열
- `val`: 배열의 모든 요소를 이 값으로 설정