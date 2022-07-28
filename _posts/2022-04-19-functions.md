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
toc_label: " "
toc_icon: "kiwi-bird"
#header:
#  teaser: /assets/images/choose2.png
---

# ⚙️
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
  let bounds = minMax(array: [8, -6, 2, 109, 3, 71])
  print("min is \(bounds.min) and max is \(bounds.max)")

  // Prints "min is -6 and max is 109"
  ```

  리턴되는 튜플 멤버의 이름은 function의 정의 과정에서 리턴 타입의 이름으로 이미 주었기 때문에 튜플이 function으로부터 리턴될 때는 이름을 줄 필요가 없습니다.  


## Funtion Argument Labels and Parameter Names

  각각의 function 패러미터는 argument label과 parameter name을 가집니다. Argument label은 function을 호출할 때 사용됩니다. 각각의 argument는 function call의 코드 속에 argument label 뒤에 작성됩니다. 패러미터의 이름은 function을 구현할 때 사용됩니다. 기본적으로, 패러미터는 parameter name을 argument name으로 사용합니다.  

  ```swift
  func someFunction(firstParameterName: Int, secondParameterName: Int) {
    // function의 바디부분에서 firstParameterName과 secondParameterName은 argument의 값을 나타냅니다.
  }
  someFunction(firstParameterName: 1, secondParameterName: 2)
  ```  

## Specifying Argument Labels  

  Argument name은 patameter name 앞에 작성합니다. (space로 띄어서 구분해 줍니다.)

  ```swift
  func someFunction(argumentLabel parameter name: Int) {
    // function의 바디부분에서 parameterName은 해당 패러미터에 통과되는 argument 값을 참조합니다.
  }
  ```

  아래의 예시는 greet(person:) function의 변형된 버전입니다. 사람의 이름과 고향을 패러미터로 통과시키고 인사말을 리턴합니다.

  ```swift
  func greet(person: String, from hometown: String) -> String {
    return "Hello \(person)! Glad you visit from \(hometown)."
  }
  print(greet(person: "Bill", from: "Cupertino"))
  // Prints "Hello Bill! Glad you visit from Cupertino."
  ```

## Omitting Argument Lables  

  만약, 패러미터에 argument label을 사용하고 싶지 않다면, underscore(_)를 argument name 대신 작성해줍니다.

  ```swift
  func someFunction(_ firstParameterName: Int, secondParameterName: Int) {

  }
  someFunction(1, secondParameterName: 2)
  ```

## Default Parameter Values  

  Function의 패러미터 타입 뒤에 값을 할당해줌으로써 패러미터의 기본값을  줄수 있습니다. 기본값이 주어진 패러미터는 function을 호출할 때 생략할 수 있습니다.  

  ```swift
  func someFunction(parameterWithoutDefault: Int, parameterWithDefault: Int = 12) {
    // 이 function을 호출할 때 두번째 argument를 생략하면, 기본값인 12가 function의 바디에서 사용됩니다.
  }
  someFunction(parameterWithoutDefault: 3, parameterWithDefault: 6)
  // 위에서 parameterWithDefault 는 6
  someFunction(parameterWithoutDefault: 4)
  // 위에서 parameterWithDefault 는 12
  ```  

  기본값을 가지지 않은 패러미터를 가장 먼저 써줍니다. 주로 기본값이 없는 패러미터가 function의 의미에 더 중요한 역할을 하기 때문입니다. 기본값을 가지지 않은 패러미터를 먼저 첫번째로 둠으로써 같은 function이 호출되었을 때 생략된 패러미와 관계없이 function을 구별하기 쉽게 만들어 줍니다.


## Variadic Parameters

  Variadic parameter는 특정 타입의 0개 또는 더 많은 수의 값을 받습니다. Function이 호출될 때해당 패러미터를 가진 인풋값의 a varying number을 통과시킬 수 있다는 것을 나타내기 위해서 variadic parameter를 사용합니다. 패러미터의 타입 이름 뒤에 ...(세개의 .)을 추가해줍니다.

  Variadic parameter를 통해 들어온 값들은 function의 바디부분에서 배열로 사용가능합니다.  
  예를 들어, 아래 코드의 numbers라는 Double... 타입의 패러미터는 function의 바디부분에서 numbers라는 이름을 가진 [Double] 타입의 constant 배열로 사용되었습니다.

  아래의 function arithmeticMean은 수의 평균을 구합니다. (수의 길이 상관 없음)

  ```swift
  func arithmeticMean(_ numbers: Double...) -> {
      var total: Double = 0
      for number in numbers {
        total += number
      }
      return total / Double(numbers.count)
  }
  arithmeticMean(1, 2, 3, 4, 5)
  // 3.0을 리턴합니다.
  arithmeticMean(3, 8.25, 18.75)
  // 10.0을 리턴합니다.
  ```

  하나의 function은 여러개의 variadic parameters를 가질 수 있습니다. Variadic parameter 다음에 처음으로 오는 패러미터는 필수적으로 argument lable을 가져야합니다. Argument Lable은 어떤 arguments가 variadic 패러미터에 통과되었는지, 어떤 arguments가 variadic 패러미터 다음에 오는 패러미터에 통과되었는지를 명확히 구별할 수 있게 돕습니다.


## In-Out Parameters

  Function parameters는 기본적으로 constants입니다. Function 패러미터의 값을 function의 바디부분에서 변경하려고 시도하는 것은 컴파일 에러를 발생시킵니다. 이것은 패러미터의 값을 실수로 변경할 수 없다는 것을 의미합니다. 만약 function이 패러미터의 값을 수정하길 원한다면, 그리고 function의 호출이 끝난 이후에도 그 변경사항이 계속해서 유지되길 원한다면 해당 패러미터를 in-out 패러미터로 정의해야 합니다.  

  패러미터의 타입 앞에 inout 키워드를 추가해줌으로써 in-out 패러미터를 작성할 수 있습니다. In-out 패러미터는 function으로 통과되어 들어오고(passed in to the function), function으로부터 수정되고, 원래의 값을 교체하기 위해 밖으로 통과되어 나가는(back out of the function) 값을 가집니다.  

  In-out 패러미터의 argument로는 오직 variable만 통과시킬 수 있습니다. constants나 literal 값은 수정될 수 없기 때문에 argument로 통과시킬 수 없습니다. &(ampersand)를 variable의 이름 앞에 적음으로써 in-out 패러미의 argument로 통과시킨다는 것을 알려줍니다.  

  <div class="notice">
     <h4>N O T E</h4>
     <p>In-out 패러미터는 기본값을 가질 수 없습니다. 그리고 variadic 패러미터는 inout 키워드를 사용할 수 없습니다.
     </p>
  </div>

  아래의 function swapTwoInts는 a와 b라는 in-out integer 패러미터를 가지고 있습니다.

  ```swift
  func swapTwoInts(_ a: inout Int, _ b: inout Int) {
      let temporaryA = a
      a = b
      b = temporaryA
  }
  ```

  swapTwoInts function은 단순히 b의 값을 a로 바꾸고, a의 값을 b로 바꿉니다. 이 function은 두 수의 교체를 temporaryA라는 temporary constant를 이용해서 수행합니다. a의 값을 temporaryA에 먼저 할당하고 - a에 b를 할당 - b에 a를 할당합니다.  

  두개의 Int 타입 variables의 값을 바꾸기 위해 swapTwoInts function을 호출할 수 있습니다. &을 someInt와 anotherInt 앞에 붙여주었습니다.

  ```swift
  var someInt = 3
  var anotherInt = 107
  swapTwoInts(&someInt, &anotherInt)
  print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
  // "someInt is now 107, and anotherInt is 3"을 출력합니다.
  ```  

  위의 예시에서 두 variables someInt와 anotherInt는 function swapTwoInts의 바깥에서 정의되었음에도 function을 통해 원래의 값이 서로 교체되었습니다.

  <div class="notice">
     <h4>N O T E</h4>
     <p>In-out 패러미터는 function으로 부터 값을 리턴하는 것과는 다릅니다. 위의 swapTwoInts예시는 리턴 타입을 정의하지 않았고, 값을 리턴하지 않습니다. 하지만 여전히 someInt와 anotherInt의 값을 변경시킵니다. In-out 패러미터는 function의 바디 부분의 범위를 넘어서서 영향을 미칠 수 있는 또 다른 방법입니다.
     </p>
  </div>  


## Function Types  

  모든 function은 패러미터의 타입 + 리턴 타입으로 이루어진 특정한 function type을 가지고 있습니다.  

  예를 들면:
  ```swift
  func addTwoInts(_ a: Int, _ b: Int) -> Int {
      return a + b
  }
  func multiplyTwoInts(_ a: Int, _ b: Int) -> Int {
      return a * b
  }
  ```

  위의 예는 두개의 단순한 계산을 수행하는 addTwoInts와 multiplyTwoInts라는 functions를 정의합니다. 이 functions는 각각 두개의 Int 값을 이용하여 계산 후 하나의 Int 값을 리턴합니다.

  위 두 functions의 타입은 **(Int, Int) -> Int** 입니다.  

  ```swift
  func printHelloWorld() {
      print("hello, world")
  }
  ```

  위 function은 타입은 () -> Void이고, "패러미터를 가지고 있지 않고 Void를 리턴하는 function"이라고 합니다.  


## Using Function Types  

  Swift의 다른 타입처럼 function 타입을 사용합니다. 예를 들어, constant나 variable을 정의하고 function 타입을 지정한 뒤 적절한 function을 할당할 수 있습니다.

  ```swift
  var mathFunction: (Int, Int) -> Int = addTwoInts
  ```

  addTwoInts function이 mathFunction과 같은 타입을 가지고 있기 때문에 Swift의 type-checker가 이 assignment를 수락합니다.  

  ```swift
  print("Result: \(mathFunction(2, 3))")
  // "Result: 5" 를 출력합니다.
  ```

  다른 타입들처럼, function을 constant나 variable에 할당할 때, Swift가 function type을 추측하도록 할 수 있습니다.

  ```swift
  let anotherMathFunction = addTwonInts
  ```

## Function Types as Parameter Types  

  (Int, Int) -> Int와 같은 function type을 다른 function의 패러미터 타입으로 사용할 수 있습니다.  

  위에서 생성한 math functions의 결과를 출력하기 위한 예제입니다.

  ```swift
  func printMathResult(_ mathFunction: (Int, Int) -> Int, _ a; Int, _ b: Int) {
       print("Result: \(mathFunction(a, b))")
    }
  printMathResult(addTwoInts, 3, 5)
  // "Result: 8"을 출력합니다.
  ```

  위의 예시는 printMathResult(_:\_:\_:)를 정의합니다. 세개의 패러미터를 가지고 있습니다. 첫번째 패러미터의 이름은 mathFunction이고 타입은 (Int, Int) -> Int 입니다. 두번째 그리고 세번째 패러미터는 a와 b이고 Int 타입입니다. 이 둘은 주어진 math function의 input 값으로 사용됩니다.

<!-- ## Function Types as Return Types -->
