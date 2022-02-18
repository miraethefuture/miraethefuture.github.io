---
title: "Java 추상화(Abstraction)와 메소드 재정의(Overriding)"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Java
  - Abstraction
  - Overriding in Java
show_date: true
toc: true
toc_label: "👷"
toc_icon: "cog"
toc_sticky: true

---
__________________

### 💭

<div class="notice">
  <h4>자바 웹 개발자 과정 수업 2주차</h4>
  <p>중간에 연휴가 있어서 일수로는 7일차다.  
  오늘은 Overriding과 abstract 클래스와 메소드에 대해 배웠다.  
  강사님의 설명을 들으며 몇주전 abstract 에 대해 혼자 공부했던 기억이 나서 블로그를 보니..  
  오늘 처음 듣는 것 같았던 것들이 불과 이주전에 글로 써보기까지 했던 것들이었다.  
  처음엔 '공부를 한거야 만거야?'라고 스스로에게 물었는데 정리해둔걸 보니 '그래도 틀린 것들을 적어둔건 아니었구나 그때는 열심히 했네.'하는 생각이 들었다. 나는 지금 하고 있는 공부, 취업준비가 국비과정이 끝나면 모두 딱! 끝나버릴거라고 생각하지 않는다. 취업은 사실 바로 됐으면 하지만...! (네카라쿠배 바라는거 아니니까ㅋㅋㅋ) 어딜 취업하든 계속해서 아는 것을 넓혀나가야 할 것 같다는 생각이 든다. 배우면 배울수록, 조금씩 더 많이 알아갈수록 왠지 그럴 것 같다는 생각이 든다. 7일차고 어제 잠을 못자서 오후에는 피곤함이 조금 느껴졌는데 그래도 재미있었다. 아직은 자바를 배우고 있어서 그런걸수도..ㅎㅎ 아무튼 그래서 예전에 정리해뒀던거 + 오늘 배운 것들을 함께 정리해보려고 한다. </p>
</div>



### Let's get started!

Overriding을 구글에 검색해보니 사전적 의미가 가장 먼저 나온다.  

> (adj) more important than any other considerations.
가장 먼저 고려되는...

Overriding methods (메소드 재정의)는 부모 클래스로부터 상속받은 메소드를 자식 클래스가 그대로 사용하지 않고 바디 부분을 변경해서 사용하는 것이다. Overriding 이라는 단어의 사전적 의미 그대로 부모 클래스의 메소드를 override한 자식클래스의 메소드가 가장 중요한 것으로 고려된다. (그러므로 수정된 자식 클래스의 메소드의 기능이 사용된다.) '추상화 Abstraction'과  '메소드 재정의 Overriding method'는 서로 관련이 있다. 먼저 추상화에 대해서 알아보자.


### Java Abstraction
[Abstract Classes and Methods 이 페이지를 참고](https://www.w3schools.com/java/java_abstract.asp) <br>
데이터 추상화는 중요한 세부 정보들은 숨기고 꼭 보여져야하는 정보들만 사용자들이 볼 수 있도록 하는 것이다. 또, 응용 프로그램의 설계 부분과 구현하는 부분을 나누기 위해 사용된다. 추상화는 abstract classes 나 interfaces를 통해 이뤄질 수 있다.  
abstract 메소드와 클래스는 책의 목차로 비유하고, override 된 메소드는 내용에 비유해주셨다.   
(여기서 abstract 키워드는 non-access modifier 이다.<br>
아래 표는 Acccess Modifier 와 Non-Access Modifier 를 보여준다.)

| Acess Modifiers | Non-Access Modifiers |
| --------------- | -------------------- |
| private | static |
| default or No Modifier | final|
| protected | abstract|
| public | synchronized|
|        | trasient |
|        | volatile |
|        | strictfp |

<br>
- Abstract class는 객체를 만들 수 없도록 제한된 클래스이다.  
Abstract class를 상속받는 자식클래스를 만들어서 자식클래스를 객체화 할 수 있다.

- Abstract method는 Abstract class 에서만 사용될 수 있다. abstract methods는 바디 부분이 없다. (Abstract method만 있으면 interfaces)  

### 코드를 보며 알아보자!

```java
abstract class Animal {
  public abstract void animalSound(); //abstract method (바디 없음)
  public void sleep() {               // 일반적인 method
    System.out.println("Zzz");
  }
}
```

위 코드를 보면 알 수 있듯이, 하나의 abstract class는 abstract method와 일반적인 method 둘다 가질 수 있다.

```java
Animal Obj = new Animal(); // abstract class인 Animal 클래스는 객체를 만들 수 없으므로 에러 발생
```

왜 객체를 만들 수 없는지 생각해보자. 객체는 클래스라는 설계도를 이용해서 만든다. 자동차를 떠올려보자. 자동차를 만들기위해 설계도를 만들었는데 그 중 한 부분이 없어진 것이다. 그렇다면 자동차를 만들 수 있을까? (만들수도 있겠지만ㅎㅎ) 온전한 자동차를 만들 수는 없을 것이다. 메소드는 객체에서 기능 부분을 담당한다. 그런데 자동차의 기능 중 한가지가 빠진것이다. 브레이크나 엑셀이 빠진다면..?  
위의 코드를 보고 생각해보자면, Animal이라는 클래스에 animalSound라는 메소드가 텅 비어있는 것이다. 그래서 객체를 만들 수 없는 것이다.

Abstract class에 접근하기 위해서는 Abstract class를 상속 받는 subclass를 만들어야 한다.

```java
// Abstract class
abstract class Animal {
  // Abstract method
  public abstract animalSound(); //바디 없음
  // Regular method
  public void sleep() {
    System.out.println("Zzz");
  }
}

// Animal 클래스를 상속받는 Subclass
class Pig extends Animal {
  public void animalSound() {
    // 위 Abstract 메소드의 바디가 여기서 작성됨
    System.out.println("The pig says: wee wee");
  }
}

class Main {
  public static void main(String[] args) {
    Pig myPig = new Pig(); // Pig 객체 만들기
    myPig.animalSound();
    myPig.sleep(); //Pig 객체가 Anmal 클래스를 상속받으므로 sleep 메소드 사용 가능

  }
}

```
