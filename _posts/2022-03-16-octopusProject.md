---
title: "웹 페이지를 만들며 HTML과 CSS에 대해 알아보기"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - HTML
  - CSS
show_date: true
toc: true
toc_sticky: true
toc_label: "👷"
toc_icon: "cog"
---


<div class="notice">
  <h4>Octopus Project</h4>
  <p>팀 프로젝트가 끝나고 바로 개인 프로젝트가 하나 있습니다.
  7일정도 HTML과 CSS를 배우는데, 배운 것으로 웹 페이지를 만드는 것입니다.
  자바 스크립트는 할 수도 안할 수도 있다는데 시간이 되면 자바 스크립트도 이용해서 페이지를 만들어보면 좋을 것 같습니다.<br>
  단축키를 모아 놓은 웹 페이지를 만들어 보려고 합니다. (제가 자주 쓰는 프로그램들의 단축키를 모아모아)<br>
  유투브에서 맘에 드는 강의를 찾아 따라해보고 코드를 분석해봅니다.</p>
</div>

<img src="/assets/images/octo.png" alt="octopus">


[Easy Tutorials: How To Make A Website Using HTML And CSS / Website Design In HTML And CSS](https://www.youtube.com/watch?v=-2LtZRi6Q0s)  

## 1. What I Learned From This Project:     

- <code>link</code> HTML element
- linear-flex를 이용해서 목록을 옆으로 나열하기

## 2. link HTML element    

```html
<link rel="stylesheet" href="style.css">
```

\<link> element는 외부 리소스와 현재 작업중인 document의 관계를 지정해줍니다. 주로 stylesheeys와 연결할 때 많이 사용됩니다. 또한 아이콘을 설정해줄때도 사용됩니다. 저도 블로그 타이틀에 파비콘을 추가했을 때 \<link> 를 사용했던 기억이 납니다.

<img src="/assets/images/myFavicon.png" alt="my_favicon" width="400">  
(아이폰 이모지를 이용한 제 블로그의 파비콘. 노션의 파비콘은 노션의 이미지와 잘 어울려요!)

위 코드에서는 외부에 작성된 stylesheet와 현재 html파일의 관계를 \<link> 로 연결해줍니다.
이제 stylesheet에서 CSS를 이용해 현 document의 태그들의 속성을 수정할 수 있게 되었습니다.

```html
<p style="color: blue">
  The style attribute can override it, though.</p>
```
처럼 html 속성도 사용할 수 있습니다. 이 경우 html의 속성이 CSS style sheet에서 적용된 속성보다 우선 순위에 있습니다.    
- \<link> element는 \<head> 부분에 작성되어야 합니다.  


<code>rel</code> attribute는 relationship을 의미합니다. \<link> element의 가장 중요한 기능 중 하나입니다.  
rel에 지정된 값은 연결된 외부 리소스와 현 document가 어떤 관계를 가지고 있는지 나타내줍니다. 이것들을 Link types라고 합니다.
stylesheet, icon, tag 등 여러가지 관계들이 있습니다. link types는 두 문서들간의 관계를 나타내는 역할을 합니다.
