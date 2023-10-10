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

매크로를 사용하면 반복적으로 사용되는 코드를 컴파일 할 때 생성할 수 있음. 반복적인 코드를 짧게 줄일 수 있으므로 더 읽기 편해짐.  

```swift 
/// Slopes in my favorite ski resort.
enum Slope {
    case beginnersParadise
    case practiceRun
    case livingRoom
    case olympicRun
    case blackBeauty
}

/// Slopes suitable for beginners. Subset of `Slopes`.
enum EasySlope {
    case beginnersParadise
    case practiceRun

    init?(_ slope: Slope) {
        switch slope {
        case .beginnersParadise: self = .beginnersParadise
        case .practiceRun: self = .practiceRun
        default: return nil
        }
    }

    var slope: Slope {
        switch self {
        case .beginnersParadise: return .beginnersParadise
        case .practiceRun: return .practiceRun
        }
    }
}
```
- Slope 타입에 있는 case 중 초보자에게 적합한 slope이 있을 경우, EasySlope 타입으로 변환함.
- 이때 초보자에게 적합한 slope을 추가하기 위해서는 Slope 타입의 case, EasySlope 타입의 case, 이니셜라이저, computed property인 slope에 총 네번 코드를 추가해 주어야 함. 
- 위 작업을 매크로를 사용해서 줄일 수 있는지 알아보겠음.
    - 이니셜라이저와 컴퓨티드 프로퍼티는 EasySlope 타입의 멤버임. -> attached member 매크로를 정의할 것
    - 매크로를 구현할 컴파일러 플러그인을 생성해야 함.
    - 매크로가 원하는대로 동작하는지 확인하기 위해서 test driven way로 코드를 작성.
    - 정상적으로 코드를 작성할 시, 이니셜라이저에 해당되는 코드를 제거하고, 이니셜라이저 코드를 컴파일 타임에 생성할 매크로를 추가하게 됨.
    
```swift 
// EasySlope의 멤버인 이니셜라이저를 생성할 매크로
@attached(member, names: named(init))
// SlopeSubset은 매크로의 이름
public macro SlopeSubset() = #externalMacro(module: "MyMacroMacros", type: "SlopeSubsetMacro")
```
- 여기까지는 매크로의 정의. 아직 implementation 부분을 작성한 것은 아님. (실행될 코드 부분을 expansion이라고 함.)
- "SlopeSubsetMacro" 타입을 생성해야 함.

```swift
// attached member 매크로는 MemberMacro 프로토콜을 따라야 함.
// MemberMacro 요구사항은 하나 -> expansion() 함수
public struct SlopeSubsetMacro: MemberMacro {
    public static func expansion(
        of attribute: AttributeSyntax,
        providingMembersOf declaration: some DeclGroupSyntax,
        in context: some MacroExpansionContext
    ) throws -> [DeclSyntax] {
        return []
    }
}

// providingMacros 프로퍼티를 작성하여 컴파일러가 작성한 매크로를 감지할 수 있도록 함.
@main
struct WWDCPlugin: CompilerPlugin {
    let providingMacros: [Macro.Type] = [
        SlopeSubsetMacro.self
    ]
}
```






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

<!--- MemberMacro 프로토콜은 하나의 요구사항을 가짐. 이 요구사항은 'expansion' 함수인데, -->
  

