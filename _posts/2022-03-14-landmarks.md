---
title: "SwiftUI Tutorial: 여러 개의 View를 만들고 결합하기"
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

[출처: SwiftUI Essentials:
Creating and Combining Views](https://developer.apple.com/tutorials/swiftui/creating-and-combining-views)  



## **What I Learned From This Tutorial:**  

- SwiftUI 프레임워크와 다른 프레임워크를 함께 사용하는 방식
- 여러개의 파일을 하나의 View로 합치기
- Stack의 사용법
- 지도와 관련된 Structures
- alignment: .leading
- Divider()
- Spacer()
<!-- - Binding ($) -->

<br>

<center><img src="/assets/images/directoryTree.png" alt="tree" width= "300">
</center>
<br>

```swift
// ContentView.swift
// Landmarks

import SwiftUI

struct ContentView: View {
  var body: some View {

    VStack(alignment: .leading) {

        Text("경복궁")
            .font(.title)
            .foregroundColor(.black)

        HStack {

            Text("Gyeongbokgung Palace")
                .font(.subheadline)
            Text("Korea")
                .font(.subheadline)
        } // HStack 끝
        .font(.subheadline)
        .foregroundColor(.secondary)

        Divider()
        Text("About Gyeongbokgung")
            .font(.title2)
        Text("Gyeongbokgung, also known as Gyeongbokgung Palace or Gyeongbok Palace,
        was the main royal palace of the Joseon dynasty.
        Built in 1395, it is located in northern Seoul, South Korea.")
            .font(.body)

    } // VStack
    .padding()
  }
}

struct ContentView_Previews: PreviewProvider {
  static var previews: some View {
      ContentView()
    }
}
```  

ContentView의 body부분에는 뒤에서 MapView()와 CircleImage()가 추가됩니다.



```swift
// MapView.swift
// Landmarks

import SwiftUI
import MapKit

struct MapView: View {
    @State private var region = MKCoordinateRegion(
        // 경복궁의 위도와 경도
        center: CLLocationCoordinate2D(latitude: 37.580_535, longitude: 126.977_341),
        span: MKCoordinateSpan(latitudeDelta: 0.05, longitudeDelta: 0.05)
        )

    var body: some View {
        Map(coordinateRegion: $region)
    }
}

struct MapView_Previews: PreviewProvider {
    static var previews: some View {
        MapView()
    }
}
```  




SwiftUI 프레임워크를 추가하고 그 외에 또 다른 프레임 워크를 추가하면,  
(여기서는 MapKit라는 프레임워크를 추가했습니다.)  
추가된 프레임워크와 관련된 SwiftUI의 특정 기능에 접근할 수 있게 됩니다.


MKCoordinateRegion는 위도, 경도로 표시된 특정 좌표 평면상의 지역을 직사각형의 형태로 가져오는 Structure입니다. 위 코드에서는 가져온 지역 정보를 region이라는 이름의 private state variable에 담았습니다.  

center: 와 span:은 파라미터 입니다.  
center: 는 가운데 오게 될 지역의 위도, 경도  
span: 은 지도가 보여질 크기를 나타내는 horizontal span과 vertical span이 들어올 것입니다.

CLLocationCoordinate2D은 국제 좌표계를 기준으로 특정 지역의 위도 경도를 이용하여 지역 좌표 object를 생성하는 Structure입니다. center: 파라미터를 지나는 값이니 생성된 좌표 object를 중심점으로 사용한다는 뜻이겠죠?

MKCoordinateSpan은 지도로 표현된 지역의 가로와 세로 크기를 표현하는 Structure입니다. delta values를 이용해서 원하는 줌 레벨을 설정할 수 있습니다. delta value이 커지면 줌 레벨은 작아집니다. delta value가 작아지면 줌 레벨을 커지면서 더 가까이 지도를 볼 수 있습니다.

body property의 Map()은 Generic Structure로 사용할 지도 인터페이스를 보여주는 역할을 합니다. 위 코드에는 표현되지 않았지만 사용자의 위치를 보여주거나 이동경로를 추적하는 등의 기능을 합니다.  
<br>

<center><video src="https://user-images.githubusercontent.com/85061148/158296265-93e3410e-c9f0-46e2-9e10-b237f9ea7320.mov" controls="controls" style="max-width: 300px">
</video></center>

<!-- ```swift
var body: some View {
  Map(coordinateRegion: $region)
}
``` -->

<!-- $region Binding -->
<!-- Generic Structure -->
