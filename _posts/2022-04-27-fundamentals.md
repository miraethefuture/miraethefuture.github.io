---
title: "Develop in Swift Fundamentals"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Swift
  - UIKit
show_date: true
toc: true
toc_sticky: true
toc_label: " "
toc_icon: "kiwi-bird"
---
[📂 Develop in Swift Fundamentals](https://books.apple.com/us/book/develop-in-swift-fundamentals/id1581182804)
<br><sub>아래 모든 정보의 출처는 Develop in Swift Fundamentals이며 개인의 학습 용도로만 사용되었음을 밝힙니다.</sub>

# Initializers  

  

# Instance Methods  

  Instance Methods는 특정 타입의 인스턴스에 호출될 수 있는 functions입니다. Instance Methods는 structure의 속성에 접근하고 수정할 방법을 제공합니다. 그리고 해당 인스턴스의 목적과 관련된 기능을 추가합니다.  

  Type을 정의할 때 function을 추가해줌으로써 instance methods를 추가할 수 있습니다. 그 후 해당 타입의 인스턴스에 추가해주었던 function을 호출할 수 있습니다.

  ```swift
  struct Size {
    var width: Double
    var height: Double

    func area() -> Double {
      width * height
    }
  }

  let someSize = Size(width: 10.0, height: 5.5) // 인스턴스 생성
  let area = someSize.area() // 55.0 이라는 값이 area에 할당됨.
  ```

  'Size' structure를 정의할 때 function 'area'를 작성해주고, Size의 인스턴스인 'someSize'를 생성 후 instance method인 area()를 호출해주었습니다.  

  someSize 인스턴스의 타입은 Size이고, width와 height는 속성(properties)입니다.  
  area()는 Size의 모든 인스턴스에서 호출될 수 있는 instance method입니다.





  <!-- # Introduction to UIKit  

    UIKit은 사용자 인터페이스를 생성하고 관리하기 위해 사용되는 기본적인 프레임워크입니다.

  ## Common System Views  

    UIView(또는 view)는 모든 시각적인 요소를 정의하는 가장 기본적인 UIKit의 클래스입니다. 하나의 view는 직사각형 형태를 정의합니다. 이것을 커스터 마이즈하여 화면에 어떤 것이든 나타낼 수 있습니다.  -->
