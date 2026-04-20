- https://medium.com/@daniel.oliver.king/getting-started-with-recursion-f89f57c5b60e

### Cf) 좋은 재귀함수를 짜는 방법
- 재귀함수의 필수적 두가지 요소
1. `result`를 즉각적으로 리턴하는 기본 케이스
2. 스스로 호출을 하는 재귀 케이스

**필수적 요소를 잘 보여주는 흔한 예시**
```javascript
function factorial(n) {  
	  // Base case  
	  if (n === 0 || n === 1) return 1; 
	  // Recursive case  
	  return n * factorial(n — 1);  
}
```

- 재귀 알고리즘을 위한 좋은 휴리스틱
1. 더 작은 문제 정의 `f(n-1)`
2. `f(n-1)`은 이미 해결된 문제라고 가정
3. `f(n)` = `f(n-1)` + something