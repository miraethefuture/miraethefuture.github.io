---
title: "Codility_Developer Training: 배열 챕터의 문제 CyclicRotation"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Codility
  - 코테
show_date: true
toc: true
toc_sticky: true
toc_label: "👷"
toc_icon: "cog"
#header:
#  teaser: /assets/images/yourDigitalClock.png
---

[CyclicRotation 문제 읽기](https://app.codility.com/programmers/lessons/2-arrays/cyclic_rotation/)

### 1. 문제를 파악해보자  

N개의 정수로 이루어진 배열이 주어집니다. 배열의 Rotation이란 각각의 element를 오른쪽 인덱스로 옮긴다는 뜻입니다. 맨 마지막 인덱스에 있던 요소는 첫 인덱스로 이동합니다.

```swift
//the rotation of array A
A = [3, 8, 9, 7, 6]
// is
A = [6, 3, 8, 9, 7]
```
위의 예제는 배열 A를 한번 rotate한 결과입니다.

목표는 배열 A를 K번 오른쪽 인덱스로 한칸씩 이동시키는 것입니다.

```swift
[3, 8, 9, 7, 6] -> [6, 3, 8, 9, 7]
[6, 3, 8, 9, 7] -> [7, 6, 3, 8, 9]
[7, 6, 3, 8, 9] -> [9, 7, 6, 3, 8]
```
위의 예제는 3번 rotate한 결과입니다.

### 2. 로직을 생각해보자

일단 아직은 더 익숙한 언어인 Java로 구체적인 수를 적용하여 코드를 작성해봅니다.
```java
package array;

public class CyclicRotaion {
  public static void main(String[] args) {

    // 주어진 배열
    int[] A = {3, 8, 9, 7, 6};

    // 마지막 인덱스의 값 빈 변수에 할당하기
    int p = A[A.length-1];

    // 한칸씩 옮기기
    A[A.length-1] = A[A.length-2];
    A[A.length-2] = A[A.length-3];
    A[A.length-3] = A[A.length-4];
    A[A.length-4] = A[A.length-5];

    // 0번째 인덱스에 옮겨두었던 마지막 인덱스 값 할당하기
    A[A.length-5] = p;

    for(int i = 0; i < A.length; i++) {
      System.out.print(A[i] + " ");
    } // for문
  }
}
```
위 코드의 실행 결과는 <code>6, 3, 8, 9, 7</code>입니다.

### 3. 이클립스에서 작성한 문제 해결 코드

```java
package array;

import java.util.Scanner;

public class CyclicRotaion {
  public static void main(String[] args) {

      // 주어진 배열
      int[] A = {3, 8, 9, 7, 6};

      // 마지막 인덱스의 값 빈 변수에 할당하기
      // 배열의 크기에 상관없이 항상 마지막 인덱스 값을 나타냄.
      int p = A[A.length-1];

      for(int i = 1; i <= (A.length-1); i++) {
          A[A.length-i] = A[A.length-(i+1)];
      }

      // 0번째 인덱스에 옮겨두었던 마지막 인덱스 값 할당하기
      A[A.length-A.length] = p;

      // 배열의 값을 출력하는 for문
      for(int i = 0; i < A.length; i++) {
          System.out.print(A[i] + " ");
      }
  }
}
```
반복되는 부분을 for문을 사용하여 작성해줍니다.

### 4. 코딜리티에 제출한 문제 해결 코드  

아래는 최종 정리해서 코딜리티에 제출한 코드입니다.

```java
class Solution {
  public int[] solution(int[] A, int K) {
    // write your code in Java SE 8

    int p = 0; // 마지막 인덱스의 값 옮겨둘 변수

    while(K >= 1) { // while문 사용하여 반복할 횟수 K이용

      p = A[A.length-1];

      for(int i = 1; i <= (A.length-1); i++) {

          A[A.length-i] = A[A.length-(i+1)];

        } // for문 끝

      A[A.length-A.length] = p;
      K--;

    } // while 문 끝

    return A;
  } // 메서드 끝
}
```

<center><img src="/assets/images/CyclicRotation1.png" alt="CR" width="900"></center><br>   

내가 푼 풀이의 정확도는 87%  

<center><img src="/assets/images/CyclicRotation2.png" alt="CR" width="600"></center><br>  


분석 결과를 보니 빈 배열이 입력되었을 때 프로그램이 꺼지는 문제가 발생.


... 문제 해결은 계속됩니다.

### 추가해야 할 글  

- 문제 해결 과정
- 빈 배열이 입력되었을 때 프로그램이 꺼지는 문제 해결하기
