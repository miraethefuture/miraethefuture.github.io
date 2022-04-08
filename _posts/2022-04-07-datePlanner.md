---
title: "Navigating Apps: Date Planner"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Swift
  - Sample Apps Tutorials
show_date: true
toc: true
toc_sticky: true
toc_label: "📂"
toc_icon: "kiwi-bird"
---

[Sample Apps Tutorials: About Me(Navigating Apps)](https://developer.apple.com/tutorials/sample-apps/aboutme)  
<sub>아래 모든 정보의 출처는 apple developer 공식 페이지이며 개인의 학습 용도로만 사용되었음을 밝힙니다.</sub>

# Section 1: App Configuration

  앱이 views들 사이에서 데이터를 공유하는 방법

  - 하나의 데이터 object를 만든다.
  - 전체 view hierachy에서 object를 사용한다.

## DatePlannerApp.swift  

  ```swift
  // DatePlannerApp.swift

  import SwiftUI

  @main
  struct DatePlannerApp: App {
      @StateObject private var eventData = EventData()

    var body: some Scene {
      WindowGroup {
        NavigationView {
            EventList()
            Text("Select an Event")
                .foregroundStyle(.secondary)
        }
        .environmentObject(eventData)
      }
    }
  }
  ```
### NavigationView

  - 서로 다른 views를 이동하기 위해 NavigationView를 사용합니다.
  - NavigationView 아래에는 앱의 home view가 작성됩니다.
  - 이 앱의 첫화면이자 home view는 EventList() 입니다.
  - iPad의 가로 화면과 같은 더 넓은 앱화면 구성에서, SwiftUI는 NavigationView를 이용할 때 여러개의 컨텐츠를 하나의 스택이 아닌 나란한 행들로 화면에 나타냅니다. 이 앱에서 EventList는 하나의 sidebar column에 나타납니다. 각 컨텐츠는 primary pane에 나타납니다.

  <!-- Select an Event 나타나는 곳이 어딜까? -->

### var eventData  

  ```swift
  @StateObject private var eventData = EventData()
  ```

  이 앱은 eventData라는 이름의 변수에 데이터를 저장합니다. eventData 변수는 @StateObject wrapper와 함께 observable object인 EventData의 instance를 만듭니다. SwiftUI는 observable object에 일어나는 변화를 추적합니다. 만약 변화가 생기면 SwiftUI가 자동으로 이 object를 사용하는 view를 업데이트 합니다.


  ```swift
  } // NavigationView 끝
  .environmentObject(eventData)
  ```

  eventData를 전체 view 계층에서 사용하기 위해서 .environmentObject와 eventData instance를 사용합니다. 이것을 사용하므로써 앱의 모든 navigation view의 child views들 그리고 child view의 child view까지 이 데이터를 사용할 수 있게 됩니다.

# Section 2: Event Model  

  아래에서 Event model은 이벤트를 구성하고 시각화하기 위해 필요한 모든 데이터를 가지고 있습니다.  
  Event 모델을 구성하는 방법에 대해 알아봅니다.

## Event.swift  

  ```swift  
  // Event.swift

  import SwiftUI

  struct Event: Identifiable, Hashable {
    var id = UUID()
    var symbol: String = EventSymbols.randomName()
    var color: Color = ColorOptions.random()
    var title = ""
    var tasks = [EventTask(text: "")]
    var date = Date()

    var remainingTaskCount: Int {
        tasks.filter { !$0.isCompleted }.count
    }

    var isComplete: Bool {
        tasks.allSatisfy { $0.isCompleted }
    }

    var isPast: Bool {
        date < Date.now
    }

    var isWithinSevenDays: Bool {
        !isPast && date < Date.now.sevenDaysOut
    }

    var isWithinSevenToThirtyDays: Bool {
        !isPast && !isWithinSevenDays && date < Date.now.thirtyDaysOut
    }

    var isDistant: Bool {
        date >= Date().thirtyDaysOut
    }

  }

  ```

  Event planner는 데이터를 분류, 구성하기 위해서 여러개의 Event object의 모음(collection)을 사용합니다. 각각의 Event object는 캠핑, 여행, 생일파티와 같은 특정 이벤트를 나타냅니다.

  - **Identifiable protocol**은 이벤트의 리스트를 생성할 때 SwiftUI가 이벤트의 값을 다른 것들과 확실히 구별하고 그것을 업데이트 해줍니다.

### 📖 틈새 영어 단어: populate
  <div class="notice">
     <h4>The Event type contains all of the information you need to populate an event.</h4>
     <p>컴퓨터에서 데이터 베이스나 테이블에 정보를 입력하는 것을 말합니다.</p>
  </div>

### Event Type
  ```swift
  struct Event: Identifiable, Hashable {
    var id = UUID()
    var symbol: String = EventSymbols.randomName()
    var color: Color = ColorOptions.random()
    var title = ""
    var tasks = [EventTast(text: "")]
    var date = Date()
  }
  ```
  Event type은 하나의 이벤트를 만들기 위한 모든 정보를 가지고 있습니다. 심볼과 색, 이벤트의 이름, 이벤트 안에서 수행해야 할 tasks와 날짜입니다. task는 이벤트를 누르면 to-do 형식으로 나타납니다.

### Computed properties  

  Stored properties 아래에는 computed properties가 있습니다. Computed properties는 날짜나 수행한 task 수를 기반으로 이벤트를 정렬할 수 있도록 합니다.

  ```swift  
  var isPast: Bool {
    date < Date.now
  }
  ```
  에를 들어 위의 isPast property는 현재 날짜, 시간보다 이벤트의 날짜 시간이 적으면 true를 반환합니다. 이것을 이용해 사용자들은 과거 이벤트를 위한 카테고리에 지난 이벤트들을 모아둘 수 있습니다.

#### UUID()  

  <sub>[참고한 페이지](https://www.hackingwithswift.com/books/ios-swiftui/working-with-identifiable-items-in-swiftui)</sub>

  a Universally Unique Identifier의 약자입니다.
  정적인 view를 만들때는 SwiftUI가 어떤 뷰를 우리가 이용하고 있는지 알고, 여러가지 작업을 할 수 있습니다. 하지만 우리가 동적인 view를 만들기 위해서 List나 ForEch문을 사용하면 SwiftUI는 각 아이템들을 구별할 방법이 필요해집니다. 이때 사용할 수 있는 것이 UUID()입니다.

# Section 3: Event Task  

  하나의 EventTask는 하나의 to-do 아이템을 나타냅니다. 이 챕터에서는 어떤 방식으로 task 부분을 구성하는지 알아봅니다.

## EventTask.swift  

  ```swift  
  // EventTask.swift  

  import SwiftUI

  struct EventTask: Identifiable, Hashable {
    var id = UUID()
    var text: String
    var isCompleted = false
    var isNew = false
  }
  ```

  Event type과 마찬가지로 EventTask type 역시 Identifiable protocol을 따릅니다. 이것은 SwiftUI이 리스트 속 to-do 아이템의 모양을 관리하고 업데이트 할 수 있도록 합니다. EventTask type은 id, text, isComplete, isNew와 같은 to-do 아이템의 속성들을 가지고 있습니다.

# Section 4: Event Data

  앱의 event list에 정보를 입력하기 위해 observable object인 EventData를 사용합니다. 그리고 어떻게 데이터의 구조를 구성하고 업데이트하는지 알아봅니다.  

## EventData type  

  ```swift
  // EventData.swift
  import SwiftUI

  class EventData: ObservableObject {
      @Published var events: [Event] = [
          Event(symbol: "gift.fill",
                color: .red,
                title: "Future's Birthday",
                tasks: [EventTask(text: "Wine"),
                        EventTask(text: "Cheese plate"),
                        EventTask(text: "Something too sweet"),
                        ],
                date: Date.roundedHoursFromNow(60 * 60 * 24 8 30)),
          Event(symbol: "theatermasks.fill",
                //위와 같은 내용)
      ]
  }
  ```

  - EventData type은 어플에 나타나는 모든 이벤트를 저장하고 수정합니다.
  - ObservableObject protocol을 따릅니다. -> EventData에 있는 published values 중 어떤 것에든 변화가 일어나면 SwiftUI가 그 values를 사용하고 있는 view들을 찾고 업데이트 해줍니다.

### events property

  - EventData는 events라는 property를 가지고 있습니다. events는 Event라는 배열을 가지고 있습니다. (배열들은 미리 여러개의 이벤트 값이 입력되어 있습니다.)
  - @Published property wrapper는 events 배열에 변화가 일어날때마다 SwiftUI가 변화를 인지하고 그 배열을 사용하는 view들을 업데이트 하게 합니다. 이것은 배열로부터 이벤트를 추가하거나 삭제하면 바로 UI에 보여지도록 합니다.

### EventData의 메서드  

  ```swift
    ] // events 속성의 배열 끝부분

    func delete(_ event: Event) {
      events.removeAll { $0.id == events.id }
    }

  }
  ```

#### removeAll(where:)  

  removeAll(where:) 메서드는 기준에 부합하는 집합의 모든 요소들을 삭제하는 메서드입니다.

<!-- ### 궁금한 것

<div class="notice--warning">
배열의 마지막 요소 뒤에 왜 , 가 있을까?
</div> -->
