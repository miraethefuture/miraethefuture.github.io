---
title: PinLayout & FlexLayout
author: Mirae
date: 2024-06-26
category: TIL
layout: post
---

> 이 포스팅은 PinLayout & FlexLayout 사용하여 프로젝트를 진행하며 기억해두고 싶은 것을 적어두는 것에 목적을 두고 있습니다.

🍊
```swift
    override init() {
        // 뷰의 appearance를 정의
    }
    
    override func layoutSubviews() {
        // 이 안에서 layout을 설정해주어야 뷰에 나타남.
    }
```

🍊
```swift
addressField.pin.below(of: visible([ageSwitch, ageField])).horizontally().height(height).marginTop(margin).marginHorizontal(20)
```
  
  - visible을 사용하여 보이는 뷰의 아래에 뷰를 pin 할 수 있음. ageSwitch 버튼의 isOn 상태에 따라 ageField가 나타났다 사라졌다 하는데 ageField가 나타났을 때는 ageField 아래에 뷰가 나타나고, 사라졌을 때는 ageSwitch 밑에 뷰가 나타남.

🍊
```swift
override func layoutSubviews() {
    super.layoutSubviews()
    // top: safety area에 고정, 나머지는 스크린 끝쪽에 고정
    contentView.pin.top(pin.safeArea).bottom().left().right()
}
```
- top: safety area에 고정, 나머지는 스크린 끝쪽에 고정

🍊
```swift
flex.addItem().direction(.row).alignItems(.baseline).define { flex in
    flex.addItem(view1).marginRight(8)
    flex.addItem(view2)
}
```
- UILabel의 높이가 같은 컨테이너에 있을 경우 같게 나타나는 문제가 있어 아래와 같이 alignItems()를 추가해주어 각자의 높이가 정상적으로 나타나도록 함.
  
🍊 Simulator에서 layout이 정상적으로 보이지 않는 문제
- Scroll view를 사용하는 뷰가 프리뷰에서는 정상적으로 보이나 시뮬레이터에서는 정상적으로 보이지 않음.
- 코드 a와 b의 순서가 다른 것이 문제였음. scroll view를 pin하는 코드를 먼저 작성해주었더니 정상적으로 나타남. 
```swift
override func layoutSubviews() {
    super.layoutSubviews()
    scrollView.pin.top().bottom().left().right() // scroll view를 pin하는 코드 a
    rootFlexContainer.pin.top().left().right() // rootFlexContainer를 pin하는 코드 b
    rootFlexContainer.flex.layout(mode: .adjustHeight)
    scrollView.contentSize = rootFlexContainer.frame.size
}
```

