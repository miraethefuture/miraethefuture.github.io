---
title: 프로젝트 리팩토링 기록 - Home 당첨결과 카드와 진입 흐름 정리
date: 2026-03-18
summary: HomeView에 몰려 있던 당첨결과 카드 관련 컴포넌트와 상세 진입 로직을 Reactor와 컴포넌트로 분리해 상태 흐름과 UI 책임을 단순하게 정리했습니다.
tags:
  - iOS
  - Swift
  - RxSwift
  - Refactoring
  - State
type: project
featured: false
links:
  github: https://github.com/LottoMate/LottoMate-iOS-public
  note:
---

## 배경

- 2026년 3월 16일부터 3월 18일까지, `148e5cc6`부터 `7e31be2e`까지 총 8개 커밋에 걸쳐 `HomeView`의 당첨결과 영역을 정리했습니다.
- 이 범위의 작업은 새 기능을 크게 추가하기보다, 홈 화면에 섞여 있던 상태 처리와 화면 구성 책임을 다시 나누는 데 집중했습니다.
- 작업 범위는 크게 세 가지였습니다. 당첨정보 상세 진입 흐름 정리, 결과 카드 UI 분리, 스피또 mock 회차 흐름 복구입니다.

## 문제 정의

- 기존 `HomeView`는 결과 카드 레이아웃 조립, 복권 타입별 전환, 상세 화면 진입까지 모두 처리하고 있었습니다.
- 특히 버튼 탭 시 `View`가 직접 `selectedLotteryType`을 바꾸고, 곧바로 상세 화면을 띄우는 구조라서 흐름을 따라가기가 어려웠습니다.
- 로또, 연금복권, 스피또 카드도 비슷한 UI 블록을 각각 따로 만들고 있어 중복이 많았습니다.

```swift
showLottoWinningInfoButton.rx.tapGesture()
    .when(.recognized)
    .subscribe(onNext: { [weak self] _ in
        self?.viewModel.selectedLotteryType.onNext(.lotto)
        self?.showLottoWinningInfoView()
    })
    .disposed(by: disposeBag)
```

- 회차 이동과 화살표 노출 여부처럼 상태로 다뤄야 하는 값도 화면 코드와 가까이 붙어 있어, UI 리팩토링을 시작하기 전에 먼저 상태 계산을 고정할 필요가 있었습니다.

## 목표

- 당첨정보 상세 진입을 `View` 직접 호출 방식에서 `Reactor` 상태 변화 기반으로 바꿉니다.
- 결과 카드에서 반복되던 공통 UI 블록을 추출해 `HomeView`의 책임을 줄입니다.
- 스피또는 실제 API 연동 대신 mock 데이터 기준으로 회차 이동 흐름을 먼저 복구합니다.
- 이번 글에서는 실제 스피또 API 연결이나 화면 디자인 변경까지는 다루지 않습니다.

## 진행 과정

### 1. 상태 계산부터 테스트로 고정했습니다

- 시작 커밋 `148e5cc6`에서는 회차 변경 시 오른쪽 화살표 숨김 여부를 `currentState`가 아니라 `reduce`에 전달된 `state` 기준으로 계산하도록 수정했습니다.
- 같은 커밋에서 `HomeViewReactorTests`를 추가해 최신 회차 반영, 저장 상태 초기화, QR/지도/공지 토글 같은 상태 변화 테스트를 만들었습니다.
- 큰 UI 리팩토링 전에 상태 계산을 먼저 테스트로 고정한 덕분에, 이후 구조를 바꿀 때 회귀를 확인하기 쉬웠습니다.

### 2. 당첨정보 진입 흐름을 Reactor 중심으로 옮겼습니다

- `b83ce197`에서는 `HomeView`가 직접 상세 화면을 띄우는 코드를 없애고, 버튼 탭을 `HomeViewReactor.Action.showWinningInfo(...)`로 보내도록 바꿨습니다.
- `HomeViewController`는 `isWinningInfoVisible` 상태를 구독하다가 값이 바뀌면 화면 전환만 담당하도록 정리했습니다.
- 이 변경으로 입력 처리와 화면 전환 책임이 분리됐고, 상세 화면 진입 조건을 `Reactor` 기준으로 읽을 수 있게 됐습니다.

```swift
showLottoWinningInfoButton.rx.tapGesture()
    .when(.recognized)
    .map { _ in HomeViewReactor.Action.showWinningInfo(.lotto) }
    .bind(to: reactor.action)
    .disposed(by: disposeBag)

reactor.state
    .map { $0.isWinningInfoVisible }
    .distinctUntilChanged()
    .skip(1)
    .subscribe(onNext: { [weak self] _ in
        guard let self = self else { return }
        self.showLottoWinningInfoView(type: self.reactor.currentState.selectedLotteryType)
    })
    .disposed(by: disposeBag)
```

### 3. 결과 섹션 재조립 방식을 토글 방식으로 바꿨습니다

- `afa0a36`에서는 복권 타입이 바뀔 때마다 결과 뷰를 지우고 새로 붙이던 방식 대신, 로또/연금복권/스피또 뷰를 미리 올려두고 `isHidden`과 `isIncludedInLayout`만 바꾸는 구조로 정리했습니다.
- 이 방식은 레이아웃 재조립 코드를 단순하게 만들었고, 어떤 뷰가 현재 표시 대상인지도 더 분명하게 보여줬습니다.

