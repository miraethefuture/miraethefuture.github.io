---
title: "Playgrounds: Learn to Code 1"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Swift
  - Playgrounds
show_date: true
toc: true
toc_sticky: true
toc_label: "👷"
toc_icon: "kiwi-bird"
---

# Playgrounds: Learn to Code 1
  <sub>아래 모든 내용들은 Playgrounds에서 학습하며 정리한 내용입니다.  
  모든 내용의 출처는 Playgrounds임을 밝힙니다.</sub>

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

### 📖 틈새 영어 단어: Tweak
<div class="notice">
   <h4>Tweak the code inside solveRow():</h4>
   <p>tweak은 작은 변화를 만든다는 뜻입니다.</p>
</div>



## For loops

  1. 'for' 키워드를 사용합니다.
  2. loop가 실행 될 횟수를 적어줍니다.
  3. curly braces 안에 반복할 commands를 적어줍니다.

  ```swift
  for eachSeed in 1...4 {
    makeHole()
    placeSeed()
    moveFiveInchesForward()
  }
  ```  

  앞서 coding tasks를 분할하기 위해 문제를 해결하며 반복되는 패턴을 function으로 만들어 보았습니다. 이제 loop를 이용하며 한 function을 여러 번 반복해서 호출할 수 있습니다. 어떤 코드를 순서대로 실행하는 것을 반복하는 것입니다. loops를 이용하면 반복해서 해야 할 일을 단순화 시킬 수 있습니다.

  1. 먼저 가장 가까이 있는 작은 문제를 해결할 패턴을 찾습니다.
  2. 다음 문제에서도 이 패턴이 적용되는지 알아봅니다.
  3. 적용이 된다면 반복합니다.

  해결할 수 있는 작은 문제에 대한 해결책을 찾고 여러 개의 해결책을 모아 큰 문제를 해결하는 것은 좋은 문제 해결 방법 접근입니다.

## Conditional Code  

  예상할 수 없는 것에 대해 어떻게 계획을 짤까요?  
  코드 안에서는 if문을 이용하여 각기 다른 조건들에 대한 계획을 짭니다.

  ```swift
  if lightIsGreen {
    moveForward()
  } else {
    wait()
  }
  ```
  1. 'if' 키워드를 사용합니다.
  2. 참 / 거짓으로 답할 수 있는 조건을 적어줍니다.
  3. 조건이 참(true)일 때 실행 할 commands를 if block 안에 적어줍니다.
  4. 조건이 false 일 때 실행될 코드는 else를 이용해서 적어줍니다.

  메세지가 오'면' 메세지가 왔다는 알림 소리가 울리고, 사파리는 웬 사이트를 열기 전에 인터넷이 연결되어 있는지 확인합니다. 연결되어 있다'면' 웹사이트로 이동하죠.

### Boolean condition

  if - else문에서 if의 Boolean 조건이 true이면 if {} 안의 코드가 실행되고
  false이면 else {} 안의 조건이 실행됩니다.

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

  위와 같은 방식으로도 사용할 수 있습니다. function안에 if문을 작성하고 for문을 이용해서 fuction을 호출하는 방식입니다. 이렇게 하므로써 코드를 재사용할 수 있습니다.

## 👷‍♂️ 여기까지 정리
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

  While loop는 반복할 횟수가 명확히 정해져있지 않을 때 어떤 조건이 true인 동안 { } 안에 작성된 코드를 반복해서 실행합니다. 조건문과 함께 while 반복문을 사용하면 좀 더 다양한 상황에 문제를 해결할 수 있습니다.  
  때때로 coding problem을 어떻게 해결하는지는 어떤 옵션이 더 낫게 느껴지는지에 따라 정해집니다. coder들은 더 빠른 결과를 내는 해결책, 또는 재사용성이 높은 것이 어떤 것인지 자신의 의견에 기초에 결정하게 됩니다.

  코딩에서는 문제와 여러개의 해결책들 중 어떤 것을 선택하는지에 대해 배우는 것이 중요합니다. 때때로 한 문제에 대한 어떤 접근은 다른 것과 비슷하게 문제를 해결하고 어떤 것은 다른 해결책보다 더 효율적이고, 재사용이 가능하고, 많은 상황에 적용 가능하기도 합니다. 적절한 도구(approprite tools)를 결정하는 힘이 길러집니다.

### Land of bounty 다시 해보기
  더 효율적인 방법 찾아보기

### Nesting loops  

  **nest** one loop inside another은 루프안에서 다른 루프를 사용하는 것을 의미합니다. 루프 안에서 사용된 루프를 **nested loops**라고 합니다. 이때 바깥쪽의 루프를 Outer loop 안쪽의 루프는 inner loop라고 합니다. 다양한 상황에서 nested loops를 사용할 수 있습니다.  

  while loop와 Boolean 타입의 조건을 함께 사용할 때는 조건이 언제가는 false가 되야합니다. 만약 계속해서 true가 되면 무한 반복하는 infinite loop이 되고 이것은 컴퓨터를 멈추게 만들 수도 있습니다.

  <!-- adoptable 다양한 상황에서 같게 적용할 수 있는 코드? -->

## Algorithms  

  알고리즘은 규칙의 집합 그리고 그것을 기반으로 한 지시입니다. 예를 들어 네비게이션은 목적지로 가는 가장 빠른 길을 찾는 알고리즘을 이용합니다. 이때 알고리즘은 거리와 평균 속도를 비교하고, 현재의 교통량을 이용하여 가장 짧은 루트를 찾습니다. 알고리즘은 다양한 상황에서 적용 가능합니다.

  알고리즘을 코드로 적용하기 전에 pseudocode를 이용하여 먼저 생각해볼 수 있습니다. pseodocode는 코드와 비슷한 형태이지만 진짜 코드는 아닌, 사람이 이해할 수 있는 언어로 만든 코드와 비슷한 구조를 가지고 있는 형태입니다.

  ```swift
  navigate around wall {
    if a block is on right side {
      go forward
    } else if blocks are in the front and on the right {
      turn left
      go forward
    } else {
      turn right
      go forward
    }
  }
  ```

 pseudocode의 예시입니다. 진짜 작동하는 코드아니고 알고리즘을 만들기 위해 생각을 코드의 구조로 나타낸 것입니다.  

 다른 상황에서 동일하게 적용되는 알고리즘을 만드는 것이 코딩의 힘입니다. 다양한 상황에서 문제를 해결하는 프로그램을 만드는 것이죠. 에를 들어 search engine의 algorithms은 우리가 검색한 단어가 무엇이든 원하는 정보를 주기 위해 엄청나게 많은 웹사이트의 정보를 동일한 방식으로 처리합니다.
