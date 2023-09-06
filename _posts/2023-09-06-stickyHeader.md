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

