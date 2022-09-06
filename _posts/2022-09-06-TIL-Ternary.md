---
title: 2022-09-06-TIL / Swift 삼항연산자 (Ternary conditional operator)
author: Mirae
date: 2022-09-06
category: TIL
layout: post
cover: /assets/images/Thinking.gif
---

  <center><img src="/assets/images/ternaryOperator.png" alt="ternaryOperator.png" width="600"></center><br>

> 코딩테스트 문제를 풀다가 다시 한번 복습해보는 스위프트의 유일한 삼항연산자,,
{: .block-tip }

# Ternary conditional operator 
  
  이름에서 알 수 있듯이 세 개의 항을 가진 연산자입니다. 
  삼항 조건 연산자는 스위프트의 유일한 삼항 연산자라고 합니다. 
  
  위 사진에서는, 첫번째 줄에 let RT 라는 상수에 그 뒤에 오는 삼항연산자의 결과 값을 할당해 줍니다.
  1) 각 딕셔너리 키에 해당하는 값 (여기서는 Int 타입 값)을 비교
  2) ? 뒤에는 true : false 라고 생각하면 됩니다. 
  3) Dict["R"]! 의 값이 3 이라고 하고, Dict["T"]의 값이 2라고 한다면...
  4) 조건은 true 가 되므로 let RT = "R"이 됩니다. 
 
