---
title: 프로젝트 '로또메이트' - 리팩토링 기록
author: Mirae
date: 2024-09-22
category: TIL
layout: post
---
# Template

> ##### 이슈 정리 템플리
>
> 프로젝트 진행 중 리팩토링한 내용을 아래 템플릿에 따라 정리합니다.
{: .block-tip }

## 1. 리팩토링 이유 (Reason for Refactoring)
- 배경 설명: 코드 리팩토링이 필요했던 배경을 설명합니다. 새로운 기술을 학습하거나 프로젝트 요구 사항이 변경되어 리팩토링이 필요하게 된 이유를 적습니다.
<!--- 예: "프로젝트의 유지보수성을 높이기 위해 코드 구조를 개선할 필요가 있었습니다." -->

## 2. 기존 코드 문제점 (Issues in Existing Code)
- 기존 코드의 문제점: 리팩토링 이전에 코드에서 발생한 문제들을 나열합니다. 성능 문제, 가독성, 중복 코드 등 개선해야 할 부분을 구체적으로 설명합니다.
<!--- 예: "중복된 코드가 많아 가독성이 떨어졌고, 유지보수 시 어려움이 있었습니다." -->

## 3. 리팩토링 과정 (Refactoring Process)
- 수행한 작업: 리팩토링 중 어떤 작업을 수행했는지 단계별로 설명합니다. 코드 리팩토링 과정에서 변경한 주요 사항들을 포함합니다.
<!--- 예: "중복된 함수를 제거하고 공통 모듈로 추출하였습니다." -->

- 시도한 방법: 리팩토링을 진행하며 시도한 다양한 방법을 기록합니다. 성공하지 못한 접근 방식도 포함하여, 해결 과정에서의 고민을 보여줍니다.
<!--- 예: "처음에는 함수의 파라미터 수를 줄여서 문제를 해결하려 했지만, 전체 코드 구조에 맞지 않아 실패하였습니다." -->

## 4. 최종 코드 (Final Code)
- 최종 코드 설명: 리팩토링 후의 최종 코드를 설명합니다. 리팩토링 전후의 주요 차이점과 개선된 부분을 코드와 함께 보여줍니다.
<!--- 예: "기존의 반복된 코드를 하나의 함수로 통합하고, 재사용 가능한 모듈로 만들었습니다." -->
```swift
// 리팩토링 후의 최종 코드 예시
func updateUI() {
    updateLabelText()
    updateButtonState()
}
```

## 5. 결과 (Outcome)
- 성능 및 유지보수성 향상: 리팩토링 후 성능이나 유지보수성, 코드 가독성이 얼마나 개선되었는지 설명합니다.
<!--- 예: "리팩토링 후 코드의 가독성이 크게 향상되었으며, 유지보수가 용이해졌습니다." -->

## 6. 교훈 및 배운 점 (Lessons Learned)
- 리팩토링을 통해 배운 점: 리팩토링 과정에서 배운 점이나 새로 익힌 기술을 기록합니다. 비슷한 상황에서 적용할 수 있는 원칙이나 개선할 수 있는 부분을 정리합니다.
<!--- 예: "모듈화를 통해 코드의 재사용성을 높이는 것이 얼마나 중요한지 깨달았습니다." -->
  
  
------------

# [RxSwift] 중첩 구독

## 1. 리팩토링 이유
- 다른 개발자님께서 코드를 검토하던 중 중첩된 구독이 발생한 것을 알려주셨습니다. 코드의 가독성과 유지보수성을 높이기 위해 RxSwift의 권장 방식을 따르는 방향으로 리팩토링을 진행하게 되었습니다.

## 2. 기존 코드 문제점
```swift
confirmButton.rx.tapGesture()
    .when(.recognized)
    .subscribe(onNext: { [weak self] _ in
        guard let self = self else { return }
        let selectedRound = data[row].0
        
        viewModel.selectedLotteryType
            .subscribe(onNext: { [weak self] type in
                switch type {
                case .lotto:
                    self?.viewModel.fetchLottoResult(round: selectedRound)
                    self?.viewModel.currentLottoRound.accept(selectedRound)
                case .pensionLottery:
                    self?.viewModel.fetchPensionLotteryResult(round: selectedRound)
                    self?.viewModel.currentPensionLotteryRound.accept(selectedRound)
                case .speeto:
                    break
                }
            })
            .disposed(by: disposeBag)
        
        self.dismiss(animated: true, completion: nil)
    })
    .disposed(by: disposeBag)
```
- [여기](https://github.com/ReactiveX/RxSwift/blob/main/Documentation/Tips.md) 에서 확인할 수 있듯이 RxSwift에서는 operator를 사용하여 스트림을 조합하는 것이 권장되지만, 기존 코드는 이를 따르지 않고 중첩 구독하는 방식으로 작성되어 있었습니다.

## 3. 리팩토링 과정 (Refactoring Process)
- 중첩된 subscribe 제거: withLatestFrom 연산자를 사용하여 confirm 버튼을 탭하는 시점에 최신 lottery type을 가져오도록 하여 viewModel.selectedLotteryType의 subscribe를 제거하였습니다. 

## 4. 최종 코드 (Final Code)

```swift
confirmButton.rx.tapGesture()
    .when(.recognized)
    .withLatestFrom(viewModel.selectedLotteryType) // tap 시점에 최신 로터리 타입을 가져옴
    .subscribe(onNext: { [weak self] type in
        guard let self = self else { return }
        let selectedRound = data[row].0
        
        switch type {
        case .lotto:
            self.viewModel.fetchLottoResult(round: selectedRound)
            self.viewModel.currentLottoRound.accept(selectedRound)
        case .pensionLottery:
            self.viewModel.fetchPensionLotteryResult(round: selectedRound)
            self.viewModel.currentPensionLotteryRound.accept(selectedRound)
        case .speeto:
            break
        }

        self.dismiss(animated: true, completion: nil)
    })
    .disposed(by: disposeBag)
```
- 리팩토링 후의 최종 코드는 중첩된 구독을 제거하고, withLatestFrom 연산자를 사용하여 구독을 단순화했습니다. 이로 인해 코드의 가독성과 유지보수성이 크게 향상되었습니다.  

## 6. 교훈 및 배운 점
- 리팩토링 과정에서 RxSwift의 operator 사용의 중요성을 깨달았습니다. 스트림을 조합하는 방식이 코드의 가독성과 유지보수성을 높이는 데 얼마나 효과적인지를 실감했으며, 앞으로도 이러한 원칙을 적용해 더 나은 코드를 작성할 수 있도록 할 것입니다.




