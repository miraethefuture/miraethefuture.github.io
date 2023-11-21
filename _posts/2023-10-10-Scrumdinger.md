---
title: 앱 Scrumdinger 튜토리얼을 따라가며 정리
author: Mirae
date: 2023-10-10
category: TIL
layout: post
---

[Scrumdinger app tutorial](https://developer.apple.com/tutorials/app-dev-training/managing-data-flow-between-views)  
> 이 글은 위 튜토리얼을 따라가며 정리한 내용입니다. 
  
  
# Create a color theme

앱 전체에 일관된 스타일을 주기 위해 컬러 테마를 생성하기.

- 뷰 파일이 아니지만 Foundation을 제거하고 SwiftUI를 import (SwiftUI 프레임워크의 Color을 사용하기 때문) 

    > SwiftUI는 컬러를 뷰 계층에 바로 추가할 수 있는 하나의 뷰 인스턴스로 취급함.

- String 타입의 값을 raw value로 가지는 enum 생성 

```swift 
enum Theme: String {
    case bubblegum
    case buttercup
    case indigo
    case lavender
    
    var accentColor: Color {
        switch self {
        case .bubblegum, .buttercup, .lavender: return .black
        case .indigo: return .white
        }
    }
}
```
> 위와 같이 case 이름만 작성해주면 Swift가 자동으로 스트링 타입의 raw value를 생성함. 
> enum 안에 switch self를 사용하여 case 별로 값을 리턴하는 컬러 프로퍼티를 생성
    
  
  
# Managing data flow between views  
## Source of truth 
> source of truth == 원천데이터
  
원천데이터를 사용하지 않으면 뷰에 나타나는 데이터가 불일치하는 버그가 생길 수 있음.  
데이터를 가지고 있는 요소를 한 장소에 보관하고 뷰들이 그 데이터에 접근하도록 함.  
앱 전체 코드를 통하는 원천데이터를 생성할 수도 있음. 원천 데이터를 정의하는 방식과 위치는 여러 뷰들 사이에서 공유되는 데이터인지, 변하는 데이터인지에 따라 다름.  

## Swift property wrappers
스위프트의 프로퍼티 래퍼를 사용하여 특정 행동을 하는 속성을 만들 수 있음.  
일반적으로 많이 사용되는 속성의 동작들을 캡슐화 해놓은 것.  

<b>State</b>는 그런 프로퍼티 래퍼중 하나로 뷰 안에서 원천데이터를 생성함.  

```swift
@State
```
사용자의 상호작용으로 @State 속성의 값이 변경될 수 있음. 이때 시스템은 이 새로운 값을 가진 버전의 뷰를 자동으로 다시 그림. state 속성은 일시적인 상태를 관리하는 것에 사용됨. (예: 버튼의 상태, 필터링 버튼, 현재 선택된 리스트 아이템..) 그렇기 떄문에 private으로 선언함. (한 뷰 안에서 일시적으로 변화되는 값들이기 때문에..) 같은 이유로 영속적으로 보관되어야 하는 데이터에는 사용하지 않음.  
  
@State 프로퍼티 래퍼는 하나의 뷰 안에서 변경되는 원천 데이터를 담기 위해 사용되는데, 만약 여러개의 뷰 계층 속에서 같은 원천데이터를 사용하고 싶다면..?  

```swift
@Binding
```
<b>Binding</b>은 state 속성과 똑같이 원천데이터를 읽거나 값을 변경할 수 있음.  
@Binding은 데이터를 직접 담지 않고 원천 데이터와 뷰 사이에 양방향 커넥션을 생성함.  
이 커넥션은 하나의 데이터와 관련된 뷰들이 같은 데이터 상태를 가지도록 함. 
시스템은 원천데이터를 가진 부모뷰와 @Binding을 가진 자식뷰의 관계를 성립시킴.  
이때는 자식뷰, 부모뷰 모두 원천데이터를 읽거나, 수정할 수 있음. 만약 자식뷰가 read-only 속성을 가지고 있다면, 원천데이터를 보내기만 할 수 있음. (수정은 안됨.)
두 경우 모두, 프레임워크가 자동으로 뷰를 업데이트 함.  
  
# Making classes observable
## Working with reference types
@State 속성은 구조체나 열거형과 같은 value type 원천데이터만 정의할 수 있다.  
클래스와 같은 reference type인 원천데이터를 정의하려면 @State가 아닌 아래 세가지 프로퍼티 래퍼를 사용해야 한다.  

```swift
@ObservedObject 
@StateObject 
@EnvironmentObject
```
이 프로퍼티 래퍼들을 사용하려면 먼저 원천데이터가 될 클래스를 observable한 상태로 만들어주어야 한다.  

## Making a class observable
ObservableObject 프로토콜을 따르는 클래스를 생성하여 클래스를 observable 하도록 만들 수 있다. (observable의 사전적 의미 중 하나는 '관찰할 수 있는'이다. 클래스를 observable 하도록 만든다는 건, 다른 어떤 것들이 이 클래스를 관찰할 수 있도록 만든다는 것이다.) 

```swift
class ScrumTimer: ObservableObject {
   @Published var activeSpeaker = ""
   @Published var secondsElapsed = 0
   @Published var secondsRemaining = 0
   // ...
}
```
이 클래스 안에서 위 세개의 속성들은 자신의 값이 변할 때 UI를 업데이트 해야한다. 이런 속성들은 @Published를 사용하여 정의한다. 이 published property의 값이 변경될 때 ScrumTimer가 자신을 관찰하고 있는 관찰자에게 이 변경사항을 알린다.

## Monitoring an object for changes
ObservedObject, StateObject, EnvironmentObject 이 세가지의 속성 중 하나를 사용하여 SwiftUI가 observable 객체를 모니터링하도록 할 수 있다. 이 속성을 사용하여 정의된 프로퍼티는 원천데이터가 된다.  
  
```swift
struct MeetingView: View {
   @StateObject var scrumTimer = ScrumTimer()
   // ...
}
```
@StateObject 래퍼를 사용하여 observable 객체를 생성한다. App, Scene, View에서 스테이트 객체를 생성할 수 있다. 시스템이 스테이트 객체를 초기화하면 해당 스트럭처 또는 객체를 전달 받은 다른 뷰에서 해당 객체를 사용할 수 있다. 

<!--```swift-->
<!--struct ChildView: View {-->
<!--   @ObservedObject var timer: ScrumTimer-->
<!--   // ...-->
<!--}-->
<!--``` 여기부터 이어서 작성하기.. -->

# Managing state and life cycle

```swift
struct MeetingFooterView: View {
    
    let speakers: [ScrumTimer.Speaker]

    private var isLastSpeaker: Bool {
            return speakers.dropLast().allSatisfy { $0.isCompleted }
        }
    }
```
🖍️ 이 뷰 안에서만 필요한 computed property이기 때문에 private으로 선언  
🖍️ dropLast()를 사용하여 speakers 배열의 마지막 요소를 제외한 배열을 리턴함.  
🖍️ allSatisfy()를 사용하여 마지막 speaker를 제외한 모든 speakers의 isCompleted 이 true라는 bool 값을 리턴함.  

<b>dropLast(\_:)</b>
```swift
let numbers = [1, 2, 3, 4, 5]
print(numbers.dropLast(2))
// Prints "[1, 2, 3]"
print(numbers.dropLast(10))
// Prints "[]"
```
🖍️ 마지막 요소만 제외하거나, 제외할 요소의 수를 정할 수 있음. 위 코드에서는 2를 통과시켜 맨 뒤에서부터 배열의 요소 2개를 제외한 배열을 리턴
🖍️ 배열의 카운트보다 큰 수를 통과시킬 경우 빈 배열을 리턴

<b>allSatisfy(\_:)</b>

```swift
let names = ["Sofia", "Camilla", "Martina", "Mateo", "Nicolás"]
let allHaveAtLeastFive = names.allSatisfy({ $0.count >= 5 })
// allHaveAtLeastFive == true
```
🖍️ 배열의 모든 요소가 5자 이상인 이름인지를 bool 값으로 리턴함.

```swift
import Foundation

/// Keeps time for a daily scrum meeting. Keep track of the total meeting time, the time for each speaker, and the name of the current speaker.

@MainActor
final class ScrumTimer: ObservableObject {
    /// A struct to keep track of meeting attendees during a meeting.
    struct Speaker: Identifiable {
        /// The attendee name.
        let name: String
        /// True if the attendee has completed their turn to speak.
        var isCompleted: Bool
        /// Id for Identifiable conformance.
        let id = UUID()
    }
    
    // ...
}
```
🖍️ 주석 /// 을 사용하여 Xcode에서 보여지는 문서를 작성할 수 있음  
  
<img src="/assets/images/writingDocs.png" alt="writingDocs" width="550"><br> 


## Adopting Swift Concurrency

> Swift 코드로 복잡한 비동기 작업을 단순화 해보자!

SwiftUI 앱에서는 메인 스레드가 모든 UI 작업을 실행한다. 또, 탭하거나 스와이프하는 것과 같은 유저 이벤트를 처리한다. 앱이 제대로 작동하기 위해서는 모든 뷰 업데이트 작업과 이벤트 핸들러를 메인 스레드에서 실행해야 한다.  
하지만 만약 모든 작업을 메인 스레드에서 처리한다면 앱이 느린 것과 같이 느껴질 수 있다.  
만약 메인 스레드가 모든 코드를 처리하는 것을 기다려야 한다면, 앱이 느리거나 심지어 멈춘 것처럼 느껴질 수 있다.  
그렇기 때문에 가능한 작업은 백그라운드 스레드에서 실행하고, 꼭 필요한 작업을 메인 스레드에서 실행하며 균형을 맞춰야 한다.  

디스크에 있는 데이터를 읽고, 디스크에 데이터를 입력하는 작업을 비동기적으로 작성해보자.  
이 작업에서는 스위프트의 비동기 함수, Task 타입, @MainActor 어노테이션을 사용할 것이다.  


### Defining an asynchronous function

비동기 함수는 파라미터 리스트 뒤에 async 키워드를 추가하여 정의한다. 리턴값이 있을 경우 리턴 애로우 앞쪽에 표시한다.

```swift
final class UserStore {
    func fetchParticipants() asyns -> [Participant] {...}
}
```

### Calling an asynchronous function 

await 키워드를 사용하여 비동기 함수를 호출한다. await 키워드는 비동기적인 흐름, 문맥에서만 사용할 수 있다. 아래 UserStore 클래스는 비동기 함수인 refresh() 안에서 fetchParticipants() 함수를 await를 사용해서 호출하고 있다.

```swift
final class UserStore {

    func refresh() async -> [UserRecord] {
        let participants = await fetchParticipants()
        let records = await fetchRecords(participants: participants)
        return records
    }
    
    func fetchParticipants async -> [Participant] {...}
    func fetchRecords(participants: [Participant]) async -> [UserRecord]
}
```
fetchParticipants()가 작업을 완료하는 동안 refresh() 함수는 잠시 멈춤. 
그동안 refresh()를 실행하는 스레드는 다른 작업을 할 수 있음. fetchParticipants()의 작업이 완료되면, 시스템은 refresh() 함수의 다음 라인을 실행함. fetchRecords(participants: participants) 함수가 호출할 때 fetchParticipants()의 리턴값을 사용할 수 있음. 비동기 함수를 사용하면 작성돼있는 순서로 코드를 실행함.

