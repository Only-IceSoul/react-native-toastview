

package com.jjlf.rntoastview;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


import java.util.Objects;

public class ToastModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "Toast";
    }

    @ReactMethod
    public void show(String message, String duration) {
        int dur = Objects.equals(duration, "long") ? Toast.LENGTH_LONG : Toast.LENGTH_SHORT;
        Toast.makeText(reactContext,message,dur).show();
    }
}
