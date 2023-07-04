---
title: SwiftUI 업데이트 
author: Mirae
date: 2023-07-03
category: TIL
layout: post
---


# onChange(of:initial:_:)

## 파라미터

- value : of 뒤에 작성되는 값으로, value의 값에 변화가 생기면 onChange 클로저가 실행됨

- initial : initial에 해당하는 뷰가 먼저 나타나면 onChange 속 동작이 실행됨 

- action : value 값이 변경되었을 때 실행되는 클로저 

- oldValue : 비교 체크를 실패한 예전 값 또는 처음 값

- newValue : 비교 체크를 실패한 새로운 값


## 리턴값 

- 특정 value가 변경될 때 어떤 동작을 실행하는 뷰를 리턴함 

## Discussion 

- onChange를 사용하여 특정 값이 변경되었을 때 어떤 동작이 일어나도록 할 수 있음.
- 긴 시간동안 실행되는 테스크에 사용하는 것은 피해야 함 

```swift
struct PlayerView: View {
    var episode: Episode
    @State private var playState: PlayState = .paused


    var body: some View {
        VStack {
            Text(episode.title)
            Text(episode.showTitle)
            PlayButton(playState: $playState)
        }
        .onChange(of: playState) { oldState, newState in
            model.playStateDidChange(from: oldState, to: newState)
        }
    }
}
```


# 매크로 

\#stringify : 스트링이파이 매크로

```swift 
let calculations = [
    (1 + 1, "1 + 1"),
    (3 * 2, "3 * 2"),
]

let calculations = [
    #stringify(1 + 1)
    #stringify(3 * 2)
]
```

// 매크로 정의 
```swift
@freestanding(expression) // 2
macro stringify(_ value: Int) -> (Int, String) // 1

```
- // 1: function 정의와 비슷함. Int 값을 파라미터로 받고 output 값으로 Int, String을 반환함.
- // 2: freestanding expression macro role을 사용하여 정의되었는데, 이것은 expression을 사용하는 곳엔 어디서든 매크로를 사용할 수 있도록 한다는 의미.
  
  - 파라미터의 타입이 일치하는지 체크하고 (제네릭 타입 매크로도 작성 가능), 컴파일러는 macro expansion 실행 (macro expansion은 매크로가 실행되고 값을 리턴하는 과정을 말함)
  
```swift 
@freestanding(expression) 

@attached(member) 
```

- MemberMacro 프로토콜은 하나의 요구사항을 가짐. 이 요구사항은 'expansion' 함수인데, 
  

