---
title: "A Swift Tour : 디지털 시계 앱을 만들며 스위프트 배워보기"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Swift
show_date: true
toc: true
toc_sticky: true
toc_label: "👷"
toc_icon: "cog"
---

### 💭 ..  
<div class="notice">
  <h4>Swift 배워보기</h4>
  <p>Swift는 어떤 언어일까?</p>
</div>


### 1. 📖
[A Swift Tour](https://docs.swift.org/swift-book/GuidedTour/GuidedTour.html) 공식 가이드를 읽으며 공부합니다.

새로운 프로그래밍 언어를 배울 때, 흔히 첫번째 프로그램으로 "Hello, world!"를 출력하는 프로그램을 만들곤 하죠. Swift에서는 단 한줄로 이 프로그램을 작성할 수 있습니다.

```swift

print("Hello, world!")

```

C 나 Objective-C로 코드를 작성해본 경험이 있다면 이 syntax가 낯설지 않을 것입니다. 스위프트에서 이 한줄의 코드는 완벽하게 한 프로그램입니다. input/output 또는 문자열을 다루기 위해 따로 라이브러리를 추가하지 않아도 됩니다. 전역 범위로 작성된 코드는 프로그램의 시작점으로 사용되므로 main() function 또한 필요하지 않습니다. 각각의 statement의 끝에 세미콜론(;)을 작성하지도 않습니다.  

### 2. 간단한 값들(Simple Values)  

상수는 let, 변수는 var를 사용해서 만듭니다. var(변수)에는 다른 값을 다시 할당할 수 있고, let(상수)는 한번 값이 정해지면 바뀌지 않습니다.

```swift

var myVariable = 42
myVariable = 50
let myConstant = 42

```
var, let의 이름 뒤에 : 을 이용해서 데이터 타입을 지정할 수 있습니다. 컴파일러가 할당된 값이 어떤 데이터 자료형을 가지고 있는지 추측할 수 있는 경우에는 자료형을 명시하지 않아도 됩니다.

```swift

let implicitInteger = 70
let implicitDouble = 70.0
let explicitDouble: Double = 70

```  


### 3. The boilerplate code
[Intro to SwiftUI: Digital Clock](https://medium.com/iu-women-in-computing/intro-to-swiftui-digital-clock-d0a60e05d394) <- 볼르그를 보며 공부합니다.

이론만 읽다보니 지루해지기 시작합니다. 지금 가장 만들어보고 싶은 앱은 디지털 시계 앱입니다. 구글링을 해봅니다.
여러개의 친절한 블로그를 발견했는데요. 그 중 하나를 읽어보며 코드 구조를 분석해봅니다.

```swift

import SwiftUI

struct ContentView: View {
    var body : some View {


        Text("Hello")

    }
}


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()

    }
}
```

struct는 ContentView라는 이름의 View와 ContentView_Previews라는 이름의 previewProvider를 포함하고 있다.  

View : 스크린에 렌더링 될 컨텐트를 담는 컨테이너다. subviews / parent views를 가질 수도 있다. View는 text, buttons, stacks, 그리고 lists 등 어떤 것이든 담을 수 있다.

ContentView 안에 body 변수를 가진다. 뷰 컨텐츠의 배열이 형성되는 곳이다. var body : some View 처럼 some 키워드가 View 앞에 오는데 이것은 body 변수가 뷰의 컨텐츠가 어떤 것이든 View를 return한다는 것을 나타낸다.  

### 4. 현재 날짜와 시간 정보 가져오기  

```swift

struct ContentView: View {
  @State var date = Date()
}
```

- '@State' 키워드는 해당 변수가 모니터링 되고 있다는 것을 의미한다. 만약 변수의 값이 바뀌면 View는 업데이트를 반영한다.

- 'Date()'는 사용자가 있는 지역의 날짜와 시간 정보를 가져오는 initializer이다.  

```swift

import SwiftUI

struct ContentView: View {
    @State var date = Date()

    var body: some View {

        VStack {
             Text("\(date)")

        }
    }
}


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```

시간 정보는 계속해서 바뀌므로 @State 키워드를 사용해서 바뀐 시간을 계속해서 반영해주고 문자열 date에 escape character '\'를 추가해서 Date()를 담고 있는 date 변수의 할당되어 있는 문자열을 가져온다.  

### 5. DateFormatter 사용

body variable 아래에 DateFormatter를 사용하는 코드를 작성해봅니다.

```swift
var timeFormat: DateFormatter {
  let formatter = DateFormatter()
  formatter.dateFormat = ("hh:mm:ss a")
  return formatter
}
```

이 코드를 분석해보자!  
timeFormatter는 DateFormatter 객체이다. timeFormatter는 DateFormatter의 메서드를 호출할 수 있다.  
dateFormat은 DateFormatter객체의 property이다. 주어진 날짜/시간 데이터에서 우리가 원하는 것만 보여줄 수 있도록 해준다.
- 소문자 "hh" = 12시간 표기법
- 대문자 "HH" = 24시간 표기법
- "mm" = 분, "ss" = 초  
- a는 am/pm을 보여준다.  

그 다음으로는 가져온 날짜 데이터를 문자열로 바꿔주는 function을 작성해봅니다.  
```swift
func timeString(date: Date) -> String {
  let time = timeFormat.string(from: date)
  return time
}s
```

### 6. Live Time  
