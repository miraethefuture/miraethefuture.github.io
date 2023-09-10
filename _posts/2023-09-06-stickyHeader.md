---
title: LazyVStack의 pinnedHeader 없이 스티키 헤더 만들기
author: Mirae
date: 2023-09-06
category: TIL
layout: post
---

```swift

import SwiftUI

struct ContentView: View {
    
    @State private var hidePointView = false
    @State private var isFirstShown = true
    
    var body: some View {
        
        VStack(spacing: 0) {
            ScrollView {
                VStack(spacing: 0) {
                    LazyVStack(pinnedViews: [.sectionHeaders], content:  {
                        Section(header: tempClearHeader) {
                            videoView
                        }
                    })
                    
                    LazyVStack(pinnedViews: [.sectionHeaders], content: {
                        
                        Section(header: tabViewHeader) {
                            Text("리뷰 모아보기")
                                .font(.system(size: 18, weight: .bold))
                                .frame(height: /*@START_MENU_TOKEN@*/100/*@END_MENU_TOKEN@*/)
                                .padding(.horizontal, 20)
                        }
                    })
                    
                    LazyVStack(pinnedViews: [.sectionHeaders], content: {
                        Section(header: categoryHeader) {
                            tabViewBody
                        }
                    })
                }
            }
            .overlay(alignment: .top) {
                pointViewHeader
                    .opacity(hidePointView ? 0 : 10)
            }
        }
        .padding(.top, 1)
        .background(.yellow)
    }
    
    var pointViewHeader: some View {
        HStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("PointView")
        }
        .frame(minWidth: 0, maxWidth: .infinity)
        .frame(height: 50)
        .foregroundColor(.white)
        .background(.black)
    }
    
    var tabViewHeader: some View {
        HStack {
            Spacer()
            Text("영상 리뷰")
            Spacer()
            Text("포토 리뷰")
            Spacer()
        }
        .frame(minWidth: 0, maxWidth: .infinity)
        .frame(height: 50)
        .foregroundColor(.white)
        .background(.black)
        
    }
    
    var tabViewBody: some View {
        VStack {
            ForEach(0..<3) { row in
                HStack(spacing: 20) {
                    Spacer()
                    Rectangle()
                        .fill(.gray)
                        .frame(minWidth: 0, maxWidth: .infinity)
                        .frame(height: 240)
                        .padding([.top, .bottom])
                    
                    
                    Rectangle()
                        .fill(.gray)
                        .frame(minWidth: 0, maxWidth: .infinity)
                        .frame(height: 240)
                        .padding([.top, .bottom])
                    
                    Spacer()
                }
            }
        }
    }
    
    var categoryHeader: some View {
        HStack {
            Spacer()
            Text("버튼")
            Spacer()
            Text("버튼")
            Spacer()
            Text("버튼")
            Spacer()
            Text("버튼")
            Spacer()
        }
        .frame(minWidth: 0, maxWidth: .infinity)
        .frame(height: 50)
        .foregroundColor(.white)
        .background(.green)
    }
    
    var videoView: some View {
        VStack(spacing: 0) {
            Rectangle()
                .fill(.red)
                .frame(height: 202)
        }
    }
    
    var tempClearHeader: some View {
        HStack {
            Text("temp")
        }
        .frame(minWidth: 0, maxWidth: .infinity)
        .frame(height: 50)
        .foregroundColor(.white)
        .background(.black)
        .onDisappear {
            hidePointView.toggle()
        }
        .onAppear {
            
            if !isFirstShown {
                hidePointView.toggle()
            }
            
            isFirstShown = false
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```
- 탭뷰 헤더는 VStack 사용해도 될 것 같음 -> VStack 바깥에 ScrollView 있기 때문에 화면 밖으로 헤더가 사라져서 안됨.
- LazyVStack Pinned header를 특정 조건에 따라 나타나게 할 수 있을까?
- 전체 LazyVStack을 pointView가 나타날때 아래로 내리면? 
- header 부분만 내릴 수 있음
- all header pinned 가 되는 부분을 찾아야 함



