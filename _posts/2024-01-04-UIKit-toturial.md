---
title: UIKit 튜토리얼 따라가보기
author: Mirae
date: 2024-06-09
category: TIL
layout: post
---

# Creating a list view 
> Add a collention view controller
  
  뷰컨트롤러(이하 '뷰컨')는 뷰와 데이터 모델 사이에 다리 역할을 한다.  
  각 뷰컨은 하나의 뷰 계층을 관리하는 역할을 담당한다. 뷰의 컨텐츠를 업데이트하고, UI에 일어난 이벤트를 관리한다.  
  Interface Builder를 사용하여 컬렉션 뷰컨트롤러를 생성해보자.  
  컬렉션뷰는 그리드, 행, 열, 또는 테이블의 형태로 셀을 보여준다.  
    
- Collection view controller scene을 추가한다. 
- 생성된 collection view의 cell 템플릿을 제거한다. (셀을 코드에서 정의할 것이기 때문.)
- Attribute inspector에서 is initial view controller 체크박스를 체크하여 해당 씬을 스토리보드의 엔트리 포인트로 설정 (앱이 스토리보드를 로드할 때 가장 먼저 로드됨.)

> Create a reminder model
  
  structure를 사용하여 모델을 생성한다. Swift 컴파일러가 자동으로 스트럭처에 멤버에 해당하는 이니셜라이저를 생성하기 때문에 따로 이니셜라이저를 생성할 필요가 없다.  
  
```swift 
#if DEBUG
extension Reminder {
}
#endif
```
- #if DEBUG 블락을 사용하여 디버그 모드에서만 컴파일되는 코드를 작성할 수 있다.  
- 디버그 빌드에서 테스팅을 위한 코드를 작성하거나, 샘플 테스트 데이터를 작성할 때 사용할 수 있다. 
- 나는 아래와 같이 내 앱 데이터에 해당하는 샘플 데이터를 생성했다.  

```swift
#if DEBUG
extension LottoWinPointModel {
    static var sampleLottoWinPoints = [
        LottoWinPointModel(currentCount: 10, data: LottoWinPointModelData.sampleLottoWinPointsData, matchCount: 330, page: 1, perPage: 10, totalCount: 330)
    ]
}
extension LottoWinPointModelData {
    static var sampleLottoWinPointsData = [
        LottoWinPointModelData(firstPrizeWinsCount: "5", storeName: "일등복권편의점", orderNumber: "1", region: "대구 달서구"),
        LottoWinPointModelData(firstPrizeWinsCount: "3", storeName: "오케이상사", orderNumber: "2", region: "서울 서초구"),
        LottoWinPointModelData(firstPrizeWinsCount: "2", storeName: "세진전자통신", orderNumber: "3", region: "대구 서구"),
        LottoWinPointModelData(firstPrizeWinsCount: "2", storeName: "라이프마트", orderNumber: "4", region: "인천 중구"),
        LottoWinPointModelData(firstPrizeWinsCount: "2", storeName: "스파", orderNumber: "5", region: "서울 노원구"),
        LottoWinPointModelData(firstPrizeWinsCount: "2", storeName: "노다지복권방", orderNumber: "6", region: "인천 미추홀구"),
        LottoWinPointModelData(firstPrizeWinsCount: "2", storeName: "흥부네박터졌네", orderNumber: "7", region: "인천 계양구"),
        LottoWinPointModelData(firstPrizeWinsCount: "2", storeName: "오천억복권방", orderNumber: "8", region: "광주 서구"),
        LottoWinPointModelData(firstPrizeWinsCount: "2", storeName: "해피+24시편의점", orderNumber: "9", region: "광주 북구"),
        LottoWinPointModelData(firstPrizeWinsCount: "2", storeName: "토큰박스", orderNumber: "10", region: "경기 남양주시"),
    ]
}
#endif
```
 
> Configure the collection as a list
  
  Compositional layout을 사용하여 컬렉션 뷰의 appearance를 설정하기.  
  컴포지셔널 레이아웃은 sections, groups, items와 같은 컴포넌트를 조합하여 뷰를 생성함.  
  아이템이 가장 작은 단위, 아이템의 그룹이 group, 가장 큰 단위가 section.  

