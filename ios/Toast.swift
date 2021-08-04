//
//  JJToastModule.swift
//  JjToast
//
//  Created by Juan J LF on 4/3/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit

@objc(Toast)
class Toast : NSObject, RCTBridgeModule{
    
    static func moduleName() -> String {
        return "Toast"
    }
    
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    @objc func show(_ message:String?,duration:String?){
        let time = duration ?? "short"
        let d = time == "long" ? ToastManager.Duration.LONG : ToastManager.Duration.SHORT
        if message != nil{
            DispatchQueue.main.async {
                ToastManager.makeText(message: message!, duration: d)
            
            }
        }
        
        
    }
    

}
