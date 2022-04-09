---
title: "Guided Swift Tour: 스위프트 기초 문법"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Swift
show_date: true
toc: true
toc_sticky: true
toc_label: "📂"
toc_icon: "kiwi-bird"
#header:
#  teaser: /assets/images/choose2.png
---

[A Swift Tour](https://docs.swift.org/swift-book/GuidedTour/GuidedTour.html)
<sub>아래 모든 정보의 출처는 Swift 공식 문서이며 개인의 학습 용도로만 사용되었음을 밝힙니다.  
All information below comes from the Swift documentation and is for personal learning purposes only.</sub>

## 문자열과 변수의 값  

  ```swift
  let apples = 3
  let oranges = 5
  let appleSummary = "I have \(apples) apples."
  let fruitSummary = "I have \(apples + oranges) pieces of fruit."
  ```

  - \ 와 ()를 이용해서 문자열 안에 변수의 값을 포함할 수 있습니다.

## Array and Dictionary

  ```swift  
  // 배열
  var thingsIWannaGet = ["a chair", "plant", "tulips"]

  thingsIWannaGet.append("clothes")
  print(thingsIWannaGet)

  // 딕셔너리
  var occupations = [
      "Marcolm": "Captain",
      "Kaylee" : "Mechanic",
  ]

  occupations["Jayne"] = "Public Relations"
  ```
  - []를 이용하여 배열과 딕셔너리를 생성할 수 있습니다.
  - key를 이용하여 값에 접근할 수 있습니다.
  - 마지막 요소 다음에 ,(콤 )가 허용됩니다.
  - 배열에 값을 추가시 배열의 크기는 자동으로 늘어납니다.
  - print(배열이름)을 이용하여 간단하게 배열을 출력할 수 있습니다.

### 빈 배열, 빈 딕셔너리 생성하기

 ```swift  
 var emptyArray: [String] = []
 var emptyDictionary: [String: Float] = [:]
 ```

## Optionals

### If문과 Optionals  

 ```swift
 var optionalString: String? = "Hello"
 print(optionalString == nil)
 // fasle 를 출력함

 var optinalName: String? = "Future Kim"
 var greeting = "Hello!"
 if let name = optionalName {
   greeting = "Hello, \(name)"
 }
 ```  
 if와 let 그리고 없을수도 있는 값을 함께 사용할 수 있다. 없을 수 있는 값을 optionals라고 한다. Optional 값은 어떤 값을 가지거나 값이 없다는 것을 나타내기 위해 nil값을 가진다. 값의 type 뒤에 ? 를 작성하여 optional임을 표시합니다.
 위의 optional value는 if문의 조건에서 unwrapped 되고 let 상수에 할당됩니다. unwrapped된 값은 안쪽 코드 블락에서 사용가능하게 됩니다.

 ```swift  
 var optionalName: String? = nil
 var greeting = "Hello!"

 if let name = optionalName {
    greeting = "Hello, \(name)"
    } else {
    greeting = "Hello, No Name!"
  }

  print(greeting)
 ```
 위에 예제에서는 optionalName에 nil값을 주었을 때는 if문의 조건이 false이기 때문에 { } 속 코드를 스킵합니다. else문을 이용하여 nil 값인 경우에 실행할 코드를 작성할 수도 있습니다. 위의 예제는 Hello, No Name을 출력합니다.

 ```swift  
 let nickname: String? = nil
 let fullname: String = "Future Kim"
 let informalGreetring = "Hi \(nickname ?? fullName)"
 ```

 ?? operator를 사용하여 optinal에 default 값을 줄 수 있습니다. 만약 optional이 nil을 가지고 있다면 기본값을 사용합니다.

## Switch  

  ```swift  
  let vegetable = "red pepper"
  switch vegetable {
    case "celery":
        print("Add some raisins and make ants on a log")
    case "cucumber", "watercress":
        print("That would make a good tea sandwich")
    case let x where x.hasSuffix("pepper"):
        print("Is it a spicy \(x)?")
    default:
        print("Everything tastes good in soup")
  }
  // Prints "Is it a spicy red pepper?"
  ```
  Switch는 모든 자료형과 넓은 범위의 비교 연산자를 지원합니다. 조건이 일치하는 switch case의 코드를 실행한 뒤에 프로그램은 Switch문을 빠져나옵니다.

### hasSuffix(_:)  

  특정 suffix(끝에 붙어서 어떤 한 다른 단어를 만드는 단어)로 끝나는 문자열인지 아닌지를 Boolean value를 리턴합니다. 위의 예시에서는 red pepper라는 문자열이 pepper로 끝나기 때문에 true를 반환합니다.


## for-in과 Dictionary  

  ```swift  
  let interestingNumbers = [
      "Prime": [2, 3, 5, 7, 11, 13],
      "Fibonacci": [1, 1, 2, 3, 5, 8],
      "Square": [1, 4, 9, 16, 25],
  ]

  var largest = 0
  for(_, numbers) in interestingNumbers {
    for number in numbers {
      if number > largest {
        largest = number
      }
    }
  }
  print(largest)
  // Prints "25"
  ```

  Dictionary는 순서가 없는 collection이기 때문에 for-in문을 사용하여 반복 수행하게 되면 임의의 순서로 작동하게 됩니다.  
  가장 바깥쪽 for-in loop의 (_, numbers) 중 앞쪽은 딕셔너리의 키를 numbers는
  배열인 값을 의미합니다. 그러면 안쪽의 for-in loop는 값인 배열을 돌며 number의 각 요소를 할당합니다. 만약 number에 할당된 배열의 요소가 largest 보다 크다면 largest에 그 값을 할당합니다. 이렇게 각 키와 값을 돌며 가장 큰 수인 25를 출력합니다.

## Tuples

  Tuple은 여러개의 값을 하나의 합쳐진 그룹으로 만듭니다. 튜플 안의 값은 어떤 자료형이든 될 수 있고, 한 튜플안의 값은 같은 서로 다른 자료형을 가질 수 있습니다.

### HTTP status code와 튜플

  예를 들어 (404, "Not Found")는 HTTP status code를 나타내는 튜플입니다. HTTP status code는 웹 페이지를 요청할 때 웹 서버로부터 리턴되는 특정한 값입니다. 404 Not Found 코드는 요청한 웹 페이지가 존재하지 않을 때 리턴되는 코드입니다.

  ```swift
  let http404Error = (404, "Not Found")
  // http404Error is of type (Int, String), and equals (404, "Not Found")
  ```
  (404, "Not Found")튜플은 HTTP status code에게 숫자와 사람이 읽을 수 있는 설명이라는 두개의 값을 주기 위해서 Int타입과 String타입을 하나의 그룹으로 만들었습니다. 이것은 "a tuple of type(Int, String)"이라고 할 수 있습니다.

### 제한이 없는 튜플

  (Int, Int, Int) 또는 (String, Bool) 등의 튜플을 만들 수 있습니다. 값의 개수나 자료형의 제한이 없습니다.

### Decompose a Tuple

  튜플의 컨텐츠를 각각의 상수나 변수로 나눌 수 있습니다.

  ```swift  
  let (statusCode, statusMessage) = http404Error

  print("The status code is \(statusCode)")
  // Prints "The status code is 404"
  ```

  만약 튜플의 값 중 몇몇의 값만 필요하다면  _(underscore)를 사용하여 필요 없는 값은 무시할 수 있습니다.

  ```swift
  let (justTheStatusCode, _) = http404Error
  print("The status code is \(justTheStatusCode)")
  // Prints "The status code is 404"
  ```

### Index를 이용하여 값에 접근하기  

  ```swift
  print("The Status code is \(http404Error.0)")
  // Prints "The status code is 404"

  print("The Status message is \(http404Error.1)")
  // Prints "The status message is Not Found"
  ```
  인덱스 번호를 이용해 각 값에 접근할 수 있습니다.

### 정의와 동시에 값에 이름짓기

  ```swift
  let http200Status = (statusCode: 200, description: "OK" )
  ```
  위의 과정을 하나로 합쳐 튜플을 정의함과 동시에 각 값에 이름을 줄 수 있습니다. 값에 이름을 붙여주면 그 이름을 이용하여 값에 접근할 수 있습니다.

  ```swift
  print("The statusCode is \(http200Status.statusCode)")
  // Prints "The statusCode is 200"
  ```

### Functions와 튜플  

  튜플은 function의 리턴 값으로 사용될 때 특히 유용합니다. 웹 페이지를 가져오는 function은 페이지 가져오기가 성공했는지 실패했는지를 알려주기 위해 (Int, String) 튜플을 반환할 수 있습니다. 서로 다른 타입인 값을 가진 튜플을 리턴하는 function은 하나의 자료형인 하나의 값을 리턴하는 funtion보다 더 유용하게 사용될 수 있습니다.

### NOTE  

  튜플은 관계가 있는 값들의 단순한 그룹들을 만드는데 유용합니다. 만약 데이터의 구조가 복잡하다면 class나 structure를 이용해 모델링하는 것이 더 좋은 방법이 될 것입니다. 
