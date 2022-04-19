---
title: "Functions"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Swift
  - Functions
show_date: true
toc: true
toc_sticky: true
toc_label: "📂"
toc_icon: "kiwi-bird"
#header:
#  teaser: /assets/images/choose2.png
---

# 🚧

  Functions는 특정 기능을 수행하는 완전한 코드 덩어리입니다. Functions는 이름을 가집니다. 보통은 어떤 일을 하는지 알 수 있는 이름을 지어줍니다. 그리고 필요할 때 그 이름을 사용해서 function을 호출하여 특정 기능을 수행할 수 있도록 합니다.

  패러미터는 function의 호출을 단순화하기 위해서 기본값을 제공할 수 있습니다. 그리고 in-out 패러미터로써 인자를 통과시킬 수 있습니다.

  스위프트의 모든 function은 type을 가지고 있습니다. function의 패러미터의 types와 리턴 type으로 이루어져 있습니다.

  ```swift
  func greet(person: String) -> String {
    let greeting = "Hello" + person + "!"
    return greeting
  }
  ```
  - -(a hyphen)
  - \>(a right angle bracket)

  을 이용해서 -> 리턴 타입을 나타냅니다.

  ```swift
  func greetAgain(person: String) -> String {
    return "Hello again," + person + "!"
  }
  ```
  return 뒤에 바로 문자열을 주면 코드를 더 짧게 작성할 수 있습니다.

## Function with Multiple Return Values  

  여러개의 값을 리턴하는 function을 위해 하나로 합쳐진 리턴 값으로써 tuple을 리턴 타입으로 사용할 수 있습니다.

  아래의 예시는 minMax(array:)라는 function을 정의합니다. Int값을 가진 배열에서 가장 작은 수와 가장 큰 수를 찾아내는 function 입니다.

  ```swift
  func minMax(array: [Int] -> (min: Int, max: Int) {
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
      if value < currentMin {
          currentMin = value
      } else if value > currentMax {
          currentMax = value
      }
    }
    return (currentMin, currentMax)
  }
  ```

  위의 minMax(array:) function은 두개의 Int 값을 가지고 있는 tuple을 리턴합니다. 이 값들은 min, max라는 이름으로 labeled 되었고, 그렇기 때문에 function의 리턴 값에 접근이 필요할 때 이름으로 접근할 수 있습니다.  

  minMax(array:)의 바디는 두개의 변수 currentMin과 currentMax를 설정하는 것으로 시작합니다. 이것들은 배열의 첫번째 값을 초기값으로 가지고 있습니다. 그리고 function은 배열의 남은 요소들에 대해 반복해서 코드를 실행하며 각 요소가 currentMin보다 작은지, currentMax보다 큰지를 확인합니다. 그리고나서 가장 작은 수와 가장 큰 수를 가지고 있는 튜플을 리턴합니다.  

  튜플의 멤버 값이 이름을 가지고 있기 때문에 dot syntax를 사용하여 값에 접근하고 가장 작은 수와 큰 수를 가져올 수 있습니다.

  ```swift
  let bounds = minmax(array: [8, -6, 2, 109, 3, 71])
  print("min is \(bounds.min) and max is \(bounds.max)")

  // Prints "min is -6 and max is 109"
  ```

  튜플 멤버의 이름은 튜플이 function으로부터 리턴될 때 이름 지어질 필요가 없습니다. 멤버의 이름은 function의 리턴 타입의 한 부분으로 이미 정의되었기 때문입니다.
  
