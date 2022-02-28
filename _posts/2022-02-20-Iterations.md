---
title: "프로그래밍에서 Iterations란? / 코딜리티의 open reading material를 읽어보며 for 문에 대해 알아보자."
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - python
  - 코딜리티
show_date: true
toc: true
toc_label: "⚙️"
toc_icon: "cog"
toc_sticky: true

---
__________________

## 🧱
<div class="notice">
  <h4>Iterations</h4>
  <p><s>30분 작성한 글 날린거 실화냐..</s>  
  '본격적으로 취업 준비를 해보자!' 하는 생각이 들었고, 블로그의 취직 성공기들을 읽어보다가 코딜리티라는 사이트를 알게 되었다. 리트코드나 프로그래머스는 한번씩 둘러봤는데, 코딜리티는 처음 듣는 곳이라 궁금해져 가입 후 연습문제를 풀기 전 open reading material을 읽어보려고 한다.</p>
</div>


### 첫 레슨은 Iterations에 관한 글입니다.
[Open reading material about Iterations 링크](https://codility.com/media/train/Iterations.pdf)  
  프로그래밍에서 iterating이란 프로그램의 한 부분을 반복하는 것을 말합니다. 이 레슨에서는 Iterations를 수행하는 기초적인 프로그래밍 구조에 대해 알아볼 것 입니다. 바로 "for"과 "while" 반복문(loops)입니다.

### ⚙️ For loops

  반복문의 구조에 대해 먼저 알아봅시다. 만약 정해진 횟수만큼 반복하는 작업을 하려 한다면, 한 그룹에 속해있는 각각의 요소들에 대해 반복을 수행하려 한다면 for 문을 사용하면 됩니다.

  **For loop systax**  
  (<s>이 글에서는 python을 기준으로 설명합니다.</s> 그런데 코드가 좀 다른건지.. 글에 적힌대로 VScode에서 실행하니까 에러가 나네요..?)
  ```python
  for some_variable in range_of_values:
    loop_body   # 처음 개발 공부를 Python으로 시작했는데 자바만 공부하다보니 많이 어색하네요.
  ```
  위 for문은 range_of_values의 크기만큼 반복하며 loop body의 내용을 수행합니다. range_of_values의 현재 값은 some_variable의 값에 할당됩니다. 가장 간단한 형태로 아래처럼 작성될 수 있습니다.

  ```python
  for i in range(0, 100):
    print i   
  ```  
  위 코드는 0부터 99까지의 모든 정수를 출력합니다. 0 ~ 어떤 정수 범위의 반복문 수행은 많이 사용됩니다. (Python list나 배열의 인덱스가 0부터 시작하는 주된 이유입니다.) 아래 반복문은 위의 반복문과 똑같은 값을 출력합니다. 0부터 시작이라면 0은 생략 가능하죠.
  ```python
  for i in range(100):
    print i
  ```

  예시 : 우리에게 양의 정수인 n 이 주어졌습니다. factorial을 구해볼건데요. 예를 들어 factorial 3은 3 * 2 * 1 입니다. factorial n을 구하여 변수 factorial 에 할당해봅시다.
  ```python
  factorial = 1
  for i in range(1, n + 1):     # factorial n 의 값을 구할 수 있음
    factorial *= i
  ```

  또 다른 예시 : * 표로 공백으로 띄어진 삼각형을 출력해봅시다. 삼각형은 n 이라는 행을 가지고 있고, n은 양의 정수로 주어집니다. 각 행은 연달아 1, 2, ..., n 개의 *을 가지고 있습니다. 예를 들면, n = 4 일때, 아래의 삼각형이 출력되어야 합니다.
  ```python
    *
    * *
    * * *
    * * * *
  ```
  이 삼각형을 출력하기 위해서는 두개의 반복문이 필요합니다. 하나의 반복문 안에 다른 반복문 하나가 있어야하죠. 바깥쪽의 반복문은 반복될 때마다 각 행을 출력하고 안쪽의 반복문은 반복될 때마다 *(별 asterisk) 하나를 출력합니다.
  ```python
  for i in range(1, n + 1):
    for j in range(i):
        print ' *',          # 맨날 자바 for문 작성하다가 python 으로 하니까 너무 좋다.
    print    # 안쪽 for문의 바디에 해당됨. 개행 역할
  ```
  (위에서도 잠깐 언급한 것처럼 이 자료의 코드 그대로 VScode에 돌리면 에러가 나네요..? Python이 아닌건가요? 아래 코드로 돌리면 제대로 별이 나옵니다.)  
  ```python
  for i in range(1, 5) :
    for j in range(i) :
        print(' *', end="")
    print('')
  ```
  range function에는 한가지 인자가 더 추가 될 수 있는데, 바로 step 이다. range(10, 0, -1) 은 10, 9, 8, 7, ..., 1 까지의 범위를 의미한다. start 값은 10, stop 값은 0, 이 사이를 -1만큼씩 순차적으로 내려온다는 의미가 된다. 이렇게 세개의 인자를 사용할 때는 start 값을 생략할 수 없다.

  또 다른 예시 : 이번에는 아래와 같은 삼각형을 출력해 봅시다. n개의 행을 가지고 있는 거꾸로 된 대칭 모양의 삼각형입니다. 각 행은 2n-1, 2n-3, ..., 3, 1개의 *을 가지고 있어야 하고 0, 2, 4,..., 2(n-1)만큼의 공백을 가지고 있어야 합니다. 예를들어 n = 4인 삼각형은 아래처럼 출력되어야 합니다.
  ```python
  * * * * * * *
    * * * * *
      * * *
        *
  ```
  이 예제에서 우리는 세개의 반복문을 사용합니다. 하나의 바깥쪽 반복문과 두개의 안쪽 반복문입니다. 바깥쪽 반복문은 반복할때마다 하나의 행을 출력합니다. 첫번째 안쪽 반복문은 공백을 출력하고 두번째 안쪽 반복문은 *을 출력합니다.
  ```python
  for i in range(n, 0, -1) :
    for j in range(n - i) :
      print ' ',
    for j in range(2 * i - 1) :
      print ' *'
    print  
  ```
  위의 코드로 별을 출력해보면 (출력되도록 print 부분을 수정하더라도) 공백을 찍는 부분의 식이 좀 잘못되어 있는 같다. 이 예제의 두번째줄이 공백을 출력하는 부분인데 n = 4 일때 (n-i)로 공백을 출력하게 되면 0, 1, 2, 3개의 공백을 출력하게 된다. 예제에서 출력되어야 하는 공백의 수는 0, 2, 4 이다.  
  만약 별과 별 사이에 공백이 없다면 위의 코드가 맞는데,, 내가 파악하지 못한 부분이 있는걸까?