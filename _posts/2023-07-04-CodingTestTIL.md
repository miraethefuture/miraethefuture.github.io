---
title: Coding Test TIL
author: Mirae
date: 2023-07-04
category: TIL
layout: post
---

### 백준 10811번: 바구니 뒤집기

```swift
import Foundation

let input = readLine()!.components(separatedBy: " ")

let n = Int(input[0])!
let m = Int(input[1])!

var originArray = Array(1...n)

for _ in 1...m {
    
    let indices = readLine()!.components(separatedBy: " ")
    
    let startIndex = Int(indices[0])!
    
    let endIndex = Int(indices[1])!
    
    // 왜 ... 가 아니고 ..< 이거지?
    let slicedAndReversed = originArray[startIndex-1..<endIndex-1].reversed()
    
    let slicedAndReversedArr = Array(slicedAndReversed)
    
    originArray.removeSubrange(startIndex-1..<endIndex-1)
    originArray.insert(contentsOf: slicedAndReversedArr, at: startIndex)
    
}

// 틀린 부분
print(originArray)

// 틀린 부분 수정 
originArray.forEach { print($0, terminator: " ") } 

// print의 terminator 파라미터는 기본값으로 "\n"을 가짐
// 프린트 되는 값 뒤에 함께 프린트 되는 값으로 기본값이 \n이기 때문에 forEach를 사용하여 여러개의 값을 프린트하면
// line break와 함께 출력됨
// 위 예시 코드에서는 각 요소가 출력 될 때마다 space를 출력함
```

### 프로그래머스 : 내적 

```swift
import Foundation

func solution(_ a:[Int], _ b:[Int]) -> Int {
    let n = a.count
    var array: [Int] = []
    
    for index in 0..<n {
        array.append(a[index] * b[index])
    }
    
    let sumResult = array.reduce(.zero, +)
    
    return sumResult
}
```

- forEach 문은 느리기 때문에 시간제한에 걸릴 수 있음. 


