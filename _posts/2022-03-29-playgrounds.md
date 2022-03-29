---
title: "Playgrounds"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Swift
show_date: true
toc: true
toc_sticky: true
toc_label: "👷"
toc_icon: "kiwi-bird"
---

# Playgrounds: Learn to Code 1
  아래 모든 내용들은 Playgrounds에서 학습하며 정리한 내용입니다.  
  모든 내용의 출처는 Playgrounds임을 밝힙니다.

## Function: Grouping Tasks

  Function은 여러개의 commands를 하나로 묶어 이름을 붙인 것입니다.  
  그리고 아무때나 원할 때 호출하여(call) 사용할 수 있습니다.

  ```swift
  func tieMyShoe() {
    loop()
    swoop()
    pull()
  }
  ```

  1. func 키워드 사용
  2. function에 이름을 지어줍니다.
  3. function은 언제나 이름 뒤에 ()를 붙여줍니다.
  4. curly braces(중괄호 { }) 안에 commands를 추가해줌으로써 function이 어떤 기능들을 수행할지 정합니다.
  5. 필요할 때 언제든 tieMyShoe() 라는 이름을 사용하여 호출, 사용할 수 있습니다.

### Composition  

  가끔씩 coding problem을 해결하려면 새로운 behavior을 수행하기 위해서 기존의 가지고 있던 commands를 혼합하여 함께 사용해야 할 떄가 있습니다. 이 과정을 compositon이라고 합니다. 원하는 행동을 수행할 command는 없지만 기존의 code를 합침으로써 원하는 행동을 할 수 있게 됩니다. 만약 여러번 같은 compositon을 수행해야 한다면 어떨까요? 그렇다면 여러개의 혼합된 코드를 여러번 사용하게 됩니다. 이럴때는 이 composition을 하나로 묶어 function으로 만들 수 있습니다.
  function을 사용하므로써 코드를 간단하게 만들고 복잡한 일도 더 간단하게 처리할 수 있습니다.

  1. 반복되는 패턴을 파악합니다.
  2. 그 패턴을 function으로 만듭니다.

### Decomposition  

  function 안에 다른 function을 호출할 수 있습니다. 더 큰 문제를 더 작은 조각으로 나누는 과정을 Decomposition이라고 합니다. 작은 일을 처리하는 function을 만들고 다른 funtion안에 그 functions을 사용하므로서 더 큰 문제를 해결하는 것 - 더 큰 문제를 작은 function으로 나누는 것을 Decomposition 이라 합니다.

### Decompose a solution across multiple Function  

  작은 tasks를 해결하는 functions을 이용하는 것은 도움이 됩니다. 이 작은 일을 처리하는 function을 다른 function안에서 호출하므로써 더 큰 task를 해결 할 수 있게 됩니다. 더 작은 function으로 나누는 것은 코드의 가독성도 높여줍니다. 보통 function의 이름은 각 기능을 나타내도록 짓기 때문이죠.
  또, 코드를 작성하는 과정을 단순화 시켜줍니다. 더 큰 task를 해결하기 위한 function을 작성한 뒤에는 작은 일을 처리하는 각각의 commands들은 신경쓰지 않을 수 있죠.

  1. 작은 명령 패턴을 찾는다.
  2. 명령들을 호출하는 function을 만든다.
  3. 만들어진 function으로 문제를 해결한다.

  앱을 만든다는 것은 엄청나게 많은 작은 문제들의 해결방법을 찾는 것입니다. 작은 문제들의 해결책을 찾은 뒤에 코더들은 그 해결책을 모아 더 큰 문제를 해결합니다.

### 📖 틈새 영어 단어
<div class="notice">
   <h4>Tweak the code inside solveRow():</h4>
   <p>tweak은 작은 변화를 만든다는 뜻입니다.</p>
</div>

## 👷‍♂️ 여기까지 정리


## For loops

  1. 'for' 사용한다.
  2. loop가 실행 될 횟수를 적어준다.
  3. curly braces 안에 반복할 commands를 적어준다.

  ```swift
  for eachSeed in 1...4 {
    makeHole()
    placeSeed()
    moveFiveInchesForward()
  }
  ```  

  coding tasks를 분할하기 위해 반복되는 패턴을 function으로 만들어 보았습니다. loop를 이용하며 한 function을 여러번 반복해서 호출할 수 있습니다. 어떤 코드를 순서대로 반복하는 것입니다. loops를 이용하면 반복해서 해야 할 일을 단순화 시킬 수 있습니다.

  1. 작은 문제를 해결 할 패턴을 찾는다.
  2. 다음 문제에서도 이 패턴이 적용되는지 알아본다.
  3. 된다면 반복한다.

  해결할 수 있는 작은 문제에 대한 해결책을 찾고 여러개의 해결책을 모아 큰 문제를 해결하는 것은 좋은 문제 해결 방법 접근입니다.

## Conditional Code  

  예상할 수 없는 것에 대해 어떻게 계획을 짤까요?  
  코드 안에서는 if문을 이용하여 다른 조건들에 대한 계획을 짭니다.

  ```swift
  if lightIsGreen {
    moveForward()
  } else {
    wait()
  }

  ```
  1. 'if' 키워드 적기
  2. 예 / 아니오로 답할 수 있는 조건 적기
  3. 조건이 true일 때 실행 할 commands를 if block 안에 적어주기
  4. 조건이 false 일 때 실행될 코드는 else를 이용해서 적어줍니다.

  메세지가 오면 메세지가 왔다는 알림 소리가 울리고, 사파리는 웬 사이트를 열기 전에 인터넷이 연결되어 있는지 확인합니다. 연결되어 있다'면' 웹사이트로 이동하죠.

  **Boolean condition**

  if else문에서 if의 Boolean 조건문이 true이면 if {} 안의 코드가 실행되고
  false이면 else {} 블락 안의 조건이 실행됩니다.

  ```swift
  func solveRightSide() {
    if isOnGem {
      turnLeft()
      collectGem()
    }
  }

  for i in 1...2 {
    solveRightSide()
    moveForward()
  }
  ```

  위와 같은 방식으로도 사용할 수 있다. function안에 if문을 작성하고 for문을 이용해서 fuction을 호출하는 방식이다. 이렇게 하므로써 코드를 재사용할 수 있게 된다.

### Logical Operators  

  code에서 operator는 action을 보여주는 심볼입니다. 논리연산자는 조건문을 더 명확하게 특정지어줍니다.
  - && (AND)
  - || (OR)
  - ! (NOT)
  위의 각 연산자들은 각자의 방법으로 조건문을 변화시킵니다.

  1. AND(&&) 논리 연산자는 모든 조건들이 true일 때만 코드가 실행됩니다.
  2. OR(||) 논리 연산자는 조건 중 적어도 하나가 true일 때 코드가 실행됩니다.
  3. NOT(!) 논리 연산자는 조건을 반대로 만듭니다.

## While Loops
