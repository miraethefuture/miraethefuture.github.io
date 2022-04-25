---
title: "[LeetCode] 9. Palindrome Number"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Swift
  - 코테
  - LeetCode
show_date: true
toc: true
toc_sticky: true
toc_label: "📂"
toc_icon: "kiwi-bird"
#header:
#  teaser: /assets/images/choose2.png
---

# 문제

  주어진 정수 x 가 **palindrome integer**일 때 true를 반환하는 문제입니다.
  121 처럼 왼쪽에서 오른쪽으로 읽을때와 오른쪽에서 앞으로 읽을 때 똑같이 읽히면 palindrome integer입니다.

  -121은 왼쪽에서 오른쪽으로 읽을때는 -121이고, 오른쪽에서 왼쪽으로 읽을때는 121-이기 때문에  palindrome이 아닙니다.

## 내가 생각해본 방법

  왼쪽에서 오른쪽으로 반복하면서 순서대로 새 배열에 값을 할당하고,  
  인덱스 끝 부분인 오른쪽에서 왼쪽으로 순서대로 다른 배열에 값을 할당한 뒤
  각 인덱스의 값을 비교하면 어떨까?  

  정수 하나를 각각 1의 자리 수가 되도록 나누려면 나머지 연산자를 사용하여

  while 문을 사용하여 몫이 0보다 작아지기 전까지 실행

  ```swift
  x = 121  // 라면
  eachNum = x % 10    // -> eachNum의 값으 마지막 자리수 1
  divValue = x / 10   // -> 몫인 12

  while(x > 0) {
    var eachNum = x % 10
    x = x / 10
    eachNumArray.append(eachNum)
  }
  ```
  위의 방식은 음수일 때 문제가 생김..

  그래도 일단 양수의 수에서라도 진행을 해보자면

  while문이 실행된 후 eachNumArray에는 x 정수의 순서가 반전된 값이 배열 형식으로 입력되어 있음

  - x 정수를 순서대로 배열에 입력
  - 각 인덱스를 비교

  ```swift
  class Solution {
      func isPalindrome(_ x: Int) -> Bool {
          var eachNumArray: [Int] = []
          var xArray: [Int] = []
          var result: String = ""

          while(x > 0) {
              var eachNum = x % 10
              var x = x / 10
              eachNumArray.append(eachNum)

              for i in 0...xArray.count-1 {
                  xArray.insert(eachNum, at: i)
              }
          }
          for i in 0...eachNumArray.count-1 {
              for j in 0...xArray.count-1 {
                  if eachNumArray[i] == xArray[j] {
                      result = result + (String)(xArray[j])
                  } else {
                      return false
                  }
              }
          }

          var end = false

          var stringX = String(x)

          if stringX == result {
              end = true
          }

          return end
      }
  }
  ```
  결과는...
  Runtime Error
  process exited with signal SIGILL
