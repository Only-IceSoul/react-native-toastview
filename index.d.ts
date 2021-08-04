interface ToastInterface {
    short:number  
    long:number
    show: (msg:string,lenght:number) => void

}
export default class Toast extends ToastInterface {}