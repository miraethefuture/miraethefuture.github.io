---
title: "Java 배열 이용하여 정수를 내림차순으로 정렬하기"
categories:
  - TIL
tags:
  - learning
  - Java
  - Array
  - Descending order
toc: false
toc_label: "👷"
toc_icon: "cog"
toc_sticky: true
show_date: true
---
__________________

### 💭
입력받아 배열에 저장한 정수를 내림차순으로 정렬하기  
(내림차순 - 값이 큰 순서에서 작은 순서로 정렬)

```java
import java.util.Scanner;

public class Main {

	public static void main(String[] args) {


    Scanner sc = new Scanner(System.in);
    //입력값을 받아 배열의 크기 정하기
    System.out.println("배열의 크기를 입력하세요. : ");
    int[] arr = new int[sc.nextInt()];

    //for 문을 이용해 배열에 값 저장하기
    for(int i = 0; i < arr.length; i++) {
        System.out.println((i + 1) + "번째 정수 입력");
        arr[i] = sc.nextInt();
    }

    //내림차순으로 정렬하기

    int box = 0;

    for(int i = 0; i < arr.length; i++) {
        for(int j = i + 1; j < arr.length; j++) {     
            if(score[j] > arr[i]) {    
              box = arr[i];         
              arr[i] = arr[j];     
              arr[j] = box;         

            }
          }
        }

    //정렬된 배열 출력
    for(int i = 0; i < arr.length; i++) {
      System.out.println("arr[" + i + "] : " + arr[i]);
    }


  }
}

```

<img src="/assets/images/descOrder.jpeg" alt="desc">
