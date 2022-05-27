---
title: "심화 Swift"
categories:
  - TIL
tags:
  - learning
  - 공부 기록
  - Swift
show_date: true
toc: true
toc_sticky: true
toc_label: " "
toc_icon: "kiwi-bird"
#header:
#  teaser: /assets/images/choose2.png
---

<sub>📂 Swift language guide 외의 정보들을 기록합니다.</sub>

# Completion Handler

  Completion handler는 어떤 task가 완료된 후에 호출되는 callback function이다.  
  Callback function은 어떤 function의 인자(argument)로 통과된 function을 말한다.

# Concurrency  

## Parallel Code  

  Swift는 구조화된 방식으로 비동기 및 병렬 코드를 작성할 수 있도록 돕는 내장 지원을 가지고 있습니다. (코드를 작성할 수 있는 방식 또는 키워드를 가지고 있는 거겠죠?)  

  Asynchronous code(비동기 코드)는 중단되었다가 다시 시작될 수 있습니다.

  Parallel code(병렬 코드)는 여러개의 코드가 동시에 동작하는 것을 의미합니다. 예를 들어 4 코어 프로세서를 가진 컴퓨터는 네개의 코드를 동시에 실행할 수 있습니다. 각각의 코어는 하나의 일을 수행합니다. 병렬(parallel) 그리고 비동기(asynchronous)코드는 한번에 여러개의 작업을 수행합니다.  
  이것은 외부 시스템을 기다리고 있는 작업을 중지시킵니다.(?) 그리고 memory-safe한 방식으로 코드를 작성하기 쉽도록 만들어 줍니다.  

  아래 설명에서 concurrency라는 단어는 비동기적(asynchronous) 코드와 병렬(parallel)코드의 일반적인 콤비네이션을 나타내기 위해 사용됩니다.  

  Swift 언어의 지원 없이도 concurrent 코드를 작성할 수 있지만, 그렇게 작성된 코드들은 알아보기 어려운 경우가 많습니다.  
  예를 들면, 아래의 코드는 사진의 이름 목록을 다운로드 하고, 목록의 첫번째 사진을 다운로드 합니다. 그리고 그 사진을 사용자에게 보여줍니다.

  ```swift
  listPhotos(inGallery: "Summer Vacation") { PhotoNames in
      let sortedNames = photoNames.sorted()
      let name = sortedNames[0]
      downloadPhoto(name: name) { photo in
          show(photo)
      }  
  }
  ```  

  이렇게 간단한 경우에도, 여러개의 completion handler로 코드가 작성되어야 했기 때문에 결국 nested 클로저를 작성하게 됩니다.  
  이런 방식으로는, nesting이 더 깊어짐과 함께 코드가 복잡해지고 다루기 어려워집니다.

# Codable   

  Codable은 Encodable 프로토콜과 Decodable프로토콜을 합친 type alias입니다.  
  이 프로토콜을 사용하면 JSON 파일로부터 데이터를 가져와 순서대로 출력하거나, 반대로 JSON 파일로 데이터를
  순서대로 출력시킬 수 있는 Codable API를 사용할 수 있습니다.
