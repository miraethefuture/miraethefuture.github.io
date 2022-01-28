---
title: "HTTP / 백준 2558번 / Java Abstraction"
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
show_date: true
---
__________________

## 💭
- [백엔드 개발자 로드맵](https://roadmap.sh/backend)을 보고 각 항목에 관련된 글을 읽어보려 한다.
- 백준 문제 풀이하며 레벨 올리기!
- Java에 대해 공부하기

### Domain name resolution
[이 페이지를 참고](http://web.stanford.edu/class/msande91si/www-spr04/readings/week1/InternetWhitepaper.htm)<br>
Domain name resolution은 도메인 이름을 IP 주소로 변환하는 처리 과정을 말한다. 하나의 도메인 이름은 하나의 IP 주소와 연결되고, 하나의 IP 주소는 여러개의 도메인 이름들과 연결될 수 있다. 이것은 여러개의 도메인 이름이 하나의 같은 IP 주소를 가질 수 있는 것을 의미한다.

### Application Protocols : HTTP and World Wide Web
[이 페이지를 참고](http://web.stanford.edu/class/msande91si/www-spr04/readings/week1/InternetWhitepaper.htm)<br>
인터넷에서 가장 흔하게 사용되는 서비스 중 하나는 World Wide Web 이다. Web을 작동시키는 응용 프로그램 프로토콜은 HTTP(Hyper Text Transfer Protocol)이다. HTTP를 HTML과 헷갈리지 말자. HTML은 웹 페이지를 작성하는 언어이다. HTTP는 웹 브라우저와 웹 서버가 서로 정보를 교환하기 위해 사용하는 통신 규약이다. HTTP는 응용 프로그램 레벨의 통신규약인데, HTTP가 통신 규약 스택에서 TCP 위에 있고 특정 응용프로그램(웹 브라우저, 웹 서버와 같은)으로부터 이용되기 때문이다.  

HTTP는 비연결형 문자 기반 프로토콜이다. 클라이언트(웹 브라우저)가 웹 서버에 이미지, 웹 페이지 등을 요청한다. 클라이언트가 요청한 뒤 이미지나 웹 페이지가 전송 완료되면 클라이언트와 서버 사이의 연결이 끊긴다. 새 요청이 있을 때마다 다시 연결한다. 대부분의 프로토콜은 연결 지향적이다. 이것은 서로 정보를 주고 받고 있는 컴퓨터가 인터넷을 통해 계속해서 연결을 유지한다는 뜻이다. HTTP는 그러지 않다. 클라이언트로부터 HTTP 요청이 이루어지기 전에 먼저 서버와 새롭게 연결이 되어야 한다.  

**당신이 웹 브라우저에 URL 을 입력할 때 어떤 일이 일어날까?**  
1. URL이 도메인 이름을 포함하고 있다면, 브라우저는 먼저 domain name server를 연결합니다. 그리고 도메인 이름에 연결된 IP 주소를 찾아옵니다.  
2. 웹 브라우저는 웹 서버와 연결되고 원하는 웹 페이지를 불러오기 위해 HTTP 요청을 보냅니다. (통신 규약 스택을 통해)
3. 웹 서버는 요청을 확인하고 웹 페이지를 확인합니다. 만약 요청으로 들어온 페이지가 있다면, 웹 서버는 페이지를 전송합니다. 만약 서버가 요청 들어온 페이지를 찾을 수 없다면, 서버는 HTTP 404 error 메시지를 보냅니다. (웹서핑을 해본 사람이면 알겠지만 404 는 '페이지를 찾을 수 없음'을 의미합니다.)
4. 웹 브라우저가 요청한 페이지를 받으면 연결이 끊어집니다.
5. 그리고 브라우저가 페이지를 분석하며 어떤 요소들(이미지, 작은 응용프로그램들)이 더 필요한지 찾습니다.  
6. 브라우저는 필요한 요소들을 가져오기 위해 서버에 새로이 연결하고, 요소들을 요청합니다. (각 요소마다 따로 따로 새 요청을 합니다.)
7. 브라우저가 모든 것들(이미지, 작은 응요프로그램 등)을 가져오면, 브라우저의 윈도우창에 완전한 페이지가 나타납니다.

-------------

### 백준 2588번 문제 풀어보기
[2588번 문제](https://www.acmicpc.net/problem/2588) <br>
아래 사진은 (세 자리 수) × (세 자리 수) 의 답을 구하는 과정을 보여준다. <br>
<img src="/assets/images/2588.png" alt="2588"> <br>
(사진의 출처는 백준 사이트의 해당 문제 페이지입니다.)

여기서 (3),(4),(5),(6)에 해당하는 수들을 출력하는 프로그램을 만들면 된다.
a = (1), b = (2) 라고 할 때, (3)은  a * (b의 1의 자리수), (4)은  a * (b의 10의 자리수), (5)은  a * (b의 100의 자리수) 이니까 입력 받은 b 를 먼저 각각 하나의 1의 자리 숫자로 쪼개고, 쪼개진 각 수에 a 를 곱해보자고 생각했다. 백의 자리수를 쪼개는 방법을 검색하다 이 [페이지](https://www.edureka.co/community/2687/how-can-i-separate-the-digits-of-an-int-number-in-java를) 찾았다. 아래 방법으로 숫자를 쪼개서 하나씩 구할 수 있다.

```java
class Main {
  public static void main(String[] args) {

    int num = 1020;

    while (num > 0) {

      System.out.println( num % 10);

      num = num / 10;

      }
    }
  }
```

그리고 세시간동안 혼자 생각해보며 (3), (4), (5) 까지는 구했는데 (아래처럼 작성) (6)을 구하지 못하고 답을 찾아봤다. 문제의 레벨을 봤을때 물론 엄청 간단할거라 생각했지만... 길을 잘못 들어도 한참 잘못 들었더라 하하..

```java
import java.util.*;

class Main {
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        int a, b;
        a = sc.nextInt();
        b = sc.nextInt();

        int[] arr = new int[3];
        int[] arr2 = new int[3];

        while (b > 0) {
        	for(int i = 0; i < arr.length; i++) {
        	arr[i] = b % 10;
        	b = b / 10;
        	arr2[i] = a * arr[i]; 	

        	System.out.println(arr2[i]);

        }
     }
  }

}              
```

다른 분이 올린 [답](https://javacoding.tistory.com/14)을 보고 생각해봅니다.

```java
import java.util.*;

class Main {
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        int a, b;
        a = sc.nextInt();
        b = sc.nextInt();

        System.out.println(a * (b % 10));
        System.out.println(a * ((b / 10) % 10));
        System.out.println(a * (b / 100));
        System.out.println(a * b);

   }

}          

```
패드에 써가면서 생각해보기  

<img src="/assets/images/2588_2.png" alt="2588"> <br>


### Java Abstraction
[Abstract Classes and Methods](https://www.w3schools.com/java/java_abstract.asp) <br>
데이터 추상화는 중요한 세부 정보들은 숨기고 꼭 보여져야하는 정보들만 유저들이 볼 수 있도록 하는 것이다. 데이터 추상화는 abstract classes 나 interfaces를 통해 이뤄질 수 있다. abstract 키워드는 non-access modifier 이다.<br>
아래 표는 Acccess Modifier 와 Non-Access Modifier 를 보여준다.

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

- Abstract method는 Abstract class 에서만 사용될 수 있다. abstract methods는 바디 부분이 없다.

```java
abstract class Animal {
  public abstract void animalSound(); // public 과 abstract 가 같이 사용되네..?
  public void sleep() {
    System.out.println("Zzz");
  }
}
```

위 코드를 보면 알 수 있듯이, 하나의 abstract class는 abstract method와 일반적인 method 둘다 가질 수 있다.

```java
Animal Obj = new Animal(); // abstract class인 Animal 클래스는 객체를 만들 수 없으므로 에러 발생
```

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
