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


# Playgrounds: Learn to Code 2

## Variables  

  머리로 기억할 수 있는 것보다 더 많은 연락처를 저장한 스마트폰의 연락처 목록을 떠올려 봅시다. Coder는 변수(Variables)라는 컨테이너에 이름을 붙이고
  정보를 담습니다. 우리가 수정하기 전까지는 연락처의 정보가 바뀌지 않듯 Variables의 정보는 우리가 변경하기 전까지 스스로 바뀌지 않습니다.  

  ```swift
  var name = "Mia"
  var age = "28"
  ```

  1. var 키워드를 사용합니다.
  2. 변수의 이름(name, age)이 필요합니다.
  3. = (assignment operator, the equal sign)은 변수에 값을 할당합니다.
  4. 위의 변수 중 name은 String을 담고 있습니다. ("text")
  5. 위의 변수 중 age는 Int(an integer, a whole number)를 담고 있습니다.

### 📖 틈새 영어 단어: a whole number
  <div class="notice">
     <h4>whole numbers</h4>
     <p>0을 포함한 자연수를 말합니다.<br>
     0, 1, 2, 3, 4, .... </p>
  </div>

  변수를 할당한 뒤 다른 값을 할당할 수 있지만 자료형은 처음 할당한 값과 같아야 합니다. 만약 처음 String 타입의 자료를 담았다면 그 변수에는 게속해서 String 타입의 자료형을 담아야 합니다.

  ```swift
  var age = 28
  age = "twenty-nine" // 자료형이 다름으로 불가능
  ```

### incrementing a value

  incrementing a value는 현재 값과 비교하여 값을 증가시키는 코딩 패턴입니다.
  ```swift
  var myNum = 0
  myNum = myNum + 1
  ```
  variable을에 할당된 수와 비교 연산자를 이용해서 while문의 Boolean 조건을 만들 수 있습니다. incrementing values 하며 반복 횟수 등을 기록할 수 있습니다.

### 변수 이름 정하기

  1. camelCase: 첫번째 단어는 소문자로 시작 뒤로 이어지는 새 단어들은 대문자로 시작하도록 쓰는 방법입니다.
  2. 변수에 담길 값이 무엇인지 알려주는 이름으로 정합니다.

### Constant  

  Constant(상수)는 variable(변수)와 같이 값을 담는 이름 붙인 컨테이너입니다. 하지만 프로그램이 실행되는 동안에는 값을 변경할 수 없다는 차이점이 있습니다.

  1. 'let' 키워드를 사용합니다.
  2. 값이 변경되지 않는다는 것을 아는 경우 상수를 사용합니다.

  ```swift
  let numberOfTries = 3
  ```

  변수의 값과 상수의 값을 비교하는 식의 코드가 자주 사용됩니다.

### Compound assignment operator

  ```swift
  gemCounter = gemCounter + 1
  gemCounter += 1
  ```


## 자료형(Types)  

  집을 지을 때는 blue print를 사용합니다. Blue print는 거실, 화장실, 침실과 같은 집의 기능들을 보여줍니다. 여러개의 집들을 지을 때 한 blue print를 이용한다면 그 집들은 모두 비슷한 모양으로 지어질 것입니다.  
  프로그래밍에서 **type**은 blue print와 같습니다. 그리고 **instance**는 blue print를 통해 지어진 집과 같습니다.  
  Blue print는 집의 특징(feature)과 작동 방식(behavior)을 알려줍니다.  
  Type에서 features는 properties라고 부르고 작동 방식(behavior)는 method라고 합니다.

  ~~~swift
  Features: Color, Bedromms

  var color = green
  var bedrooms = 2

  // property는 타입안에서 변수입니다.
  ~~~
  ```swift
  Behaviors: Run Water, Turn on Lights

  runWater()
  turnLightsOn()

  // method는 타입안에서 function입니다.
  ```

  우리가 만든 여러개의 집중 하나의 차고를 열고 싶다고 가정해봅니다. 먼저 우리는 어떤 집인지 이름을 통해 지정합니다.

  ```swift
  myHouse.openGarageDoor()
  ```
  Swift에서 .(dot notation) 앞부분인 myHouse는 특정한 집을 가리키는 instance입니다.
  . 뒷부분은 openGarageDoor()라는 myHouse의 메서드입니다.

  ```swift
  bluePortal.isActive() = false
  ```
  bluePortal이라는 인스턴스의 isActive()라는 메서드가 bluePortal을 켠다고 가정했을 때 '= false'는 bluePortal을 끕니다.

