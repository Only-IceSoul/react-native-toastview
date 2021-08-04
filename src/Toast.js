import { NativeModules } from 'react-native';


const t = NativeModules.Toast;


const Toast = {
    short:'short',
    long:'long',
    show:(str,duration)=>{

      t.show(str,duration)
    }
}

export default Toast;
