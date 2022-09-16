---
title: 2022-09-16-TIL / 코딩테스트 연습 / 신규 아이디 추천
author: Mirae
date: 2022-09-16
category: TIL
layout: post
<!--cover: /assets/images/Thinking.gif-->
---

  <center><img src="/assets/images/UserIdGenerator.png" alt="UserIdGenerator.png" width="1000"></center><br>

> 코딩테스트 연습하기
{: .block-tip }

  [문제 링크입니다.](https://school.programmers.co.kr/learn/courses/30/lessons/72410)

# 풀이 과정  
  - 1) lowercased() 함수를 사용하여 모두 소문자로 치환 
  - 2) 나타날 수 있는 특수문자 중 사용 불가능한 문자들로 이루어진 배열 생성 
  - 3) 2)에서 생성한 배열의 요소와 일치하는 특수문자를 아이디가 포함하고 있다면 계속해서 while 문을 돌며 그 문자를 제거. 원래는 while  자리에 if 를 사용했는데 &&처럼 반복되는 특수문자가 있을 때 첫번째 인덱스의 & 하나만 제거하여 나머지 &은 제거되지 않는 문제가 발생하여 while로 변경하여 아이디가 &을 포함하는 한 계속해서 반복하며 제거할 수 있도록 했다. 
  

    
    
 
