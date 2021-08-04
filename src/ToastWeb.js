
var arrmsg = []
const toastID = "toastuniqueWebjjlf"
const toastViewId = "toasviewjjlf"
var isAnimating = false
var currentResizeObserver = null
var resizeBlock = false
const addToast = (message,duration) =>{
    isAnimating = true

    const parentModal = document.createElement('div')
    parentModal.id = toastID
    parentModal.style.height = "100vh"
    parentModal.style.width = "100vw"
    parentModal.style.left = "0"
    parentModal.style.top = "0"
    parentModal.style.position = "fixed"
    parentModal.style.zIndex = "2000"
    parentModal.style.pointerEvents = "none"

    parentModal.addEventListener('animationend', () => {
        let el = document.getElementById(toastID)
        if(el === undefined || el === null){
             
        }else{
            resizeBlock = false
            currentResizeObserver.unobserve(document.getElementById(toastViewId))
            document.body.removeChild(el)
        }

        if(arrmsg.length > 0){
            let dt = arrmsg[0][1]
            let msg = arrmsg[0][0]
            arrmsg.shift()
            addToast(msg,dt)
        }else{
            isAnimating = false
        }
      });

      const containerToast = document.createElement('div')
  
     
      containerToast.style.height = "fit-content"
      containerToast.style.width = "100vw"
      containerToast.style.left = "0"
      containerToast.style.bottom = "0"
      containerToast.style.position = "absolute"
      containerToast.style.pointerEvents = "none"
      containerToast.style.display = "flex"
      containerToast.style.justifyContent = "center"
      containerToast.style.padding = "0px 5vw"
      containerToast.style.boxSizing = "border-box"

      const styleView = document.createElement('style')
      styleView.innerHTML = `
      .toastweb-animation{
          width: fit-content;
          height: fit-content;
          background-color: #656565F0;
          box-sizing: border-box;
          overflow: hidden;
          animation: toastweb-key ${duration === 'long' ? 3700 : 2400}ms cubic-bezier(.32,0,.07,1) forwards;
      }

      .toastweb-text{
          padding: 0em 2em;
          color: white;
          font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
          font-size: 18px;
      }
      
      ${ duration === 'long' ?
    `@keyframes toastweb-key {
          0% {
              opacity: 0; 
          }
          13% {
              opacity: 1;
          }
          87%{
              opacity: 1;
          }
          100%{
              opacity: 0;
          }
      }`
        :
          `@keyframes toastweb-key {
              0% {
              opacity: 0; 
              }
              28% {
              opacity: 1;
              }
              72%{
              opacity: 1;
              }
              100%{
                  opacity: 0;
              }
          } `
      }

            /* 
        ##Device = Desktops
        ##Screen = 1281px to higher resolution desktops
     

        @media (min-width: 1281px) {
            
        }

        */
        /* 
        ##Device = Laptops, Desktops
        ##Screen = B/w 1025px to 1280px
        */

        @media (min-width: 1025px) and (max-width: 1280px) {

            .toastweb-text{
                font-size: 18px;
            }
        }

        /* 
        ##Device = Tablets, Ipads (portrait & landscape)
        ##Screen = B/w 768px to 1024px
        */

        @media (min-width: 768px) and (max-width: 1024px) {
            .toastweb-text{
                padding: 0em 1em;
                font-size: 28px;
            }
        }
        @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
            .toastweb-text{
                padding: 0em 1em;
                font-size: 28px;
            }
        }

        /* 
        ##Device = Low Resolution Tablets, Mobiles 
        ##Screen = B/w 481px to 767px
        */

        @media (min-width: 481px) and (max-width: 767px) {
            .toastweb-text{
                padding: 0em 1em;
                font-size: 18px;
            }
        }
        /* 
        ##Device = Most of the Smartphones Mobiles (Portrait)
        ##Screen = B/w 320px to 479px
        */

        @media (min-width: 320px) and (max-width: 480px) {

            .toastweb-text{
                padding: 0em 1em;
                font-size: 15px;
            }

        }
        @media (min-width: 200px) and (max-width: 319px) {

            .toastweb-text{
                padding: 0em 1em;
                font-size: 13px;
            }

        }

      `

     
      const toastView = document.createElement('div')
      currentResizeObserver = new ResizeObserver((entries)=>{
             if(!resizeBlock){
                resizeBlock = true
                let target = entries[0].target
                let rect = entries[0].contentRect
                let min = Math.min(rect.width,rect.height)
                let maxHeightRadius = window.innerHeight * 0.10
                let maxHeight = window.innerHeight * 0.9
                let radius = rect.height >= maxHeightRadius ? 20 : min / 2
                let bottomPad = rect.height >= maxHeight ? 0 : 5
                let overflow = rect.height >= maxHeight 
                target.style.padding = `0px ${radius/2}px`
                target.style.borderRadius = `${radius}px`
                target.style.marginBottom = `${bottomPad}vh`
                target.style.height = `${overflow ? '90vh' : 'fit-content'}`
             }
          
         
      })
      currentResizeObserver.observe(toastView)
      toastView.id = toastViewId
      toastView.className = "toastweb-animation"
      toastView.innerHTML = `
             <p class='toastweb-text'>${message}</p>
      `

      containerToast.appendChild(styleView)
      containerToast.appendChild(toastView)
      parentModal.appendChild(containerToast)
    document.body.appendChild(parentModal)
}

const ToastWeb = {
    short:'short',
    long:'long',
    show:(str,d)=>{
        if(!isAnimating ){
           addToast(str,d)
        }else{
            arrmsg.push([str,d])
        }
    }
}

export default ToastWeb;
