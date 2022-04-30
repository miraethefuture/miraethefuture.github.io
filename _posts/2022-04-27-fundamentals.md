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

  모든 structures는 적어도 하나의 initializer를 포함하고 있습니다. Initializer는 어떤 한 type의 새 인스턴스를 리턴하는 function과 유사합니다. 자주 사용되는 많은 types이 argument가 없는 initializer를 가지고 있습니다. 바로 init()입니다.  

  init() initializer로 생성된 인스턴스들은 기본값을 가집니다.  

  ```swift
  var string = String.init()  // 기본값 -> ""
  var int = Int.init()        // 기본값 -> 0
  var bool = Bool.init()      // 기본값 -> false
  ```

  위의 initializer를 아래와 같은 방법으로 더 간단히 작성할 수 있습니다.

  ```swift
  var string = String()  // 기본값 -> ""
  var int = Int()        // 기본값 -> 0
  var bool = Bool()      // 기본값 -> false
  ```  

## Default Values  

  새로운 인스턴스를 생성할 때, Swift는 해당 type의 모든 properties의 값을 요구합니다.

  첫번째 방법으로는, Type을 정의할 때 기본값을 줄 수 있습니다. 인스턴스들이 생성될 때 이 값을 이용하게 됩니다. 이 방법은 일정한 기본 값을 가지는 object를 정의할 때 유용하게 사용됩니다.  

  모든 instance properties에 기본값을 설정해주면, Swift 컴파일러가 자동으로 기본 생성자를 생성합니다.  

  property의 기본값을 이용해서 커스텀 type의 모든 인스턴스에 공통된 기본적인 상태를 설정할 수 있습니다.

  ```swift
  struct Odometer {
    var count: Int = 0
  }

  let odometer = Odometer()
  print(odometer.count)
  // 기본값으로 주어진 0을 출력합니다.
  // 기본 생성자로 생성한 Odometer type의 모든 인스턴스의 count는 기본값 0 가집니다.
  ```

## Memberwise Initializer  

  만약 새로운 structure를 정의할 때 initializer를 선언하지 않으면, Swift는 memberwise initializer라는 특별한 initializer를 생성합니다. 이것을 이용하여 생성되는 인스턴스를 위해 property에 값을 설정할 수 있습니다.

  ```swift
  let odometer = Odometer(count: 27000)
  print(odometer.count)
  // 27000 을 출력합니다.
  ```

  생성되는 각 인스턴스에 기대하는 기본적인 상태가 없을 때 사용하기 좋은 방법입니다.

  ```swift
  struct Person {
    var name: String
  }
  ```

  위의 예시처럼 name이라는 속성을 가지고 있는 structure Person이 있다면, 특정 이름으로 기본값을 설정할 수 없겠지요.

  ```swift
  struct BankAccount {
    var accountNumner: Int
    var balance: Double = 0
  }

  let newAccount = BankAccount(accountNumner: 123)
  var tranfferredAccount = BankAccount(accountNumner: 456, balance: 1200)
  ```

  위의 예시에서는, 어떤 속성은 기본값을 가지고 또 다른 어떤 속성은 기본값을 가지지 않습니다. 새 인스턴스를 생성시, 기본값이 없는 속성만 패러미터로 작성해줍니다.

## Custom Initializers  

  ```swift
  struct Temperature {
    var celsius: Double

    // memberwise initializer
    init(celsius: Double) {
      self.celsius = celsius
    }

    // custom initializer
    init(fahrenheit: Double) {
      self.celsius = (fahrenheit - 32) / 1.8
    }
  }

  let currentTemperature = Temperature(celsius: 18.5)
  let boiling = Temperature(fahrenheit: 212.0)

  print(currentTemperature.celsius) // 18.5 출력
  print(boiling.celsius)            // 100.0 출력
  ```

  위의 예시에서 custom initializer인 init(fahrenheit: Double)는 패러미터로 전달 받은 값으로 계산을 수행하고 결과값을 celsius property에 할당합니다.  

  Custom initializer를 생성시 Swift가 기본 생성자와 memberwise initializer를 자동으로 생성해주지 않기 때문에 위의 예시처럼 직접 작성해 주어야 합니다.  

  원한다면, 여러개의 Custom initializer를 작성할 수 있습니다.


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

