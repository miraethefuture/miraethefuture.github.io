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
toc_label: "📂"
toc_icon: "📂"
---

SwiftUI Tutorial을 따라가며 아래 Landmark앱을 만들어 보겠습니다. 튜토리얼의 출처는 [SwiftUI Essentials:
Creating and Combining Views](https://developer.apple.com/tutorials/swiftui/creating-and-combining-views) 입니다.

<center><video src="https://user-images.githubusercontent.com/85061148/159120793-a9d5166b-fad5-41f0-899a-fcfe0bee25da.mov" controls="controls" style="max-width: 300px">
</video></center>  



## **☑️ What I Learned From This Tutorial:**  

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

## 1. Stacks을 이용해 텍스트 배치하기: ContentView.swift

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

  이 부분에서는 Stack과 Spacer()를 이용해서 Text view를 배치하는 것에 대해 알아보았습니다. <code>.foregroundColor(.secondary)</code>는 옅은 회색을 화면에 보여줍니다. alignment가 기본적으로는 가운데로 지정되어 있고 왼쪽 정렬을 하려면 <code>(alignment: .leading)</code>을 사용하면 됩니다.  
  아래는 위 코드가 화면에 그려진 결과입니다. Divider()를 이용해 콘텐츠를 나누는 줄을 그릴 수 있습니다.


<center><img src="/assets/images/gbg_text.png" alt="gbg" width= "300">
</center>  


## 2. 지도와 관련된 데이터 불러오기: MapView.swift  


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

body property의 Map()은 Generic Structure로, 사용할 지도 인터페이스를 보여주는 역할을 합니다. 위 코드에는 표현되지 않았지만 사용자의 위치를 보여주거나 이동경로를 추적하는 등의 기능을 합니다.  
아래는 위 코드가 화면에 그려진 결과입니다. 더블 클릭을 하여 화면을 확대하거나, 양쪽으로 끌어 움직일 수 있습니다.
<br>

<center><video src="https://user-images.githubusercontent.com/85061148/158296265-93e3410e-c9f0-46e2-9e10-b237f9ea7320.mov" controls="controls" style="max-width: 300px">
</video></center>


## 3. 동그라미 모양으로 이미지 잘라내기: CircleImage.swift

```swift
//  CircleImage.swift
//  Landmarks

import SwiftUI

struct CircleImage: View {
    var body: some View {
        Image("kbpalace")
            .clipShape(Circle())
            .overlay {
                Circle().stroke(.white, lineWidth: 4)
            } //overlay {}
            .shadow(radius: 7)
    }
}

struct CircleImage_Previews: PreviewProvider {
    static var previews: some View {
        CircleImage()
    }
}
```  
이 부분에서는 <code>.clipShape(Circle())</code> 메서드를 사용하여 이미지를 동그랗게 잘라냅니다. .overlay 부분에서는 테두리가 될 부분을 만들어 줍니다. overlay 메서드는 레이어를 만들어 줍니다. 우리가 앞에서 만들었던 동그라미 모양의 사진 위에 레이어가 한층 생기는 거죠. Circle().stroke(.white, lineWidth: 4)는 동그라미 모양의 테두리를 그려줍니다. .shadow는 그림자를 그려줍니다.

<center><img src="/assets/images/gbg_image.png" alt="CircleImage" width="300"></center>

## 4. Views를 결합하기  

```swift
//  ContentView.swift
//  Landmarks

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            MapView()
                .ignoresSafeArea(edges: .top)
                .frame(height: 300)

            CircleImage()
                .offset(y: -130)
                .padding(.bottom, -130)

            VStack(alignment: .leading) {
                Text("경복궁")
                    .font(.title)
                .foregroundColor(.black)
                HStack {
                    Text("Gyeongbokgung Palace")
                        .font(.subheadline)
                    Spacer()
                    Text("Korea")
                        .font(.subheadline)
                } // HStack
                .font(.subheadline)
                .foregroundColor(.secondary)

                Divider()
                Spacer()
                Text("About Gyeongbokgung")
                    .font(.title2)
//                Spacer()
                Text("Gyeongbokgung, also known as Gyeongbokgung Palace or Gyeongbok Palace, was the main royal palace of the Joseon dynasty. Built in 1395, it is located in northern Seoul, South Korea.")
                    .font(.body)
                Spacer()


            } // VStack
            .padding()

            Spacer()
        } // 가장 바깥쪽 VStack

    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

```

이제 위에서 만든 모든 View 들은 합쳐줍니다. .offset() 메서드의 y 파라미터의 값을 주어 원래의 dimension에서 콘텐츠를 조금 올려줍니다. .offset() 메서드가 없다면 VStack 안에서 겹치지 않고 나열되어 있을 것입니다.

<!-- ```swift
var body: some View {
  Map(coordinateRegion: $region)
}
``` -->

<!-- $region Binding -->
<!-- Generic Structure -->
