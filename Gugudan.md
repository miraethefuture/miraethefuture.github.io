---
layout: default
title: "만들어 가면서 배우는 JAVA 플레이그라운드 <구구단 구현하기 추가미션>"
---

<!--### 만들어 가면서 배우는 JAVA 플레이그라운드 <구구단 구현하기 추가미션>-->

아래 모든 내용은 인프런 강의 '만들어 가면서 배우는 JAVA 플레이그라운드'의 내용입니다.    

### 추가 미션 문제

- 사용자에게 입력 값을 받아서 구구단을 출력
- 입력값이 11 이라면 2 * 1 부터 2 * 11 까지 ~ 11 * 1 부터 11 * 11 까지 한번에 출력
- 현재 상황: 11을 입력해서 11 * 1 ~ 11 *11 은 출력할 수 있으나 2,3,4,5,6,7,8,9,10,11 단을 한꺼번에 출력하는 것이 안됨.  



```java
import java.util.Scanner;

public class Finalmission {
    public static void main(String[] args) {
        System.out.println("출력할 구구단의 값은? :");
        Scanner scanner = new Scanner(System.in);
        int number = scanner.nextInt();

        int[] result = new int[number];
        for(int j = 2; j <= number; j ++) {
        	for(int i = 0; i < result.length; i++) {
            	result[i] = j * (i + 1);
            	System.out.println(result[i]);

            }
        }
    }
}
```


[back](./)
