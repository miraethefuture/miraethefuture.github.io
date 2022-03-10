---
title: "Swift"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Swift
show_date: true
toc: true
toc_sticky: true
toc_label: "👷"
toc_icon: "cog"
---

### 💭 ..  
<div class="notice">
  <h4>Swift를 배워보자.</h4>
  <p> 아래 링크의 유튜브 튜토리얼을 보며 먼저 전체적으로 한번 훓어보려고 한다.<br>    
  그 과정에서 기록이 필요한 것들을 정리해본다.</p>
</div>


### 선택한 유투브 튜토리얼
[2021 SwiftUI Tutorial for Beginners (3.5 hour Masterclass)](https://www.youtube.com/watch?v=F2ojC6TNwws&t=1s)   
이런 양질의 자료를 무료로 볼 수 있다는 것에 감사하며 시작!

  {% highlight swift linenos %}

    import SwiftUI

      struct ContentView: View {
        var body: some View {

          Text("Hello!").padding()
          <!-- Text는 element padding은 modifier -->
        }
      }

  {% endhighlight %}
