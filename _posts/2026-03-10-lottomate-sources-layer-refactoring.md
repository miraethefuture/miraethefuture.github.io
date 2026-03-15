---
title: 프로젝트 LottoMate 폴더 구조 리팩토링
date: 2026-03-10
summary: Common/Views/Models에 섞여 있던 코드를 Core, Data, Domain, Features, Shared로 재배치해 각 계층의 책임을 명확히 나누었습니다.
tags:
  - iOS
  - Swift
  - Refactoring
  - Architecture
type: project
featured: true
links:
  github: https://github.com/LottoMate/LottoMate-iOS-public
  note:
---

## 배경

- LottoMate iOS 프로젝트의 `Sources` 아래에 `Common`, `Views`, `Models`가 장기간 확장되면서 역할이 섞이기 시작했습니다.
- 같은 성격의 코드가 여러 폴더에 분산되어 탐색 비용이 커졌습니다.
- 이번 작업 범위는 “기능 추가”가 아니라 “디렉토리 책임 재정의 + 파일 재배치”로 제한했습니다.

## 문제 정의

- UI 컴포넌트, 전역 유틸, 도메인 타입, 네트워크 서비스가 명확한 규칙 없이 혼재되어 있었습니다.
- `Models` 폴더에 `ViewModel`, `Reactor`, `Service`, `Error`, `SampleData`가 함께 존재했습니다.
- 그렇기 때문에 “어디에 파일을 둬야 하는지” 매번 판단해야 했습니다.

```swift
// 리팩토링 전 (요약)
Sources/
  Common/
    Extensions/
    Managers/
    Utils/
  Models/
    LottoMateAPIService.swift
    LottoMateViewModel.swift
    MapViewReactor.swift
    SampleData.swift
  Views/
    Common/
    UI/
    TabViews/Subviews/
```

## 목표

- Core/Data/Domain/Features/Shared/DevSupport 기준으로 책임을 분리합니다.
- 동일 성격 파일을 한 계층으로 모아 탐색성을 높입니다.

## 진행 과정

### 1. 기존 구조 파악

- 분류 기준은 아래 5가지로 고정했습니다.
- `Core`: 전역 기반(UI foundation, manager, parser, extensions)
- `Data`: 네트워크/DTO/엔드포인트/서비스 구현
- `Domain`: 비즈니스 의미 타입(주로 enum으로 생성한 type)
- `Features`: 화면/기능 단위 코드
- `Shared/DevSupport`: 기능 간 공유 상태, 샘플/템플릿성 코드

### 2. 첫 번째 변경: Core 중심 재배치

- `Common/Extensions`, `Common/Managers`를 `Core` 하위로 이동했습니다.
- `Views/Common`, `Views/UI`의 공통 UI를 `Core/UI/*`로 재배치했습니다.
- `Views/TabViews/TabBarViewController`는 `Features/AppShell/TabBar`로 이동했습니다.

### 3. 두 번째 변경: Subviews/Components 정리

- `Views/Subviews` 계열을 성격에 따라 `Core/UI/Components` 또는 각 Feature로 이동했습니다.
- 예: `WinningNumberCircleView` -> `Core/UI/Components/NumberBall`
- 예: PageView 컴포넌트 -> `Features/WinningReview/Components`

### 4. 세 번째 변경: Models/Domain/Data 구조 정리

- `Models` 내부 혼재 파일을 역할 기준으로 해체했습니다.
- `LottoMateAPIService` -> `Data/Network/Services`
- `MapViewReactor` -> `Features/Map`
- `LottoMateViewModel`, `LoginViewModel` -> `Shared/ViewModels`
- `SampleData`/샘플 JSON -> `DevSupport/SampleData`
- `LottoQRParser` -> `Core/Utils/Parser`
- `BannerType`, `LotteryType`, `SpeetoType`, `UpdateType`, 저장 관련 타입/에러를 `Domain`으로 정리했습니다.

### 5. 시도했다가 버린 방법

- Reactor를 한 폴더에 몰아두는 방법도 검토했지만 채택하지 않았습니다.
- Reactor는 각 기능과 강하게 결합되는 경우가 많아 Feature 내부 배치가 유지보수에 유리하다고 판단했습니다.

## 변경 후 구조

```swift
// 리팩토링 후 (요약)
Sources/
  Core/
    Extensions/
    Managers/
    UI/
      BottomSheet/
      Components/
      DesignSystem/
      Feedback/
      Foundation/
      Web/
    Utils/Parser/
  Data/
    Network/
      Base/
      DTOs/
      Endpoints/
      Services/
  Domain/
    App/
    Banner/
    Errors/
    Lottery/
  Features/
    AppShell/
    AppSupport/
    Home/
    Map/
    WinningInfoDetail/
    WinningReview/
    ...
  Shared/
    ViewModels/
  DevSupport/
    SampleData/
```

- `Models`를 사실상 해체하고 계층 기준으로 재분배했습니다.
- 도메인 타입을 UI 파일 내부 enum에서 분리해 탐색이 쉬워지도록 했습니다.

## 결과

- 유지보수성: 파일 위치 규칙이 생겨 신규 파일 추가 시 의사결정 비용이 줄었습니다.
- 가독성: “기능 코드 vs 공통 코드 vs 도메인 타입” 경계가 눈에 보이게 되었습니다.
- 확장성: Domain 타입 분리로 UI/서비스 레이어에서 재사용 가능한 기반이 생겼습니다.

## 배운 점

- 디렉토리 정리는 어떤 기준에 따라 분류할 것이냐가 가장 중요하다는 것을 배웠습니다.
- `Models` 같은 포괄적 이름을 가진 디렉토리에 많은 파일들을 위치시키는 것은 결국 추후 더 많은 책임 판단 작업을 불러온다는 것을 깨달았습니다. 앞으로는 한 파일을 생성할 떄, 책임과 역할에 대해 좀 더 구체적으로 생각해 보려고 합니다.

## 추가로 보완하면 좋은 부분

- `Shared/ViewModels/LottoMateViewModel`의 책임을 feature별 상태로 점진 분해
- `Features/WinningInfoDetail`의 SubViews/Components 중복 구조 정리

## 마무리

- 핵심은 “파일 이동”이 아니라 “역할과 책임에 따른 레이어 분류”였습니다.
