---
title: "Playgrounds: Learn to Code 2"
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

# Variables

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

## incrementing a value

  incrementing a value는 현재 값과 비교하여 값을 증가시키는 코딩 패턴입니다.
  ```swift
  var myNum = 0
  myNum = myNum + 1
  ```
  variable을에 할당된 수와 비교 연산자를 이용해서 while문의 Boolean 조건을 만들 수 있습니다. incrementing values 하며 반복 횟수 등을 기록할 수 있습니다.

## 변수 이름 정하기

  1. camelCase: 첫번째 단어는 소문자로 시작 뒤로 이어지는 새 단어들은 대문자로 시작하도록 쓰는 방법입니다.
  2. 변수에 담길 값이 무엇인지 알려주는 이름으로 정합니다.

## Constant

  Constant(상수)는 variable(변수)와 같이 값을 담는 이름 붙인 컨테이너입니다. 하지만 프로그램이 실행되는 동안에는 값을 변경할 수 없다는 차이점이 있습니다.

  1. 'let' 키워드를 사용합니다.
  2. 값이 변경되지 않는다는 것을 아는 경우 상수를 사용합니다.

  ```swift
  let numberOfTries = 3
  ```

  변수의 값과 상수의 값을 비교하는 식의 코드가 자주 사용됩니다.

## Compound assignment operator

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

## Using dot notation syntax

  컴퓨터가 이해할 수 있는 코드를 작성하는 규칙을 syntax라고 합니다. Dot notation systax는 아래와 같이 생겼습니다.
  ```swift
  greenPortal.isActive = true
  ```
  Dot notation을 이용하면 특정 instance의 properties의 상태를 변경시킬 수 있습니다. 때때로 프로그램 안에서 여러번 instance의 propert의 상태를 변경해야합니다. greenPortal은 instance의 이름이고 isActive는 greenPortal의 property입니다.

  **State**
  State는 어떤 주어진 특정 시간에 변수에 담긴 정보를 말합니다.

  instance에 이름을 부여하고 이름으로 그것을 나타내는 것은 프로그램 안에서 인스턴스의 요소들을 이용할 수 있게 해줍니다.

  더 효율적인 문제 해결법을 찾는 것은 프로그램이 더 빠르게 작동한다는 것이고 그것은 사용자들이 앱을 사용할 때 행복해진다는 것입니다. 그리고 배터리가 얼만큼 오래 보존되는지와도 관련이 있습니다.

## Factoring

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

## 여러개의 instances

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

### 문제를 해결하며 작성해 본 예제 코드

   ```swift
   let expert = Expert()
   let character = Character()

   var gemCount = 0

   func turnMethod(up: Bool, times: Int) {
       if up == true {
           for i in 1...times {
               expert.turnLockUp()
           }
           expert.turnRight()
       } else {
           for i in 1...times {
               expert.turnLockDown()
           }
           expert.turnRight()
       }
   }

   for i in 1...4 {
       turnMethod(up: true, times: 4)
   }

   while gemCount != 3 {
       if character.isOnGem {
           character.collectGem()
           gemCount += 1
           character.turnRight()

       }
       character.moveForward()
   }

   for i in 1...4 {
       turnMethod(up: false, times: 3)
   }

   while gemCount < 7 {
       if !character.isBlockedRight && gemCount > 5 {
           character.moveForward()
       } else if character.isBlockedRight && character.isBlockedLeft{
           character.moveForward()
       } else if !character.isBlockedRight {
           character.turnRight()
           character.moveForward()
       } else if character.isBlockedRight && gemCount == 6 {
           character.moveForward()
       }

       if character.isOnGem {
           character.collectGem()
           gemCount += 1
           character.turnLeft()
           character.turnLeft()
           character.moveForward()
       }
   }
   ```
  (패러미터를 이용한 funtion의 이용을 공부하며 작성해본 예제입니다. 더 적은 라인의 코드로 문제를 해결할 수 있을 것 같은데 아직은 자꾸만 코드가 길어집니다.)

## Type과 Instances

  하나의 type을 이용해 여러개의 instance를 만들 수 있습니다. type은 설계도, 청사진에 자주 비유됩니다. 같은 설계도를 사용해서 만든 instance이므로 같은 메서드를 사용해 같은 속성들에 접근, 이용할 수 있습니다.

### World Building

  ```swift
  let block1 = Block()
  let block2 = Block()
  let block3 = Block()
  let block4 = Block()
  let block5 = Block()

  var gemCounter = 0

  func stackBlocks(block: Block, col: Int, row: Int) {
          world.place(block, atColumn: col, row: row)
  }
  func turnAround() {
      turnLeft()
      turnLeft()
  }
  func moveAndCollect(times: Int) {
      for i in 1...times {
          moveForward()
          if isOnGem {
              collectGem()
              turnAround()
          }
      }
  }

  // stack blocks to get gems
  stackBlocks(block: block1, col: 2, row: 2)
  stackBlocks(block: block2, col: 2, row: 2)
  stackBlocks(block: block3, col: 4, row: 2)
  stackBlocks(block: block4, col: 6, row: 2)
  stackBlocks(block: block5, col: 6, row: 2)

  while gemCounter < 3 {
      moveForward()
      if isOnClosedSwitch {
          toggleSwitch()
          turnRight()
      } else if isBlocked && isOnGem {
          collectGem()
          gemCounter += 1
          turnAround()
      } else if isOnOpenSwitch && gemCounter >= 1{
          turnRight()
      }
  }
  ```
  (여러개의 instance 사용 / factor codes into a function을 공부하며 작성한 예제. 처음 작성했을때는 else if가 세개 더 있었는데 문제를 해결하며 코드를 줄일 수 있었다.)

