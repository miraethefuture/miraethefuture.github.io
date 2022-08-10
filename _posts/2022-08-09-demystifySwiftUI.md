---
title: Demystify SwiftUI / WWDC21
author: Mirae
date: 2022-07-30
category: TIL
layout: post
<!--cover: /assets/images/team.gif-->
---

[Demystify SwiftUI](https://developer.apple.com/videos/play/wwdc2021/10022/)  
> 이 글의 모든 정보의 출처는 위 링크의 WWDC21 영상입니다.
{: .block-tip } 

 디미스티파이가  뭔지 먼저 검색해봅니다. 사전에는 to make a subject that seems difficult or complicated easier to understand, especially by explaining it in simpler language. 라고 나와 있습니다. 어렵거나 복잡해보이는 주제를 쉬운 언어를 사용하여 이해하기 쉽도록 만드는 것이라고 하는데요. Demystify SwiftUI! 라고하니...  
 어렵고, 복잡해보이는 SwiftUI를 쉽게 이해해보자는 것 같습니다.  
 
  
# Declarative UI 
  
SwiftUI가 선언형 UI 라는 말을 들어보셨을 겁니다. 원하는 UI를 하이레벨 언어로 묘사하면 SwiftUI가 어떻게 그것을 이루어낼건지 결정합니다. 대부분 이것은 잘 작동합니다. 하지만 가끔은 의도하지 않은 방식으로 작동할 떄가 있죠. 그리고 바로 그때,  SwiftUI가 보이지 않는 곳에서, 우리가 원하는 결과를 얻기 위해 무엇을 하고 있는지 이해하는 것이 도움이 될 것입니다. 

## SwiftUI가 우리의 코드를 볼 때, 뭐가 보일까? 
  - Identity : 아이덴티티는 SwiftUI가 요소를 구별하는 방법입니다. 같은가? 다른가? 
  - Lifetime : 라이프타임은 SwiftUI가 시간에 지남에 따라 달라지는 뷰와 데이터의 존재유무를 추적하는 방법입니다.
  - Dependencies : SwiftUI가 언제 우리의 인터페이스가 업데이트 되야하는지, 그리고 왜 업데이트 되야하는지 이해하는 방법입니다.  
  
  이 세 가지를 통해 SwiftUI는 뭐가, 언제, 어떻게 바뀌어야 하는지를 알 수 있습니다. 결과적으로 우리는 화면에서 동적인 사용자 인터페이스의 형태로 이것을 확인 할 수 있죠.  
    
  이 세 가지에 대해 좀 더 깊이 알아봅시다. 
  
### Identity
  먼저 아이덴티티에 대해 알아봅니다. 아래 캡처한 이미지에는 두개의 강아지 발바닥 뷰가 있습니다. 저 두 뷰는 색과 위치만 다른 같은 뷰일까요? 아니면 아예 다른 뷰일까요? 이 두 차이는 중요합니다. 왜냐하면, 이 차이로 인해  뷰가 어떤 한 상태에서 다른 상태로 바뀌는 방법이 바뀌기 떄문입니다. 
  
  <center><img src="/assets/images/DemystifySwift1.png" alt="DemystifySwift1" width="700"></center><br>
  
  두 아이콘이 다른 두개의 뷰라면 하나가 나타나고 사라지고, 또 다른 하나가 사라지고 나타나는 방식으로 뷰를 변경시킬 것입니다. 반대로 두 뷰가 같은 뷰라면, 슬라이딩과 같은 방식으로 뷰를 움직일 것입니다.  
<!--  따라서 서로 다른 상태에 걸쳐 뷰를 연결하는 것이 중요합니다. 왜냐하면 이것이 SwiftUI가 뷰 간에 전환하는 방법을 이해하는 방식이기 때문입니다.  -->
 
 #### View Identity  
   같은 아이덴티티를 공유하는 뷰들은 같은 컨셉의 UI 요소의 다른 상태를 보여줍니다.  
   위의 강아지 발바닥 아이콘을 예로 들면, 같은 컨셉의 아이콘이지만 색과 위치라는 상태가 다르게 나타나죠. 두 아이콘을 같은 뷰라고 가정하면 이 둘은 같은 아이덴티티를 가지고 있는 것이겠죠.
   반대로 두 아이콘이 다른 아이덴티티를 가졌다면 다른 두 뷰인 것입니다.  
   
   그렇다면 코드 속에서 아이덴티티가 어떻게 나타나는지 알아봅시다. 
   
   SwiftUI가 사용하는 두가지 방식을 집중적으로 알아봅시다.
   
#### Types of identity   
   1. Explicit identity : 이름과 같은 assigning name 또는 identifier
   2. Structural identity :  타입, 위치, 계층(view hierarchy)으로 구별
   
   Explicit identity의 예로는 포인터가 있습니다. AppKit과 UIKit은 포인터를 사용합니다.  SwiftUI는 포인터를 사용하지 않지만 포인터에 대해 알아보는 것이 SwiftUI가 어떤 방식으로, 그리고 왜 다른지 이해하는 것에 도움이 되기 때문에 잠깐 포인터에 대해 알아봅시다. 
   	
 
  <center><img src="/assets/images/DemystifySwift2.png" alt="DemystifySwift2" width="700"></center><br>
    
    UIView와 NSView는 클래스이기 때문에 각 뷰가 메모리의 할당에 대한 고유한 포인터를 가지고 있습니다. 포인터를 사용하여 각각의 뷰를 참조할 수 있고 만약 두 뷰가 같은 포인터를 공유한다면 그들이 동일한 뷰라는 것을 확신할 수 있습니다. 
    
    
  <center><img src="/assets/images/DemystifySwift2.png" alt="DemystifySwift2" width="700"></center><br>
  
  SwiftUI의 뷰는 value type이기 때문에 포인터를 사용하지 않습니다.
     
   
