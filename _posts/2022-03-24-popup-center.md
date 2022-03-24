---
title: "JavaScript: 팝업창 가운데에 띄우기"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - HTML
  - CSS
  - JavaScript
show_date: true
toc: true
toc_sticky: true
toc_label: "📂"
toc_icon: "code"
header:
  teaser: /assets/images/main_octopi.png
---

아무런 설정을 하지 않고 window.open() 메서드를 사용해서 팝업창을 띄웠더니 화면 맨 왼쪽 위에 팝업창이 나타납니다. 이 팝업창을 가운데로 옮겨보았습니다.

[도움을 받은 글: How to center a popup window on screen?](https://www.geeksforgeeks.org/how-to-center-a-popup-window-on-screen/)

## 1. <head>태그 안에 JS function 작성하기

  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <title>Title of the document</title>
    <script type="text/javascript">
            function login_window(url, title, w, h) {
                var left = (screen.width - w) / 2;
                var top = (screen.height - h) / 2;
                var myWindow = window.open(url, title, 'resizable=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
            }
    </script>
  </head>
  ```
  script 태그 안에 자바 스크립트 function을 작성해 줍니다.
  저는 로그인하는 팝업창을 띄우는 것이라 function의 이름을 login_window라고 하였습니다. url, title, w, h와 같이 네 개의 파라미터를 작성해 줍니다. 이때는 파라미터의 이름이라 아무 이름이나 적어줍니다.

### left, top 변수  

  두 개의 변수를 만들어 줍니다. 각각의 변수에는 (전체 스크린 한 면의 길이 - 내 팝업창 한 면의 길이) / 2 값이 할당됩니다. 그 값이 내 팝업창의 왼쪽 면의 위치, 위쪽 면의 위치가 됩니다.

### window.open() 메서드  

  window.open() 메서드에 파라미터를 작성해 줍니다. 이때는 function에서 적어주었던 파라미터를 이용합니다. url, title은 똑같이 작성해 주고 resizable은 yes, width에는 function의 파라미터를 통과해서 들어온 w를 사용, height에는 h를 사용합니다. left와 top 변수도 사용합니다.


## 2. body 태그 부분 작성

  ```html
  <body>
    <ul>  
      <li class="signin-btn" onclick="login_window('signin.html', 'Sign in to Otopi', '380', '500')"><span>Sign in</span></li>
    </ul>
  </body>
  ```
  body 부분에 function을 사용할 곳에 function 이름과 파라미터를 사용하여 작성해 줍니다. 제가 만든 웹 페이지에서는 Sign in이라는 리스트를 클릭하면 팝업창이 생성됩니다. 클릭 시 function login_window가 실행됩니다. 파라미터를 통해 팝업창의 url, title, w, h의 크기를 전달합니다. 크기를 작성할 때 px을 적지 않도록 주의해 줍니다.

## 3. 가운데 정렬된 모습

<img src="/assets/images/main_octopi.png" alt="main">
