---
title: "Enumerations"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Swift
  - Enumerations
show_date: true
toc: true
toc_sticky: true
toc_label: " "
toc_icon: "kiwi-bird"
#header:
#  teaser: /assets/images/choose2.png
---

# 🗂  

  Enumeration은 연관된 값의 그룹을 위한 일반적인 type을 정의합니다. 그리고 그 값들을 코드안에서 type-safe한 방식으로 이용할 수 있도록 합니다.

## Enumeration Syntax

  enum 키워드로 enumeration의 작성을 시작합니다. 그리고 전체 definition을 { } 안에 작성합니다.

  ```swift
  enum someEnumeration {
    // enumeration의 definition
  }
  ```

  아래는 나침반의 네개의 점을 표현한 enumeration의 예입니다.

  ```swift
  enum CompassPoint {
      case north
      case south
      case east
      case west
  }
  ```

  north, south, east, west와 같이 enumeration 안에 정의된 값들을 enumeration cases 라고 합니다. 새 enumeration cases를 작성할 때는 case 키워드로 시작합니다.  

  여러개의 cases는 한줄에 ,라고 분리해 작성할 수 있습니다.

  ```swift
  enum Planet {
    case mercury, venus, earth, mars, jupiter, saturn, uranus, neptune
  }
  ```  

  각각의 enumeration definition은 새로운 type을 정의합니다. Swift의 다른 type들처럼, 이름(CompassPoint, Planet과 같이)은 대문자로 시작합니다. 복수형보다는 단수형의 이름을 지어주어 명확히 읽히도록 합니다.  

  ```swift
  var directionToHead = CompassPoint.west
  ```

  directionToHead의 타입은 CompassPoint의 값 중 하나와 함께 초기화될 때 추론됩니다. 일단 한번 directionToHead가 CompassPoint로써 선언되면 더 짧은 dot syntax로 다른 값을 설정할 수 있습니다. 이것은 코드를 더욱 더 잘 읽히도록 합니다.

  ```swift
  directionToHead = .east
  ```

## Matching Enumeration Values with a Switch statement

  ```swift
  directionToHead = .south
  switch directionToHead {
  case .north:
      print("Lots of planets have a north")
  case .south:
      print("Watch out for penguins")
  case .east:
      print("Where the sun rises")
  case .west:
      print("Where the skies are blue")
  }
  // Prints "Watch out for penguins"
  ```  

  위의 코드는 directionToHead의 값이 .north와 같을 경우, "Lots of planets have a north"를 출력, .south와 같을 경우 "Watch out for penguins"를..(나머지도 같 ) 출력하라는 것을 나타냅니다.

  Switch statement가 enumeration의 cases를 다룰때는 빠지는 case가 없도록 해야 합니다. 만약 .west case가 생략되면 이 코드는 컴파일 되지 않을 것입니다.  

  모든 enumeration cases에 대해 case를 제공하는 것이 적합하지 않을 때는 명시되지 않은 cases를 커버하기 위해 default case를 사용할 수 있습니다.

  ```swift
  let somePlanet = Planet.earth
  switch somePlanet {
  case .earth:
      print("Mostly harmless")
  default:
      print("Not a safe place for humans")
  }
  // "Mostly harmless"를 출력합니다.
  ```

## Iterating over Enumeration Cases  

  어떤 enumerations를 위해서는, 모든 cases의 collention을 가지는 것이 유용하게 사용됩니다. Enumeration의 이름 뒤에 : CaseIterable를 작성함으로써 이것이 가능해집니다. Swift는 enumeration type의 allCases property를 이용하여 모든 cases의 collention을 보여줍니다.

  ```swift
  enum Beverage: CaseIterable {
      case coffee, tea, juice
  }
  let numberOfChoices = Beverage.allCases.count
  print("\(numberOfChoices) beverages available")
  // "3 beverages available"을 출력
  ```

  위의 예시에서는, Beverage enumeration의 모든 cases를 담고있는 collection에 접근하기 위해 Beverage.allCases라고 작성하였습니다. 다른 종류의 collection처럼 allCases를 사용할 수 있습니다. 이때 collection의 요소는 enumeration type의 인스턴스입니다. 이 경우에는 Beverage values이죠. 위의 예시에서는 몇개의 cases가 있는지 수를 세고, 아래의 예시에는 모든 cases에 대해 for-in loop를 반복적으로 실행합니다.

  ```swift
  for beverage in Beverage.allCases {
      print(beverage)
  }
  // coffee
  // tea
  // juice
  ```

  위의 예시에서 사용된 syntax는 모두 enumeration이 CaseIterable protocol을 따르고 있는지 확인합니다.  

  
