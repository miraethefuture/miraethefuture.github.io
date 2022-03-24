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
toc_label: "👷"
toc_icon: "code"
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
  <script> 태그 안에 자바 스크립트 function을 작성해줍니다.  
  저는 로그인하는 팝업창을 띄우는 것이라 function의 이름을 login_window라고 하였습니다. (url, title, w, h)와 같이 네 개의 패러미터를 작성해줍니다. 이때는 패러미터의 이름이라 아무 이름이나 적어줍니다.

### left, top 변수  

    두 개의 변수를 만들어 줍니다. 각각의 변수에는 (전체 스크린 한 면의 길이 - 내 팝업창 한 면의 길이) / 2 값이 할당됩니다. 그 값이 내 팝업창의 왼쪽면의 위치, 윗쪽면의 위치가 됩니다.

### window.open() 메서드  

    window.open() 메서드에 패러미터를 작성해줍니다. 이때는 function에서 적어주었던 패러미터를 이용합니다.
    ```html
    window.open(url, title, resizable=yes, width= w, height= h, top= top, left= left);
    ```
    보기 편하게 작성해 본 패러미터입니다. url, title은 똑같이 작성해주고 resizable은 yes, width에는 function의 패러미터를 통과해서 들어온 w를 사용, height에는 h를 사용합니다. 변수의 이름과 문자열을 함께
