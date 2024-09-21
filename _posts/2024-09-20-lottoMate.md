---
title: 프로젝트 '로또메이트'
author: Mirae
date: 2024-09-20
category: TIL
layout: post
---
# Template

> ##### 이슈 정리 템플릿
>
> 아래 템플릿을 사용하여 프로젝트 진행 중 발생한 이슈 내용을 정리합니다.  
> 각 항목에 맞춰 문제와 해결 방법을 구체적으로 작성합니다.
{: .block-tip }

## 1. 문제 상황 (Problem)
- 배경 설명: 문제 발생 전에 있었던 상황이나 필요했던 기능을 간략하게 설명합니다.  
<!--- 예: "프로젝트에서 UIPageView의 뷰에 corner radius를 적용했으나, 특정 기기에서 하단 부분이 잘리는 문제가 발생했습니다." -->
  
- 문제 설명: 구체적으로 문제가 무엇인지 설명합니다. 해당 문제를 어떻게 발견했는지, 문제를 다시 재현하는 방법도 간략하게 언급할 수 있습니다.  
<!--- 예: "iPhone 14 Pro에서 corner radius가 잘려서 보였고, UI가 깨진 것처럼 보였습니다." -->

## 2. 원인 분석 (Analysis)
- 원인 분석 과정: 문제를 분석하면서 발견한 내용을 설명합니다. 관련 코드를 포함하면 좋습니다.
<!--- 예: "이 문제는 PageViewController의 기본 레이아웃 방식이 일부 기기에서 화면 경계와 맞닿아 있어 발생했습니다." -->

- 시도한 방법들: 문제를 해결하기 위해 시도한 여러 방법을 설명합니다. 성공하지 못한 방법도 간략히 언급하여, 문제 해결 과정의 고민을 드러냅니다.
<!--- 예: "처음에는 PinLayout을 사용하여 해결하려 했으나, 특정 기기에서 원하는 대로 동작하지 않았습니다." -->

## 3. 해결 방법 (Solution)
- 최종 해결 방법: 문제를 어떻게 해결했는지 구체적으로 설명합니다. 해결한 코드를 포함시켜 독자가 쉽게 이해할 수 있도록 합니다.
<!--- 예: "뷰 계층 구조와 레이아웃 방식에서 오류를 찾은 후, 아래 코드를 통해 뷰의 하단이 잘리지 않도록 corner radius를 조정했습니다."
swift
Copy code
override func viewDidLayoutSubviews() {
    super.viewDidLayoutSubviews()
    rootFlexContainer.pin.top(view.safeAreaInsets.top).horizontally()
    rootFlexContainer.flex.layout(mode: .adjustHeight)
} -->
- 왜 이 방법이 효과적인지: 해결책이 왜 효과적이었는지 설명하여, 독자가 그 원리를 이해할 수 있게 돕습니다.
<!--- 예: "이 방법은 Safe Area Insets를 고려해 레이아웃을 조정했기 때문에 모든 기기에서 안정적으로 작동하게 되었습니다." -->

## 4. 결과 (Result)
- 결과 설명: 문제 해결 후의 결과를 설명합니다. 성능, UI 개선 등 눈에 띄는 변화가 있다면 언급합니다.
<!---예: "이제 모든 기기에서 UI가 깔끔하게 렌더링되었으며, corner radius가 잘리지 않고 적용되었습니다." -->

- 추가 개선 사항: 만약 문제 해결 과정에서 배운 점이나 추가로 고려할 사항이 있다면 짧게 언급합니다.
<!---예: "다음엔 Safe Area를 보다 효율적으로 관리하기 위해 추가적인 도구나 방법을 사용할 계획입니다." -->

## 5. 교훈 (Takeaways)
- 배운 점: 이 문제를 해결하며 배운 점을 간략히 정리합니다. 비슷한 상황에서 적용할 수 있는 원칙을 공유합니다.
<!---예: "Safe Area와 다양한 기기 레이아웃을 미리 고려하는 것이 중요하며, 레이아웃을 조정할 때는 PinLayout과 같은 라이브러리를 효과적으로 활용하는 것이 도움이 됩니다." -->
  
  
  
------------
# 커스텀 네비게이션 바 레이아웃 이슈

<center><img src="/assets/images/lottoMate_1.png" alt="lottoMate_1.png" width="257"></center><br>  

