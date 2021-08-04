// main index.js

import { Platform } from "react-native";
import ToastNative from './src/Toast'
import ToastWeb  from "./src/ToastWeb";

const Toast = Platform.OS === 'android' || Platform.OS === 'ios' ? ToastNative : ToastWeb

export default Toast