[TrackableScrollView](https://stackoverflow.com/questions/73015997/swiftui-lazyvstack-pinnedviews-in-another)

```swift
//
//  ContentView.swift
//  StickyHeaderWithoutLazy
//
//  Created by Mirae on 9/6/23.
//  * overlay point view -> 위 아래로 움직일 때 나타나는 뷰
//  * 맨 위에는 스티키로 하나 넣고

import SwiftUI

struct ContentView: View {
    
    @State private var allHeaderPinned = false
    @State private var hidePointView = false
    @State private var pullDownView = false
    @State private var scrollOffset = 0.0
    
    var body: some View {
        
        ScrollViewReader { scrollProxy in
            
            OffsettableScrollView { offsetProxy in
                
                if self.scrollOffset > offsetProxy.y {
//                    scrollState = true
                    print("true") // 스크롤
                    withAnimation {
                        hidePointView = true
                        pullDownView = true
                    }
                } else {
//                    scrollState = false
                    print("false") // 역스크롤
                    withAnimation {
                        hidePointView = false
                        pullDownView = false
                    }
                }
                
                self.scrollOffset = offsetProxy.y
                
            } content: {
            
                LazyVStack(spacing: 0, pinnedViews: [.sectionHeaders], content: {
                    
                    // pointViewHeader 자체에서 조건문으로 height 를 변경 (색 맞춰서 보이지 않게)
                    Section(header: pointViewHeader) {
                        videoView
                    }
                    
                    VStack(spacing: 0) {
                        LazyVStack(pinnedViews: [.sectionHeaders], content:  {
                            // on Disppear 시 hidePointView 변경됨)
                            Section(header: tempClearHeader) { }
                        })
                        
                        LazyVStack(spacing: 0, pinnedViews: [.sectionHeaders], content: {
                            
                            Section(header: tabViewHeader) {
                                GeometryReader { geometry in
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text("리뷰 모아보기")
                                            .font(.system(size: 18, weight: .bold))
                                        Text("💰위글 영상 리뷰보고 포인트 쌓자!")
                                            .font(.system(size: 14, weight: .regular))
                                    }
                                    .padding(.horizontal, 20)
                                    .offset(y: geometry.size.height)
                                    .onChange(of: geometry.frame(in: .global).minY) { minY in
                                        withAnimation {
                                            if minY < 0 {
                                                allHeaderPinned = true
                                            } else {
                                                allHeaderPinned = false
                                            }
                                        }
                                        
                                        print("minY: \(minY)")
                                    }
                                    // let _ = print("\(geometry.size.height)") // PRINT: 10.0
                                }
                                .padding(.vertical, 10)
                                
                                LazyVStack(pinnedViews: [.sectionHeaders], content: {
                                    Section(header: categoryHeader) {
                                        tabViewBody
                                    }
                                })
                            }
                        })
                        .offset(y: -1)
                    }
                })
                .background(.yellow)
            }
            .overlay(alignment: .top) {
                withAnimation {
                    pointViewHeader
                        .opacity((allHeaderPinned == true && hidePointView) ? 10 : 0)
                    // overlay는 pinned header들이 아래로 밀리지 않아서 사용할 수 없음
                }
            }
            .padding(.top, 1)
        }
    }
    
    var pointViewHeader: some View {
        HStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("2,759")
                .font(.system(size: 18, weight: .bold))
            Spacer()
        }
        .frame(minWidth: 0, maxWidth: .infinity)
        .frame(height: 50)
        .foregroundColor(.white)
        .background(.black)
    }
    
    var pointViewHeaderOverlay: some View {
        HStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("2,759")
                .font(.system(size: 18, weight: .bold))
            Spacer()
        }
        .frame(minWidth: 0, maxWidth: .infinity)
        .frame(height: 50)
        .foregroundColor(.white)
        .background(.blue)
    }
    
    var tabViewHeader: some View {
        HStack {
            Spacer()
            Text("영상 리뷰")
            Spacer()
            Text("포토 리뷰")
            Spacer()
        }
        .frame(minWidth: 0, maxWidth: .infinity)
        .frame(height: 50)
        .foregroundColor(.white)
        .background(.black)
        .offset(y: (allHeaderPinned == true && pullDownView) ? 50 : 0)
    }
    
    var tabViewBody: some View {
        VStack {
            ForEach(0..<5) { row in
                HStack(spacing: 20) {
                    Spacer()
                    Rectangle()
                        .fill(.gray)
                        .frame(minWidth: 0, maxWidth: .infinity)
                        .frame(height: 240)
                        .padding([.top, .bottom])
                    
                    
                    Rectangle()
                        .fill(.gray)
                        .frame(minWidth: 0, maxWidth: .infinity)
                        .frame(height: 240)
                        .padding([.top, .bottom])
                    
                    Spacer()
                }
            }
        }
    }
    
    var categoryHeader: some View {
        HStack {
            Spacer()
            Button(action: {
                //
            }, label: {
                Text("Button")
            })
            Spacer()
            Text("버튼")
            Spacer()
            Text("버튼")
            Spacer()
        }
        .frame(minWidth: 0, maxWidth: .infinity)
        .frame(height: 50)
        .foregroundColor(.white)
        .background(.green)
        .padding(.top, 50) // 카테고리 헤더가 탭뷰 헤더 아래에 붙도록 패딩 조정
        .offset(y: (allHeaderPinned == true && pullDownView) ? 50 : 0)
    }
    
    var videoView: some View {
        VStack(spacing: 0) {
            Rectangle()
                .fill(.red)
                .frame(height: 202)
        }
    }
    
    var tempClearHeader: some View {
        HStack {
            Text("")
        }
        .frame(minWidth: 0, maxWidth: .infinity)
        .frame(height: 1)
        .foregroundColor(.white)
        .background(.yellow) // 배경이랑 같은 색으로 맞추기
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}


```
