---
title: "[20220113] Java Container/Content pane/Classes and Objects"
categories:
  - TIL
tags:
  - software
  - learning
  - 공부 기록
show_date: true
---
__________________

### 💭
국비 Java 학원 수업 개강일이 얼마 남지 않았다. 지금까지는 JAVA에 대해 예습해보았고 커리큘럼에 있는 다른 것들도 미리 한번씩 봐두면 좋을 것 같아서 담당자님께 설명 들었던 것을 떠올리며 커리큘럼을 보고 있다. Java GUI에 대해서는 한번도 알아본적이 없는 것 같아서 검색해 보던 중 코드를 작성하며 정리해주신 [블로그](https://yooniron.tistory.com/12)를 발견했다. 코드와 설명을 적어주셔서 참고하며 공부해보고 있다.

### Java Swing 에서 Container 란?
하나의 컨테이너는 여러개의 레이어들을 가지고 있다. 레이어를 컨테이너를 덮고 있는 투명한 필름이라고 생각할 수 있다. Java Swing에서 objects를 담기 위해 사용되는 이 레이어를 content pane이라고 한다.

>content pane = container 속 layer

Container가 가지고 있는 content pane layer에 objects가 추가된다. getContentPane() 메소드가 컨텐트 페인 레이어를 불러온다. 그러면 objects를 그 안에 추가할 수 있다. <br>
컨텐트 페인을 구글링해보았더니 아래와 같은 사진들이 나온다. pane의 사전적 의미는 창문이나 문에 쓰이는 유리의 한 조각이다. 사전적 의미를 함께 떠올리면 좀 더 이해하기가 쉽다.

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/contentPane.png" alt="content_pane">

### Constructor in Java
생성자에 대한 몇개의 강의도 듣고, 생성자를 만들어보기도 했지만 왜 생성자를 사용하는지 궁금하다. (분명히 예전에 강의를 봤는데 기억이 안난다😵;)<br>
생성자(Constructor)는 코드의 집합인데, new 연산자를 통해 클래스 안의 객체의 상태를 초기 설정 하는데 사용되며 메소드와 비슷하다.

### Java Classes and Objects
[이 페이지를 번역하며 공부](https://www.w3schools.com/java/java_classes.asp)<br>
클래스(classes)와 객체(objects)는 자바에서 가장 중요한 개념이다. Java의 모든 것들은 클래스, 그리고 객체와 관련되어있다. attributes, methods도 마찬가지다. 예를 들어보자, 현실 세계에서 자동차는 객체다. 자동차는 색, 무게와 같은 속성(attributes)을 가지고 있다. 또 자동차는 움직이고 멈추는 메소드도 가지고 있다. (<s>메소드를 어떻게 번역하면 좋을까? 기능? 작동방식?</s>) 클래스는 자동차를 만드는 사람이나 회사 또는 청사진으로 비유된다.

- Creat an Object <br>  

자바에서 객체는 클래스로부터 만들어진다.
```java
public class Main {                 //클래스 이름은 항상 대문자로 시작
  int x = 5;

  public static void main(String[] args) {
    Main myObj = new Main();       // 클래스명 + 오브젝트명 설정 = new 연산자 + 클래스명();
    System.out.println(myObj.x);
  }

}
```  

### Java this Keyword
[이 페이지를 번역하며 공부](https://docs.oracle.com/javase/tutorial/java/javaOO/thiskey.html)<br>
```java
public class Point {
  public int x = 0;
  public int y = 0;

  //생성자 Constructor
  public Point(int a, int b) {
    x = a;
    y = b;
  }
}
```
위의 작성된 코드를 보면, class ... (<s>다음에 계속</s>)
```java
public class Point {
  public int x = 0;
  public int y = 0;

  //생성자 Constructor
  public Point(int x, int y) {
    this.x = x;
    this.y = y;
  }
}
```
