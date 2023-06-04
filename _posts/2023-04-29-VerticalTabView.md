---
title: Vertical TabView in SwiftUI
author: Mirae
date: 2023-04-29
category: TIL
layout: post
---

<video src="https://user-images.githubusercontent.com/85061148/235292829-c16fccb8-e5ae-4243-86e3-356f57443024.mov" controls="controls" style="max-width: 300px">
</video>

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        GeometryReader { proxy in
            TabView {
                ForEach(0..<3, id: \.self) { i in
                    Image("img_\(i + 1)")
                        .resizable()
                        .scaledToFill()
                        .rotationEffect(.degrees(-90)) // 1
                        .frame(
                            width: proxy.size.width,
                            height: proxy.size.height
                        ) // 2
                }
            }
            .frame(
                width: proxy.size.height, // Height & width swap
                height: proxy.size.width
            ) // 3
            .rotationEffect(.degrees(90), anchor: .topLeading) // 4
            .offset(x: proxy.size.width) // 5
            .tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))
        }
    }
}
```

[👉🏻 참고한 글](https://morioh.com/p/81b0a940fba0)  

```swift
.tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))
```

SwiftUI의 PageTabViewStyle은 기본적으로 수평으로 넘길 수 있는 paged scrolling 탭뷰입니다.
페이지를 넘기는 것과 같은 효과를 줄 수 있는데요.

위 코드와 같이, rotationEffect와 GeometryReader를 사용하여 수직으로 넘어가는 탭뷰를 만들 수 있습니다.  

- // 1 : rotationEffect를 사용하여 왼쪽으로 90도 이미지를 로테이션 시켜줍니다. 현재 탭뷰 안의 이미지는 아래와 같이 살짝 커졌지만 가운데 정렬된 상태로 나타납니다. 

<center><img src="/assets/images/viewLayout_1.png" alt="viewLayout_1.png" width="300"><br></center>

- // 2: 이때 width / height는 누워있는 이미지와 같이 width가 더 큰 직사각형 형태로 존재합니다. 

- // 3: 여기서 TabView의 frame을 정의하는데, height와 width를 바꿔줍니다. 그러면 width가 heigt보다 작은 세로로 기다란 모양의 직사각형 frame이 되겠죠? 

- // 4 : anchor는 어느 꼭지점을 기준으로 로테이트 할 지 정할 때 사용하는데 .topLeading을 기준으로 90도 로테이트 했으므로 화면에는 이미지가 보여지지 않게 됩니다. 로테이트 하면서 화면 밖에 위치하게 되는데요.

- // 5 : 그래서 offset에 x 값을 현재 width만큼 주어서 오른쪽으로 이동시킵니다. 
  
  
여기까지하면, 화면에 수직으로 이동하는 페이징 탭뷰가 맨 위에 있는 영상처럼 잘 나타나게 됩니다.  
그런데 LazyVStack 안에 다른 뷰와 함께 탭뷰를 화면에 보이려고 하면 문제가 생기는데요.  
LazyVStack은 모든 아이템을 먼저 그리는게 아니라 필요할 때 아이템을 렌더링 하기 떄문에 기존의. VStack과는 다른 레이아웃 룰을 가지고 있습니다. 그래서 높이가 10 정도 되는 뷰만 그려주게 됩니다.  
일단 VStack으로 교체하면 이 문제는 해결할 수 있습니다.



#### UIKit 사용한 Horizontal paged tabView

SwiftUI 프로젝트에 UIKit 뷰와 뷰 컨트롤러 사용하기 

UIViewRepresentable / UIViewControllerRepresentable(프로토콜)을 채택하는 커스텀 타입을 생성 
SwiftUI가 라이프 사이클과 업데이트를 관리하는 UIKit 타입을 생성하는 커스텀 타입

UIViewControllerRepresentable은 정의해야하는 두가지 요구사항이 있음 

1. UIPageViewController를 리턴하는 makeUIViewController(context:_)를 구현 

```swift
func makeUIViewController(context: Context) -> UIPageViewController {
    let pageViewController = UIPageViewController(
        transitionStyle: .scroll, // .PageCurl 스타일도 있음
        navigationOrientation: .horizontal) // .vertical도 있음
    
    return pageViewController
        
}
```  
- UIPageViewController의 트랜지션 스타일과 .horizontal / .vertical 방식 중 하나를 설정하여 리턴

2. updateUIViewController(_:context:) 메서드를 구현하여 setViewControllers(_:direction:animated:) 메서드를 호출