- 스토리보드의 Collection view controller를 backing code에 연결하기.
- UICollectionViewController를 상속하는 뷰컨 클래스를 생성.
- 스토리보드의 Custom Class의 클래스를 해당 파일로 변경해주어 클래스 인스턴스에 엑세스할 수 있도록 함. 

```swift
private func listLayout() -> UICollectionViewCompositionalLayout {
    var listConfiguration = UICollectionLayoutListConfiguration(appearance: .grouped)
    listConfiguration.showsSeparators = false
    listConfiguration.backgroundColor = .clear
    return UICollectionViewCompositionalLayout.list(using: listConfiguration)
}
```
  
- UICollectionLayoutListConfiguration은 리스트의 섹션 부분을 생성함.
- 생성한 list configuration을 사용하여 UICollectionViewCompositionalLayout을 리턴함.
  
```swift
override func viewDidLoad() {
    super.viewDidLoad()
    
    let listLayout = listLayout()
    collectionView.collectionViewLayout = listLayout
}
```
  
- 뷰컨이 자신의 뷰 계층을 메모리에 로드한 후, 시스템이 ViewDidLoad() 함수를 호출함.
- viewDidLoad() 함수 안에서 리스트 레이아웃을 생성한 뒤 collectionViewLayout에 할당함.  


> Configure the data source
  
```swift
let cellResistration = UICollectionView.CellRegistration {
    (cell: UICollectionViewListCell, indexPath: IndexPath, itemIdentifier: String) in
    let lottoWinPoint = LottoWinPointModelData.sampleLottoWinPointsData[indexPath.item]
    var contentConfiguration = cell.defaultContentConfiguration()
    contentConfiguration.text = lottoWinPoint.storeName
    cell.contentConfiguration = contentConfiguration
}
```
- CellRegistration을 사용하여 셀의 스타일과 내용(데이터)를 설정한다. 
- defaultContentConfiguration()은 시스템 디폴트 스타일의 셀을 리턴함. 
- contentConfigutation.text는 primary 스타일의 텍스트를 셀에 나타냄.

```swift
typealias DataSource = UICollectionViewDiffableDataSource<Int, String>
    
var dataSource: DataSource!

dataSource = DataSource(collectionView: collectionView, cellProvider: { (collectionView: UICollectionView, indexPath: IndexPath, itemIdentifier: String) in
    return collectionView.dequeueConfiguredReusableCell(using: cellResistration, for: indexPath, item: itemIdentifier)
})
```
  
- typealias를 사용하여 길게 표현된 타입을 짧게 줄일 수 있음. 
- dataSource 변수는 implicitly unwrapped optional 인데, (!를 사용하여 강제로 언래핑) 이것은 위에서처럼 값이 언제나 있을때만 사용해야 함. 
- 새로운 셀을 계속해서 생성할수도 있지만 앱 퍼포먼스를 위하여 리유저블 셀을 사용함. 
  
> Apply a snapshot
  
- Diffable 데이터 소스는 스냅샷을 사용하여 데이터의 상태를 관리함.  
- 스냅샵은 특정 시간 지점의 데이터 상태를 보여줌.  
- 스냅샷을 사용하여 데이터를 보여주기 위해서, 스냅샷을 생성, 보여주길 원하는 데이터의 상태로 스냅샷을 채우고, 스냅샷을 UI에 적용함.
    
```swift
typealias SnapShot = NSDiffableDataSourceSnapshot<Int, String>

var snapshot = SnapShot() // 스냅샷 생성
snapshot.appendSections([0]) // 하나의 섹션 추가
snapshot.appendItems(LottoWinPointModelData.sampleLottoWinPointsData.map { $0.storeName }) // 샘플데이터 중 storeName으로 배열을 생성하여 아이템으로 추가
dataSource.apply(snapshot) // 데이터 소스에 적용하여 데이터의 변경사항이 UI에 적용되도록 함.
collectionView.dataSource = dataSource // 컬렉션 뷰에 데이터소스 적용.
```

# Displaying cell info 

> Organize view controllers
  
UIKit 앱에서 뷰컨은 여러가지 역할을 담당한다. 데이터 소스와 관련된 behavior를 다른 파일로 분리시켜 뷰컨의 역할을 정리해보자. 

