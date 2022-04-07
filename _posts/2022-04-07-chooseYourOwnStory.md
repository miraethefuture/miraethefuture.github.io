---
title: "Navigating Apps: Choose Your Own Story"
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
header:
  teaser: /assets/images/choose2.png
---

[Sample Apps Tutorials: Choose Your Own Story(Navigating Apps)](https://developer.apple.com/tutorials/sample-apps/aboutme)  
아래 모든 정보의 출처는 apple developer 공식 페이지이며 개인의 학습 용도로만 사용되었음을 밝힙니다.   

All information below comes from the official apple developer page and is for personal learning purposes only.  

# Choose Your Own Story  

  Views 사이에서 동적으로 변화하는 navigation에 대해 알아봅니다.
  사용자의 선택에 따라 다른 페이지로 이동하는 이야기를 만들어봅니다.

  <center><img src="/assets/images/choose1.png" alt="The project navigator"></center>

## Section 1: Create Your Own Story  

  당신만의 이야기 속 사건들을 구축하기 위해서 앱은 Story라는 instance가 필요합니다. 이 프로젝트에서 instance Story는 각 StoryPage는 이야기 부분과 선택지 부분으로 이루어져 있습니다.

  ```swift
  // MyStory.swift

  let story = Story(pages: [
    StoryPage(
      """ 이야기 부분 """

      choices: [
          Choice(text: "Front row!", destination: 1),
          Choice(text: "Find somewhere in the middle", destination: 1)
          Choice(text: "Back of the room", destination: 2),

          ]
        ),
      ]
    )
    // 위의 방식으로 StoryPage가 page20까지 Story의 배열 타입 패러미터로 작성되어 있습니다.
  ```
  이야기 부분을 읽고 -> 선택 -> 페이지로 이동됩니다. 이동된 페이지에서도 마찬가지로 이야기 부분을 읽고 -> 선택 -> 해당 페이지로 이동합니다.


### 세개의 quotation marks  

  """ """ : String 값을 생성하는 특별한 방법입니다. 이 방법을 이용하면 여러 줄의 글을 쓸 수 있고 quotation marks도 사용할 수 있기 때문에 이야기와 같은 긴 글을 쓸 때 유용하게 사용할 수 있습니다.

### The destination property

Choice의 destination property는 story navigation 앱의 키 요소입니다. destination의 숫자 값은 페이지의 index 번호입니다. 인덱스는 0부터 세기 때문에 1페이지는 0, 2페이지는 1의 식으로 숫자가 적용됩니다.


## Section 2: Story Data Model

위에서 작성한 Story data를 구조화하는 방법에 대해 알아봅니다.

### StoryModels.swift

이 앱에서는 Story라는 custom type을 이용합니다. Story의 instance를 생성해 스토리 페이지를 화면에 출력합니다. 각 페이지는 이야기 부분과 몇 개의 선택지로 이루어져 있습니다.

  ```swift
  // StoryModels.swift

  import Foundation

  struct Story {

    let pages: [StoryPage]

    subscript(_ pageIndex: int) -> StoryPage {
      return pages[PageIndex]
    }
  }

  struct StoryPage {
    let text: String

    let choices: [Choice]

    init(_ text: String, choices: [Choice]) {
      self.text = Text
      self.choices = choices
    }
  }

  struct Choice {
    let text: String
    let destination: Int
  }
  ```

### ☑️ What I Learned From This Part:
  <div class="notice--success">
    1. Custom Type 생성 과정<br>
    <br>
    2. Custom type을 만드는 file에는 Foundation만 import하면 됨.<br>
    <br>
    3. init()의 이름을 사용하지 않는 패러미터<br>
      init(_ text: String) -> text는 패러미터의 이름일 뿐 생성자가 사용될 때 사용하는 이름은 아님. 이 경우에는 생성자 사용시 이름없이 바로 “”” “”” 으로 문자열을 입력해주었음.
  </div>


### StoryPage type  

  또 다른 custom type인 StoryPage는 이야기 부분인 text 상수 속성과 선택지 부분인 choices 배열 속성 부분으로 이루어져 있습니다. choices 배열은 사용자를 각 선택마다 다른 페이지로 이동시켜줍니다.

### Choice type

  Choice type도 custom type입니다. 선택지 버튼에 나타나는 문자열 부분과 페이지 인덱스 부분인  Int type의 destination 속성으로 이루어져 있습니다.


## Section 3: Creating a Navigation view

### StoryView.swift

  ```swift
  // StoryView.swift

  import SwiftUI

  struct StoryView: View {

    var body: some View {
      NavigationView {
        StoryPageView(story: story, pageIndex: 0)
      }
      .navigationViewStyle(.stack)
    }
  }

  sturct ContentView_Previews: previewProvider {
    static var previews: some View {
      StoryView()
    }
  }
  ```

### NavigationView

StoryView는 이 앱의 top-level view입니다. 맨 처음 앱이 실행되면 보이는 view이죠.
각각의 story page를 화면에 보여주고 페이지 사이를 이동하기 위해서 NavigationView를 이용합니다. NavigationView view는 각 스토리 페이지를 담는 컨테이너와 같습니다. 한 장의 스토리 페이지를 보여주고 Navigation Link가 탭 될 때마다 다른 페이지로 변경됩니다.

NavigationView는 StoryPageView라는 콘텐츠를 가지고 있고 그것을 화면에 보여줍니다.
여기서 이용된 story는 MyStory Data file에서 전역변수로 만들어주었습니다. story 안의 StoryPage 중 pageIndex: 0을 사용하여 첫 번째 페이지를 보여줍니다.


## Section 4: Displaying a Story Page

### StoryPageView.swift  

  ```swift
  // StoryPageView.swift

  import SwiftUI

  struct StoryPageView: View {

    let story: Story
    let pageIndex: Int

    var body: some View {
      VStack {
          ScrollView{
            Text(story[pageindex].text)
          }

          ForEach(story[pageIndex].choices, id: \Choice.text) { choice in
              NavigationLink(destination: StoryPageView(story: story, pageIndex: choice.destination)) {
                Text(choice.text)
                    .multilineTextAlignment(.leading)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding()
                    .background(Color.gray.opacity(0.25))
                    .cornerRadius(8)
                }}
      }
      .padding()
      .navigationTitle("Page \(pageIndex + 1)")
      .navigationBarTitleDisplayMode(.inline)
    }
  }
  ```  

  앱의 스토리를 화면에 출력하기 위해서 Story type을 사용합니다. Story type은 이야기에 대한 모든 정보들을 담고 있습니다. 이야기에 대한 데이터를 변경하려면 MyStory Data file로 이동해 story 전역변수에 담긴 내용을 수정해 줍니다.
  VStack을 이용해서 text / choices를 수직으로 배치합니다. 이야기 부분에는 ScrollView를 사용함으로써 많은 내용을 담더라도 스크롤을 이용해 화면에 모두 보일 수 있도록 합니다. pageIndex는 현재 페이지의 index 번호를 나타냄으로 Text(story[pageIndex].text)는 현재 페이지의 text 부분을 가져와 화면에 보여줍니다.

### ForEach structure  

  ForEach view는 여러 개의 view를 생성할 때 사용됩니다. 여기서는 현재 페이지의 choices 배열을 화면에 보여줍니다. 배열은 각각 선택지를 담고 있습니다. 선택지가 3개라면 3개의 버튼을, 4개라면 4개의 NavigationLink를 만듭니다. { } 안의 코드를 배열의 각 item마다 반복하기 때문에 같은 형태의 NavigationLink를 만듭니다.

### id argument  

  SwiftUI는 배열의 각 item을 분리, 구별하기 위해서 id argument를 사용합니다. 여기서는 각 choice가 다른 text를 가지고 있기 때문에 text를 id로 사용합니다.

### NavigationLink  

  NavigationLink는 두가지가 필요합니다.  
  1. destination(여기서는 스토리 페이지)
  2. 화면에 출력할 content(여기서는 선택지 Text)

  이 앱에서 NavigationLink의 destination은 각 선택지가 연결되어 있는 페이지 입니다.

  ```swift
  NavigationLink(destination: StoryPageView()) {

      // 이곳에 화면에 출력될 content code를 작성합니다.

  }
  ```

  Navigation links는 NavigationView 아래서만 작동합니다.

### Aligning Text  

  ```swift  
  Text(choice.text)
      .multilineTextAlignment(.leading)
      .frame(maxWidth: .infinity, alignment: .leading)
      .padding()
      .background(Color.gray.opacity(0.25))
      .cornerRadius(8)
  ```  
  - **multilineTextAlignment(.leading)**는 여러줄의 text를 정렬하는 modifier입니다. leading은 왼쪽 정렬입니다.
  - **frame**은 보이지 않은 frame에 text를 담습니다. maxWidth값에 .infinity로 주면 frame은 가능한 가장 넓은  width값을 가지게 됩니다.
  - **alignment: .leading**은 frame 안에 있는 text를 왼쪽 정렬합니다.  

### Navigation Bar  

  ```swift
  } // VStack 끝나는 부분
  .padding()
  .navigationTitle("Page \(pageIndex + 1)")
  .navigationBarTitleDisplayMode(.inline)
  ```

  - VStack 아래에 다른 콘텐츠나 스택이 없는 상황에서. .padding()을 주면 화면 안에서 VStack 주변에 적절한 양의 padding을 줍니다. 패딩을 주지 않으면 콘텐츠들이 화면에 딱 붙어서 보입니다.

  아래쪽 modifier 두 개는 view가 NavigationView 아래에 사용되었을 때 적용됩니다. Navigation view는 navigation bar를 제공합니다. Navigation Bar에는 title과 뒤로 가기 버튼이 기본적으로 주어집니다. Extra button이나 text와 같은 커스텀 가능한 다른 아이템들도 있습니다.

  - .navigationTitle modifier를 이용해서 현재 페이지의 번호를 화면에 출력할 수 있습니다.
  - .navigationBarTitleDisplayMode로는 타이틀의 크기와 나타나는 스타일을 바꿀 수 있습니다. inline은 더 작은 글씨로 나타나게 합니다. automatic과 large도 선택할 수 있습니다. (적용해 보니 automatic과 large 둘이 똑같이 나옵니다. 더 큰 사이즈에 글자로 왼쪽 정렬해서 텍스트 안의 head부분처럼 보이네요.)  

    <center><img src="/assets/images/choose2.png" alt="My Own MyStory" width="300"></center>
