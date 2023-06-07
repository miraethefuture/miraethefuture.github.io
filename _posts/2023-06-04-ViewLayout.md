---
title: SwiftUI 뷰 레이아웃
author: Mirae
date: 2023-05-24
category: TIL
layout: post
---


```swift
struct ReusableLabel: View {
    let keyword: String
    let symbol: String
    var body: some View {
        Label(keyword, systemImage: symbol)
            .font(.title)
            .foregroundColor(.white)
            .padding()
            .background(.green.opacity(0.75), in: Capsule()) // - 1
            
    }
}

struct ReusableLabel_Previews: PreviewProvider { // - 2
    
    static let keywords = ["Hello", "Good Morning"]
    
    static var previews: some View { // - 3
        VStack { // - 4
            ForEach(keywords, id: \.self) { word in
                KeywordBubbleDefaultPadding(keyword: word, symbol: "fish")
            }
        }
    }
}
```

- 1: .background에 Capsule()을 정의해줌으로써 캡슐 모양이 Label의 뒷쪽에 오도록 함. 이때 .padding()을 백그라운드의 윗쪽에 선언해주어야 패딩을 포함한 백그라운드에 캡슐 모양을 생성할 수 있음.
- 2: PreviewProvider 프로토콜을 사용하여 커스텀 스위프트UI 뷰의 코드가 생성하는 화면을 미리 볼 수 있음 
- 3: PreviewProvider 프로토콜을 구현하기 위해선 static previews 프로퍼티를 정의해야 함
- 4: VStack 안에 ForEach를 사용하여, ReusableLabel 스트럭쳐가 생성하는 라벨 뷰가 다른 텍스트 길이에서 어떻게 적용되는지 한 화면에서 확인할 수 있음

<center><img src="/assets/images/viewLayout_1.png" alt="viewLayout_1.png" width="600"><br></center>
  
<br>
<b>ScaledMetric를 사용하여 동적으로 넓이 조정하기</b>
- padding() modifier를 사용하여 패딩을 주었을 때, 폰트 사이즈가 달라지면 아래 이미지와 같이 큰 사이즈의 폰트에서는 패딩이 충분하지 않는 경우가 있음
- 이때 패딩 값을 그냥 키워주면 작은 폰트에서는 패딩이 너무 넓어질 수 있음 
- @ScaledMetric 프로퍼티 래퍼를 사용하여 .title과 같은 environment’s effective font size에 숫자값을 적용할 수 있음

```swift
struct KeywordBubbleDefaultPadding: View {
    let keyword: String
    let symbol: String
    @ScaledMetric(relativeTo: .title) var paddingWidth = 20.5 // <- 여기
    var body: some View {
        Label(keyword, systemImage: symbol)
            .font(.title)
            .foregroundColor(.white)
            .padding(paddingWidth) // <- 여기
//            .padding()
            .background(.green.opacity(0.75), in: Capsule())
            
    }
}
```
<center><img src="/assets/images/viewLayout_2.png" alt="viewLayout_2.png" width="350"> <img src="/assets/images/viewLayout_3.png" alt="viewLayout_3.png" width="350"><br></center>

