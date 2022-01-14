---
title: "[20220111] Spring Boot Annotation/REST resources"
categories:
  - TIL
tags:
  - software
  - learning
  - 공부 기록
show_date: true
---
__________________

### Spring Boot Annotation
스프링 부트 애노테이션은 메타 데이터의 한 타입이다. (메타 데이터는 거대한 데이터베이스 속에 무엇이 들어있는지 알려주는 정보인데, 예를 들면 누가 이 정보를 기록했고, 무엇을 위한 정보이고, 어떤 형식으로 저장되었는지를 알려준다.) 애노테이션은 프로그램에 대한 정보를 보충하기 위해 사용되는데 어플리케이션의 일부는 아니다. 작동하는 코드에 직접적인 영향을 미치지 않는다.
<s>컴퓨터가 이해할 수 있는 주석으로 생각하면 되려나?</s>

-------------------

### REST resources
Spring boot 애노테이션 중 @RestController 라는 것이 있었고 이것을 사용하면 RESTful한 web services 를 만들 수 있다라고 하여 REST란 무엇인지 검색해보고 있다.  
검색 중 stack overflow 에 [What are REST resources?](https://stackoverflow.com/questions/10799198/what-are-rest-resources) 라는 질문글을 읽어보게 됐는데 질문자의 'REST resources에 관한 몇개의 글을 읽어봤지만 글들이 너무 추상적이어서 오히려 전보다 더 헷갈림'이라는 말에 크게 공감했다. 답변자 중 한명은 'REST resources에 관한 글들이 추상적인 이유는 REST resource 라는 개념이 추상적이기 때문'이라고 했다.  
여러명의 답변을 정리해보자면,
- "whatever thing is accessed by the URL you supply"<br>
그게 무엇이든 네가 제공한 URL 로 찾을 수 있는 정보
- A resource is anything that’s important enough to be referenced as a thing in itself.<br>
resource 는 '어떤 것'이라고 부를 수 있을만한 그 어떤 것이든 될 수 있다.
- Data responded back are the resources<br>
요청해서 받은 데이터가 resources 다.  

흠... 감이 오는 것 같기도..? 몇개 더 읽어봐야겠다.
