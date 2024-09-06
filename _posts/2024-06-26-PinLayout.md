---
title: PinLayout
author: Mirae
date: 2024-06-26
category: TIL
layout: post
---

> 이 포스팅은 PinLayout & FlexLayout 사용하여 프로젝트를 진행하며 기억해두고 싶은 것을 적어두는 것에 목적을 두고 있습니다.

```swift
    override init() {
        // 뷰의 appearance를 정의
    }
    
    override func layoutSubviews() {
        // 이 안에서 layout을 설정해주어야 뷰에 나타남.
    }
```

```swift
addressField.pin.below(of: visible([ageSwitch, ageField])).horizontally().height(height).marginTop(margin).marginHorizontal(20)
```
  
  - visible을 사용하여 보이는 뷰의 아래에 뷰를 pin 할 수 있음. ageSwitch 버튼의 isOn 상태에 따라 ageField가 나타났다 사라졌다 하는데 ageField가 나타났을 때는 ageField 아래에 뷰가 나타나고, 사라졌을 때는 ageSwitch 밑에 뷰가 나타남.


```swift
override func layoutSubviews() {
    super.layoutSubviews()
    // top: safety area에 고정, 나머지는 스크린 끝쪽에 고정
    contentView.pin.top(pin.safeArea).bottom().left().right()
}
```
- top: safety area에 고정, 나머지는 스크린 끝쪽에 고정

```swift
flex.addItem().direction(.row).alignItems(.baseline).define { flex in
    flex.addItem(view1).marginRight(8)
    flex.addItem(view2)
}
```
- UILabel의 높이가 같은 컨테이너에 있을 경우 같게 나타나는 문제가 있어 아래와 같이 alignItems()를 추가해주어 각자의 높이가 정상적으로 나타나도록 함.
