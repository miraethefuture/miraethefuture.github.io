---
title: 여러 개의 비동기적 네트워크 요청을 동시에 보내기
author: Mirae
date: 2023-04-06
category: TIL
layout: post
---

[iOS App Dev Tutorials - Managing structured concurrency](https://developer.apple.com/tutorials/app-dev-training/managing-structured-concurrency) 
[Documentation/The Swift Programming/Language/Concurrency](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/) 
> 위 내용을 참고


## Concurrency  

Concurrency는 비동기적이고 병렬적인 작업을 수행하는 것, 그 작업을 수행하는 코드를 의미합니다.  
Swift는 비동기 코드, 병렬 코드를 구조화된 방식으로 작성할 수 있도록 지원하는데요.  
비동기 코드는 무엇이고, 병렬 코드는 또 무엇이고 구조화된 방식은 어떤 방식을 말하는 걸까요?  
  
  1. 비동기 코드 (Asynchronous Code)  
  프로그램이 실행되고 있다고 상상해 봅시다. 순서대로 실행되던 중 여러개의 이미지 파일을 다운로드 하는 함수를 실행하는 코드를 만났는데 그 아래에 UI를 업데이트하는 코드가 있다면, 이미지 파일을 모두 다운로드해서 리턴할 때까지 UI는 그려지지 않고 있겠죠? 사용자는 UI가 그려질 때까지 기다려야 하므로 좋은 프로그램이 아니게 됩니다. 이때 사용할 수 있는 것이 비동기 코드입니다. 예시로 들었던 이미지를 다운로드하는 함수를 비동기 함수로 작성하면, 이미지가 다운로드 되는 동안 전체 프로그램 흐름에서 비동기 코드는 잠시 일시 정지하고 다음에 실행될 코드인 UI 업데이트를 수행합니다. 그리고 이미지가 모두 다운로드 되어 결과가 리턴되면 다시 비동기 코드를 시작하는 것입니다.  
  2. 병렬 코드 (Paralllel Code)  
  병렬코드는 여러개의 코드를 동시에 실행하는 것을 의미합니다.  
  
  결과적으로, 위 두개의 방식을 사용하여 여러개의 작업을 한번에 실행할 수 있습니다.
  
  
