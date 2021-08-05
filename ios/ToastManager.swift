//
//  dasd.swift
//  JjToast
//
//  Created by Juan J LF on 3/5/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit

class ToastManager {
     
    static var mArrayMsg = [[String]]()
    static var mIsAnimating = false
    static var mCurrentToast : JJLabel?
    
    static func addToast(_ message:String,_ duration: String){
        mIsAnimating = true
        let timeAnimation = duration == "long"  ? 2.8 : 1.5
        
        let container = UIView()
    
        container.translatesAutoresizingMaskIntoConstraints = false
   
        
        let toast = JJLabel()
        container.addSubview(toast)
        
        let padY = CGFloat(JJScreen.point(p: 18))
        let padX = CGFloat(JJScreen.point(p: 30))

        
        toast.setText(text: message)
            .setTextColor(UIColor.white)
            .setTextAlignment(.center)
            .setFont(UIFont.systemFont(ofSize: JJScreen.point(p: 20)))
            .setClipShape(.dynamicRoundedText)
            .setNumberOfLines(0)
            .setAlpha(0)
            .setPadding(pad: UIEdgeInsets(top: padY, left: padX, bottom: padY ,right: padX ))
            .setBackgroundColor(color: UIColor.parseColor("#F0656565"))
         
        
        if let window = UIWindow.key {
        
        
           var contentSize = CGSize.zero
            message.sizeHeight(width: UIScreen.main.bounds.size.width, font: UIFont.systemFont(ofSize: JJScreen.point(p: 20)), cgSize: &contentSize)
        
            window.addSubview(container)
            toast
                .clWidthLessEqualTo(anchor: container.widthAnchor, multiplier: 0.85)
                .clHeightLessEqualTo(anchor: container.heightAnchor , multiplier: 0.9)
                .clCenterInParentHorizontally()
                .clBottomToBottomParent()
                .clApply()
            container.isUserInteractionEnabled = false
            container.leadingAnchor.constraint(equalTo: window.leadingAnchor).isActive = true
            container.trailingAnchor.constraint(equalTo: window.trailingAnchor).isActive = true
            if #available(iOS 11.0, *) {
                container.topAnchor.constraint(equalTo: window.safeAreaLayoutGuide.topAnchor).isActive = true
            } else {
                container.topAnchor.constraint(equalTo: window.topAnchor).isActive = true
            }

            if #available(iOS 11.0, *) {
                container.bottomAnchor.constraint(equalTo: window.safeAreaLayoutGuide.bottomAnchor, constant: 0).isActive = true
            } else {
                container.bottomAnchor.constraint(equalTo: window.bottomAnchor, constant:  0).isActive = true
            }
        
     
            
           
            UIView.animate(withDuration: 0.55, delay: 0, options: .curveEaseOut, animations: {

                toast.alpha = 1.0

            }) { (isEnded) in


                if(isEnded){
                    UIView.animate(withDuration: timeAnimation, delay: 0, options: .curveEaseOut, animations: {

                        toast.alpha = 2.0

                    }, completion: { (isEnded) in

                        if isEnded {
                            toast.alpha = 1.0
                            UIView.animate(withDuration: 0.55, delay: 0, options: .curveEaseOut, animations: {

                                toast.alpha = 0

                            }, completion: { (isEnded) in
                                
                                DispatchQueue.main.async {
                                  container.removeFromSuperview()
                                }
                                handleEndAnimation()

                            })


                        } else {
                           
                           DispatchQueue.main.async {
                             container.removeFromSuperview()
                           }
                            handleEndAnimation()
                        }

                    })


                } else {
                   DispatchQueue.main.async {
                     container.removeFromSuperview()
                   }
                    handleEndAnimation()
                  
                }
            }
        
        }
    }
  
    static func makeText(message:String,duration: String){
      
        if mIsAnimating {
            mArrayMsg.append([message,duration])
        }else{
            addToast(message,duration)
        }
        
    } //endfunction
        
    static func handleEndAnimation(){
       
        if mArrayMsg.count > 0 {
            let dt = mArrayMsg[0][1]
            let msg = mArrayMsg[0][0]
            mArrayMsg.removeFirst()
            addToast(msg, dt)
        }else{
            mIsAnimating = false
        }
        
    }
    
  
}
