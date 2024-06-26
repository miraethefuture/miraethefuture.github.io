---
title: PinLayout
author: Mirae
date: 2024-06-26
category: TIL
layout: post
---

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
