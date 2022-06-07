---
title: "Keep Going with Apps"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Swift
  - SwiftUI
show_date: true
toc: true
toc_sticky: true
toc_label: " "
toc_icon: "kiwi-bird"
#header:
#  teaser: /assets/images/choose2.png
---

<br><sub>아래 모든 정보의 출처는 Apple Playgrounds이며 개인의 학습 용도로만 사용되었음을 밝힙니다.</sub>

# 들어가며...

## state

  특정 주어진 시간에 변수, 애플리케이션, 또는 시스템에 담긴 정보를 **state**라고 합니다. 예를 들어, level이라는 이름의 변수가 4라는 값을 가지고 있다면 현재 level 변수의 state는 4가 됩니다.

## data flow  

  SwiftUI에서, 앱 전체에서 움직이는 데이터의 흐름과 그 데이터의 변화가 state 또는 앱의 UI에 변화가 일어나도록 하는 방식을 **data flow**라고 합니다.

## data separation

  앱의 데이터 모델은 해당 데이터와 상호작용하고 그것을 화면에 보여주는 UI와 분리하여 정의해야한다는 컨셉입니다. Data separation은 데이터 모델과 UI를 서로로부터 독립시켜 따로 수정할 수 있도록 하고, 앱이 작동하는 방식을 더 쉽게 이해할 수 있도록 합니다. 그리고 앱을 테스트할 수 있는 가능성을 증진시켜줍니다.

# Modifying State  

  코딩에서 state는 어떤 변수의 현재 값을 나타냅니다. 변수의 값이 바뀌었을 때 state가 변경되었다고 합니다. SwiftUI의 편리한 점 중 하나는 state가 변경되면 뷰의 모습(appearance)을 자동으로 업데이트 해준다는 것입니다. 앱의 데이터와 UI를 연결하면 SwiftUI는 해당 데이터를 감시할 수 있습니다. 데이터가 변경될 때마다 해당 데이터를 이용하고 있는 view를 업데이트 합니다. 이것은 당신의 UI에게 언제 어떻게 뷰를 업데이트해야 한다고 말해주는 코드를 작성하지 않아도 된다는 의미입니다.  

## Use a state property to update a view  

  state property를 사용하여 뷰를 업데이트 합니다.

### property  

  **type**안에 정의된 변수(값을 담는 이름 지어진 컨테이너)

### 코드  

  ```swift
  import SwiftUI  

  struct ConditionalView: View {
      @State var isOn = false

      var body: some View {
          VStack {
              // 만약 isOn이 true라면 Circle을 그림
              if isOn {
                Circle()
                    .frame(maxHeight: 200)
                    .foregroundColor(.yellow)
              }
              // Button을 누를 때마다 true / false 값 바뀜.
              Button("Press Me") {
                  isOn.toggle()
              }
          }
      }
  }
  struct ConditionalViews_Previews: PreviewProvider {
      static var previews: some View {
          VStack {
              ConditionalViews().assess()
          }
      }
  }
  ```  

  위의 코드에서, SwiftUI는 state의 변경이 일어날 때 뷰의 모습을 업데이트 합니다. "Press Me"라는 버튼을 누르면 isOn 속성의 값이 변경됩니다. 누를 때마다 true / false states 사이에서 변경됩니다. VStack 안의 if 문에서 isOn 속성이 true일 때 노란색 원이 나타나도록 작성되었기 때문에 버튼을 누를 때마다 원이 생겼다가 사라졌다가하게 됩니다.  

  뷰의 모습을 바꾸고 싶을 때, 먼저 state를 추적하기위해 데이터가 필요하다. (위에서는 true / false boolean 데이터를 추적하여 뷰의 모습을 변경.) 이 데이터를 뷰의 property로 담습니다.  

  뷰의 데이터를 UI의 모습을 결정하는 source of truth라고 생각해 봅시다. 뷰를 직접적으로 수정하는 대신, 데이터를 수정하면 SwiftUI가 뷰를 업데이트 합니다. 여기서는 Boolean 값이 뷰를 보이게 할지(true) 사라지게 할지(false)를 결정합니다.

### source of truth  

  앱 빌딩에서, 모든 데이터가 수정되는 하나의 위치를 말합니다. 이 데이터를 향한 모든 다른 연결들은 참조로써만 이루어집니다. 다른 위치에서는 정보의 복사가 되지 않습니다.

### Important‼️  

  데이터는 항상 body 뷰 바깥쪽에 생성합니다. body를 no-data-creation zone이라고 생각합시다. body는 뷰의 겉모습을 선언할때만 사용됩니다. 이것은 앱을 만드는 것의 가장 핵심이 되는 원칙입니다. 이것을 data separation이라고 합니다.  

### property wrapper  

  SwiftUI가 자동으로 뷰를 업데이트할 수 있도록 어떤 뷰 속성을 관리하고 추적해야하는지 알려주어야 합니다. 이때 사용되는 것이 property wrapper입니다. 속성을 정의할 때 앞에 @State라는 property wrapper를 추가해주면 해당 속성은 state 속성이 됩니다. SwiftUI는 state 속성의 값을 관리하고 영향을 받는 뷰의 부분을 state가 변경될 때마다 업데이트합니다.  

  ```swift
  import SwiftUI  

  struct ConditionalView: View {
      @State var isOn = false

      var body: some View {
        ...
      }
  ```

  그렇다면 어떻게 isOn의 state를 변경시킬 수 있을까요? 가장 보편적인 방법 중 하나는 user interaction을 이용하는 것입니다. 사용자가 버튼을 탭하거나, ColorPicker로부터 색을 선택하거나 텍스트 필드에 타이핑을 하는 것 등을 user interaction이라고 합니다.  

### label  

  UI element의 시각적으로 보여지는 부분으로 view로 생성됩니다.  
  많은 SwiftUI의 빌트인 뷰들은 label(visual representation)과 또 다른 사용자 정의의 부분을 가지고 있습니다. NavigationLink의 destination view 또는 버튼의 action callback이 사용자 정의를 위한 부분의 예시입니다.

  ```swift
  // label 부분
  Button("Press Me") {
      // action callback 부분
      isOn.toggle()
  }
  ```

  Button을 생성하기 위해, "Press Me"라는 텍스트 라벨을 통과시키고 action callback을 붙여줍니다.

### callback  

  데이터를 원래의 호출자에게 다시 전달하거나 중요한 이벤트를 알리기 위해 호출되도록 다른 함수에 대한 argument로 주어지는 코드입니다. 위의 Button에 추가된 action callback은 버튼이 탭 될 때마다 실행됩니다.

  사용자가 버튼을 탭하면 action callback은 toggle() 메서드를 사용하여 isOn의 값을 바꿉니다.

#### toggle()  

  toggle() 메서드는 값이 true일 때는 false로 false일 때는 true로 변경시킵니다. 전등의 스위치를 켜고 끄는 것과 비슷합니다.

### if statement  

  ```swift
  if isOn {
    Circle()
        .frame(maxHeight: 200)
        .foregroundColor(.yellow)
  }
  ```
  위의 if문은 isOn을 조건으로 사용합니다. true일 때 뷰를 보여주고 false일 때는 뷰를 숨깁니다.

  이런 방식으로 isOn 데이터는 뷰에 연결됩니다. isOn의 현재 state가 UI가 나타나는 방식을 결정합니다.
