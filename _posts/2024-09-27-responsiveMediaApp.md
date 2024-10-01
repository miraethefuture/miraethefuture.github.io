---
title: Create a more responsive media app (WWDC)
author: Mirae
date: 2024-09-27
category: TI 
layout: post
---
[Create a more responsive media app (WWDC)](https://developer.apple.com/videos/play/wwdc2022/110379/?time=249)

# AVFoundation을 사용하여 더 반응이 빠른 미디어 앱 만들기

- 썸네일을 보여주거나, 어러개의 미디어를 하나의 컴포지션으로 합치거나, 에셋의 정보를 얻는 등의 작업은 데이터를 로딩하는 작업이 필요합니다. 비디오처럼 큰 파일은 데이터를 로딩하는 작업에 긴 시간이 걸릴 수 있습니다. 이런 작업을 메인 스레드에서 동기적으로 실행하게 되면 레이턴시 이슈가 발생할 수 있습니다.
- AVFoundation의 도구들을 사용하여 데이터를 비동기적으로 로드한 뒤, 데이터 로딩 작업이 끝난 후 UI를 업데이트 하여, 앱이 위와 같은 문제없이 responsive하게 동작할 수 있습니다.

## Generating thumbnails

AVAssetImageGenerator로부터 이미지를 얻는 것은 썸네일을 만드는 좋은 방법입니다.  
하지만 이미지를 생성하는 것은 실행 즉시 이루어지지 않습니다.  
이미지를 생성하기 위해서, image generator는 비디오 파일의 프레임 데이터를 먼저 로드해야 합니다.  
원격 서버나 인터넷에서 비디오 파일을 가져온다면 프레임 데이터를 로딩하는 작업이 훨씬 느리게 진행되기 때문에 이미지를 생성하는 방법을 신중히 선택해야 합니다.  
아래 코드에서 사용된 copyCGimage는 데이터를 메인스레드에서 동기적으로 로드합니다. 비디오가 로딩되길 기다리는 동안 UI는 멈춰버립니다.  

```swift
func thumbnail() throws -> UIImage {
    let generator = AVAssetImageGenerator(asset: asset)
    let thumbnail = try generator.copyCGImage(at: time, actualTime: nil)
    return UIImage(cgImage: thumbnail)
}
```

### image(at: time)
image(at: time) 메서드를 사용하여 이미지 제너레이터가 데이터를 로딩하는 동안 호출된 스레드를 해제시켜 위와 같은 문제를 해결할 수 있습니다.  

```swift
func thumbnail(asset: AVAsset) async throws -> UIImage {
    let generator = AVAssetImageGenerator(asset: asset)
    let thumbnail = try await generator.image(at: CMTime.zero).image // time 설정 필요
    return UIImage(cgImage: thumbnail)
}
```  

위 코드에서 이미지 제너레이터는 튜플 (image: CGImage, actualTime: CMTime)을 리턴합니다.  
actual time은 에셋에서 해당 이미지의 actual time입니다. actual time은 몇가지 이유로 요청한 타임과 같지 않을 수 있습니다.  
위 코드와 같이 .image를 사용하여 이미지에만 접근할 수도 있습니다.  
  
압축된 비디오의 프레임 중 IFrame은 다른 프레임들보다 로드하기 쉽습니다. 다른 프레임과 상관없이 독립적으로 디코딩되기 때문입니다.  
다른 프레임들은 가까이 있는 프레임에 의존하여 디코딩됩니다.   
그렇기 때문에 이미지 제너레이터는 기본적으로 요청한 시간과 가장 가까운 iFrame을 사용하여 이미지를 생성합니다.  
아래와 같이 tolerance를 zero로 설정하여 요청한 정확한 시간의 썸네일을 얻을 수 있지만, 요청한 시간의 프레임이 iFrame이 아닐 경우  
해당 프레임을 디코딩하기 위해 근처에 있는 프레임들까지 로딩해야할 수 있습니다.  

```swift
func thumbnail(asset: AVAsset) async throws -> UIImage {
    let generator = AVAssetImageGenerator(asset: asset)
    generator.requestedTimeToleranceBefore = .zero
    generator.requestedTimeToleranceAfter = .zero
    let thumbnail = try await generator.image(at: CMTime.zero).image // time 설정 필요
    return UIImage(cgImage: thumbnail)
}
```  
  
아래와 같이 더 넓은 tolerance를 줄 수 있습니다. 제너레이터가 더 많은 프레임 선택지를 갖게 함으로써 데이터 로딩을 줄일 수 있게 됩니다.  
프레임을 더 적게 로드할 수록 더 빠르게 이미지를 리턴할 수 있게 됩니다.  

```swift
func thumbnail(asset: AVAsset) async throws -> UIImage {
    let generator = AVAssetImageGenerator(asset: asset)
    generator.requestedTimeToleranceBefore = .zero
    generator.requestedTimeToleranceAfter = CMTime(seconds: 3, preferredTimescale: 600)
    let thumbnail = try await generator.image(at: CMTime.zero).image // time 설정 필요
    return UIImage(cgImage: thumbnail)
}
```

## Generate a series of thumbnails

여러개의 time으로 부터 섬네일들을 가져오기 위해서는, images(for: times)를 사용합니다.  
images(for: times)는 Async Sequence를 사용하여 결과값을 제공합니다.  
시퀀스를 사용하면 for in loop를 사용하여 items를 iterate할 수 있습니다.  
아래의 코드처럼 items(generator.images(for: times))가 한번에 가져올 수 없는 값이라면,  
async 시퀀스를 사용하여 각각의 iteration마다 다음 요소를 기다리도록 할 수 있습니다.  


```swift
func timelineThumbnails(for times: [CMTime], asset: AVAsset) async {
    let generator = AVAssetImageGenerator(asset: asset)
    
    for await result in generator.images(for: times) {
        // ...
    }
}
```

