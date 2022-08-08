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

# Leaderboard

  <center><img src="/assets/images/cclws1.png" alt="cclws1.png" width="500"></center><br>
  
  위 사진에서 파란색 박스 부분이 리더보드입니다. 투표할 세개의 옵션이 각 행의 형태인 2차원 그리드로 표현되어 있습니다. 컬럼들은 이름, 퍼센티지, 투표수를 나타냅니다.  
  
  SwiftUI에는 lazy grid가 있습니다. 이것은 스크롤링 해야할 때 사용하기 좋습니다. 이 컨테이너는 많은 뷰가 있을 때 사용하기 좋습니다. 왜냐면, 이것은 현재 보이는 뷰, 또는 보이기 시작한 뷰만을 로딩하기 때문입니다.  
 
  Lazy grid는 셀의  폭과 높이 둘 중에 하나만 자동으로 설정할 수 있습니다. 
  이 튜토리얼에서는 폭과 너비 둘 다 컨테이너가 자동으로 알아내고, 설정하도록 할 것이기 때문에 Grid를 사용할 것입니다.  Lazy grid와는 다르게, Grid는 모든 뷰를 한번에 보여줍니다. 그렇기 때문에 자동으로 사이즈를 정하고, 셀을 정렬할 수 있습니다.  
