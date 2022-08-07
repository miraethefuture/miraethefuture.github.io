---
title: Compose custom layouts with SwiftUI / SwiftUI / 커스텀 레이아웃 만들기 (출처 - wwdc2022)
author: Mirae
date: 2022-08-07
category: TIL
layout: post
<!--cover: /assets/images/team.gif-->
---


[Compose custom layouts with SwiftUI](https://developer.apple.com/videos/play/wwdc2022/10056/)

> 이 글의 모든 정보의 출처는 위 링크의 wwdc2022 영상입니다.
{: .block-tip } 
  
  SwiftUI는 앱의 인터페이스를 구성할 때 사용할 수 있는 여러가지 빌딩 블락을 제공합니다.  
  
  텍스트, 이미지, 그래픽스 등의 빌트인 뷰를 조립하여 커스텀 뷰를 만들 수 있습니다. 이 요소들을 섬세하게 그룹핑하기 위해서 SwiftUI는 레이아웃 툴을 제공합니다. 
  
  투표를 하는 앱을 만들어 봅니다. 대부분의 사용자 인터페이스를 SwiftUI를 사용하여 구성해 봅니다. 미리보기를 사용하면 프로토 타입을 만들기가 쉽기 때문이죠.  
  
> #####  Leader board
> 경쟁자들의 점수와 이름을 보여주는 점수표
>
{: .block-tip } 


  <center><img src="/assets/images/sceneKit2.png" alt="sceneKit2.png" width="700"></center><br>