### 4. 공통 UI와 카드별 구성을 분리했습니다

- `8525386`, `723f044`, `4000151`, `e204794`를 거치면서 `HomeView` 안에 있던 badge, footer, 강조 라벨, 번호 볼 생성 코드를 분리했습니다.
- 공통 블록은 `HomeResultViewFactory`로 이동했고, 로또/연금복권 카드 조립은 각각 `HomeLottoResultComponentsBuilder`, `HomePensionResultComponentsBuilder`로 옮겼습니다.
- 한 번에 전부 쪼개기보다, 공통 helper를 먼저 추출하고 복권 종류별 컴포넌트를 나중에 나누는 순서로 진행했습니다.

```swift
let components = HomeLottoResultComponentsBuilder.build(
    result: result,
    owner: self,
    winningInfoButton: showLottoWinningInfoButton
)

thisWeekLottoResultView.flex.direction(.column).define { flex in
    flex.addItem(components.mainContainer).direction(.column).define { flex in
        flex.addItem(components.resultRoundBadge)
        flex.addItem(components.prizeMoneyLabel)
        flex.addItem(components.prizeMoneyPerWinnerInfoLabel)
        flex.addItem(components.winningNumberBalls)
    }

    flex.addItem(components.winningInfoFooter)
}
```

### 5. 스피또는 mock 기준으로 회차 흐름을 먼저 복구했습니다

- 마지막 커밋 `7e31be2e`에서는 주석 처리돼 있던 스피또 탭과 좌우 회차 이동 액션을 다시 연결했습니다.
- `HomeViewReactor`에 `HomeSpeetoMockResult.sampleData`를 추가하고, 이전/다음 회차 이동과 현재 결과 반영이 이 mock 데이터로 동작하도록 만들었습니다.
- `HomeView`도 더 이상 고정 문구를 직접 그리지 않고, `speetoRoundResult` 상태를 받아 `HomeSpeetoResultComponentsBuilder`로 렌더링하도록 바뀌었습니다.

### 6. 한 번에 크게 바꾸지 않고 단계적으로 분리했습니다

- 처음부터 `HomeView` 전체를 여러 파일로 한 번에 나누는 방법도 가능했지만 그렇게 하면 diff가 너무 커지고 회귀 지점을 확인하기 어려웠습니다.
- 그래서 실제 커밋 흐름도 `상태 계산 수정 -> 진입 흐름 정리 -> 토글 방식 변경 -> 공통 UI 추출 -> 복권별 컴포넌트 분리 -> 스피또 복구` 순서로 잘게 나눴습니다.
- 결과적으로 각 단계가 무엇을 바꿨는지 읽기 쉬운 기록이 남았고, 중간에 문제가 생겨도 되돌릴 단위가 명확했습니다.

## 변경 후 구조

```text
Home/
  HomeView.swift
  HomeViewController.swift
  HomeViewReactor.swift
  SubViews/
    HomeResultViewFactory.swift
    HomeLottoResultComponents.swift
    HomePensionResultComponents.swift
    HomeSpeetoResultComponents.swift
```

- `HomeView`는 버튼 입력 바인딩과 화면 배치 갱신에 집중합니다.
- `HomeViewController`는 상세 화면 표시 같은 화면 전환을 담당합니다.
- `HomeViewReactor`는 선택된 복권 타입, 회차 상태, 스피또 mock 결과를 관리합니다.
- `SubViews` 아래 파일들은 카드별 UI 구성 요소를 조립하는 역할을 맡습니다.

## 결과

- `HomeView`가 직접 상세 화면을 띄우던 흐름이 사라져, 상태 기반으로 읽히는 구조가 됐습니다.
- 결과 카드 3종에서 반복되던 UI 블록이 공통화되어 카드별 차이점만 남기기 쉬워졌습니다.
- 스피또도 로또/연금복권과 비슷한 회차 이동 흐름을 가지게 되어 이후 실제 API 연동으로 확장하기 쉬운 상태가 됐습니다.
- 테스트 측면에서는 `HomeViewReactorTests`가 추가되어 회차 상태와 토글 상태를 리팩토링 중에도 검증할 수 있게 됐습니다.
- 성능을 별도로 측정한 작업은 아니지만, 유지보수성과 변경 안정성은 분명히 좋아졌다고 느꼈습니다.

## 배운 점

- UI를 나누기 전에 상태 계산을 먼저 테스트로 고정하는 편이 리팩토링 안정성에 도움이 됐습니다.
- 공통화는 처음부터 추상화하려 하기보다, 실제로 반복되는 블록이 보인 뒤에 분리하는 편이 더 자연스러웠습니다.
- 아직 실제 API가 없더라도, 스피또처럼 상태 구조를 먼저 맞춰두면 이후 연동 작업의 비용을 줄일 수 있습니다.

## 마무리

- 이번 범위의 핵심은 `HomeView`를 더 작게 만드는 것보다, 상태와 UI 책임이 어디에 있어야 하는지 다시 정리한 데 있었습니다.
