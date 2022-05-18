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

<sub>📲 앱 출시 스터디 진행 중.</sub>


# ?  

  - 시간 데이터도 필요할까?
  - 다크 모드에서 searchTextField안의 placeholder와 text가 안보이는 문제
  - search UITextField 옆에 cancel이나 x 버튼
  - Accessibility (VoiceOver 등,,) 사용할지

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

  UICollectionViewDiffableDataSource<Int, String> 타입을 이용하여 dataSource 생성

# Apply a snapshot  

   스냅샷을 이용하여 데이터의 변경 사항을 관리  

   1. 스냅샷을 생성
   2. 원하는 상태의 데이터를 스냅샷에 작성되도록 함
   3. UI에 스냅샷을 적용

   Diffable data source 이용 -> snapshot을 apply -> 변경된 데이터로 UI 업데이트


# Displaying Cell Info  

  유통기한 날짜를 입력 받고, 그것을 이용해 D-day 카운트 다운 표시를 일(day) 수로 표시하는 방법을 찾아야 함.  

  ```swift
  if Locale.current.calendar.isDateInToday(self) {
        } else {
        }
  ```
  해당 date 값이 오늘 날짜라면 휴지통 아이콘 나타나게 할 때 사용할 수 있을 것 같음

  ```swift
  import Foundation

  extension Date {
      // computed property
      var dayAndTimeText: String {
          // formatted(date:time:) -> date 값을 문자 형태로
          let timeText = formatted(date: .omitted, time: .shortened)
          if Locale.current.calendar.isDateInToday(self) {
              // localize / comment -> translator
              let timeFormat = NSLocalizedString("Today at %@", comment: "Today at time format string")
              return String(format: timeFormat, timeText)
          } else {
              let dateText = formatted(.dateTime.month(.abbreviated).day())
                          let dateAndTimeFormat = NSLocalizedString("%@ at %@", comment: "Date and time format string")
                          return String(format: dateAndTimeFormat, dateText, timeText)
                      }
                  }
      var dayText: String {
          if Locale.current.calendar.isDateInToday(self) {
              return NSLocalizedString("Today", comment: "Today due date description")

          } else {
              return formatted(.dateTime.month().day().weekday(.wide))
          }
      }
  }
  ```

  날짜 formatting 파트 (필요 없을 것 같음)

# HeaderView  

  - title(header)
  - 설정 icon
  - searchbar and button

  (검색 버튼 누르지 않고 입력하면 아래 아이템이 바뀌는 기능으로 구현하면 좋을 것 같음)

## UICollectionReusableView  

  UICollectionReusableView를 사용하여 supplementary views를 생성합니다.  
  Supplementary views는 각 collection view cells와 분리되기 때문에 header나 footer를 생성하는데 사용되기 좋습니다.  

## HeaderView - Subviews - Constraints  

  Subviews  
  - 설정 버튼
  - 타이틀
  - 검색 textfield

  Constraints 조정 완료  
  버튼, text field 기능 동작 확인

# Organize View Controller  

  UIKit 앱에서 view controller는 여러개의 역할을 함. Item list view controller의 역할을 정리해봅니다. 연관된 동작과 관련된 데이터 소스를 분리된 파일로 추출.  

  Collection view 데이터 소스는 콜렉션 뷰의 데이터를 관리.  
  또, 콜렉션뷰가 리스트의 아이템을 화면에 보여주기 위해 사용하는 셀을 생성하고 배치.

  View controller behavior와 data source behavior를 다른 파일로 나누어 줌.  

  View controller는 UIKit 앱에서 많은 역할을 하기 때문에 파일이 커질 수 있음.  
  분리된 파일과 extextions를 이용하여 재정리하는 것을 에러를 빨리 찾을 수 있도록 하고 새로운 기능을 추가하기 쉽도록 함.

# 중간 정리  

## UI  

<center><img src="/assets/images/teamProject1.png" alt="teamProject1" width="300"></center>