## 1. 문제 상황 (Problem)
- iPhone 14 Pro, iPhone 14 Pro Max, iPhone 15 Pro, iPhone 15 Pro Max 기기 시뮬레이터에서 status bar와 커스텀 navigation bar 사이에 5px 정도의 빈 공간이 나타나는 문제가 발생했습니다. 다른 기기 시뮬레이터 에서는 이러한 현상이 나타나지 않았으며, 문제는 해당 네 가지 기기 시뮬레이터에서만 재현되었습니다.
  
- 문제는 rootFlexContainer가 top safe area 바로 아래에 커스텀 네비게이션 바가 위치하도록 작성된 코드에서 발생했습니다.
```swift
rootFlexContainer.pin.top(view.safeAreaInsets.top).horizontally()
rootFlexContainer.flex.layout(mode: .adjustHeight)
```

## 2. 원인 분석 (Analysis)
- 기존 코드에서는 view.safeAreaInsets.top을 사용하여 네비게이션 바를 top safe area 아래에 배치하고 있었습니다. 하지만 특정 기기에서는 status bar와 top safe area 간에 예상치 못한 빈 공간이 생기는 현상이 발생했습니다.

- 처음에는 사용자의 기기 정보를 기반으로 문제가 발생하는 기기(iPhone 14 Pro, iPhone 14 Pro Max, iPhone 15 Pro, iPhone 15 Pro Max)에 한해 커스텀 네비게이션 바의 margin top 값을 -5로 설정하여 빈 공간만큼 뷰를 위로 이동시키는 방식을 시도했습니다. 이를 통해 빈 공간이 없는 것처럼 보이게 했으나, 기기별 정보를 이용해 코드를 분기 처리하는 방식은 안전하지 않다고 판단했습니다. 따라서 최종적으로 status bar의 높이를 동적으로 구한 후, 그 값을 이용해 커스텀 네비게이션 바를 status bar 바로 아래에 위치시키는 방법을 사용했습니다.

## 3. 해결 방법 (Solution)
- 문제를 해결하기 위해, status bar의 높이를 직접 가져와 그 값을 기반으로 rootFlexContainer(커스텀 네비게이션 바)를 배치하도록 코드를 수정했습니다. 빈 공간이 발생하는 기기에서도 문제없이 동작할 수 있도록 statusBarManager를 통해 상태 바의 정확한 높이를 가져와 그 바로 아래에 네비게이션 바가 위치하도록 설정했습니다.  

    ```swift 
    // 상태바의 높이를 가져오기 위한 설정
    var statusBarHeight: CGFloat = 0.0

    if let windowScene = view.window?.windowScene {
        statusBarHeight = windowScene.statusBarManager?.statusBarFrame.height ?? 0
    }

    // rootFlexContainer를 상태바 바로 아래에 배치
    rootFlexContainer.pin
        .top(statusBarHeight)  // 상태바 바로 아래에 배치
        .horizontally()         // 좌우 여백은 기본으로 적용
    rootFlexContainer.flex.layout(mode: .adjustHeight) // 높이는 flex로 자동 조정
    ```
문제의 원인은 top safe area의 높이와 status bar의 높이가 서로 다르기 때문이었습니다. 기기마다 status bar의 높이가 다를 수 있지만, 이 값을 동적으로 가져와 top 값으로 설정함으로써 모든 기기에서 일관된 레이아웃을 유지할 수 있었습니다. 

## 4. 결과 (Result)
- 해당 코드를 적용한 후, iPhone 14 Pro, iPhone 14 Pro Max, iPhone 15 Pro, iPhone 15 Pro Max에서 모두 빈 공간이 나타나지 않고 네비게이션 바가 정상적으로 status bar 바로 아래에 배치되었습니다. 그 외 다른 기기에서도 정상적으로 레이아웃이 유지됨을 확인했습니다.

## 5. 교훈 (Takeaways)
- 이번 문제를 통해 기기별로 다른 코드를 사용하는 것보다, 모든 기기에서 일관되게 동작하는 코드를 찾는 것이 더 중요하다는 점을 알게 되었습니다. 앞으로는 특정 기기에 맞추기보다, 범용적으로 사용할 수 있는 코드를 우선적으로 고려하려고 합니다.

