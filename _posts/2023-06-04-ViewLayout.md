---
title: SwiftUI 뷰 레이아웃
author: Mirae
date: 2023-05-24
category: TIL
layout: post
---

<center><img src="/assets/images/VerticalTabView_2.png" alt="VerticalTabView_2.png" width="300"><br></center>

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


