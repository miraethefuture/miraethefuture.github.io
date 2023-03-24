---
title: Stanford Lectures 
author: Mirae
date: 2023-02-20
category: TIL
layout: post
---

[Stanford - Developing iOS 11 Apps with Swift](https://www.youtube.com/watch?v=TZL5AmwuwlA&list=PL3d_SFOiG7_8ofjyKzX6Nl1wZehbdiZC_)  
> 강의 내용 중 필요한 것 정리.
  
  

# Developing iOS 11 Apps with Swift 1 
## 1. Introduction to iOS 11, Xcode 9 and Swift 4
> [🔗](https://youtu.be/TZL5AmwuwlA)
  
  
<b>the underscore operator (\_)</b>  
함수의 internal / external names 부분에서 아래와 같이 언더바 '_' 가 사용되는 경우는 argument가 없을 때 인데, 대부분 사용할 일이 없음. (항상 아규먼트 이름을 사용하는 것을 권장하기 때문에) 아래의 touchCard 함수는 Objective-C 부터 사용하던 함수이고, Objective-C는 internal/external name 개념이 없기 때문에 언더바가 사용됨.
```swift
@IBAction func touchCard(_ sender: UIButton) {
}
```
--------------------
  
<b>didSet</b>  
  
카드를 뒤집어서 같은 두 개의 그림을 찾아 짝을 맞추는 게임앱. 
카드를 뒤집을 때마다 아래와 같이 flipCount라는 변수에 1을 더함.
```swift 
var flipCount = 0
```

```swift
flipCount += 1 
```
flipCountLabel 이라는 UILabel 타입의 변수가 있음.
flipCount의 값이 변할때마다 flipCountLabel의 값도 변경되어야 함. 

```swift
flipCountLabel.text = "Flips: \(flipCount)"
```
위의 코드를 변경되어야 하는 부분마다 반복적으로 입력한다면 같은 내용의 코드를 반복해서 여러번 작성하게 됨.
좀 더 효과적으로 코드를 작성하기 위하여 didSet을 사용할 수 있음 

```swift 
var flipCount = 0 {
    didSet {
      flipCountLabel.text = "Flip s: \(flipCount)"  
    }
}
```
didSet은 property obeserver인데 flipCount라는 프로퍼티의 값을 관찰하고 있다가
그것이 변경될 때마다 disSet 안의 코드를 실행함. 
 

  
## 2. MVC

> [🔗](https://youtu.be/gI3pz7eFgfo)  
  
<b>API</b>  
  
class를 만들 때 public API에 대해 생각해보기.  
API는 클래스에 속한 메서드, instance variables의 리스트.
public API는 다른 클래스들이 호출할 수 있도록 허용된 메서드, instance variables.
  
앱이 동작하는 방식에 있어 가장 기본적이고 중요한 정보가 무엇인지 알아야,  
사람들이 이 앱을 어떻게 사용할지 알아야 클래스의 메서드와 instance variables를 작성할 수 있기 때문에  
클래스를 작성하기 전에 API에 대해 생각해 보는 것을 추천


