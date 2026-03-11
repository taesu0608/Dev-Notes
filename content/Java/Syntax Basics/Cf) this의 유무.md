## Java에서 this 유무에 따른 차이

Java에서 `run()`과 `this.run()`은 실행 결과와 바이트코드 측면에서는 동일함

``` bytecode
public void bark();
	Code:
		0: aload_0  //this
		1: invokevirtual #2  //Method run:()V
		4: aload_0  // this
		5: invokevirtual #2  //Method run:()V
```