## Header  

  UICollectionView - Supplementary View
  UICollectionReusableView 상속

  subviews (설정 버튼 / 페이지 타이틀 / 검색창)를 담을 수 있는 header view 구현을 목적
  Resuable view를 사용하면 스크롤을 내릴 시에도 사라지지 않고 고정됨
  UIButton과 UITextField는 동작하나 기능이 연결되어 있지는 않음
  Storyboard 이용하지 않고 코드만 작성하여 UI를 그리니 storyboard에 미리보기가 나타나지 않는 문제있음

## List Layout  

  UICollectionViewCompositionalLayout

  현재 기본 타입 리스트라 커스텀에 제약이 있음 (커스텀 가능하게 변경 가능)
  유통기한의 남은 기간을 UICellAccessory 로 표현
  각 아이템의 title / notes 는 데이터 모델의 sample data에서 가져오도록 함

## 느낀점  

  Storyboard가 아니라 코딩만으로 UI를 짜는 새로운 경험을 해볼 수 있어서 좋았다.  
  지금은 구현이 먼저라 기능이 UI나 기능이 구현이 되면 넘어가고 있지만 시간이나면 정리를 하면서 코드가 어떤 과정을 거치는지 다시 한번 생각해 보면 좋을 것 같다.

## Cell Info 추가

View controller는 init(coder:) 생성자를 필요로 합니다.

expDate를 리스트나 디테일 뷰에 나타나도록 해야할까?  
-> 나타나게 함

<center><img src="/assets/images/teamProject2.png" alt="teamProject2" width="300"></center>


# Wire a Target Action Pair  

  Target Action은 디자인 패턴.  
  객체가 필요한 정보를 보관 -> 이벤트 발생 시 다른 객체에 전송  

  여기서는 사용자가 DoneButton을 탭할 때 touchUpInside 이벤트 발생.  
  didPressDoneButton: sender 메세지를 View controller에게 보냄

  ```swift
  // Item 모델 이용 CustomViewConfiguration을 리턴
  private func doneButtonConfiguration(for item: Item) -> UICellAccessory.CustomViewConfiguration {
      // true면 칠해진 휴지통 아이콘, false면 빈 휴지통 아이콘이 나타나도록 조건
      let symbolName = item.isComplete ? "xmark.bin.fill" : "xmark.bin"
      let symbolConfiguration = UIImage.SymbolConfiguration(textStyle: .title1)
      let image = UIImage(systemName: symbolName, withConfiguration: symbolConfiguration)
      // 커스텀 버튼 (ItemDoneButton 클래스)
      let button = ItemDoneButton()
      button.addTarget(self, action: #selector(didPressDoneButton(_:)), for: .touchUpInside)
      button.id = item.id
      button.setImage(image, for: .normal)
      return UICellAccessory.CustomViewConfiguration(customView: button, placement: .leading(displayed: .always)) // 완료되면 휴지통으로 가도록 설정하기
  }
  ```
  ```swift
  button.addTarget(self, action: #selector(didPressDoneButton(_:)), for: .touchUpInside)
  ```  
  addTarget를 호출하여 버튼의 touchUpInside 이벤트를 didPressDoneButton 액션 메서드에 연결해줌.

# Navigation controller

  코드로 디테일 뷰를 메인 뷰위에 푸시해준 뒤 Main.Storyboard에 navigation controller를 추가해줌.  
  현재 스토리보드에는 미리보기가 보이지 않는 상황이라 코드로 UI 작성하면 스토리보드는 상관이 없다고 생각했는데 스토리 보드에 추가해 준 navigation view가 스택처럼 작동한다고 함.

# IndexPath 와 Item.ID  

   인덱스의 리스트로 특정 로케이션의 경로를 보여준다.   

# Edit view 만드는 중  

<center><video src="https://user-images.githubusercontent.com/85061148/168280247-e598892c-24db-4b7d-873c-37f721d661bd.mov" controls="simulator" style="max-width: 300px">
</video></center>