# Mutating methods

  때때로, 속성의 값을 변경하는 function을 작성해야할 수 있습니다. 이때는 mutating 키워드를 사용합니다.


  ```swift
  struct Odometer {
    var count:[Int] = 0  

    mutating func increment() {
      count += 1
    }

    mutating func increment(by amount: Int) {
      count += amount
    }

    mutating func reset() {
      count = 0
    }
  }

  var odometer = Odometer() // count가 기본값 0
  odometer.increment()
  odometer.increment(by: 15)
  odometer.reset()
  ```

# Self  

  <code>self</code> 는 타입의 현재 인스턴스를 나타냅니다. 인스턴스 메서드나 computed property 안에서 사용됩니다.  

  ```swift
  struct Car {
    var color: Color

    var description: String {
      return "This is a \(self.color) car."
    }
  }
  ```

  생성자가 속성의 이름과 같은 이름의 패러미터를 가지고 있을 때 self를 사용합니다.

  ```swift
  struct Temperature {
    var celsius: Double

    init(celsius: Double) {
      self.celsius = celsius
    }
  }
  ```

# Inheritance  

  Structures와 Classes의 가장 큰 차이점은 classes가 계층적인 관계를 가질 수 있다는 것입니다. 모든 클래스는 parent 그리고 child 클래스를 가질 수 있습니다. Parent 클래스는 superclass, child 클래스는 subclass라고 합니다.  

  가족 관계에서처럼, subclasses는 superclasses로부터 속성(properties)과 메서드를 상속받습니다.  

## Defining a Base Class  

  Base classes는 parent 클래스를 가지지 않는 클래스입니다.

  ```swift  
  class Vehicle {
      var currentSpeed = 0.0

      var description: String {
          "traveling at \(currentSpeed) miles per hour"
      }

      func makeNoise() {
          // do nothing
      }
  }

  let someVehicle = Vehicle()
  print("Vehicle: \(someVehicle.description)")
  // Vehicle: traveling at \(currentSpeed) miles per hour 을 출력
  ```

  위의 Vehicle 클래스는 기본값 0.0을 가진 currentSpeed라는 속성과 description 이라는 computed variable, 그리고 makeNoise()라는 메서드를 가지고 있습니다. 이 메서드는 Vehicle 인스턴스에서는 아무것도 수행하지 않지만 subclass에서 커스터 마이징 후 사용될 것입니다.  

  Vehicle 클래스는 속성과 메서드와 같은 아주 일반적인 특성들을 가지고 있습니다. 이 클래스 자체로는 그다지 유용하게 쓰이지 못할 수 있지만 다른 더 특정한 type을 생성하는 것을 더 쉽게 만들어 줄 것입니다.  

## Create a SubClass  

  Subclassing은 기존의 존재하는 클래스를 기초로 새로운 클래스를 생성하는 것을 말합니다. Subclasses는 superclass로부터 속성과 메서드를 상속받고 그것들을 개선하거나 더 구체적으로 만들 수 있습니다. 새 속성과 메서드를 subclass에 추가하는 것도 가능합니다.  

  아래는 SomeSuperclass로부터 상속받는 새 type인 subclass SomeSubclass를 정의하는 방법입니다.

  ```swift  
  class SomeSubclass: SomeSuperclass {
      // subclass 정의
  }
  ```

  아래는 superclass인 Vehicle을 기초로 생성된 subclass Bicycle 입니다.

  ```swift
  class Bicycle: Vehicle {
      var hasBasket = false
  }
  ```  

  Bicycle 클래스는 Vehicle 클래스의 속성 currentSpeed와 description, makeNoise() 메서드를 상속 받습니다.  

  상속 받은 속성과 메서드 뿐 아니라 새로운 boolean property인 hasBasket을 정의합니다.

  Bicycle의 인스턴스에 currentSpeed를 업데이트 할 수 있습니다.

  ```swift
  let bicycle = Bicycle()
  bicycle.currentSpeed = 15.0
  print("Bicycle: \(bicycle.description)")
  // Bicycle: traveling at 15.0 miles per hour를 출력
  ```