### Using dot notation syntax  

  컴퓨터가 이해할 수 있는 코드를 작성하는 규칙을 syntax라고 합니다. Dot notation systax는 아래와 같이 생겼습니다.
  ```swift
  greenPortal.isActive = true
  ```
  Dot notation을 이용하면 특정 instance의 properties의 상태를 변경시킬 수 있습니다. 때때로 프로그램 안에서 여러번 instance의 propert의 상태를 변경해야합니다. greenPortal은 instance의 이름이고 isActive는 greenPortal의 property입니다.

  **State**  
  State는 어떤 주어진 특정 시간에 변수에 담긴 정보를 말합니다.

  instance에 이름을 부여하고 이름으로 그것을 나타내는 것은 프로그램 안에서 인스턴스의 요소들을 이용할 수 있게 해줍니다.

  더 효율적인 문제 해결법을 찾는 것은 프로그램이 더 빠르게 작동한다는 것이고 그것은 사용자들이 앱을 사용할 때 행복해진다는 것입니다. 그리고 배터리가 얼만큼 오래 보존되는지와도 관련이 있습니다.

### Factoring  

  코드를 효율적으로 작성하는 방법에 대해 생각해보는 것은 중요합니다. 작동하는 방식을 작은 단위로 나누어 재사용 가능한 function을 작성한다면 전체적으로는 더 적은 라인의 수로 코드를 작성할 수 있습니다. 이런 것을 factoring 코드라고 합니다. factoring the code는 재사용성을 높여줄 뿐 아니라 코드의 가독성을 높여주어 작성자 뿐 아니라 다른 누구든 코드가 어떻게 작성된건지 알아보기 쉽게 해줍니다.

  //👷‍♂️ Learn to Code 2: Random Gems Everywhere 다시 풀기

## Initialization  

  Initialization을 통해 instance를 만들 수 있습니다.

  ```swift
  let expert = Expert()
  ```
  1. let 키워드를 사용하여 constant를 생성합니다.
  2. Type의 이름 + ()를 우측에 작성하여 초기화(Initialize) 합니다.

  ```swift
  expert.turnLockUp()
  ```
  expert라는 instance의 메서드 turnLockUp()을 호출하는 방식입니다. dot notation을 사용합니다. 메서드를 사용하기 위해서는 먼저 Initialize 해주어야 한다는 것을 기억합시다.

### 여러개의 instances  

  코드를 작성할 때는 큰 문제를 해결하기 위해 보통 여러개의 instance와 element를 함께 사용하게 됩니다. 만약 사진 편집 앱을 만든다면 이미지를 촬영하기 위해 카메라 앱을, 효과를 적용하기 위해 필터 라이브러리를 사용할 것입니다.

  하나 이상의 instance를 사용할 때는 instance의 이름을 사용하여 각 instance의 메서드를 호출합니다.

## Parameters  

  집을 여러가지 색으로 페인트 칠한다고 상상해 봅니다. 그렇다면 색마다 각기 다른 메서드를 만들 수 있겠죠.
  ~~~swift
  paintGreen()
  paintBlue()
  paintOrange()
  ~~~
  만약 초록색 페인트로 세 레이어에 걸쳐 색을 칠하고 싶다면 아래처럼 세번 paintGreen() 메서드를 호출할 수 있습니다.
  ```swift
  paintGreen()
  paintGreen()
  paintGreen()
  ```

  각 색마다 function을 만들어 사용하  대신에 Parameter를 이용해서 원하는 색을 사용할 수 있습니다.
  ```swift
  func paint(color: Color)
  ```
  color parameter는 function의 input value입니다. 패러미터는 Color와 같은 특정한 Type을 가집니다. function을 호출하면 작동방식 중 사용할 argument를 통과 시킵니다.
  ```swift
  func paint(color: Color, layers: 3)
  ```
  여러개의 패러미터를 가질 수 있습니다.

  ```swift
  func move(count: Int) {
    for i in 1...count {
      moveForward()
    }
  }
  ```
  Int Type의 count라는 패러미터를 가진 function move입니다. count는 function의 바디 부분에서 for문이 얼만큼 반복될지를 특정합니다. move function을 호출 시
  ```swift
  move(count: 3)
  ```
  argument 3을 통과시킴으로써 for문을 세번 돌릴 수 있게 됩니다.  

 여러개의 parameter를 이용하며 function이 동작하는 중 많은 부분을 커스터마이징 할 수 있습니다. 몇 번 반복문을 동작시킬지, Bool타입을 이용한다면 동작을 시킬지 시키지 않을지 등 많은 부분을 원하는대로 특정 지을 수 있습니다.
