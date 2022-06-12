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


## Add an else statement that shows a different color circle  

  버튼을 탭하는 것이 뷰를 업데이트했던 방법에 대해 떠올려 봅시다.  
  버튼을 탭하면 isOn의 state가 변경됩니다. SwiftUI는 이 변경사항을 감지하고 새로운 값을 이용해서 뷰를 업데이트합니다.  
  위에서는 view body에서 if문을 사용하여 true일때는 뷰를 보여주고 false일때는 뷰를 숨겨주었습니다.

### else  

  ```swift
  if isOn {
    Circle()
        .frame(maxHeight: 200)
        .foregroundColor(.yellow)

    Text("On")

  } else {
      Capsule() // 캡슐 모양
        .frame(maxHeight: 200)
        .foregroundColor(.green)   

    Text("Off")

  }
  ```

  else 문을 사용하면 false state에서 다른 뷰를 보여줄 수 있습니다.  
  이제 두개의 뷰가 있으므로 Text()뷰를 사용하여 구별해 줍니다.

### rubber ducky method

  공부하는 방식(learning method)중 하나로 고무 오리 인형같은 무생물에게 컨셉에 대해 디테일하게 설명하는 것입니다. 먼저 설명을 들을 물체를 구합니다. 그리고 공부했던 개념을 소리내어 설명합니다. 설명을 듣고 있는 대상이 이해하는데 필요한 모든 정보를 전달할 수 있도록 합니다. 설명 중 만약 기억하지 못하는 부분이 있다면 메모해둡니다. 새롭게 발견한 것들을 추가하며 설명해 보기도 합니다.

  <center><img src="/assets/images/myRubberDucky.png" alt="myRubberDucky" width="400"></center>
  <sub>[오리 인형 사진 출처](https://www.redbubble.com/i/tote-bag/Rubber-Duckie-Rubber-Ducky-by-tziggles/39757353.A9G4R)</sub>

### 생각해 볼 것  

  UI와 UI가 보여줄 앱 데이터를 분리함으로써 single source of truth를 보존(preserve)할 수 있다고 하는데 이 의미에 대해 좀 더 생각해보기.


# Using a Conditinal Modifier  

  이전의 예시에서 state property인 isOn을 생성해 보았습니다.   SwiftUI는 state property의 storage를 관리합니다. isOn의 state를 변경하여 조건에 따라 두개의 다른 뷰 중 하나를 보여주었습니다.  

  하지만 만약 존재하는 뷰의 색과 사이즈 같은 겉모습만을 변경하고 싶다면 어떨까요? 그것을 위해서 어떤 조건적인 코드를 작성해야 합니다. 그 코드는 state의 변화가 일어날 때 뷰가 나타날 방식을 알려줄 것입니다.  

## Change view modifier conditionally  

  if문을 사용하는 대신 조건을 나타내는 코드를 포함하고 있는 view modifier를 사용하여 뷰의 모습을 수정할 수 있습니다.

  ```swift
  @State var isOn = false

  var body: some View {
    VStack {
        Circle()
            .frame(maxHeight: 200)
            .foregroundColor( isOn ? .yellow : .black)
    }
  }
  ```

  위의 예시 코드의 Circle()은 .foregroundColor(_:)라는 view modifier를 가지고 있습니다. 이 modifier는 ternary conditional operator라는 특별한 syntax를 가지고 있습니다.  
  if-else문을 더 짧게, 한 줄에 작성할 수 있는 방식입니다.

  ```swift
  condition ? trueValue: falseValue
  ```

  위와 같은 구조를 가지고 있습니다. condition(조건)이 true일 때는 trueValue를 false일 때는 falseValue를 리턴합니다.

## Add a shadow(color:radius:) modifier that shows a different color shadow in each state  

  또 다른 modifier인 **.shadow(color:radius:)**를 추가해봅니다.
  역시 isOn의 값을 이용하여 뷰에 그림자를 추가합니다.

  ```swift
  Circle()
      .frame(maxHeight: 200)
      .foregroundColor( isOn ? .purple : .mint)
      .shadow(color: isOn ? .indigo : .orange, radius: 20)
      .scaleEffect( isOn ? 1 : 0.75 )
  ```

  .shadow(color:radius) / .scaleEffect(_:) 두개의 modifiers의 패러미터에 ternary conditional operator를 사용하여 state property의 값이 변경될 때마다 다른 값을 가져올 수 있도록 하였습니다.

## Animate your state changes  

  SwiftUI는 자동으로 뷰를 업데이트 할 수 있는 것처럼, 변화에 애니메이션을 추가할 수도 있습니다. 이것을 하기 위해서 .animation(_:value:) modifier를 사용합니다.

  ```swift
  Circle()
      .frame(maxHeight: 200)
      .foregroundColor( isOn ? .purple : .mint)
      .shadow(color: isOn ? .indigo : .orange, radius: 20)
      .scaleEffect( isOn ? 1 : 0.75 )
      .animation(.default, value: inOn)
  ```

  패러미터로는 애니메이션 중 하나를 선택하고, 변화를 감지할 값(여기서는 isOn)을 통과시켜 줍니다.  

# SwiftUI Built-in Views

## Use a binding  

  지금까지는 UI를 지역적으로(local scope안에서), 또는 같은 뷰 안에서 변경시키기 위해 state property를 사용했습니다. 그런데 만약 subview가 그 데이터를 변경시키길 바란다면 어떨까요? 예를 들어, local view가 연락처 정보를 담고 있고, subview가 그 연락처의 번호를 변경할 custom interaction을 제공할 수 있습니다. 하지만 어떤 방식으로 subview가 data를 변경하도록 할 수 있을까요? 하나 이상의 source of truth를 생성하지 않고 말이죠.

  <div class="success">
  <p>하나의 source of truth를 여러개의 소스 파일에서 공유하는 방식이 binding 같음.</p>
  </div>  

  두 뷰 사이에서 데이터의 변경사항을 전달하는 방식의 핵심을 binding이라고 합니다. binding은 source of truth를 하나로 유지할 수 있도록 하고, subview가 그 source of truth의 값을 멀리서(다른 local scope으로부터 떨어진 곳에서) 수정할 수 있도록 합니다.  

  State property와 같은 source of truth를 세컨 뷰에 bind(묶음, 연결함)하기 때문에 binding이라고 합니다. 세컨 뷰에서 데이터를 변경할 때마다 source of truth는 업데이트 됩니다.

### scope  

  값이나 타입에 접근할 수 있는 프로젝트의 영역.

### local scope

  Global scope(전역 범위) 아래에 local scope(지역 범위)가 속해 있음. 지역 범위는 새로운 레벨의 코드 구성들마다 형성됨. 예를 들면, 새 type이 새로운 local scope(지역 범위)를 형성함. 그리고 그 타입 안에 생성된 코드 블락은 각자의 레벨의 scope을 형성함. 하나의 symbol이 어디에 선언되었냐에 따라 같은 레벨 또는 더 낮은 레벨 범위에 있는 코드로부터만 접근 가능하게 됨.

  예를 들어 T라는 타입안에 선언된 변수 v는 T타입 안에 있는 모든 functions와 코드 블락안에서 접근 가능합니다. 하지만 메서드 M안에서 선언된 상수 c는 오로지 메서드 M안에서만 접근 할 수 있습니다.

### global scope

  같은 module안에 있는 모든 소스 파일에 있는 코드로부터 접근 가능한 symbols. 소스 파일의 top-level에서 선언된 인스턴스, 타입, 함수는 global scope을 갖습니다.

  ```swift
  import SwiftUI

  struct Bindings: View {
      // source of truth - stored locally in the Binding view
      @State var isOn = false

      // var body는 computed property?
      var body: some View {
          VStack {
              Toggle("Press Me", isOn: $isOn)



              Image(systemName: isOn ? "battery.100" :
              "battery.25")
                  .font(.system(size:150))
          }
          .padding()
      }
  }

  struct Binding_Priview: PreviewProvider {
      static var preview: some View {
        Bindings().assess()
      }
  }
  ```

  <center><img src="/assets/images/keepGoingwithApps1.png" alt="keepGoingwithApps1.png" width="400"></center>

  위의 코드는 토글뷰와 이미지 뷰로 이루어져 있습니다.

  <center><img src="/assets/images/keepGoingwithApps2.png" alt="keepGoingwithApps2.png" width="400"></center>  

  토글을 탭하면 이미지와 토글의 모습이 둘 다 변경됩니다. 토글은 간접적으로 source of truth를 변경할 수 있습니다. 토글 자신과 이미지 뷰가 분리된 두개의 뷰지만 같은 값을 공유할 수 있도록 합니다.  

  Binding의 source of truth의 값은 SwiftUI로부터 관리되어야 합니다. @State property wrapper를 가진 state property처럼 말이죠.

  ```swift
  Toggle("Press Me", isOn: $isOn)
  ```

  이것은 빌트인 토글뷰입니다. Toogle은 binding boolean 값을 isOn 패러미터의 값으로 받습니다. 이것은 토글이 사용자가 토글을 탭하여 끄고 켜는 것과 같은 user interaction을 이용하여 불리언 값을 변경하는 방법을 안다는 의미가 됩니다.  

  binding을 통과시키기 위해서 SwiftUI가 관리하는 state property를 $ 와 함께 사용합니다. $isOn을 통과시켜 토글의 값을 간접적으로 변경시킨 다는 것을 나타냅니다. 이 binding은 source of truth인 isOn의 값을 변경시킵니다.

## Add a new state property, of type Color  

  이번에는 위의 배터리 이미지의 색을 변경하기 위해 빌트인 ColorPicker 뷰와 binding을 사용해 볼 것입니다.  

  이것을 하기 위해서, 먼저 state property를 생성합니다. 색 값을 위한 source of truth로 이용할 것입니다. 기본값으로 Color.primary를 설정해 줍니다.

## Create a ColorPicker and pass in your binding value  

  Toggle view 아래에, ColorPicker를 생성합니다.

  ```swift
  ColorPicker("Select a Color", selection: $color)
      .frame(maxHeight: 100)
  ```

## Set the color of the Image to your color state property

  1. ColorPicker를 이용하여 색을 변경하면, ColorPicker의 색만 변경되고 다른 뷰는 변경되지 않습니다. state propety가 다른 로컬 뷰에 연결되어 있지 않기 때문입니다.  

  2. foregroundColor(color) modifier 를 이미지 뷰에 추가해주면 이미지 뷰의 색도 바뀌게 됩니다.

  <div class="success">
  <p>데이터를 변경하는 것은 $color, 변경된 데이터를 가져오기만 하는 것은 color</p>
  </div>

# Practice with SwiftUI Built-in Views  

## Create a slider  

  빌트인 Slider를 이용하는 뷰를 생성하여 그 Slider를 이용해 직사각형 뷰의 가로 길이를 변경해 볼 것입니다. 이것을 하기 위해서, 새로운 state property를 정의해야 합니다. 그리고 Slider에 binding으로 통과시켜야 하죠.  

  .frame(width:) modifier를 사용해서 직사각형의 가로길이를 변경할 수 있습니다. 이 modifier는 Double 값을 이용하기 때문에 state property 역시 Double로 정의합니다.  

  ```swift
  @State var width: Double = 0

  var body: some View {
      VStack {
        Slider(value: $width)

        Rectangle()
            .frame(width: width * 300)
      }
      .padding()
  }
  ```

  Slider 기본값의 범위가 0부터 1이기 때문에 .frame(width:)를 통과하는 width에 큰 수를 곱해주어 변화를 잘 볼 수 있도록 합니다.

<!-- 
# Create a story  

   -->
