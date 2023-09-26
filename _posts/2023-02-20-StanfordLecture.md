---
title: Stanford CS 193P 
author: Mirae
date: 2023-02-20
category: TIL
layout: post
---

[Youtube 🔗](https://www.youtube.com/watch?v=TZL5AmwuwlA&list=PL3d_SFOiG7_8ofjyKzX6Nl1wZehbdiZC_)  
> 강의 내용 중 필요한 것 정리
  
  

# Developing iOS 11 Apps with Swift 
## 1. Introduction to iOS 11, Xcode 9 and Swift 4
  
  
📌 the underscore operator 
```swift
@IBAction func touchCard(_ sender: UIButton) {
}
```

위 함수의 external name은 '\_'이고, internal name은 sender.  
external / internal names 둘 다 사용하는 것을 권장하는데, 아래의 touchCard 함수는 internal / external names 개념이 없는 Objective-C 부터 사용된 함수이기 때문에 때문에 external name으로 '\_'가 사용됨.

<br><br>

📌 버튼 스타일이 default 상태여야 currentTitle을 통해 버튼의 타이틀 값을 가져올 수 있음. 
```swift
import UIKit

class ViewController: UIViewController {

    
    @IBAction func touchCard(_ sender: UIButton) {
        flipCard(withEmoji: "👻", on: sender)
    }
    
    func flipCard(withEmoji emoji: String, on button: UIButton) {
        // 카드 확인 -> already ghost -> flip it over
        // 카드 확인 -> not ghost -> 하얀 배경 / 이모지로 변경 (flip)
        // button style을 default로 변경해야 currentTitle을 통해 값을 받아올 수 있음
        
        if let title = button.currentTitle {
            
            if title == emoji {
                
                button.setTitle("", for: .normal) // 로 설정된 값은 currentTitle로 가져올 수 있음
                button.backgroundColor = .orange
                
            } else {
                // title = "" 인지 확인되면 else if 로 변경
                
                button.setTitle(emoji, for: .normal)
                button.backgroundColor = .white
                
            }
        }
    }
}
```

<br><br>
   
📌 didSet 
  
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


📌 swift에서는 instance variables를 property라고 함  
📌 코드를 작성 중 복사/붙여넣기를 하고 있다면 뭔가 잘못된 것!

  
## 2. MVC

> [🔗](https://youtu.be/gI3pz7eFgfo)  

<b>Model</b>
- 뷰(화면에 보여지는 부분)과 완전히 독립적인 객체의 모임 (뷰와 전혀 관계 없음)
- 앱이 어떤 일을 하는지와 관련된 로직을 담고 있음 
- 지금 만들고 있는 앱에서는 카드 뒤집기 게임의 진행 방식을 Model이 가지고 있음

<b>Controller</b>
- Model이 '어떤 방식으로 사용자에게 보여질 것인지'에 대한 로직을 담음 (UI logic)

<b>View</b>
- Controller의 미니언
- Button, Text 등의 제네릭 뷰를 사용하여 Controller가 시키는 대로 화면을 그림 
  
<b>API</b>  
  
모델 class를 만들 때 public API에 대해 생각해보기.  
API는 클래스에 속한 메서드, instance variables의 리스트.
public API는 다른 클래스들이 호출할 수 있도록 허용된 메서드, instance variables.
  
앱이 동작하는 방식에 있어 가장 기본적이고 중요한 정보가 무엇인지,  
사람들이 이 앱을 어떻게 사용할지 알아야 클래스의 메서드와 instance variables를 작성할 수 있기 때문에  
클래스를 작성하기 전에 API에 대해 생각해 보는 것을 추천.

<br><br>

📌 static...  
static var / static func 처럼 static 키워드를 사용하여 타입 레벨의 프로퍼티를 생성할 수 있음.  
아래 Card 타입 스트럭쳐가 인스턴스화되지 않더라도 Card.getUniqueIdentifier() 처럼 함수를 사용할 수 있고, static이 붙은 변수는 static 함수 안에서 자유롭게 사용할 수 있음. 

```swift
struct Card {
    var isFaceUp = false
    var isMatched = false
    var identifier: Int
    
    static var identifierFactory = 0
    
    static func getUniqueIdentifier() -> Int {
        identifierFactory += 1
        return identifierFactory
    }
    
    init() {
        self.identifier = Card.getUniqueIdentifier()
    }
}
```


