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

##  9/19
  <center><img src="/assets/images/UserIdGenerator2.png" alt="UserIdGenerator2.png" width="1000"></center><br>
    뭔가 잘못됐다,,, 
    원래 나의 의도 : idSet 배열의 요소에 접근하여 첫번째와 두번째 요소, 두번쨰와 세번째 요소, ...와 같은 방법으로 두 수를 비교하며 만약 둘 다 '.' 이라면 첫 '.'을 제거하고 배열 맨 뒤에 그 값을 추가한 뒤 처음과 마지막에 있는 '.'을 없애는 단계에서 한꺼번에 다 없애려고 했는데 '...'와 같이 세개 있을 떄도 모두 뒤로 가고 맨 앞에 하나 있을 때도 뒤로 가버리고 있다. 조금 더 생각을 해봐야겠다. 

> 항상 숫자 배열로 연습을 많이 했는데 문자열이 요소인 배열을 다루게 되니 subscript를 사용할 수 없어서 생각보다 많이 불편하다. 스트링 배열 요소에 접근하는 방법을 좀 더 알아봐야겠다. 
{: .block-tip }

    
    
 