# Array

  - [] = square brakets
  - , = a comma

  위 두가지를 이용하여 배열(Array)를 만듭니다.

  ```swift
  var ingredients = [icecream, bananas, chocolate, cherries]
  ```

  배열은 아이템을 순서대로 나열한 목록입니다. 순서는 Index로 표현합니다. Index를 이용하여 각 item을 변경할 수 있습니다.

  ```swift
  [icecream, bananas, chocolate, cherries]
      0         1         2          3

  ingredients[1] = strawberries
  ingredients[3] = sprinkles

  [icecream, strawberries, chocolate, sprinkles]
      0           1            2          3
  ```

  컴퓨터는 0부터 수를 세기 때문에 index 역시 0부터 시작합니다.

## Array Methods

  Swift에는 아이템을 삭제, 추가하는 등 간단한 동작을 수행하기 위해 array와 함께 사용되는 메서드가 있습니다.

  ```swift
  [icecream, bananas, chocolate, cherries]
      0         1         2          3

  // remove(at: index numbers) 메서드
  ingredients.remove(at: 2)

  [icecream, bananas, cherries]
      0         1         2

  // append() 메서드
  ingredients.append(sprinkles)

  [icecream, bananas, cherries, sprinkles]
      0         1         2         3

  // insert(item, at: index number)
  ingredients.insert(strawberries, at: 1)

  [icecream, strawberries, bananas, cherries, sprinkles]
      0            1         2         3          4
  ```
  item이 추가, 삭제됨에 따라 index 번호가 자동으로 바뀝니다.

## Iteration

  배열에 담긴 각 아이템마다 같은 동작을 반복할 수 있습니다. 이런 과정을 **iteration** 이라고 합니다.

  ```swift
  for item in ingredients {
    place(item, in: bowl)
  }
  ```

  위 코드는 각 item 마다 place(item, in: bowl) 이라는 코드를 반복하며 수행합니다.

<!-- ### 📖 틈새 영어 단어: iterate
  <div class="notice">
     <h4>if a computer iterates, it goes through a set of instructions before going through them for a second time.</h4>
     <p>컴퓨터가 iterate 한다는 것은 반복해서 여러개의 코드를 통과하는 것입니다.</p>
  </div> -->

## Code comments

  **//** 를 이용하면 주석(code comments)를 작성할 수 있습니다. 주석은 코드의 대한 정보를 제공합니다. 앱을 이 코드를 실행하지 않습니다.

## Item의 자료형

  한 array안의 자료들은 모두 같은 자료형을 가지고 있어야 합니다.
  만약 처음 integer 자료형의 배열을 만들었다면 String 아이템은 추가할 수 없습니다.

## For-in loop

  ```swift
  let columns = [0, 1, 2, 3, 4]

  for i in columns {
    world.place(Gem(0), atCol: i, row: 1)
  }
  ```
  For-in 반복문은 배열의 각 value마다 { } 안의 코드를 반복해서 실행합니다. 위 코드에서 i는 columns 배열의 각 값을 담는 변수입니다. 배열 columns의 값인 0, 1, 2, 3, 4가 i에 할당되고 각 값은 { } 안에 작성된 코드인 place 메서드의 atCol 패러미터의 인자로 통과됩니다. for-in 반복문이 돌때마다 (Gem(), 0, 1), (Gem(), 1, 1), (Gem(), 2, 1) ... 식으로 코드가 실행됩니다. 더이상 할당될 값이 없으면 루프는 끝이납니다.

## An array of type Coordinate

  Coordinate의 인스턴스는 column과 row arguments를 이용하여 장소를 나타냅니다.

  ```swift
  // Coordinate 인스턴스의 예.
  let corner = Coordinate(column: 3, row: 3)

  // blockLocations라는 Coordinate type의 배열 만들기
  var blockLocations = [
      Coordinate(column: 0, row: 0),
      Coordinate(column: 3, row: 3),
      Coordinate(column: 0, row: 3),
      Coordinate(column: 3, row: 0)
  ]
  ```

## Array method

  ```swift
  characters = [
      Character(name: .blu),
      Portal(color: pink),
      Character(name: .hopper),
      Gem()
      ]

  // Remove the portal.
  characters.remove(at: 1)

  // Remove the gem.
  characters.remove(at: 2)

  // Insert the expert.
  characters.insert(Expert(), at: 1)
  ```

  .remove() / .insert() / .append()
  .removeFirst() / .removeLast / .removeAll

  등이 있습니다.

## Creating an empty array

  값이 주어지지 않은 빈 배열을 만들 때에는 type을 정해주어야 합니다.

  ```swift
  var newLocations: [Coordinate] = []
  // 배열의 이름: [배열의 type] = []
  ```
