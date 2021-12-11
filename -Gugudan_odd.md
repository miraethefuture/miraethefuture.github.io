---
layout: default
title: "while문으로 구구단 홀수곱만 구현"
---



```java
public class Gugudan {
    public void GugudanOdd() {
        int i = 2;   //2단부터 시작
	      while (i < 10) {   //9단까지 출력
	         System.out.println("====" + i + "단 ===="); //몇단인지 화면에 출력

           int j = 0;
	         while (j < 10) {
	    	        j++; //1씩 증감이므로 1로 시작
	    	        if (j % 2 == 0) continue; //n % 2 == 0 이면 짝수 1 이면 홀수 (나머지)
	              System.out.println(i + " X " + j + " = " + i*j);

           }
	         i++;
        }
    }
}

```

<img src="/assets/images/gugudanResult.png" alt="gugudanResult.png" width="92" height="468">

이렇게 구현이 됩니다. 나누기의 나머지 수를 이용하는 것을 기억해두면 좋을 것 같습니다.

* % 는 the remainder operator, 또는 the modulo operator 라고 부르네요.  
나머지 수를 구하는 연산자 입니다.
