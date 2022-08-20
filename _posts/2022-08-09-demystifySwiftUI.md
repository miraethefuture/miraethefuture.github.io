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
    
  <center><img src="/assets/images/DemystifySwift3.png" alt="DemystifySwift3" width="700"></center><br>
  
  SwiftUI의 뷰는 일반적으로 class가 아닌 struct로 표현되는 value type이기 때문에 포인터를 사용하지 않습니다. 포인터를 사용하지 않는다는 것은 뷰의 영구적인 아이덴티티로 사용할 표준 참조 기준이 없다는 것이죠. 
  SwiftUI는 포인터가 대신 다른 형태의 explicit 아이덴티티를 사용합니다.  
  
  
  SwiftUI가 왜 Value type을 사용하는지는 wwdc19 SwiftUI essentials에 자세한 설명이 있다고 하여 그 영상의 내용을 정리해봅니다. 
 
  
#### SwiftUI Essentials (wwdc19)
  
  <center><img src="/assets/images/DemystifySwift5.png" alt="DemystifySwift5" width="700"></center><br>
    
  뷰는 사용자 인터페이스의 기본적인 빌딩 블럭입니다. 고레벨에서 뷰는 UI의 한 부분을 정의하는 어떤 것입니다. 
    
  <center><img src="/assets/images/DemystifySwift6.png" alt="DemystifySwift6" width="700"></center><br>
    
  위 캡처에 보이는 앱 화면의 모든 것들이 뷰로 선언됩니다. 
  - Order 버튼과 같은 individual control은 뷰입니다. 이것들을 담고 있는 컨테이너도 뷰입니다. 
   <!--  infect every single pixel you can see on screen can be traced back in some way to a view 먼말이야? -->
   
  <center><img src="/assets/images/DemystifySwift7.png" alt="DemystifySwift7" width="500"></center><br>   
       
  이 뷰들을 계층 형식으로 결합하여 사용자 인터페이스를 구성합니다. 
  Vertical Stack은 Container로 root 에 위치하고 text, shape, image 등의 뷰들은 bottom 부분입니다.
     
  뷰가 코드 안에서 표현되는 방식이 우리가 익숙한 방식과는 좀 다를 수 있습니다. 
  코드를 보겠습니다.
     
  <center><img src="/assets/images/DemystifySwift8.png" alt="DemystifySwift8" width="500"></center><br>
  
  샘플 앱은 Text와 Controls를 포함한 VStack으로 작성되어 있습니다. 코드를 읽으면서 바로 이해가 되도록 잘 보이게 쓰여져 있죠. 그리고 위에 있던 뷰 계층 다이어그램과도 비슷합니다. 
  add subviews와 같은 function을 호출하는 부분은 없는데요. 뷰 계층을 하나하나 쌓는게 아니라 완전하게 구성된 스트럭쳐로써 초기화하기 때문입니다.  
  SwiftUI는 뷰를 명령형이 아닌 선언적으로 정의하기 때문입니다.
  
  Imperative code(명령형의 코드)는 직접적으로 명령들을 보내 결과를 생성해 냅니다. 이 과정은 마치 친구에게 전화로 아보카도 토스트를 만드는 방법을 설명하는 것과 비슷합니다.  어떤 재료가 필요한지, 어떤 조리 기구가 필요한지, 빵을 굽는 방법과 아보카도를 자르는 방법을 설명해야 하죠. 그리고 이 아보카도 토스트를 만든는 것을 지시하는 과정은 좀 길고 지루할 것입니다. 
  그리고 만약 당신의 친구가 빵을 굽는 것을 깜빡하는 것과 같은 실수를 한다면 아보카도 토스트는 제대로 완성되지 않을 것입니다. 
  
  이제 declaratively(선언적)한 방법으로 아보카도 토스트를 만들어 보겠습니다.  
  Declarative code(선언적 코드)는 우리가 원하는 것을 묘사하고 그것을 어떻게 만들지 알아내는 것은 다른 누군가에게 맡깁니다. 아보카도 전문가에게 아보카도 토스트를 주문하는 것과 비슷하죠. 
  
  우리의 코드로 돌아가서 SwiftUI는 우리를 도울 준비가 되어있는 전문가 역할을 합니다. 
  코드의 형태에서 우리는 관계들을 코드화하는 structure를 이니셜라이징 함으로써 뷰들 사이의 계층 관계를 선업합니다. 
  
  > structure를 initializing 한 다는게 갑자기 헷갈려서 검색!
  > Initialization은 사용하기 위해  class, structure, enumeration의 인스턴스를 준비하는 과정
  > 그러니까 위에서는 뷰 계층을 구성하는데 사용되는 structure의 인스턴스를 준비한다는 것
{: .block-tip } 
  
  우리가 위와 같은 코드를 작성하면, SwiftUI는 그 코드를 화면에 렌더링 된 결과물로 변환하는 어려운 작업을 해줍니다. 

##### Container views
  컨테이너 뷰는 각자의 내용을 가지고 있는 다른 뷰들의 조합으로 이루어집니다. 이 컨텐트 뷰는 view builder라는 특별한 종류의 클로저안에서 선언됩니다. 
  예를 들어, 앞의 예시 코드에서 봤던 VStack은 컨테이너의 한 예입니다. 뷰 빌더는 클로저의 바디 부분에 우리가 선언형의 코드를 작성할 수 있도록 합니다. AddSubview와 같은 함수를 호출하는 대신 우리는 그냥 이 클로저 안에 우리의 컨텐츠를 쭉 작성해 내려갑니다. 
  이것이 어떻게 작동하는지 좀 더 알아보기 위해 VStack의 실제 API를 들여다 봅시다. 
    
  <center><img src="/assets/images/DemystifySwift9.png" alt="DemystifySwift9" width="700"></center><br>
  
  클로저로 정의된 컨텐트 패러미터를 볼 수 있습니다. ViewBuilder 어트리뷰트로 표시되어 있죠. 
  Swift의 컴파일러는 이 어트리뷰트로 표시된 클로저를 스택안에 있는 모든 컨텐츠를 보여주는 싱글뷰를 반환하는 새 클로저로 변환합니다.
  
  이런식으로 SwifUI는 Swift의 기능을 사용하여 우리가 더 적은 양의 코드를 작성할 수 있도록 돕습니다. 
  
  VStack과 비슷한 뷰들은 content 패러미터 뿐 아니라 다른 패러미터도 가지고 있습니다. 
  
  
     
    
    
    

<!--  <center><img src="/assets/images/DemystifySwift4.png" alt="DemystifySwift4" width="700"></center><br>  -->
<!--  -->
<!--  구조견의 목록을 표현한 리스트를 봅시다. -->
  
   
     
   
