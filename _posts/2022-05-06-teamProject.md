---
title: "앱 출시 프로젝트 로그"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Swift
  - 프로젝트 기록
show_date: true
toc: true
toc_sticky: true
toc_label: " "
toc_icon: "kiwi-bird"
---


# Add a Collection View Controller  

  View Controller를 storyboard에 추가  

  View Controller는 data models와 views 사이에서 다리와 같은 역할  

  - View hierarchy를 관리
  - View에 컨텐트를 업데이트
  - UI에 일어나는 이벤트에 반응  

  1. Main 스토리보드에 View Controller Scene 삭제
    - List를 화면에 보여줄 수 있는 view controller로 교체
  2. 라이브러리에서 Collection View Controller를 드래그하여 생성

# 데이터 모델

  3. 데이터 모델 생성
    - 각 식재료 아이템이 가질 데이터의 샘플 작성
    - 날짜 관련 데이터 다루기가 어려워 일단 list 형태를 먼저 만들어 보기로 함

# Configure the Collection as a list  

  Compositional layout을 이용하여 콜렉션 뷰의 나타나는 모습을 설계  
  Compositional layout은 세가지의 컴포넌트를 이용함  
    - Section
    - Group
    - Item

## Search text field 코드  

  ```swift
  //
  //  ViewController.swift
  //  cingcing
  //
  //  Created on 2022/05/06.
  //

  import UIKit

  class ViewController: UIViewController, UITextFieldDelegate {


      @IBOutlet weak var searchTextField: UITextField!


      override func viewDidLoad() {
          super.viewDidLoad()

          // self = 현재 class
          searchTextField.delegate = self
      }

      @IBAction func searchPressed(_ sender: UIButton) {
          // return 후 키보드 사라지게 하기
          searchTextField.endEditing(true)
          print(searchTextField.text!)
      }

      func textFieldShouldReturn(_ textField: UITextField) -> Bool {
          searchTextField.endEditing(true)
          print(searchTextField.text!)
          return true
      }

      func textFieldShouldEndEditing(_ textField: UITextField) -> Bool {
          if textField.text != "" {
              return true
          } else {
              textField.placeholder = "검색어를 입력하세요."
              return false
          }
      }

      func textFieldDidEndEditing(_ textField: UITextField) {
          searchTextField.text = ""
      }

      // 여기까지 search text field 와 검색 버튼
  }
  ```

## UICollectionViewController

  - View Controller의 이름을 변경
  - Superclass를 UICollectionViewController로 변경
  - listLayout() function 작성
  - 콜렉션 뷰 > 콜렉션 레이아웃 > 리스트 레이아웃

# Configure the Data Source  

  Computational layout 이용해서 콜렉션 뷰 안에 리스트 섹션 생성 완료.  
  Collection view에 셀을 등록하고 content configuration을 사용하여 셀의  appearance를 정의 후 데이타 소스를 셀의 연결하기 




<!-- # Delegate?   -->

<!-- # 데이터 관리

  - URLSession

  - 서버와 데이터를 주고 받는 방법 알아보기


## Firebase  

  모바일 앱을 만드는데 필요한 여러가지 기능을 갖추고 있는 클라우드 서비스.


# 데이터 모델

## Classes or Structures?

  각 아이템의 데이터를 담을 모델을 생성하려하다가 class를 사용해야 할지 structure를 사용해야 할지 고민됨.  -->
