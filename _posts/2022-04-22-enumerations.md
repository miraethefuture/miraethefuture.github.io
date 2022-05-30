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

# enum
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

## Associated Values  

  위의 예시들은 enumeration의 cases가 어떻게 스스로의 권리를 가지고 있는 정의된 값인지를 보여주었습니다. Planet.earth에 constant나 variable을 설정할 수 있고, 이 값을 나중에 확인할 수 있습니다. 가끔씩 다른 타입의 값을 이 cases 값의 옆에 담을 수 있는 것이 유용할 수 있습니다. 이 추가적인 정보를 associated value라고 합니다. 이것은 case를 사용할 때마다 달라집니다.  

  주어진 타입의 associated values를 담기 위해 Swift의 enumeration을 정의할 수 있습니다. 필요하다면 각각의 case마다 다른 타입의 값을 줄 수 있습니다.  

  예를 들어, 재고 관리 시스템이 두 종류의 바코드를 이용해서 상품을 기록한다고 상상해 봅시다. 어떤 상품들에는 0부터 9까지의 수를 이용하는 UPC 포맷의 1D 바코드가 붙어있습니다. 다른 상품들에는 ISO 8859-1문자를 사용하고 길이가 2,953만큼 긴 문자를 암호화 할 수 있는 OR 코드 포맷의 2D 바코드가 붙어있습니다.  

  UPC 바코드를 사용하는 재고 관리 시스템은 4개의 정수를 가지고 있는 tuple을 사용하는 것이 편리하고, QR 코드 바코드는 모든 길이의 문자열이 편리할 것 입니다.  

  Swift에서 위의 바코드를 표현한 enumeration은 아래처럼 작성될 것입니다.  

  ```swift
  enum Barcode {
      case upc(Int, Int, Int, Int)
      case qrCode(String)
  }
  ```

  위의 definition은 어떤 Int나 String값도 실제로 제공하지 않습니다. 단지 Barcode constant 또는 variable이 담을 수 있는 associated values의 타입을 제공할 뿐입니다.

  ```swift
  var productBarcode = Barcode.upc(8, 85909, 51226, 3)
  ```

  둘 중 하나의 type을 이용해서 새 바코드를 생성할 수 있습니다. 위의 예시에서는 productBarcode라는 새 variable이 생성 후 Barcode.upc의 값을 (8, 85909, 51226, 3)이라는 associated tuple value와 함께 할당했습니다.  

  ```swift
  productBarcode = .qrCode("ABCDEFGHIJKLMNOP")
  ```
  같은 상품에 다른 타입의 바코드를 할당할 수 있습니다. 이때, 원래의 Barcode.upc 와 integer 값은 새로운 Barcode.qrCode와 string 값으로 교체됩니다.

  ```swift
  switch productBarcode {
  case .upc(let numberSystem, let manufacturer, let product, let check):
      print("UPC: \(numberSystem), \(manufacturer), \(product), \(check).")
  case .qrCode(let productCode):
      print("QR code: \(productCode).")
  }
  // "QR code: ABCDEFGHIJKLMNOP"를 출력
  ```

  만약 모든 associated values가 constant 또는 variables로 똑같이 받아지는 경우에는 하나의 var 또는 let annotation을 case 이름 전에 작성할 수 있습니다.

  ```swift
  switch productBarcode {
  case let .upc(numberSystem, manufacturer, product, check):
  //...
  }
  ```

## Raw Values  

  Associated values의 대안으로, raw values라는 default 값으로 enumeration의 cases를 미리 채울 수 있습니다. (모두 같은 타입)

  raw ASCII 값을 가지고 있는 enumeration cases:
  ```swift
  enum ASCIIControlCharacter: Character {
      case tab = "\t"
      case lineFeed = "\n"
      case carriageReturn = "\r"
  }
  ```
  위의 ASCIIControlCharacter enumeration의 raw values의 타입은 Character로 정의 되었습니다.  

  Raw values는 strings, characters, 또는 integer, floating-point number 타입을 가질 수 있습니다. 각 raw value는 유일한 값을 가져야 합니다.
