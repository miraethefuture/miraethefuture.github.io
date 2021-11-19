---
layout: post
title:  "Google 검색에 내 블로그 노출시키기."
author: Mirae
categories: [ GitHub Pages ]
image: assets/images/Google_search.png
---
***"언제 검색될만한 글을 쓰게 될지는 모르지만 일단 한번 시도해 보았습니다. 구글링을 하면서 어찌어찌하고 난 뒤에는 항상 모든 것을 잊어버려서 Notion에 기록해 보기 시작했는데 그중 오늘의 기록을 공유합니다."***  

11/18 (THU) Google 검색에 내 글 노출시키기  
쉬운게 하나 없네. 구글에서 검색했을 때 내 글이 보이게 하려면 구글 콘솔에 계정을 등록해야하는데 계정을 등록하려면 내 계정을 인증해야한다. 그러려면 HTML 파일을 올리라는데.. repository 에는 올라갔는데 안된다고 해서 Google Analytics에 계정을 등록해서 인증하려니 Google Analytics에 먼저 가입을 해야하고 가입을 했더니 내 계정을 Google Analytics 에 연결해야 한단다.  
[손끝으로 만드는 세상](https://inasie.github.io/it%EC%9D%BC%EB%B0%98/1/)이라는 블로그 글의 도움을 받아 Google Analytics 에 나의 웹페이지 등록 완료. 블로그에 감사하다는 댓글을 적고 싶었는데 댓글창이 없어서 아쉬웠다. 비록 구글 검색에 노출되기 위해 이 과정을 거쳤지만 좋은 기능인 것 같다. 나중에 혹시라도 좋은 글을 써서 누군가 들어오게 되면 트랙이 되니까 좋을 것 같다.


<img src="/assets/images/gs_1.png" alt="gs_1.png"
	title="reason" width="970" height="94" />  

  구글 콘솔에서 인증을 하려니.. 이런게 있어야 한다고 해서 다시 폭풍 검색.  

<img src="/assets/images/gs_2.png" alt="gs_2.png"
  title="googletoldme" width="1224" height="220" />  

  오 구글은 친절하게도 왜 실패했는지 알려줌. <head> 섹션에 나의 ID 가 있어야 한다고 하는데...내 아이디를 .yml 파일에 입력했는데 어떤 HTML 파일 어딘가에 붙여야 하는걸까..?  

<img src="/assets/images/Google_search.png" alt="Google_search.png"
  title="done" width="1276" height="570" />  

  헐 성공! 하지만 Google Analytics 를 통해서가 아니고 HTML 파일 업로드해서 성공했네.. 다운받은 HTML 파일을 어디에 저장해야되는지 몰랐는데 그냥 깃허브 블로그 루트 디렉토리였네... 아무튼 성공! 위 링크의 주인분께 무한 감사를..!  

  한두시간이 지나야 잘 노출되고 있는지 확인이 가능하다고 하니 내일 확인해봐야겠다.

## 그리고 다음날이 된 11/19 (FRI) 현재...  
<img src="/assets/images/gs_3.png" alt="gs_3.png"
  title="notyet" width="1464" height="428" />  

URL 이 구글에 등록이 안되있다하여 등록중.. 구글에 검색되기는 현재 진행중.  
