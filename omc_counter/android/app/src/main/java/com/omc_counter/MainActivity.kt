package com.omc_counter

import android.view.KeyEvent
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.modules.core.DeviceEventManagerModule
import android.util.Log
import com.github.kevinejohn.keyevent.KeyEventModule

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "omc_counter"

  
  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  // Helper to send events to JS
  private fun sendVolumeEvent(event: String) {
    val reactContext = this.reactInstanceManager.currentReactContext
    if (reactContext != null) {
        try {
            Log.d("MainActivity", "Sending event: $event")
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(event, null)
        } catch (e: Exception) {
            Log.e("MainActivity", "Error sending event: $event", e)
        }
    } else {
        Log.w("MainActivity", "ReactContext is null for event: $event")
    }
  }

// override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
//     KeyEventModule.getInstance().onKeyDownEvent(keyCode, event)
//     return super.onKeyDown(keyCode, event)
// }

override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
    if (keyCode == KeyEvent.KEYCODE_VOLUME_UP || keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
        KeyEventModule.getInstance().onKeyDownEvent(keyCode, event)
        return true // Consuma l'evento → non mostra il pannello volume
    }
    return super.onKeyDown(keyCode, event)
}



//   override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
//     when (keyCode) {
//         KeyEvent.KEYCODE_VOLUME_UP, KeyEvent.KEYCODE_VOLUME_DOWN -> {
//             return true // Just block the key, do nothing else
//         }
//     }
//     return super.onKeyDown(keyCode, event)
//   }
}

