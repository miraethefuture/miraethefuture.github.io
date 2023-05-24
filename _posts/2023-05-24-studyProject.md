---
title: 스터디 프로젝트 진행하며 정리
author: Mirae
date: 2023-05-24
category: TIL
layout: post
---

- @State 프로퍼티는 항상 private으로 사용 (해당하는 뷰와 서브 뷰의 특정한 정보를 담기 때문)
- observable object class 수정
    - final class로 변경 
    - Combine 추가 
    - 데이터 로드하는 함수를 제네릭 함수로 변경
    - 데이터 로드 함수를 실행하는 init() 제거
