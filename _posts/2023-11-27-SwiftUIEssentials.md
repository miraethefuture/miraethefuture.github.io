---
title: SwiftUI Essentials 튜토리얼을 따라가며 정리
author: Mirae
date: 2023-10-10
category: TIL
layout: post
---

[SwiftUI Essentials](https://developer.apple.com/tutorials/swiftui/drawing-paths-and-shapes)  
> 이 글은 위 튜토리얼을 따라가며 정리한 내용입니다. 
  
  
# Drawing paths and shapes

```swift
struct BadgeBackground: View {
    var body: some View {
        Path { path in
            var width: CGFloat = 100.0
            let height = width
            path.move(
                to: CGPoint(
                    x: width * 0.95,
                    y: height * 0.20
                )
            )
        }
        .fill(.black)
    }
}
```

Path shape을 추가하고, fill() modifier를 적용하여 shape을 view로 만들어 줍니다. paths는 선, 곡선 등의 기초 요소를 혼합하여 더 복잡한 모양을 그리는 곳에 사용됩니다.  
100*100px 사이즈의 컨테이너를 path의 시작점으로 설정해줍니다. path.move(to:) 메서드는 드로잉 커서를 움직입니다.
