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
[Intro to SwiftUI: Digital Clock](https://medium.com/iu-women-in-computing/intro-to-swiftui-digital-clock-d0a60e05d394) <- 블로그를 보며 공부합니다.

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


SwiftUI가 State variable에 일어난 변화들을 감시합니다. @State는 스스로 변화를 만들지는 않습니다.  
Date() initializer는 시간의 한 지점을 가져옵니다. 우리가 방금 만든 디지털 시계가 자동으로 흘러가지 않는 이유이죠.

우리가 보는 시계들처럼 초가 흘러가고 60초가 지나면 1분이 늘어나게 만드려면 매초마다 date variable을 새로 고침해주어야 합니다.  
그러려면 Timer 객체를 사용하면 됩니다. Timer는 일정 시간이 지나면 특정 메세지를 타겟 객체에 보냅니다. Timer을 설정해주면
SwiftUI가 @State의 변화를 인식하고 그것에 따라 우리의 시계를 업데이트 해줄 것입니다.

 Timer 객체를 생성하는 코드를 작성해봅니다.

```swift
var updateTimer: Timer {
  Timer.scheduledTimer(withTimeInterval; 1, repeats: true,
    block: {
      self.date = Date()
      })  
}

```  
scheduledTimer() 메서드를 이용합니다. 첫번째 인자는 withTimeInterval이고 시간의 간격을 입력해줍니다.  
두번째는 repeat 입니다. 반복할 것인지 아닌지 bool 타입으로 입력해줍니다.  
세번째는 block 입니다. Timer가 반복될 때마다 작동될 코드를 작성해줍니다.

아직은 초마다 시계가 움직이지 않죠? 한 단계가 더 남아있습니다. Text View 아래에 .onAppear modifier을 사용하여
Timer가 스크린에 나타나도록 해줍니다.

```swift
Text("\(timeString(date: date))")
  .onAppear(perform: {let _ = self.updateTimer})
```

.onAppear(perform: action) 은 function modifier 입니다. View가 나타나면 action을 수행합니다.
self.updateTimer function은 저장할 필요가 없는 값을 반환하기 때문에 'let _'을 사용했습니다. underscore 는 아무것도 할당하고 싶지 않다는 것을 나타냅니다.
이 스텝까지 잘 마치셨다면 디지털 시계가 초마다 움직이는 것을 볼 수 있을 것입니다!



### 7. Time of Day Greeting  

시간에 따라 달라지는 인사말을 추가해볼 것입니다.
- 4:00:00am to 11:59:59am -> Morning
- 12:00:00pm to 4:59:59pm -> Afternoon
- 5:00:00pm to 8:59:59pm -> Evening
- 8:00:00pm to 3:59:59am -> Night  
위의 기준으로 시간을 나누고 각 시간대의 인사말이 시계 아래에 나타나도록 해봅시다.

```swift
func greeting() -> String {
        var greet = ""

        let midNight0 = Calendar.current.date(bySettingHour: 0, minute: 00, second:00, of: date)!
        let nightEnd = Calendar.current.date(bySettingHour: 3, minute: 59, second: 59, of: date)!

        let morningStart = Calendar.current.date(bySettingHour: 4, minute: 00, second: 0, of: date)!
        let morningEnd = Calendar.current.date(bySettingHour: 11, minute: 59, second: 59, of: date)!

        let noonStart = Calendar.current.date(bySettingHour: 12, minute: 00, second: 00, of: date)!
        let noonEnd = Calendar.current.date(bySettingHour: 16, minute: 59, second: 59, of: date)!

        let eveStart = Calendar.current.date(bySettingHour: 17, minute: 00, second: 00, of: date)!
        let eveEnd = Calendar.current.date(bySettingHour: 20, minute: 59, second: 59, of: date)!

        let nightStart = Calendar.current.date(bySettingHour: 21, minute: 00, second: 00, of: date)!
        let midNight24 = Calendar.current.date(bySettingHour: 23, minute: 59, second: 59, of: date)!

        if ((date >= midNight0) && (date <= nightEnd)) {
            greet = "Good Night."
        } else if (date >= morningStart) && (date <= morningEnd) {
            greet = "Good Morning"
        } else if ((date >= noonStart) && (noonEnd >= date)) {
            greet = "Good Afternoon."
        } else if ((date >= eveStart) && (eveEnd >= date)) {
            greet = "Good Evening."
        } else if ((date >= nightStart) && (midNight24 >= date)) {
            greet = "Good night."
        }

        return greet

    }
```


Calendar.current.date(bySettingHour...) 메서드는 주어진 date 데이터에 특정한 시간을 나타내는 variable을 만듭니다.
여기서는 우리가 위에서 만든 @State date가 주어진 날짜 데이터입니다.

아래 부분은 나누어 놓은 시간대와 현재 시간을 비교하는 부분입니다.
현재 시간과 비교해서 해당되는 인사말을 greet 변수에 담고 반환합니다.
여기까지 하면 시간을 스크린에 띄우는 것은 완성!

... 디지털시계 만들기는 계속 됩니다.


<!--
### 8. 이제부터는 화면을 꾸며보자.  

시계의 배경 부분을 사진을 넣어 사용할 수 있었으면 좋겠다는 생각이 들었다.  
검색 중 Unsplash API를 발견했고 적용해보고자 한다. -->
