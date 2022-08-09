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
  
  <center><img src="/assets/images/DemystifySwift1.png" alt="DemystifySwift1" width="700"></center><br>
