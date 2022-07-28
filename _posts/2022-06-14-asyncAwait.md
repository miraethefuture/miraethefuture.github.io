---
title: "async/await in Swift"
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
#  teaser: /assets/images/scrum5.png
---

# Functions: 동기 / 비동기  


  UIKit은 UIImage로 썸네일을 생성하는 기능을 제공합니다. 아래의 코드를 보면 알 수 있듯이 동기 함수와 비동기 함수 두가지의 방법으로 이 task를 수행할 수 있습니다.

  ```swift
  // UIImage

  // synchronous function (동기)
  func preparingThumbnail(of size: CGSize) -> UIImage?

  // asynchronous function (비동기)
  func prepareThumbnail(of size: CGSize, completionHandler: @escaping (UIImage?) -> Void)
  ```

  ```swift
  func fetchThumbnail(for id: String) async throws -> UIImage {
      let request = thumbnailURLRequest(for: id)
      let (data, response) = try await URLSession.shared.data(for: request)
      guard (response as? HTTPURLResponse)?.statusCode == 200 else { throw FetchError.badID }
      let maybeImage = UIImage(data: data)
      guard let thumbnail = await maybeImage?.thumbnail else { throw FetchError.badID }
      return thumbnail
  }
  ```
