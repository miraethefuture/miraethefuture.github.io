---
title: 스터디 프로젝트 진행하며 정리
author: Mirae
date: 2023-05-24
category: TIL
layout: post
---

- @State 프로퍼티는 항상 private으로 사용 (해당하는 뷰와 서브 뷰의 특정한 정보를 담기 때문)
- observable object class 수정
    - published 값이 옵셔널로 설정되어 있었음
    - final class로 변경 
    - Combine 추가 
    - 데이터 로드하는 함수를 제네릭 함수로 변경
    - 데이터 로드 함수를 실행하는 init() 제거
    - 데이터 로드 함수가 observable object 클래스 안이 아닌 바깥 쪽에 정의  
    
    
- 오류 해결 내용 
    - ```swift 
            let file = Bundle.main.url(forResource: filename, withExtension: "txt")``` 에서 withExtension을 nil로 주면 이름이 일치하는 첫번째 파일을 가져온다고 하여 nil로 주었으나 파일을 찾지 못한다는 에러가 발생하여 파일의 익스텐션인 "txt"로 수정하여 해결
