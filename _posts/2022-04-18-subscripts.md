---
title: "Subscripts"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Swift
  - Subscripts
show_date: true
toc: true
toc_sticky: true
toc_label: " "
toc_icon: "kiwi-bird"
#header:
#  teaser: /assets/images/choose2.png
---

# 👩‍🌾 ..

  Classes, structures, 그리고 enumerations는 subscripts를 정의할 수 있습니다. Subscripts는 collection이나 list 또는 sequence의 멤버 요소에 접근하는 쉬운 방법들입니다. 값을 설정하고 가져오기 위한 메서드 없이 subscripts를 사용하여 인덱스로 값을 설정하거나, 값을 가져옵니다. 예를 들어, someArray[index]로 Array instance의 요소에 접근할 수 있습니다. Dictionary instance의 요소에 접근하기 위해서는 someDictionary[key]를 이용합니다.  

  하나의 타입에 여러개의 subscripts를 정의할 수 있습니다. Subscript에 통과된 인덱스 값의 타입을 기준으로 그 중 적합한 subscript가 선택됩니다. Subscript는 1차원에 제약되지 않습니다. 커스텀 타입이 필요로 하는 여러개의 input 패러미터를 이용하여 subscript를 정의할 수 있습니다.


## Subscript Syntax

  Subscript는 하나 또는 여러개의 값을 instance의 이름 뒤 [] 안에 작성함으로써 인스턴스에 대한 정보를 가져오는 것을 가능하게 합니다. Subscript syntax는 instance method syntax 그리고 commputed property syntax와 비슷합니다. subscript keyword를 사용하고 하나 또는 여러개의 인풋 패러미터와 리턴 타입을 특정 지어 줍니다. (instance method와 같은 방법으로)  
  Instance method와는 다르게, subscript는 read-write 또는 read-only가 될 수 있습니다. Computed property에서와 마찬가지로 getter 그리고 setter에 의해 실행됩니다.

  ```swift
  subscript(index: Int) -> Int {
    get {
        // 적합한 subscript 값을 리턴
    }
    set(newValue) {
        // 적합한 setting action 수행
    }
  }
  ```

  newValue의 타입은 subscript의 리턴타입과 같습니다. Computed property에서처럼, setter의 (newValue)패러미터를 특정짓지 않을 수 있습니다. 만약 이렇게 특정짓지 않는다면 newValue라는 이름의 디폴트 패러미터가 제공됩니다.  

  read-only computed property처럼, get 키워드와 { } 를 제거하여 read-only subscript를 단순한 형태로 정의할 수 있습니다.

  ```swift
  subscript(index: Int) -> Int {
        // 적합한 subscript 값을 리턴
  }
  ```

  아래는 read-only subscript의 구현 예시입니다. TimesTable stucture는 한 정수의 n-times-table을 나타냅니다.

  ```swift
  struct TimesTable {
      let multiplier: Int
      subscript(index: Int) -> Int {
          return multiplier * index
      }
  }
  let threeTimesTable = TimesTable(multiplier: 3)
  print("six times three is \(threeTimesTable[6])")
  // Prints "six times three is 18"
  ```

  위의 예에서, TimesTable의 새 instance는 three-times-table을 나타내기 위해 생성되었습니다. 이것은 TimesTable structure의 생성자 multiplier패러미터에 값 3을 통과시킴으로써 이루어집니다.  

  threeTimesTable의 subscript를 호출함으로써 정보를 가져올 수 있습니다. (threeTimesTable[6])

## Subscript Usage  

  "subscript"의 정확한 의미는 이것이 사용된 곳의 전후 관계에 달려있습니다. Subscripts는 보통 collection, list 또는 sequence의 요소에 접근하는 지름길(쉬운 방법)으로 사용됩니다.

  예를 들어, Swift의 Dictionary type은 어떤 Dictionary instance에 저장된 값을 가져오거나, 값을 설정하기 위해 subscript를 사용합니다. 딕셔너리의 키 타입에 맞는 키를 subscript brackets안에 제공하고 딕셔너리의 값 자료형과 일치하는 값을 할당해줌으로써 키와 값을 설정할 수 있습니다.

  ```swift
  var numberOfLegs = ["Spider": 8, "ant": 6, "cat": 4]
  numberOfLegs["bird"] = 2
  ```

<!-- ## Subscript Options  

  Subscripts는  -->
