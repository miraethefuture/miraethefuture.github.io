---
title: SwiftUI Tutorials
author: Mirae
date: 2024-04-09
category: TIL
layout: post
--- 
  
# 색 정의하기
> Define colors in the asset catalog

```swift
import SwiftUI

// global property
let gradientColors: [Color] = [
    .gradientTop,
    .gradientBottom
]

struct ContentView: View {
    //...
}
```
에셋 카탈로그에 'GradientTop', 'GradientBottom'라는 이름의 Color set을 추가했습니다.  
Xcode가 자동으로 카멜케이스 스타일의 컬러 밸류를 생성합니다. (.gradientTop, .gradientBottom)  
> 'Gradient_Top'이라는 이름도 .gradientTop으로 변환됩니다.
gradientColors 속성은 최상단 레벨에 작성되었고 이런 프로퍼티(=속성)을 글로벌 프로퍼티라고 합니다.  
글로벌 프로퍼티는 모든 파일, 모든 코드에서 사용할 수 있게 됩니다. 


#

Text 뷰는 읽기 전용 텍스트를 보여주는 뷰입니다. 텍스트 뷰는 타이틀과 같은 짧은 String, 또는 글의 내용과 같이 긴 String을 컨텐츠로 가질 수 있습니다.

