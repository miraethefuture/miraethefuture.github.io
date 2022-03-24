---
title: "SwiftUI Essentials: Building Lists and Navigation"
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
toc_icon: "kiwi-bird"
---

튜토리얼의 출처는 [SwiftUI Essentials:
Building Lists and Navigation](https://developer.apple.com/tutorials/swiftui/building-lists-and-navigation) 입니다.

<!-- <center><video src="https://user-images.githubusercontent.com/85061148/159120793-a9d5166b-fad5-41f0-899a-fcfe0bee25da.mov" controls="controls" style="max-width: 300px">
</video></center> -->



## **☑️ What I Learned From This Tutorial:**

- 데이터를 이용하기
- Foundation framework의 사용
- Codable / Hashable conformance
- Guard
<!-- - Binding ($) -->

<!-- <br>

<center><img src="/assets/images/directoryTree.png" alt="tree" width= "300">
</center>
<br> -->

## Section 1: Landmark model 생성하기  

## 샘플 데이터 파일 추가하기  

  다운받은 프로젝트 파일에 압축을 풀면 Resources 폴더에 landmarkData.json 파일이 있습니다. 튜토리얼 Creating and Combining Views에서 만들었던 프로젝트를 그대로 사용합니다. 왼쪽에 위치한 프로젝트의 navigation pane 부분에 landmarkData.json 파일을 드래그해서 넣어줍니다. 다이얼로그 창이 나타나면 'Copy items if needed'을 선택하고 Add to targets: 에 Landmarks를 선택하고 Finish 버튼을 눌러줍니다. 앞으로의 튜토리얼을 진행하며 게속해서 이 샘플 데이터를 사용할 것입니다.  

  <center><img src="/assets/images/navi1.png" alt="json">
  </center>
  <center><sup>(샘플 데이터인 landmarkData.json 파일을 추가해 준 모습)</sup></center><br>


## 새로 만든 Landmark.swift 파일에 structure 생성

  ```swift
  //  Landmark.swift

  import Foundation

  struct Landmark: Hashable, Codable {
      var id: Int
      var name: String
      var park: String
      var state: String
      var description: String
  }
  ```
  Landmark.swift라는 이름의 스위프트 파일을 만들어 줍니다. Landmark structure를 정의하고 landmarkData.json 파일에 있는 키와 이름이 같은 property 몇개를 만들어줍니다.  

### 👷 작성하는 중..

## Foundation framework  

  Foundation framework는 가장 기본적인 data types과 collections 그리고 운영체제 서비스에 접근하도록 합니다. 데이터를 저장 또는 유지하기, 텍스트의 처리, 날짜와 시간의 계산, 정렬 및 필터링, 그리고 네트워킹과 같은 가장 기본적인 기능을 하는 layer를 정의합니다. Foundation으로부터 정의된 클래스, 프로토콜, 데이터 자료형들은 macOS, iOS, watchOS, tvOS SDKs의 모든 범위에서 사용됩니다.

  <!-- Framework들은 큰 가지처럼 느껴집니다. Classes, protocols, data types를 크게 구분해 놓은 바구니 처럼 느껴집니다.  -->

### Codable conformance

  Codable은 데이터 파일과 structure사이에서 데이터를 이동시키는 것을 더 쉽게 만들어줍니다.


### JSON data를 가져오는 메서드 생성하기  

  ```swift
  //  ModelData.swift

  import Foundation

  func load<T: Decodable>(_ filename: String) -> T {
      let data: Data // Data protocal? Data..structure type? 뭔데?

      guard let file = Bundle.main.url(forResource: filename, withExtension: nil)
      else {
          fatalError("Couldn't find \(filename) in main bundle.")
      } // else문

      do {
          data = try Data(contentsOf: file)
      } catch {
          fatalError("Couldn't load \(filename) from main bundle.") // main bundle이 뭐야?
      } // catch문

      do {
          let decoder = JSONDecoder()
          return try decoder.decode(T.self, from: data)
      } catch {
          fatalError("Couldn't parse \(filename) as \(T.self):\n\(error)")
      }
  }
  ```
### Bundle  

  Bundles는 macOS와 iOS에서 사용되는 코드와 resource를 캡슐화하기 위해 사용되는 기술입니다. 개발자가 필요로하는 resource의 위치를 제공함으로써 개발을 단순화 해줍니다. Bundles는 디렉토리와 파일을 사용합니다. Binary files 보다 더 쉽고 개발 과정이나 배포후에도 쉽게 수정할 수 있습니다. 
