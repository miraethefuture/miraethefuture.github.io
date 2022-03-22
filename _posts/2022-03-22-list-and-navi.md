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
- Foundation module의 사용
- Codable / Hashable conformance
- Guard
<!-- - Binding ($) -->

<!-- <br>

<center><img src="/assets/images/directoryTree.png" alt="tree" width= "300">
</center>
<br> -->

## Section 1: Landmark model 생성하기  

### 샘플 데이터 파일 추가하기  

  다운받은 프로젝트 파일에 압축을 풀면 Resources 폴더에 landmarkData.json 파일이 있습니다. 튜토리얼 Creating and Combining Views에서 만들었던 프로젝트를 그대로 사용합니다. 왼쪽에 위치한 프로젝트의 navigation pane 부분에 landmarkData.json 파일을 드래그해서 넣어줍니다. 다이얼로그 창이 나타나면 'Copy items if needed'을 선택하고 Add to targets: 에 Landmarks를 선택하고 Finish 버튼을 눌러줍니다. 앞으로의 튜토리얼을 진행하며 게속해서 이 샘플 데이터를 사용할 것입니다.  

  <center><img src="/assets/images/navi1.png" alt="json">
  </center>
  <center><sup>(샘플 데이터인 landmarkData.json 파일을 추가해 준 모습)</sup></center><br>


### 새로 만든 Landmark.swift 파일에 structure 생성

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

  **Codable conformance**는 데이터 파일과 structure사이에서 데이터를 이동시키는 것을 더 쉽게 만들어줍니다. <s>아직 Codable이 뭔지 잘 모르겠지만 데이터와 관련된 protocol인 것 같습니다.</s>


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