## willSet / didSet  

   willSet은 property가 변경되기 바로 전에 코드를 실행  
   didSet은 property가 변경된 직후에 코드를 실행

   ```swift
   var configuration: UIContentConfiguration {
        //configuration property에 configure(configuration:)을 호출하는 cdidSet observer
        didSet {
            configure(configuration: configuration)
        }
    }

    func configure(configuration: UIContentConfiguration) {
        guard let configuration = configuration as? Configuration else { return }
        textField.text = configuration.text
    }
   ```



# Downcasting  

  어떤 클래스 타입의 변수나 상수는 서브클래스의 인스턴스를 참조할 수 있다.

  as? 또는 as! 라는 type cast operator를 사용하여 downcasting을 시도할 수 있다.   
  Downcasting이 실패할 수 있기 때문에 type cast operator는 두가지의 형태로 나뉜다.  
  Downcasting을 시도하고 있는 타입의 optional 값을 리턴하는 as?(conditional form)과 downcasting과 force-unwrapping을 함께 시도하는 as!(forced form)이다.  

  Downcasting이 성공할지 확신할 수 없을 때 as? type cast operator를 사용한다.  
  이 형태의 operator는 항상 optional type의 값을 리턴하고, downcasting이 불가능할때는 nil값을 리턴한다.  
  Downcasting의 성공을 확신할 수 있을 때는 as! type cast operator를 사용한다.  
  가능하지 않은 class type으로 downcasting을 시도하면 runtime 에러가 발생한다.  

  ```swift  
  for item in library {
      if let movie = item as? Movie {
          print("Movie: \(movie.name), dir. \(movie.director)")
      } else if let song = item as? Song {
          print("Song: \(song.name), by \(song.artist)")
      }
  }

  // Movie: Casablanca, dir. Michael Curtiz
  // Song: Blue Suede Shoes, by Elvis Presley
  // Movie: Citizen Kane, dir. Orson Welles
  // Song: The One And Only, by Chesney Hawkes
  // Song: Never Gonna Give You Up, by Rick Astley
  ```  

  위 예제는 current item을 Movie로 downcasting을 시도하며 시작된다.  

  Optional binding인 if let movie = item as? Movie는 아래처럼 해석된다.  
  <div class="notice">
  <p>"item에 Movie로 접근이 성공하면, movie 상수를 optional Movie 형태의 값으로 설정하라."</p>
  </div>  

  ```swift
  //
  //  TextViewContentView.swift
  //  cingcing
  //
  //  Created by Mirae on 2022/05/15.
  //

  import UIKit

  // UIView의 subview, UIContentView 프로토콜 따름
  // 여러 줄의 텍스트를 보여줄 때 text view를 사용
  // 왜 inner structure를 사용할까?
  class TextViewContentView: UIView, UIContentView {
      struct Configutation: UIContentConfiguration {
          var text: String = ""

          func makeContentView() -> UIView & UIContentView {
              return TextViewContentView(self)
          }
      }

      // 1. add text text view and configuration property
      // didSet 코드 블럭 안에 configuration이 var configuration 속성이라면 왜 self를 사용하지 않을까?
      let textView = UITextView()
      var configuration: UIContentConfiguration {
          didSet {
              configure(configuration: configuration)
          }
      }

  //    override var intrinsicContentSize: CGSize {
  //        CGSize(width: 0, height: 44)
  //
  //    }

      // 2. add an initializer that sets the configuration property
      init(_ configuration: UIContentConfiguration) {
          self.configuration = configuration
          super.init(frame: .zero)
  //        addPinnedSubview(textView, insets: UIEdgeInsets(top: 0, left: 16, bottom: 0, right: 16))
          // x 버튼은 textField에서만 사용 가능 하다고 함
      }

      required init?(coder: NSCoder) {
          fatalError("init(coder:) has not been implemented")
      }

      // 3. function that sets the text view's text property
      // textView에 원래 있는 속성 text에 configuration의 text를 설정
      func configure(configuration: UIContentConfiguration) {
          guard let configuration = configuration as? Configutation else { return }
          textView.text = configuration.text
      }
  }

  extension UICollectionViewListCell {
      func textViewConfiguration() -> TextViewContentView.Configutation {
          TextViewContentView.Configutation()
      }
  }
  ```

  위 코드의 configure(configuration:) function에서 downcasting을 실행함.  
  confiuguration property는 TextViewContentView 클래스의 속성임.  
  configuration 속성이 inner structure인 Configuration의 text 속성을 이용하기 위해 downcasting을 시도하는 것 같음.

