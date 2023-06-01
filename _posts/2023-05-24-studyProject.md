---
title: TIL
author: Mirae
date: 2023-05-24
category: TIL
layout: post
---


## 스터디 과제 진행하며 정리 (~6/7)
- @State 프로퍼티는 항상 private으로 사용 (해당하는 뷰와 서브 뷰의 특정한 정보를 담기 때문)
- observable object class 수정
    - published 값이 옵셔널로 설정되어 있음 -> 뷰 부분에서 처리해주어야 하는 불편함을 해결하기 위해 수정
    - final class로 변경 
    - Combine 추가 
    - 데이터 로드하는 함수를 제네릭 함수로 변경
    - 데이터 로드 함수를 실행하는 init() 제거
    - 데이터 로드 함수가 observable object 클래스 안이 아닌 바깥 쪽에 정의  
    
    
- 오류 해결 내용 
    - ```swift 
            let file = Bundle.main.url(forResource: filename, withExtension: "txt")``` 에서 withExtension을 nil로 주면 이름이 일치하는 첫번째 파일을 가져온다고 하여 nil로 주었으나 파일을 찾지 못한다는 에러가 발생하여 파일의 익스텐션인 "txt"로 수정하여 해결

## SwiftUI 

<b>Source of truth 생성하기</b>
- @State와 @Binding은 value type(ex. structure, enum)을 뷰를 업데이트하는 source of truth로 만들어 줌 
- value type이 아니고 reference type인 클래스는 @ObservedObject, @StateObject, @EnvironmentObject 프로퍼티 래퍼를 사용
- @ObservedObject, @StateObject, @EnvironmentObject를 사용하기 위해서 클래스를 observable하게 만들어 주어야 함
    - @StateObject는 observable 객체를 생성
    - @ObservedObject는 parent view로부터 객체를 받는다는 걸 나타냄 (@StateObject로 생성된 객체를 받음)
    - @EnvironmentObject는 복잡한 뷰에서 사용됨. 이니셜라이저를 통해 객체를 통과시키지 않고 .environmentObject() 모더파이어를 통해 해당 뷰가 객체를 사용할 수 있도록 함 (부모-자식-자식의 자식뷰에서 자식뷰가 .environmentObject() 모더파이어를 통해 객체를 사용할 수 있게 되면 자식의 자식뷰도 @EnvironmentObject 속성을 통해 사용할 수 있게 됨)
- 클래스가 ObservableObject 프로토콜을 따르도록 만들면 됨 
- 클래스 안에는 값이 변경되었을 때 UI가 업데이트 되어야 하는 속성들이 정의됨 
- 각 속성은 @Published atrribute를 사용해 정의되어 뷰에서 사용할 수 있게됨
  
  
<b>Scene architecture</b>
- Scene의 구조
- 하나의 앱을 만들기 위해서, App 프로토콜을 따르는 스트럭처를 생성함
- 이때 앞에 @main 어트리뷰트를 사용하여 이 스트럭처가 앱의 유일한 entry point라는 것을 시스템에 알려줌
- 앱 스트럭처의 바디 부분에 Scene 프로토콜을 따르는 스트럭처를 생성 (여러개 생성 가능)
- Scene은 앱이 보여줄 뷰 게층을 담을 컨테이너
- 보통 iOS / WatchOS는 하나의 Scene을 가지고 macOS / iPadOS 는 여러개의 Scene을 가짐 

<b>Scene Phases and transitions</b>
- Scene의 단계와 변형 과정
- 앱이 실행되는 동안 Scene은 세 단계로 변화될 수 있음
- active: scene이 foreground에 있고 사용자가 상호작용할 수 있음 
- inactive: scene이 보이지만, 시스템이 scene과 상호작용할 수 없음. 예를 들면, 아이패드에서 멀티태스킹 기능을 사용할 때 사용하지 않는 쪽은 보이지만 inactive 상태임. (scene은 foreground에 있음)
- background: 앱이 작동하고 있지만 사용자는 앱을 볼 수 없음. 앱이 꺼지기 직전에 Scene이 이 단계가 됨.
- scenePhase environment value를 사용해서 현재 scene의 상태를 알 수 있음.
- scene이 특정 상태가 됐을 때, 어떤 동작을 수행하도록 할 수 있음. (ex. 앱이 inactive 상태가 될 때 데이터를 저장하도록 함)

<b>SwiftUI 기본 Structure</b>
- var body: some View { } 는 Scene, View, App 프로토콜을 다르는 structure가 꼭 구햔헤야 하는 필수 computed property
- @main 으로 표시하여 App의 entry point를 정의할 수 있음. 앱에는 단 하나의 entry point만이 존재할 수 있음
- 아래 예시에서 WindowGroup은 첫번째 scene, Settings는 두번째 scene 
- Settings scene은 거의 모든 mac앱에서 볼 수 있는 Settings 메뉴를 생성
- Settings scene은 macOS 에서만 사용 가능  

```swift
    #if os(iOS)
    
    // iOS로 컴파일 될 코드
    
    #elseif os(macOS)
    WindowGroup {
        AlternativeContentView()
    }
    
    Settings {
        SettingsView()
    }
    #endif
```
  
- #if os(iOS) 와 #elseif os(macOS), #endif는 platform conditional compilation block으로 Swift 컴파일러에게 특정 타겟 플랫폼에서만 조건문 안쪽의 코드를 컴파일 하도록 함





