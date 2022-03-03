---
title: "깃헙은 왜 기본 브랜치의 이름을 main으로 바꿨을까?"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Github
  - Article

toc: true
toc_icon: "cog"
toc_sticky: true
toc_label: "⚙️"
show_date: true
---

### 💭
<div class="notice">
  <h4>깃헙에 대해 배워가면서 한가지 궁금한 점이 생겼습니다.  </h4>
  <p>블로그로 정보를 찾거나 구글링을 하다 보면 사람들은 레퍼지토리 안에 master 브랜치를 기본으로 가지고 있고,  
  레퍼지토리를 생성하면 master 브랜치가 생성된다는데. 제가 레퍼지토리를 만들면 언제나 main 이라는 이름의 기본 브랜치가 생성되었거든요.   
  '내가 뭔가 설정을 잘못한걸까?'하는 생각이 들어 구글링을 하기 시작했습니다.  
  그러다가 깃헙이 더이상 master branch라는 이름을 사용하지 않는다는 것을 알게되었어요. 왜일까? 궁금해서 이유를 찾아보니  
  생각보다 더 멋진 이유로 기본 브랜치의 이름을 main으로 바꿨다는 것을 알게 되어서 공유해 봅니다.
  </p>
</div>



## 왜 깃헙은 master branch의 이름을 main으로 바꾸었을까?
[Why GitHub renamed its master branch to main](https://www.theserverside.com/feature/Why-GitHub-renamed-its-master-branch-to-main#:~:text=GitHub%20took%20action%20based%20on,a%20different%20default%20for%20new)  

여기 master branch에서 main branch로의 큰 변화가 일어난 이유가 있다.    

시초부터, Git 분산 버전 관리 도구의 기본 branch name은 master로 설정되었다.  
모든 깃 repository는 master branch를 가지고 있었다. master branch는 소프트웨어 개발 분야에서 없어서는 안 될 역할을 담당하고 있었다.  
많은 프로젝트들에서 master branch는 실제 소스, 즉 모든 테스트를 거친 잘 작동하는 코드라는 것을 의미했다.  

하지만 master 라는 용어는 컴퓨터 세계에서나 다른 세계에서나 더 이상 사람들이 좋아하지 않는 용어이다.
Git 그리고 Github은 다른 사람들과 다르지 않았다. 2020년 10월 1일부터, 새롭게 생성되는 모든 깃헙의 레퍼지토리는 main 이라는 이름의 기본 branch를 생성한다. 깃헙은 더이상 master라는 기본 브랜치를 생성하지 않는다.  
왜 깃헙이 master 브랜치의 이름을 main 브랜치로 바꾸었는지, 그리고 이것이 개발자들에게 어떤 영향을 미칠지 알아보자.

## 문화적 정서
2020년 여름, 컴퓨터 산업이 master and slave라는 용어를 사용한다는 것이 모두의 주목을 받았다.
많은 시위와 커져가는 사회적 동요 속에서, 이 유해하고 한물간 용어는 더 이상 적합하지 않은 것으로 고려되었다.  

Software Freedom Conservancy는 "Conservancy와 Git 프로젝트는 초기 브랜치 이름인 'master'가 일부 사람들에게 불쾌감을 준다는 것을 알고 있으며, 그 용어의 사용으로 인해 상처를 입은 사람들에게 공감합니다."라고 말했다.  

사람들이 생각하는 것과는 달리, 깃의 master 브랜치에는 특별한 기능이 없다.  
사용자들은 레퍼지토리에 해를 입히지 않고 master 브랜치를 삭제하거나 제거할 수 없다고 생각한다.
이것은 잘못된 사실이다. master 브랜치는 레퍼지토리에 맨 처음 브랜치가 만들어졌을 때 함께 생성된 기본 설정된 이름이라는 점 빼고는 다른 브랜치들과 다른 점이 없다.    
master 브랜치를 삭제하거나 이름을 바꾸거나 심지어는 삭제 후에 새로운 master 브랜치를 만들 수도 있다.  

깃헙의 이런 변화는 과거의 만들어진 레퍼지토리에는 영향을 주지 않는다. 또한 만약 깃헙 사용자가 master라는 이름의 브랜치를 사용하고 싶다면 사용할 수 있다.  
깃헙은 master라는 용어를 금지하는 것은 아니다. 그저 사용을 격려하지 않는 것일 뿐이다.  

매사추세츠주 캠브리지에 있는 HubSpot의 수석 설계자인 Whitney Sorenson은 깃헙이 master 브랜치의 이름을 main으로 변경하며 얻을 이점이 한시적으로 겪을 장애물보다 훨씬 크다고 했다. 그는 이러한 변화가 회사 시스템에 차별이 없는 언어를 더하기 위한 보다 큰 내부 계획의 일부라고 말했다. 그의 팀은 또한 whitelist와 blacklist를 allowlist와 blocklist로 교체하고 있다. Sorenson은 이메일로 "지금 이러한 변화를 만드는 것에는 시간이 걸리지만 그건 단지 일회적인 기술적 희생일 뿐, 내부적으로나 외부적으로 모두에 지속적인 영향을 미칠 것이다."라고 말했다. 또 그는 "우리는 이 일을 장기전으로 보고 있으며, 차별이 없는 언어는 사람과 사람 사이의 소통에서 중요한 만큼 우리가 코딩하고, 그것으로 어떤 것을 구축할 때도 중요하다는 것을 안다."라고 했다.  