# Text view  

  편집창의 notes는 text view를 사용합니다. Text view는 스크롤 뷰이기 때문에 자동으로 스크롤링과 스크롤 인디케이터를 제공합니다.  

# ARC  

  **Automatic Reference Counting**  

  Swift는 앱의 메모리 사용을 기록하고 관리하기 위해 _Automatic Reference Counting_(ARC)를 사용합니다. 대부분의 경우에는, Swift의 메모리 관리가 "그냥 동작"하고 우리는 메모리 관리에 신경 쓸 필요가 없습니다. ARC는 인스턴스가 더이상 필요하지 않을 때, 자동으로 사용되던 메모리를 해제 합니다.  

  하지만 가끔 몇몇 케이스에서 메모리를 관리하기 위해 ARC가 우리가 작성한 코드들 사이의 관계에 대한 부차적인 정보를 요청합니다.

  Reference counting은 오로지 클래스의 인스턴스에만 이용합니다. Structures나 enumerations는 reference 타입이 아니고 value 타입입니다.
  <!-- (and they aren't stored and passed by reference. <s>어떻게 해석?</s>)   -->

## How ARC Works  

  클래스의 새 인스턴스를 생성할 때마다, ARC는 해당 인스턴스의 정보를 저장할 메모리를 분배합니다.

# [weak self]  

  ```swift
  @objc func didPressAddButton(_ sender: UIBarButtonItem) {
      // 새 아이템 생성
      let item = Item(title: "", expDate: Date.now)
      let viewController = ItemViewController(item: item) {
          [weak self] item in
      }
  }
  ```
  클로저의 캡쳐 리스트에 [weak self]를 추가해주어 ItemViewController가 strong reference를 담거나 캡쳐링하는 것을 방지해준다.

# #selector  

  Seletors는 dynamic Objective-C APIs와 상호작용하기 위해 사용된다.  
  target-action과 같은 몇몇의 Objective-C APIs 메서드나 속성의 이름을 패러미터로 받는다. 그리고 그 이름을 이용하여 동적으로 호출하거나 메서드나 속성에 접근한다.

  ```swift
  @objc func didPressAddButton(_ sender: UIBarButtonItem) {
      ...
      viewController.navigationItem.leftBarButtonItem = UIBarButtonItem(barButtonSystemItem: .cancel, target: self, action: #selector(didCancelAdd(_:)))
  }

  @objc func didCancelAdd(_ sender: UIBarButtonItem) {
      // view controller를 dismiss
      dismiss(animated: true)
  }
  ```  
  위의 코드에서는 didCancelAdd(_:) 메서드를 동적으로 호출하기 위해 #selector(didCancelAdd(\_:))를 사용한 것으로 보인다.

# 궁금  

  모델에 변경된 값을 저장한다고 하는데 저장된 값은 어디 있는거지? Xcode내에서 볼 수 있나?


















<!-- # Delegate?   -->

<!-- # 데이터 관리

  - URLSession

  - 서버와 데이터를 주고 받는 방법 알아보기


## Firebase  

  모바일 앱을 만드는데 필요한 여러가지 기능을 갖추고 있는 클라우드 서비스.


# 데이터 모델

## Classes or Structures?

  각 아이템의 데이터를 담을 모델을 생성하려하다가 class를 사용해야 할지 structure를 사용해야 할지 고민됨.  -->
