---
title: 앱 Your Music 작성기
author: Mirae
date: 2023-12-03
category: TIL
layout: post
---

> 첫번째 목표... Spotify API 호출하기

# Authorization

- 모든 Spotify Web API로의 요청은 권한이 필요.  
- 웹 API를 통해서 프라이빗한 정보에 접근하기 위해서는 사용자의 동의를 받아야 함.  

```
https://accounts.spotify.com/en/authorize?client_id=클라이언트아이디값&response_type=token&redirect_uri=https://open.spotify.com/
```

- 위 주소로 토큰을 받는 네트워크 요청을 보내봄.  

<center><img src="/assets/images/YourMusic_20231203.png" alt="YourMusic_20231203" width="400"></center><br>

- 위와 같이 사용자의 동의를 얻는 화면이 나타남.
- 동의하면 redirect_uri 주소로 이동하며 아래와 같이 access token을 얻게 됨.

```
https://open.spotify.com/#access_token=토큰값&token_type=Bearer&expires_in=3600
```
- 이 토큰은 한시간동안 유효함.

https://open.spotify.com/#access_token=BQDhgN0-a0A2rk3b6XuI1__aTDzPF1YUDdfvHb5HlH7JN_jv8zBQH1isxdlDnnDxz_nMXZ8636l63lRAwEu3VY7jYxKPGvLaWjw0ioQdDlH_pGhGyn8OriokdN3jab9bvkco9bXchwbrKic5SkZCGGMVQ_azzw0-UX767m64YdxC4SfyVRtAixa_x_EyvGBohXY&token_type=Bearer&expires_in=3600

- client secret이 안전하게 보관될 수 없는 환경에는 PKCE를 통한 권한 요청을 할 것을 추천함.
- code verifier를 생성하는 것으로 PKCE 권한 요청 플로우를 시작함.
