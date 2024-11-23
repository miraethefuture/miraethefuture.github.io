---
title: SwiftUI Tutorials
author: Mirae
date: 2024-04-09
category: TIL
layout: post
--- 
  
# 색 정의하기
> Define colors in the asset catalog
[🔗](https://developer.apple.com/tutorials/develop-in-swift/design-an-interface)

```swift
import SwiftUI

// global property
let gradientColors: [Color] = [
    .gradientTop,
    .gradientBottom
]

struct ContentView: View {
    //...
}
```
에셋 카탈로그에 'GradientTop', 'GradientBottom'라는 이름의 Color set을 추가했습니다.  
Xcode가 자동으로 카멜케이스 스타일의 컬러 밸류를 생성합니다. (.gradientTop, .gradientBottom)  
> 'Gradient_Top'이라는 이름도 .gradientTop으로 변환됩니다.
gradientColors 속성은 최상단 레벨에 작성되었고 이런 프로퍼티(=속성)을 글로벌 프로퍼티라고 합니다.  
글로벌 프로퍼티는 모든 파일, 모든 코드에서 사용할 수 있게 됩니다. 


# Text 뷰

Text 뷰는 읽기 전용 텍스트를 보여주는 뷰입니다. 텍스트 뷰는 타이틀과 같은 짧은 String, 또는 글의 내용과 같이 긴 String을 컨텐츠로 가질 수 있습니다.


# mutating 함수

```swift
// 뷰가 새 레시피를 추가하는 화면을 보이도록 상태를 변경하는 함수
mutating func presentAddRecipe(sidebar: SidebarItem) {
    recipe = Recipe.emptyRecipe()
    // ...
    shouldSaveChanges = false
    isPresented = true
}
```
함수가 위치한 structure 안에 정의된 변수인 shouldSaveChanges, isPresented의 값을 변경시키기 때문에 mutating 키워드를 사용하여 작성함


# .Sheet modifier

```swift
.sheet(isPresented: $recipeEditorConfig.isPresented,
onDismiss: didDismissEditor) {
RecipeEditor(config: $recipeEditorConfig)
}
```
위의 sheet modifier는 recipeEditorConfig.isPresented 값을 바인딩으로 받는다.  
그러므로 isPresented 값을 read / write 할 수 있게 된다. 만약 사용자가 아래 방향으로 스와이핑하여 시트가 아래로 내려가면,  
isPresented의 값이 false로 변경되고, SwiftUI가 뷰를 다시 초기화하고, 다시 그린다. 그러하여 더이상 sheet가 올라와있지 않게 된다.


# Design a custom control

커스텀 컨트롤을 구현하기 전에 생각해 볼 것이 있다.  
어떤 데이터가 필요한지, 그 데이터를 사용하여 뭘 하는지, 그리고 데이터를 뷰에 어떻게 보여줄 것인지이다.  

# Specifying the source of truth

이 샘플 앱은 커스텀 뷰인 DetailView에서 레시피의 세부사항을 보여주는데, DetailView는 레시피의 id만 알고 있다. 
레시피의 세부사항은 recipe box라는 데이터 스토어에 담겨 있는데, 이 세부사항을 가져와 DetailView에서 보여주기 위해 커스텀 바인딩을 사용한다.
DetailView에서 State를 사용하여 원천데이터를 정의하는 것이 아니고, 데이터 스토어에서 커스텀 바인딩과 id를 통해 데이터를 가져오는 것이다.

> Note
> 커스텀을 바인딩은 state 변수로 원천데이터를 정의할 수 없을 떄, state object를 사용하여 모델 데이터를 공유할 수 없을 때만 사용한다.

## 여기서는 왜 커스텀 바인딩을 사용했는가?

```swift
private var recipe: Binding<Recipe> {
    Binding {
            if let id = recipeId {
                return recipeBox.recipe(with: id) ?? Recipe.emptyRecipe()
            } else {
                return Recipe.emptyRecipe()
            }
        } set: { updatedRecipe in
            recipeBox.update(updatedRecipe)
        }
}
```
state 변수를 정의하는 대신, recipe라는 computed property를 선언했다.
recipe는 Recipe를 리턴하지 않고, Recipe 타입의 커스텀 바인딩을 리턴한다.

## 내가 작성한 코드와 다른점

- 이 샘플 앱은 총 3개의 네비게이션 층을 가지고 있다. 카테고리 등을 선택할 수 있는 side bar 부분, 레시피 리스트 부분, 레시피 디테일 부분. 이 세가지의 네비게이션 층을 파일로 생성하였다. 그리고 그 안에서 세부 뷰들을 나눠 파일을 만들었다. 그렇게 하므로써 선언형 코드의 장점을 극대화했다. 전에 내가 작성했던 코드는 물론 더 복잡한 네비게이션 계층을 가지고 있기 때문에 똑같이 작성할 수는 없겠지만, 뷰에 적용될 데이터를 가져오지 못했거나 없을 경우 나타나는 뷰와 데이터가 있을 경우 나타나는 뷰를 한 파일에 작성하고 (DetailView), 데이터가 있을 경우 나타나는 뷰 (RecipeDetailView)를 따로 작성하여, 데이터 유무에 따라 어떤 뷰가 나타날지 한번에 볼 수 있도록 코드를 작성한 것이 눈에 띄였다. (나도 데이터가 없을 경우 나타나는 뷰를 따로 작성하긴 했지만, 데이터가 있을 경우의 뷰는 동일 파일에 작성했었다.)  


- RecipeDetailView와 같은 경우 아래와 같이 작성되었는데, TopView(), BottomView() 구조체를 같은 파일에 private struct 로 작성한 뒤 각 뷰의 필요한 구조체는 따로 다른 파일에 작성하여 한눈에 볼 수 있도록 한 것이 인상 깊었다. 
```swift
struct RecipeDetailView: View {
    @Binding var recipe: Recipe
    
    var body: some View {
        VStack {
            TopView(recipe: $recipe)
            ScrollView {
                BottomView(recipe: recipe)
            }
        }
    }
}
```
