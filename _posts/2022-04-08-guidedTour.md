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