```swift
import UIKit

extension WinPointsListViewController {
    typealias DataSource = UICollectionViewDiffableDataSource<Int, String>
    typealias SnapShot = NSDiffableDataSourceSnapshot<Int, String>
    
    func cellRegistrationHandler(cell: UICollectionViewListCell, indexPath: IndexPath, id: String) {
        let lottoWinPoints = LottoWinPointModelData.sampleLottoWinPointsData[indexPath.item]
        var contentConfiguration = cell.defaultContentConfiguration()
        contentConfiguration.text = lottoWinPoints.storeName
        contentConfiguration.secondaryText = "1등 당첨 횟수: \(lottoWinPoints.firstPrizeWinsCount)"
        contentConfiguration.secondaryTextProperties.font = UIFont.preferredFont(forTextStyle: .caption1)
        cell.contentConfiguration = contentConfiguration
    }
}
```
  
- WinPointsListViewController+DataSource라는 이름의 파일을 생성. 
- cellRegistrationHandler 함수를 작성.
- WinPointsListViewController에 있는 cell registration 부분의 trailing closure를 아래 코드로 대체.
  
```swift
let cellResistration = UICollectionView.CellRegistration(handler: cellRegistrationHandler)
```
  
- 뷰컨은 많은 역할을 담당하므로 그 코드가 길어질 수 있기 때문에, 위와 같이 extension을 사용하여 역할 별로 구분된 파일을 생성하여 에러를 찾기 쉽고 새 기능을 쉽게 추가할 수 있도록 해야함.
  
  
# Making reminders identifiable 
  
Diffable data source는 컬렉션 뷰의 아이템들이 가지는 identifier를 담은 리스트를 가지고 있다. 

```swift
struct LottoWinPointModelData: Codable, LottoWinPoint, Identifiable {
    var id: String = UUID().uuidString
}

LottoWinPointModelData.ID
```
  
- Identifiable 프로토콜을 사용하려면 id 속성이 필수로 필요.
- structure이름.ID는 Identifiable 프로토콜의 연관속성으로 위 코드에서는 String의 type alias가 됨.

  
> Create functions for accessing the model

```swift
// extension Array where Element == LottoWinPointModelData
extension [LottoWinPointModelData] {
    func indexOfWinPoint(widhId id: LottoWinPointModelData.ID) -> Self.Index {
        guard let index = firstIndex(where: { $0.id == id }) else {
            fatalError()
        }
        return index
    }
}

func lottoWinPoint(withId id: LottoWinPointModelData.ID) -> LottoWinPointModelData {
    let index = lottoWinPoints.indexOfWinPoint(widhId: id)
    return lottoWinPoints[index]
}

func updateLottoWinPoint(_ lottoWinPoint: LottoWinPointModelData) {
    let index = lottoWinPoints.indexOfWinPoint(widhId: lottoWinPoint.id)
    lottoWinPoints[index] = lottoWinPoint
}
```
- 커스텀 타입 'LottoWinPointModelData' 타입 배열의 extension 생성.
- 배열의 요소가 LottoWinPointModelData 타입일 경우 이 익스텐션 안에 작성된 indexOfWinPoint(withId:) 함수를 사용하여 해당 아이디를 가진 요소의 index를 얻을 수 있게 됨.  
- lottoWinPoint(withId:), updateLottoWinPoint() 함수를 사용하여 각 lottoWinPoint의 id 값으로 배열안의 인덱스 값을 얻을 수 있음. 이 방식으로 lotto win point 데이터를 가져오거나 업데이트 하도록 함. 
  
  
> Wire a target-action pair 
  
Target-action은 디자인 패턴인데, 이벤트가 발생하면 한 객체가 이벤트를 실행하기 위해 다른 객체에 메세지를 보낸다. 

```swift
import UIKit

class LottoWinPointLikedButton: UIButton {
    var id: LottoWinPoint.ID?
}
```
  
- 커스텀 UIButton 클래스를 생성한 뒤, id 속성을 추가한다.
  
```swift
import Foundation

extension WinPointsListViewController {
    @objc func didPressLikedButton(_ sender: LottoWinPointLikedButton) {
        guard let id = sender.id else { return }
        likeLottoWinPoint(withId: id)
    }
}
```
  
- WinPointsListViewController+Actions 파일을 생성한 뒤, 뷰컨의 액션 관련 코드를 분리해줍니다.  
- didPressLikedButton() 함수를 작성하여 해당 버튼의 id를 가져와서 likeLottoWinPoint()를 실행.

