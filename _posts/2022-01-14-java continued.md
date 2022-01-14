---
title: "[20220114] Java this Keyword / MySQL 데이터베이스 삭제하기 / "
categories:
  - TIL
tags:
  - software
  - learning
  - 공부 기록
toc: true
toc_label: "👷"
toc_icon: "cog"
toc_sticky: true
---
__________________

## 💭
벌써 1월 14일이라니 시간이 참 빠르다. 오늘은 어제 알아보던 것에 이어서 Java this keyword를 보면서 시작해본다.  

### Java this Keyword
[이 페이지를 번역하며 공부](https://docs.oracle.com/javase/tutorial/java/javaOO/thiskey.html)<br>

<Using **this** with a Field>

this keyword를 사용하는 가장 흔한 이유는 field(필드변수)의 이름이 메소드 패러미터나 생성자 패러미터와 같을 때 덮어씌여지는 것을 방지하기 위해서이다. 아래 두 예제는 이름이 Point 인 클래스를 만드는 두가지 방법을 보여준다.

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
위의 작성된 코드에서는 fields의 이름이 각각 x, y이고 생성자 패러미터는 각각 a, b 이다. 두가지의 이름이 다르기 때문에 문제가 생기지 않는다.

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
하지만 위 코드에서는 fields 의 이름과 생성자 패러미터의 이름이 같다. 이때 fields 앞에 this. 를 붙여주어야 한다.  
<br>


### MySQL 데이터베이스 삭제하기

터미널을 열고 **/usr/local/mysql/bin/mysql -u root -p** 을 입력해줍니다. 그리고 비밀번호를 입력해줍니다. (<s>내가 기억하려고 써보는 MySQL 실행시키는 방법</s>)  
show databases; 를 입력하면 아래 사진처럼 어떤 데이터베이스들이 있는지 보여줍니다.
저는 example 이라는 이름의 데이터베이스를 삭제할거에요.

<img src="/assets/images/mql.png" alt="mysql" width="250"/>

DROP DATABASE example 을 입력하면 삭제 됩니다.

<img src="/assets/images/mql2.png" alt="mysql" width="300"/>


### Java ORM
[이 페이지를 번역하며 공부](https://education.launchcode.org/java-web-development/chapters/orm-part1/background.html)

Java ORM은 Object-Relational Mapping의 약자로 Java objects와 Relational databases 사이에서 데이터를 변환해주는 기술이다.

```java
public class ContactInfo {
  int id;
  String name;
  String email;

}

```
위 3가지의 필드를 가지고 있는 ContactInfo라는 클래스가 있다고 가정해보자. 그리고 이 정보들을 MySQL 데이터베이스에 저장하고 싶다. 이때 ORM을 이용해서 어플리케이션의 데이터베이스에 객체들을 담을 테이블을 만들 수 있다. 테이블은 contactinfo라는 이름을 가지게 되고 id, name, email 세개의 열(columns)을 가진다.
