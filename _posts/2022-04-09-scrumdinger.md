---
title: "iOS App Dev Tutorials: Scrumdinger"
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
---

[Getting Started with Scrumdinger](https://developer.apple.com/tutorials/app-dev-training/getting-started-with-scrumdinger)  
<sub>아래 모든 정보의 출처는 apple developer 공식 페이지이며 개인의 학습 용도로만 사용되었음을 밝힙니다.  
All information below comes from the official apple developer page and is for personal learning purposes only.</sub>

<sub>영어로 작성된 튜토리얼을 읽으며 정리하는 것이기 때문에 한국어로 읽었을 때 자연스럽게 읽히도록 관사 'a'가 생략된 단수형 단어들이 많이 등장합니다.<br><s>작성자가 너무 신경쓰이는 것ㅎㅎㅠ</s></sub>

# 🤘

  SwiftUI를 이용한 완벽히 기능을 하는 앱을 만들어보며 iOS 앱 개발의 가장 중요한 부분들에 대해 알아봅니다.  

## Tour of the App

  많은 소프트웨어 엔지니어링 팀들이 그날의 업무에 대한 계획을 짜기 위해 **scrums**라고 알려진 daily meeting을 합니다. Scrums는 미팅에 참석한 사람들이 어제 이뤄낸 성과들과 오늘 작업할 일, 그리고 그들의 작업에 영향을 미칠지도 모르는 장애물에 대하여 대화를 나누는 짧은 미팅입니다.  

  이 모듈은 사용자들의 데일리 scrums의 관리를 돕는 iOS앱인 Scrumdinger를 개발하는 과정을 안내합니다.  

  Scrums가 집중력있게 짧은 시간동안 진행될 수 있도록 Scrumdinger는 미팅에 참가한 사람들이 얼만큼 이야기해야 하는지를 시각적, 청각적 신호를 사용해 알려줍니다. 이 앱은 또한 남은 시간을 알려주는 스크린을 제공합니다.  

## Build Groups of Views

  View는 UI의 한 부분을 정의합니다. 앱의 한 블락을 구성합니다. 간단하고 작은 view들을 조합하여 복잡한 view를 만듭니다.

### ContentView.swift  

  기본 SwiftUI view file은 두개의 structures를 정의합니다. 첫번째 structure는 View 프로토콜을 따릅니다. View 프로토콜의 조건은 한가지로, 하나의 view를 리턴하는 body property를 가지는 것입니다. Body 속성 부분에는 view의 content, layout, behavior를 묘사합니다. 두번째 structure는 canvas에 프리뷰를 제공합니다.

#### Refactor ContentView.swift  

  ContentView의 이름 부분을 컨트롤 클릭합니다. Refactor -> Rename을 클릭 후 이름을 변경합니다. (프로젝트 네비게이터에서도 이름이 변경됩니다.)

### ProgressView  

  Body 속성 안에 ProgressView를 예비 데이터와 함께 작성해줍니다. ProgressView는 일정 시간의 지남과 남은 시간을 보여줄 수 있고, 로딩과 같은 남은 시간이 명확하지 않은 시간의 지남도 보여줄 수 있습니다.

  <center><img src="/assets/images/scrum1.png" alt="ProgressView" width="300"></center>

### Command-click "Embed in VStack"  

  ProgressView를 Command-click 후 "Embed in VStack"을 클릭하면 ProgressView가 VStack안에 들어오게 됩니다.

### Label  

  <center><img src="/assets/images/scrum2.png" alt="Label" width="700"></center>

  첫번째 Text 아래에 라벨을 하나 만들어줍니다. 라벨의 제목은 "300"이고 "hourglass.bottomhalf.fill"이라는 system image를 사용했습니다. 시스템은 system images를 폰트로 취급하기 때문에 사용자의 디바이스 세팅에 대응하여 크기를 조절합니다.  

### Alignment  

  <center><img src="/assets/images/scrum3.png" alt="alignment" width="700"></center>  

  Seconds Elapsed와 Seconds Remaining을 담고 있는 VStack에 각각 leading, trailing alignment를 주면 왼쪽 정렬, 오른쪽 정렬 됩니다.

### .font(.caption) modifier  

  .font(.caption) modifier는 Text의 글씨 크기를 줄여줍니다. SwiftUI의 view를 커스터마이즈하기 위해서는 modifiers라는 메서드를 사용합니다. 각각의 modifier는 새로운 view를 리턴합니다. 여러개의 modifier를 한 view에 적용할 수도 있습니다.

### Circle()

  ```swift  
  Circle()
      .strokeBorder(lineWidth: 24)
  ```
  위의 코드를 작성함으로서 뻥 뚫린 24 굵기의 테두리를 가진 원형을 스크린에 출력할 수 있습니다.

## Supplement Accessibility data

  SwiftUI는 빌트인 accessibility를 가지고 있습니다. 아주 적은 양의 작업으로 accessibility가 앱을 지원하도록 할 수 있습니다. 예를 들어 text view안에 있는 문자열은 자동적으로 VoiceOver와 같은 기능을 할 수 있게 됩니다. 하지만 accessibility 기능의 강화를 위해서 추가적인 작업을 해야 할 때도 있습니다.  

### VoiceOver  

  기본적으로 VoiceOver는 system name을 읽어줍니다. 지금 만들어보고 있는 이 앱의 header 부분에 있는 system 이미지의 이름을 읽을 것입니다. hourglass.bottomhalf.fill과 같은 이름이죠.

  ```swift
  } // systemImage를 사용했던 HStack 끝부분
  .accessibilityElement(children: .ignore)
  ```
  위의 코드를 작성하여 HStack의 child view의 사용될거라 예상된 accessibility를 무시해줍니다. 이런 과정은 사용자가 더 좋은 accessibility 경험을 할 수 있도록 할 것입니다.

  ```swift  
  } // systemImage를 사용했던 HStack 끝부분
  .accessibilityElement(children: .ignore)
  .accessibilityLabel("Time remaining")
  ```
  의미가 일치하는 이름을 사용하여 accessibility label을 HStack에 추가해줍니다.
  사용자가 해당 요소의 목적을 이해할 수 있도록 이름 지어 줍니다. 이 부분에서는 system name 보다는 VoiceOver 사용자가 이해하기 쉬운 가장 중요한 정보를 표현하는 문자를 추가해주었습니다.

  ```swift  
  } // systemImage를 사용했던 HStack 끝부분
  .accessibilityElement(children: .ignore)
  .accessibilityLabel("Time remaining")
  .accessibilityValue("10 minutes")
  ```
  Child view의 값을 의도적으로 무시해주었기 때문에 값을 추가해주어야 합니다.

## Create a Card View

### Create a Color Theme

  - main color: view의 배경색
  - accent color: view의 글씨색

  을 이용하여 Color Theme을 생성해봅니다.

#### New Group 만들기

  Xcode 맨 왼쪽 아래에 + 버튼을 누르면 프로젝트 네비게이터에 New Group을 생성할 수 있습니다.
  <center><img src="/assets/images/scrum4.png" alt="New Group" width="500"></center>

### Color properties

  view를 만들 것은 아니지만 Color properties를 이용하기 위해서 SwiftUI 프레임워크를 임포트 해줍니다.

  ```swift
  // Theme.swift

  import Foundation
  import SwiftUI

  enum Theme: String {
      case bubblegum
      case buttercup
      case indigo
      case lavender
      case magenta
      case navy
      case orange
      case oxblood
      case periwinkle
      case poppy
      case purple
      case seafoam
      case sky
      case tan
      case teal
      case yellow

      // 각 main 컬러에 대응되는 accentColor를 설정해주는 property입니다.
      var accentColor: Color {
          switch self {
              case .bubblegum, .buttercup, .lavender, .orange, .periwinkle, .poppy, .seafoam, .sky, .tan, .teal, .yellow: return .black
              case .indigo, .magenta, .navy, .oxblood, .purple: return .white
          }
      }
      // 이 enumeration의 rawValue를 사용하여 색을 생성하는 속성
      var mainColor: Color {
        Color(rawValue)
      }
  }

  ```

### Create a Daily Scrum Model  

  DailyScrum의 주목적은 value data를 보여주는 것이기 때문에 struct를 만들어 value type으로 만들 것입니다.  
  (Models Group에 DailyScrum이라는 파일 새로 만들기 후 struct 생성)

  ```swift
  struct DailyScrum {
    var title: String
    var attendees: [String]
    var lengthInMinutes: Int
    var theme: Theme
  }
  ```

  샘플 데이터를 제공하는 extension을 추가합니다.

  ```swift
  extension DailyScrum {
    static let sampleData: [DailyScrum] =
    [
        DailyScrum(title: "Design", attendees: ["Future", "Anna", "Happ", "OShel"], lengthInMinutes: 10, theme: .yellow),
        DailyScrum(title: "App Dev", attendees: ["Katie", "Gray", "Euna", "Luis", "Darla"], lengthInMinutes: 5, theme: .orange),
        DailyScrum(title: "Web Dev", attendees: ["Chella", "Chris", "Christina", "Eden", "Karla", "Lindsey", "Aga", "Chad", "Jenn", "Sarah"], lengthInMinutes: 5, theme: .poppy)
    ]
  }
  ```

### Create the Card View  

  CardView는 DailyScrum 모델 데이터를 요약하고 제목, 참가 인원수, 시간을 보여줄 것입니다. 더 작은 views를 조립하여 CardView를 만들 것입니다. 각각의 views는 DailyScrum structure의 데이터 조각을 화면에 보여줄 것입니다.

  <!-- 자세한 내용 글로 정리 할 것 -->

### Customize the Label Style  

  Scrum length와 clock 아이콘을 수평으로 쌓기 위해 label style을 만들어 봅니다. LabelStyle 프로토콜을 사용하여 여러개의 views에 같은 label style을 재사용하여 앱의 전반적인 디자인을 통일 시킬 수 있습니다.  

  (만약 커스텀 라벨 스타일을 만들고 싶지 않다면 built-in label styles를 사용할 수 있습니다.)  

  ```swift
  // TrailingIconLabel.swift

  import SwiftUI

  struct TrailingIconLabelStyle: LabelStyle {
    func makeBody(configuration: Configuration) -> some View {


    }
  }
  ```

  1. TrailingIconLabel라는 이름의 새 스위프트 파일을 생성합니다.
  2. LabelStyle 프로토콜을 따르는 TrailingIconLabelStyle라는 이름의 structure를 생성합니다. (아직 LabelStyle 프로토콜의 요구사항을 충족하지 않기때문에 컴파일러가 error를 throw합니다.)
  3. 비어있는 makeBody function을 생성합니다. (이제 에러가 사라집니다.)

  이 스타일이 현재의 라벨 스타일인 뷰 hierarchy 안의 각각의 Label 인스턴스마다 시스템은 이 메서드를 호출합니다.

  ```swift
  // TrailingIconLabel.swift

  import SwiftUI

  struct TrailingIconLabelStyle: LabelStyle {
    func makeBody(configuration: Configuration) -> some View {
      HStack {
        configuration.title
        configuration.icon
      }
    }
  }
  ```
  ```swift
  // TrailingIconLabel.swift


  import SwiftUI

  struct TrailingIconLabelStyle: LabelStyle {
      func makeBody(configuration: Configuration) -> some View {
          HStack {
              configuration.title
              configuration.icon
              // 이 메서드의 사용으로 CardView의 오른쪽 Label의 title, icon 순서가 바뀜
          }
      }
  }

  extension LabelStyle where Self == TrailingIconLabelStyle {
      static var trailingIcon: Self { Self() }
      // trailingIcon에 TrailingIconLabelStyle 나 자신을 담아서 다른 곳에서 쉽게 사용할 수 있게 함.
      // static 변수이기 때문에 어디서든 leading-dot syntax를 이용하여 사용할 수 있음.
      // 위의 이유로 코드가 readable해짐.

  }
  ```

## Displaying Data in a List

  SwiftUI ForEach view structure를 사용하여 DailyScrum object의 배열로부터 동적으로 행들을 만들 것입니다.  

### Display a List of Daily Scrums

  ForEach를 이용하여 List view의 정보를 채워줍니다. (미리 작성해둔 sampleData 배열을 이용합니다.)

  <center><img src="/assets/images/scrum5.png" alt="list" width="500"></center><br>  


  ```swift
  //  ScrumsView.swift

  import SwiftUI

  struct ScrumsView: View {
      let scrums: [DailyScrum]

      var body: some View {
          List {
              // ForEach closure 안에 CardView initialize 해주기
              // 이 closure는 scrums Array에 있는 요소마다 CardView를 리턴함
              ForEach(scrums, id: \.title) { scrum in
                  // 첫번째 scrum은 CardView의 속성으로 DailyScrum 타입임.
                  // 두번째 scrum은 ForEach문에서 DailyScrum의 각 요소가 할당되는 곳
                  CardView(scrum: scrum)
                      .listRowBackground(scrum.theme.mainColor)
                  // 각 scrum 요소의 theme main을 이용

              }
          }
      }
  }

  struct ScrumsView_Previews: PreviewProvider {
      static var previews: some View {
          ScrumsView(scrums: DailyScrum.sampleData)
      }
  }
  ```

### Make Scrums Identifiable  

  ForEach structure는 식별 가능한(Identifiable) 정보를 반복하여 실행하며 동적인 뷰를 만듭니다. 위에서 List 안에 사용한 ForEach에서는 요소를 식별하기 위한 key path로 title을 사용했습니다. (sample data의 title이 모두 달랐기 때문에 가능했습니다.) 하지만 만약 실제 사용자가 이미 존재하는 title과 같은 title로 새 scrum을 만든다면 문제가 발생할 수 있습니다.  

#### User-generated content  

  사용자가 생성하는 컨텐츠를 사용하는 앱을 작동시키기 위해서 DailyScrum이 Identifiable 프로토콜을 따르도록 할 것입니다. 이것은 위에서 이용했던 방법처럼 title을 key path로 사용하는 것보다 더 안전하게 문제가 쉽게 일어나지 않은 방법이 될 것입니다. Identifiable 프로토콜의 요구사항은 id 속성을 갖는 것입니다.  

  ```swift  
    struct DailyScrum: Identifiable {
      let id: UUID          // UUID 타입의 id 속성 생성
      var title: String
      var attendees: [String]
      var lengthInMinutes: Int
      var theme: Theme

      // init 생성자 생성
      init(id: UUID = UUID(), title: String, attendees: [String], lengthInMinutes: Int, theme: Theme) {
          self.id = id
          self.title = title
          self.attendees = attendees
          self.lengthInMinutes = lengthInMinutes
          self.theme = theme
      }
  }
  ```

### App protocol  

  이제 ScrumsView를 앱의 루트 뷰로 만들어 줍니다. SwiftUI 앱은 App 프로토콜을 따르는 structure를 정의함으로써 생성할 수 있습니다. 앱의 바디 속성은 사용자가 주로 사용할 첫번째 화면을 보여주는 view hierarchy를 담은 Scene을 리턴합니다.

  ```swift
  import SwiftUI

  @main
  struct ScrumdingerApp: App {
      var body: some Scene {
          WindowGroup {
              ScrumsView(scrums: DailyScrum.sampleData)
          }
      }
  }
  ```  

#### WindowGroup  

  WindowGroup은 SwiftUI가 제공하는 scenes 중 하나입니다. iOS에서는, WindowGroup scene builder에 추가된 view가 기기의 전체 화면을 채우는 윈도우에 나타나게 됩니다.


## Creating a Navigation Hierarchy

  지금까지 views를 만들어 보았고 이제부터는 그 views 사이를 이동하는 방법에 대해 알아보겠습니다.  

### NavigationView와 Link

  ```swift
  //  ScrumsView.swift

  import SwiftUI

  struct ScrumsView: View {
      let scrums: [DailyScrum]

      var body: some View {
          List {
              // ForEach closure 안에 CardView initialize 해주기
              // 이 closure는 scrums Array에 있는 요소마다 CardView를 리턴함
              ForEach(scrums) { scrum in
                  // 첫번째 scrum은 CardView의 속성으로 DailyScrum 타입임.
                  // 두번째 scrum은 ForEach문에서 DailyScrum의 각 요소가 할당되는 곳
                  NavigationLink(destination: Text(scrum.title)) {
                      CardView(scrum: scrum)
                  }
                  .listRowBackground(scrum.theme.mainColor)
                  // 각 scrum 요소의 theme main을 이용

              }
          }
          .navigationTitle("Daily Scrums")   // -> title은 부모 navigation stack 안쪽에
          .toolbar {
              Button(action: {}) {
                  Image(systemName: "plus")
              }
              .accessibilityLabel("New Scrum")
          }
      }
  }

  struct ScrumsView_Previews: PreviewProvider {
      static var previews: some View {
          // Navigation title을 위한 padding을 화면에 보여줌
          NavigationView {
              ScrumsView(scrums: DailyScrum.sampleData)
          }
      }
  }

  ```

  ScrumsView.swift 파일에 NavigationView와 NavigationLink를 추가하여 코드를 수정해줍니다.

  <center><video src="https://user-images.githubusercontent.com/85061148/163188935-455f0ea8-13b2-4d8d-9208-cdbaeb78c528.mov" controls="controls" style="max-width: 400px">
  </video></center><br>  

  영상에서 볼 수 있듯이 SwiftUI는 자동으로 디테일 뷰에서 Back 버튼을 추가하고 전 화면의 타이틀을 표시합니다.

### Create the Detail View  

  계층 구조를 가지고 있는 앱(hierarchical apps)에서는, 더 높은 계층의 view에서 detailed view로 이동합니다. 그러므로써 더 특정된 데이터를 조작할 수 있습니다. 이 섹션에는 각 scrum의 디테일 뷰를 만들어 볼 것입니다.

  1. DetailView.swift를 생성합니다.
  2. DetailView.swift에 DailyScrum 타입의 scrum constant를 생성합니다.
  3. ScrumsView.swift에 NavigationLink의 destination을 수정합니다.

  ```swift
  ForEach(scrums) { scrum in
      NavigationLink(destination: DetailView(scrum: scrum)) {
          CardView(scrum: scrum)
      }
      .listRowBackground(scrum.theme.mainColor)
      // 각 scrum 요소의 theme main을 이용

  }
  ```
  destination을 DetailView로 수정해주었습니다. (scrum: )은 DetailView의 constant이고 그 뒤에 오는 scrum은 ForEach문에 사용된 변수입니다.

### DetailView with Visual Components  

#### List  

  List view를 이용하여 scrum의 이름, 미팅 시간, 카드의 색, 참석자들의 목록을 디테일 뷰에 보여줍니다.

  ```swift
  // DetailView.swift

  struct DetailView: View {
    let scrum: DailyScrum

    var body: some View {
        List {
            Section(header: Text("Meeting Info")) {
                Label("Start Meeting", systemImage: "timer")
                Spacer()
                HStack {
                    Label("Length", systemImage: "clock")
                    Spacer()
                    Text("\(scrum.lengthInMinutes) minutes")
                }
                .accessibilityElement(children: .combine)

              }
          }
      }
  }
  ```
  Sections List안의 목록의 그룹을 만들어서 눈에 보이는 구분점을 만들어줍니다.  

  .accessibilityElement(children: .combine)  
  위의 modifier를 이용하여 Label view와 Text view를 하나로 합쳐줍니다. (accessibility user를 위해)  

### Iterate Through Attendees  

  ```swift  
  //DailyScrum.swift

  struct DailyScrum: Identifiable {
      let id: UUID
      var title: String
      var attendees: [Attendee]
      var lengthInMinutes: Int
      var theme: Theme

      init(id: UUID = UUID(), title: String, attendees: [String], lengthInMinutes: Int, theme: Theme) {
          self.id = id
          self.title = title
          self.attendees = attendees.map { Attendee(name: $0) }
          self.lengthInMinutes = lengthInMinutes
          self.theme = theme
      }
  }

  extension DailyScrum {
      struct Attendee: Identifiable {
          let id: UUID            // id 속성은 let
          var name: String

          // id 속성에 defalut 값을 주는 생성자
          init(id:UUID = UUID(), name: String) {
              self.id = id
              self.name = name
          }
      }
  }

  ```
  DailyScrum에 extension을 추가하여 안에 Attendee라는 structure를 만들어 줍니다. ForEach를 이용해 sample data의 참석자들을 DetailView에 보여줄 것 이므로 Attendee의 id, name 속성을 정의합니다. id 값에 디폴트 값을 주기 위해서 생성자를 만듭니다. 처음에 만들어 두었던 DailyScrum 모델에서 attendees의 타입을 [Attendee] (Attendee 타입의 배열)로 수정해줍니다.

#### map(_:)  

  map(_:)은 이미 존재하는 collection의 각 요소에 반복해서 변화를 적용하며 새로운 collection을 생성합니다.

  ```swift  
  // init 생성자 안
  self.attendees = attendees.map { Attendee(name: $0) }
  ```
  패러미터를 통해 들어온 attendees를 map을 이용해 반복해 돌면서 Attendee 타입으로 바꿔준다.(?)

#### ForEach

  ```swift
  Section(header: Text("Attendees")) {
                ForEach(scrum.attendees) { attendee in
                    Label(attendee.name, systemImage: "person")
                }
            }
  ```
  Attendee가 identifiable 해졌으므로 ForEach를 사용하여 sample data를 통해 동적으로 참석자들의 리스트를 만들 수 있게 되었습니다.
  <center><img src="/assets/images/scrum6.png" alt="section" width="400"></center><br>  

### Navigate Between Screens

  DetailView에서 이동하는 view를 만들며 hierarchy 설정을 마무리해봅니다.

  ```swift  
  NavigationLink(destination: MeetingView()) {
                    Label("Start Meeting", systemImage: "timer")
                        .font(.headline)
                        .foregroundColor(.accentColor)
                }
  ```
  NavigationLink를 추가하는 것은 label을 gesture recognizer 형태로 감싸줍니다. 이로 인해 사용자들을 이 행을 탭하여 meeting timer screen을 볼 수 있게 됩니다.

  이렇게 navigation stack을 완성했습니다.

## Managing Data Flow Between Views

  사용자에게 정보를 보여주고 사용자와 상호작용하며 데이터를 수정해 보여주는 것은 대부분의 앱들에 기본이 되는 기능입니다. 앱의 UI가 현재 데이터의 상태를 잘 반영하도록 하기 위해 @State와 @Binding을 사용하는 방법에 대해 알아봅니다.

### Source of Truth  

  한 정보의 여러가지 복사본을 유지하는 것은 앱을 버르고 이끄는 불일치를 초래할 수 있습니다. 데이터 불일치 버그를 피하기 위해 앱의 각 데이터들을 위해 a single source of truth를 사용합니다. 한 장소에 요소를 저장하세요. (the source of truth에) 그리고 몇개의 view든 그 데이터에 접근할 수 있습니다. Source of truth는 코드 전체 어디에든 작성할 수 있습니다.  
  Scrumdinger 앱에서는 모든 뷰들이 접근을 공유할 ScrumdingerApp에 source of truth를 생성할 것입니다.

### Swift Property Wrappers

#### State  

  @State를 이용해 속성을 정의하면, 해당 view안에 a source of truth를 생성할 수 있습니다. 시스템은 @State property를 사용하는 뷰의 모든 요소들을 식별합니다. 사용자의 사용자와의 상호작용은 @State 속성의 값을 변화시킬 수 있고, 시스템은 @State를 사용하는 속성을 업데이트 함으로써 새로운 버전의 UI를 렌더링합니다.

  @State의 값이 변하면 시스템은 업데이된 값을 사용하는 뷰를 다시 그립니다. 예를 들어 Scrumdinger 앱의 사용자가 하나의 scrum을 수정하면 ScrumsView는 업데이트 된 값을 화면에 보여주기 위해서 list를 다시 그립니다.  

  State property는 잠시 머무르는 상태를 관리하는 것을 돕기 때문에 private으로 정의하고 지속되야하는 저장에는 사용하는 것을 피해야 합니다.

#### Binding  

  @Binding을 사용하여 감싼 property는 읽기 그리고 쓰기에 대한 접근을 존재하는 source of truth와 공유합니다. (@State property 처럼...)  
  @Binding은 데이터를 직접적으로 담지 않습니다. 대신, 그 데이터를 업데이트하고 화면에 보여주는 source of truth와 view 사이의 양방향 연결을 생성합니다. 이 연결은 여러개의 뷰와 연결된 하나의 데이터가 항상 업데이트 된 상태로 유지되게 합니다.

  <!-- 남은 부분 스킵함. 시간나면 더 채우도록. -->

## Creating the Edit View  

### Update the Data Model

  Edit view를 만들기 전에, DailyScrum.swift안에 새로운 타입인 Data를 생성합니다. Data는 DailyScrum에 편집이 가능한 모든 속성들을 담을 것입니다. 이 속성들을 edit view에 생성할 controls와 일치할 것입니다.  

  ```swift
  struct Data {
      var title: String
      var attendees: [Attendee]
      var lengthInMinutes: Double
      var theme: Theme
  }
  ```
  DailyScrum의 extensnion안에 Data structure를 정의합니다. 사용자가 Slider view를 이용해 미팅 시간을 조정하게 됩니다. Sliders는 Double 값을 이용하므로 lengthInMinutes의 자료형을 Double로 줍니다.  

  Foundation 프레임워크에 Data structure가 있기 때문에 DailyScrum의 extension에 Data structure를 정의해서 nested type으로 만들면서 (-> DailyScrum.Data) 두개를 분리할 수 있게 됩니다.

  ```swift  
  struct Data {
      var title: String = ""
      var attendees: [Attendee] = []
      var lengthInMinutes: Double = 5
      var theme: Theme = .seafoam
  }

  var data: Data {
      Data(title: title, attendees: attendees, lengthInMinutes: Double(lengthInMinutes), theme: theme)
  }
  ```
  그리고 각 속성에 기본값을 줍니다. 모든 속성이 기본 값을 가지고 있다면 컴파일러는 인자가 필요없는 생성자를 만듭니다. 이렇게 만들어진 생성자는 Data()로 호출되어 인스턴스를 생성할 수 있습니다.  

  DailyScrum 속성 값을 가지는 Data를 리턴하는 computed property도 생성해 줍니다.

### Add an Edit View for Scrum Details  

  - Edit View를 생성하고, scrum의 제목과 소요 시간을 수정하기 위해 이용되는 controls를 생성합니다.  
  - Scrum 데이터의 변화를 Data 속성 형식으로 저장합니다.
  - @State property wrapper를 사용합니다.

  ```swift  
  @State private var data = DailyScrum.Data()
  ```
  DetailEditView.swift 파일을 만들고 위의 코드를 추가하여 source of truth를 정의합니다.  
  Data 타입의 모든 속성에 기본값을 주었으므로 자동으로 생성된 생성자 DailyScrum.Data()를 @State property wrapper로 감싸줍니다. 오직 이 속성을 정의한 이 view에서만 접근 가능하도록 private 속성으로 정의합니다.

  ```swift  
  struct DetailEditView: View {
      @State private var data = DailyScrum.Data()
      var body: some View {
          Form {
              Section(header: Text("Meeting Info")) {
                  TextField("Title", text: $data.title)
              }
          }
      }
  }
  ```
  Form은 다른 플랫폼들에서 controls의 모양이 자동으로 적응된 모습으로 렌더링 되도록 합니다.  

  제목을 입력할 TextField를 생성합니다. TextField는 binding을 String으로 받아들입니다. $ syntax를 사용하여 data.title에 binding을 생성합니다. 현재의 뷰는 data 속성의 상태를 조작할 수 있게 됩니다.

  ```swift  
  HStack {
      TextField("New Attendee", text: $newAttendeeName)
      Button(action: {
          withAnimation {
              let attendee = DailyScrum.Attendee(name: newAttendeeName)
              data.attendees.append(attendee)
              newAttendeeName = ""      // text field를 비워줌
          }
      }) {
          Image(systemName: "plus.circle.fill")
      } // 버튼 끝
      .disabled(newAttendeeName.isEmpty)
  }
  ```

  Text field가 newAttendeeName의 binding을 가지고 있기 때문에 없는 값을 설정해주므로써 text fields의 컨텐츠를 비울 수 있습니다.

  newAttendeeName이 비어있을 때는 버튼을 비활성화 시킵니다. 이것은 유저가 이름 없는 참석자를 추가하는 것을 방지해줍니다. 유저가 이름을 입력하면 버튼은 활성화됩니다.

### Present the Edit View

  DetailView에서 버튼을 누르면 Modal view의 형식으로 DetailEditView를 보여줄 것입니다.
  ```swift
  @State private var isPresentingEditView = false
  ```
  ```swift
  } // DetailView.swift - List view 끝부분
  .navigationTitle(scrum.title)
  .toolbar {
      Button("Edit") {
          isPresentingEditView = true
      }
  }
  .sheet(isPresented: $isPresentingEditView) {
      DetailEditView()
  }
  ```
  - sheet modifier는 현재 화면의 content를 부분적으로 가리는 modal sheet를 생성합니다.
  - Button을 누르면 위의 정의했던 isPresentingEditView가 true로 바뀌고 sheet가 가지고 있는 isPresentingEditView 바인딩이 true값을 가지게 되면서 DetailEditView가 modal sheet로 보여지게 됩니다.

  ```swift
  .sheet(isPresented: $isPresentingEditView) {
      NavigationView {
          DetailEditView()
              .navigationTitle(scrum.title)
              .toolbar {
                  ToolbarItem(placement: .cancellationAction) {
                      Button("Cancel") {
                          isPresentingEditView = false
                      }
                  }
                  ToolbarItem(placement: .confirmationAction) {
                            Button("Done") {
                                isPresentingEditView = false
                            }
                        }
              }
      }
  }
  ```
  ToolbarItem으로 modal view에 Cancel / Done 버튼을 생성합니다. Cancel버튼을 누르면 변경 사항이 저장되지 않고 취소되고 모달 뷰가 사라집니다. Done 버튼은 변경 사항이 저장되고 모달 뷰가 사라집니다. (아직 데이터를 진짜 저장할 수는 없습니다.)


## Passing Data with Bindings  

### Add a Theme View  

  사용자가 각 scrum을 구별하기 쉽게 하기 위해 Color theme을 선택할 수 있도록 할 것입니다. 먼저 theme 의 components를 보여줄 theme view를 생성합니다.

  ```swift
  //  ThemeView.swift

  import SwiftUI

  struct ThemeView: View {
      let theme: Theme

      var body: some View {
          ZStack {
              RoundedRectangle(cornerRadius: 4)
                  .fill(theme.mainColor)
              Label(theme.name, systemImage: "paintpalette")
                  .padding(4)
          }
          .foregroundColor(theme.accentColor)
          .fixedSize(horizontal: false, vertical: true)
      }
  }

  struct ThemeView_Previews: PreviewProvider {
      static var previews: some View {
          ThemeView(theme: .buttercup)
      }
  }
  ```

  fixedSize modifier를 사용하여 라벨의 원래 사이즈에 크기를 맞춰줍니다. Label에 패딩을 추가해주어서 더 보기 편하게 만들어 줍니다. 여기서 만든 view는 전체 컬러를 보여주는 list의 한 cell로 이용할 것입니다.

### Add a Theme Picker

  사용자가 meeting view의 theme 색을 선택할 수 있도록하는 custom interactive view를 생성합니다.

  ```swift
  // ThemePicker.swift

  import SwiftUI

  struct ThemePicker: View {
      @Binding var selection: Theme    

      var body: some View {
          Picker("Theme", selection: $selection) {
              ForEach(Theme.allCases) { theme in
                  ThemeView(theme: theme)
                      .tag(theme)
              }
          }
      }
  }

  struct ThemePicker_Previews: PreviewProvider {
      static var previews: some View {
          ThemePicker(selection: .constant(.periwinkle))
      }
  }
  ```
  ThemePicker.swift 파일을 새로 생성해줍니다. DetailEditView에 들어갈 Picker view를 생성합니다. ForEach를 사용해 각 case로의 접근을 용이하게 합니다.
  Theme.swift의 enum Theme에 CaseIterable, Identifiable 프로토콜을 추가해줍니다. id 속성은 case의 이름으로 추가해줍니다.

  ```swift
  // DetailEditView.swift - body - Form
  } Slider 있는 HStack 끝부분
  ThemePicker(selection: $data.theme)
  ```
  위의 ThemePicker 생성자는 theme selection에 일어난 변화를 data.theme으로 다시 돌려보냅니다.

#### constant(_:) type method

  변경되지 않는 값을 가지는 binding을 생성합니다. PreviewProvider를 사용할 때, 다른 값들을 어떻게 보여주는지 알아보기 위해서 사용할 수 있습니다.

### Pass the Edit View a Binding to Data

  사용자가 scrum의 정보를 수정하면, 앱에 있는 여러개의 screen이 그 변경된 정보를 반영해야 합니다. 이 섹션에서는, 사용자가 Done 버튼을 눌렀을 때 edit view에 detail view의 scrum을 업데이트하는 binding을 추가합니다.

  디테일 화면은 edit화면에서 만들어진 변경 사항을 업데이트 해야 합니다. 그래서 디테일 화면은 source of truth를 edit 화면과 공유합니다.

### Edit 화면에 기존 scrum 정보 가져오기

  Edit 버튼을 누르면 scrum에 입력되어 있던 기존 정보를 edit modal sheet에 보여주도록 설정해 봅니다.

  ```swift
  .toolbar {
      Button("Edit") {
          isPresentingEditView = true
          data = scrum.data
      }
  }
  ```
  ```swift
  data = scrum.data

  // = 왼쪽에 있는 data
  @State private var data = DailyScrum.Data()

  // = 오른쪽 scrum. 뒤의 data
  var data: Data {
      Data(title: title, attendees: attendees, lengthInMinutes: Double(lengthInMinutes), theme: theme)
  }
  ```
  비어있는 생성자는 기본 값을 가진 인스턴스를 생성합니다. 이 값들을 선택한 scrum의 값으로 설정해줍니다.

  <!-- 👷 데이터의 흐름 다시 정리 -->

### 튜토리얼 중 빠진 부분(?)

  ```swift
  // DetailView.swift

  ToolbarItem(placement: .confirmationAction) {
      Button("Done") {
          isPresentingEditView = false
          scrum.update(from: data) // <- 계속해서 에러가 나던 부분
      }
  }
  ```
  컴파일러가 위의 표시한 곳에서 자꾸 에러를 발생시켰다. 코드를 다르게 타이핑 한걸까해서 열심히 찾아보았지만 다른 부분은 없었다. Complete 버전의 프로젝트 파일을 받아서 확인해보던 중 DailyScrum.swift에서 튜토리얼에는 없던 function을 발견했다.

  ```swift
  mutating func update(from data: Data) {
      title = data.title
      attendees = data.attendees
      lengthInMinutes = Int(data.lengthInMinutes)
      theme = data.theme
  }
  ```
  위의 코드를 DailyScrum의 extension에 추가해주면 정상적으로 작동한다.

### 이 튜토리얼에서는 ❕

  - @State property wrapper를 이용해서 value type의 source of truth를 생성해 보았습니다.
  - @Binding을 사용하여 다른 views의 state에 쓰기 권한을 공유해 보았습니다. (사용자로부터 입력받은 정보로 @State로 감싼 변수를 사용하는 views에 데이터를 업데이트한 것을 말하는 것 같습니다.)


## Making Classes Observable  

  위에서는 @State와 @Binding을 이용하여 value type를 source of truth로 정의하는 것에 대해 알아보았습니다. 여기서는 앱의 UI를 위해 reference type을 source of truth로 정의하는 방법에 대해 알아봅니다.  

  @State property wrapper는 value types에만 적용할 수 있습니다. structures나 enumerations 같은 것이죠. SwiftUI는 reference type을 source of truth로 정의하는 property wrappers를 제공합니다.

  - @ObservableObject
  - @StateObject
  - @EnvironmentObject

  reference type인 class와 함께 property wrappers를 사용하기 위해서는 class를 observable하게 만들어야 합니다.  

### Making a Class Observable  

  ObservableObject protocol를 따름으로써 class를 observable하게 만들 수 있습니다.  
  클래스 안의 properties 중 정보가 변경되었을 때 UI에 변화를 일으키는 properties를 선택하고 그 properties에 각각 @Published attribute를 추가해줍니다.

  ```swift
  class ScrumTimer: ObservableObject {
      @Published var activeSpeaker = ""
      @Published var secondsElapsed = 0
      @Published var seconds Remaining = 0
      // ...
  }
  ```
  위 클래스의 속성은 한번의 scrum 세션에서 빈번하게 업데이트 될 것입니다. ScrumTimer는 published properties의 값에 변경 사항이 있을 때마다 observers에게 그것을 알려줍니다.

<!-- ### Monitoring an Object for Changes  

  Property를 정의할 때 아래 attributes 중 하나를 추가함으로써 SwiftUI에게 observable object를 모니터링 하도록 할 수 있습니다.

  - ObservableObject
  - StateObject
  - EnvironmentObject -->

  <!-- 이 property wrappers 중 하나로 정의된 view property는 새로운 source of truth를 생성합니다. -->

<!-- 👷 #### @StateObject  

  @StateObject wrapper는 view안에 관찰 가능한 object를 생성합니다.

  ```swift
  struct MeetingView: View {
      @StateObject var scrumTimer = ScrumTimer()
      // ...
  }
  ```
  @ObservedObject

  ```swift
  struct ChildView: View {
      @ObservedObject var timer: scrumTimer
      // ...
  }
  ```
  그리고 나서 observable object의 인스턴스를 view의 initializer에 통과시킵니다.

  ```swift
  struct MeetingView: View {
      @StateObject var scrumTimer = ScrumTimer()
      var body: some View {
          VStack {
            ChildView(timer: scrumTimer)
          }
      }
      // ...
  }
  ```
  ```swift
  struct ParentView: View {
      @StateObject var scrumTimer = ScrumTimer()
      var body: some View {
          VStack {
            ChildView()
                .environmentObject(scrumTimer)
          }
      }
  }
  ``` -->

## Responding to Events  

### Scene Architecture  

  App state에 대해 알아보기 전에, SwiftUI가 scenes를 구성하는 방법에 대해 복습해 봅니다.  
  Scene은 시스템이 관리하는, 라이프 사이클을 가지고 있는 앱의 사용자 인터페이스의 부분입니다.

  - 앱을 만들기 위해서, App protocol을 따르는 structure를 정의합니다. @main attribute를 앞에 표시해줌으로써 시스템에게 이 structure가 앱의 entry point라는 것을 알려줍니다.

  - ScrumdingerApp.swift의 structrue속 body 부분에 Scene 프로토콜을 따르는 scenes를 추가했습니다. Scenes는 앱이 보여주는 뷰 계층을 담는 컨테이너 입니다.

  - SwiftUI는 WindowGroup과 같은 scenes를 제공합니다. 시스템은 scenes의 라이프 사이클을 관리하고 플랫폼에 맞는, 환경에 맞는 뷰 계층을 화면에 보여줍니다. 예를들어 iPadOS의 멀티테스킹은 같은 앱의 여러개의 더 작은 인스턴스들을 동시에 보여줄 수 있습니다.

### Scene Phases and Transitions  

  앱의 실행 중, scene은 3단계의 변화가 있을 수 있습니다.

  - active : scene이 foreground에 있고, 사용자가 scene과 상호작용할 수 있습니다.
  - inactive : scene을 볼 수 있지만 시스템이 scene과의 상호작용을 중지시킵니다. 예를 들어 멀티 테스킹 모드에서 앱의 패널 볼 수 있지만 패널이 활성화되어 있지는 않습니다.
  - background : 앱은 작동되고 있지만 scene을 볼 수 없습니다. 앱의 종료 전에 scene은 이 단계에 들어갑니다.

## Managing State and Life Cycle  

  Scrumdinger는 scrum이 바뀔 때마다 바뀌었다는 것을 사용자에게 알려줍니다. 이 key feature을 만들기 위해 scrum을 관리하는 모델을 제어하는 life cycle methods를 사용할 것입니다.  

  이 튜토리얼에서는 reference type models와 SwiftUI view를 이용하는 방법에 대해 알아봅니다.

### Create an Overlay View  

  MeetingView.swift의 header 부분을 따로 분리합니다. MeetingHeaderView.swift라는 새 SwiftUI 파일을 생성하고 ProgressView와 HStack 부분을 MeetingHeaderView.swift로 옮겨 줍니다. 그리고 지금까지 static 데이터를 dynamic 데이터로 교체하기 위해 속성을 추가할 것입니다.

  ```swift
  private var totalSeconds: Int {
      secondsElapsed + secondsRemaining
  }
  private var progress: Double {
      guard totalSeconds > 0 else { return 1 }
      return Double(secondsElapsed) / Double(totalSeconds)
  }
  ```
  ProgressView에서 progress를 나타내는 computed property입니다. totalSeconds가 0보다 크면 지난 시간을 전체 시간으로 나누어서 진행된 시간을 나타내줍니다.

### Add a State Object for a Source of Truth  

  Value type models의 source of truth를 생성하기 위해서 **@State** 를 사용했습니다. ObservableObject 프로토콜을 따르는 reference type models의 source of truth를 생성하기 위해서는 **@StateObject** 를 사용합니다.

  ```swift
  struct MeetingView: View {
    @Binding var scrum: DailyScrum
    @StateObject var scrumTimer = ScrumTimer()
    // ...
  }
  ```
  @StateObject로 속성을 wrapping 한다는 것은 속한 해당 view가 그 object의 source of truth를 소유한다는 것을 의미합니다. @StateObject는 ScrumTimer를 MeetingView life cycle에 속박시킵니다.

<!-- ### Add Life Cycle Events  

  SwiftUI는 view가 나타나고 사라질 때 이벤트를 일으키는 life cycle methods를 제공합니다. -->
