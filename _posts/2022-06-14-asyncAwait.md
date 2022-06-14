---
title: "async/await in Swift"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Swift
show_date: true
toc: true
toc_sticky: true
toc_label: " "
toc_icon: "kiwi-bird"
#header:
#  teaser: /assets/images/scrum5.png
---


UIKit은 UIImage로부터 썸네일을 만드는 기능을 제공합니다. 아래의 코드를 보면 알 수 있듯이 동기 함수와 비동기 함수 

```swift
// UIImage

// synchronous function (동기)
func preparingThumbnail(of size: CGSize) -> UIImage?

// asynchronous function (비동기)
func prepareThumbnail(of size: CGSize, completionHandler: @escaping (UIImage?) -> Void)
```
