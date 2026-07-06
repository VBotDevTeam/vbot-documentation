---
outline: deep
---

# Hướng dẫn tích hợp Flutter

Hướng dẫn tích hợp VBot SDK vào ứng dụng Flutter thông qua giao thức Native Bridge (MethodChannel và EventChannel) sử dụng phiên bản SDK mới nhất cho cả Android và iOS.

::: info Kiến trúc tích hợp
Ứng dụng Flutter sẽ giao tiếp với Native SDK thông qua:
* **MethodChannel:** Để gọi các hàm xử lý từ Flutter xuống Native (khởi tạo, kết nối, gọi điện, gác máy, bật loa...).
* **EventChannel:** Để truyền ngược các sự kiện thay đổi trạng thái cuộc gọi từ Native lên Flutter dưới dạng Stream.
:::

## 1. Cấu hình phía Android

### Cấu hình Repositories và Dependencies

1. Thêm JitPack repository vào tệp `android/settings.gradle` (hoặc `build.gradle` ở thư mục gốc của dự án):
```groovy
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }
    }
}
```

2. Mở tệp `android/app/build.gradle` và thêm các thư viện phụ thuộc bắt buộc cùng với VBot SDK Android phiên bản mới nhất:
```groovy
dependencies {
    // Các thư viện phụ thuộc bắt buộc để SDK hoạt động ổn định
    implementation 'io.reactivex.rxjava2:rxjava:2.2.21'
    implementation 'com.google.code.gson:gson:2.11.0'
    implementation 'com.squareup.retrofit2:retrofit:2.11.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.11.0'
    implementation 'com.squareup.retrofit2:adapter-rxjava2:2.11.0'
    implementation 'org.reactivestreams:reactive-streams:1.0.4'
    implementation 'com.squareup.okhttp3:okhttp:5.0.0-alpha.14'
    implementation 'com.jakewharton.timber:timber:5.0.1'
    implementation 'com.squareup.okhttp3:okhttp-dnsoverhttps:4.9.0'

    // VBot Phone SDK Android Public
    implementation 'com.github.VBotDevTeam:VBotPhoneSDKAndroid-Public:1.0.12'
}
```

### Cấu hình Native Code (Kotlin)

Mở tệp `MainActivity.kt` của dự án và cài đặt MethodChannel và EventChannel:

```kotlin
package com.vpmedia.vbotsdksample

import android.Manifest
import android.annotation.SuppressLint
import android.content.Context
import com.vpmedia.sdkvbot.client.VBotClient
import com.vpmedia.sdkvbot.client.VBotConfig
import com.vpmedia.sdkvbot.client.ClientListener
import com.vpmedia.sdkvbot.en.AccountRegistrationState
import com.vpmedia.sdkvbot.en.CallState
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.EventChannel
import io.flutter.plugin.common.MethodCall
import io.flutter.plugin.common.MethodChannel

class MainActivity : FlutterActivity(), MethodChannel.MethodCallHandler, EventChannel.StreamHandler {

    private var tokenFirebase: String = ""
    private var resultWrapper: ResultWrapper? = null

    companion object {
        @SuppressLint("StaticFieldLeak")
        lateinit var client: VBotClient
        var events: EventChannel.EventSink? = null
        var isIncoming = false

        fun initClient(context: Context) {
            if (::client.isInitialized) return
            client = VBotClient(context)
            // Khởi tạo với cấu hình mặc định (hoặc truyền cấu hình môi trường)
            client.setup(VBotConfig())
        }
    }

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        initClient(context)
        client.addListener(listener)

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, "com.vpmedia.vbot-sdk/vbot_phone")
            .setMethodCallHandler(this)

        EventChannel(flutterEngine.dartExecutor.binaryMessenger, "com.vpmedia.vbot-sdk/call")
            .setStreamHandler(this)
    }

    private var listener = object : ClientListener() {
        override fun onAccountRegistrationState(status: AccountRegistrationState, reason: String) {
            if (status == AccountRegistrationState.Ok) {
                resultWrapper?.success(mapOf("displayName" to client.getAccountUsername()))
            } else if (status == AccountRegistrationState.Error) {
                resultWrapper?.error("ERROR", reason, null)
            }
        }

        override fun onCallState(state: CallState) {
            runOnUiThread {
                val stateStr = when (state) {
                    CallState.Null -> "none"
                    CallState.Calling, CallState.Early -> "calling"
                    CallState.Incoming -> "incoming"
                    CallState.Connecting -> "connecting"
                    CallState.Confirmed -> "confirmed"
                    else -> "disconnected"
                }
                events?.success(mapOf(
                    "state" to stateStr,
                    "isIncoming" to isIncoming
                ))
            }
        }
    }

    override fun onMethodCall(call: MethodCall, result: MethodChannel.Result) {
        resultWrapper = ResultWrapper(result)
        when (call.method) {
            "connect" -> {
                val token = call.argument<String>("token") ?: ""
                client.connect(token, tokenFirebase)
            }
            "disconnect" -> {
                val status = client.disconnect()
                result.success(mapOf("disconnect" to status))
            }
            "startCall" -> {
                val phoneNumber = call.argument<String>("phoneNumber") ?: ""
                val hotline = call.argument<String>("hotline") ?: ""
                isIncoming = false
                client.startCall(hotline, phoneNumber)
                result.success(mapOf("phoneNumber" to phoneNumber))
            }
            "answer" -> client.answerCall()
            "hangup" -> client.endCall()
            "mute" -> client.muteCall(true)
            "speaker" -> client.onOffSpeaker(true)
            else -> result.notImplemented()
        }
    }

    override fun onListen(arguments: Any?, events: EventChannel.EventSink?) {
        MainActivity.events = events
    }

    override fun onCancel(arguments: Any?) {
        events = null
    }
}
```

---

## 2. Cấu hình phía iOS

### Cấu hình Podfile

> [!WARNING]
> VBot iOS SDK chỉ hoạt động trên thiết bị thật, không hỗ trợ trình giả lập (Simulator).

Mở tệp `ios/Podfile` và thêm cấu hình:

```ruby
platform :ios, '13.5'
source "https://github.com/CocoaPods/Specs.git"

target 'Runner' do
  use_frameworks! :linkage => :static

  # VBot Phone SDK iOS Public
  pod 'VBotPhoneSDKiOS-Public', '1.1.7'
end

post_install do |installer|
  installer.pods_project.targets.each do |target|
     target.build_configurations.each do |config|
      # Cấu hình bắt buộc để biên dịch SDK
      config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
    end
  end
end
```

Chạy lệnh cài đặt pod:
```bash
cd ios && pod install
```

### Cấu hình Background Modes và Microphone

1. Bật tính năng trong Xcode Project:
   * Vào **Xcode Project → Target Runner → Signing & Capabilities**
   * Bật **Background Modes** và thêm các quyền:
     * *Audio, AirPlay, and Picture in Picture*
     * *Voice over IP (VoIP)*
     * *Background Fetch*
     * *Remote notifications*

2. Mở tệp `ios/Runner/Info.plist` và thêm khóa xin quyền Microphone:
```xml
<key>NSMicrophoneUsageDescription</key>
<string>Quyền truy cập Microphone để thực hiện cuộc gọi VoIP.</string>
```

### Cấu hình Native Code (Swift)

Mở tệp `ios/Runner/AppDelegate.swift` và thiết lập kết nối:

```swift
import Flutter
import UIKit
import VBotPhonePublic
import PushKit

@main
@objc class AppDelegate: FlutterAppDelegate, FlutterStreamHandler, VBotPhoneDelegate {
    private var eventSink: FlutterEventSink?
    let client = VBotPhone.sharedInstance
   
    override func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        GeneratedPluginRegistrant.register(with: self)
      
        // Cấu hình VBot SDK
        let config = VBotConfig(
            supportPopupCall: false,
            includesCallsInRecents: true,
            iconTemplateImageData: UIImage(named: "callkit-icon")?.pngData(),
            environment: .production
        )
        
        client.setup(with: config)
        client.addDelegate(self)
        
        let controller = window?.rootViewController as! FlutterViewController
        
        // MethodChannel
        let vbotChannel = FlutterMethodChannel(name: "com.vpmedia.vbot-sdk/vbot_phone", binaryMessenger: controller.binaryMessenger)
        vbotChannel.setMethodCallHandler(self.methodCall)
        
        // EventChannel
        let callChannel = FlutterEventChannel(name: "com.vpmedia.vbot-sdk/call", binaryMessenger: controller.binaryMessenger)
        callChannel.setStreamHandler(self)
      
        return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    }
    
    func methodCall(_ call: FlutterMethodCall, result: @escaping FlutterResult) {
        switch call.method {
        case "connect":
            let token = (call.arguments as? [String: Any])?["token"] as? String ?? ""
            client.connect(token: token) { displayName, error in
                if let error = error {
                    result(FlutterError(code: "ERROR", message: error.localizedDescription, details: nil))
                } else {
                    result(["displayName": displayName])
                }
            }
        case "disconnect":
            client.disconnect { error in
                result(["disconnect": error == nil])
            }
        case "startCall":
            let number = (call.arguments as? [String: Any])?["phoneNumber"] as? String ?? ""
            let hotline = (call.arguments as? [String: Any])?["hotline"] as? String ?? ""
            client.startOutgoingCall(name: "", number: number, hotline: hotline) { resultAPI in
                result(["phoneNumber": number])
            }
        case "answer":
            client.answerCall()
        case "hangup":
            client.endCall()
        case "mute":
            client.muteCall(enable: true)
        case "speaker":
            client.speaker(enable: true)
        default:
            result(FlutterMethodNotImplemented)
        }
    }

    // Lắng nghe sự kiện thay đổi trạng thái từ SDK truyền lên Flutter
    func callStateChanged(state: VBotCallState) {
        let stateStr: String
        switch state {
        case .none: stateStr = "none"
        case .calling, .early: stateStr = "calling"
        case .incoming: stateStr = "incoming"
        case .connecting: stateStr = "connecting"
        case .confirmed: stateStr = "confirmed"
        default: stateStr = "disconnected"
        }
        eventSink?(["state": stateStr, "isIncoming": client.isIncomingCall()])
    }

    func onListen(withArguments arguments: Any?, eventSink events: @escaping FlutterEventSink) -> FlutterError? {
        self.eventSink = events
        return nil
    }

    func onCancel(withArguments arguments: Any?) -> FlutterError? {
        self.eventSink = nil
        return nil
    }
}
```

---

## 3. Quản lý phía Flutter (Dart)

Tạo tệp `vbot_phone_manager.dart` để bọc và xuất các phương thức ra ngoài để gọi từ giao diện Flutter:

```dart
import 'dart:async';
import 'package:flutter/services.dart';

class VBotPhoneManager {
  static final VBotPhoneManager _instance = VBotPhoneManager._internal();
  factory VBotPhoneManager() => _instance;
  VBotPhoneManager._internal();

  static const MethodChannel _methodChannel = MethodChannel('com.vpmedia.vbot-sdk/vbot_phone');
  static const EventChannel _eventChannel = EventChannel('com.vpmedia.vbot-sdk/call');

  final StreamController<Map<String, dynamic>> _callStateController = StreamController<Map<String, dynamic>>.broadcast();
  StreamSubscription<dynamic>? _eventSubscription;

  Stream<Map<String, dynamic>> get callStateStream => _callStateController.stream;

  Future<void> init() async {
    _eventSubscription = _eventChannel.receiveBroadcastStream().listen(
      (event) {
        final map = Map<String, dynamic>.from(event as Map);
        _callStateController.add(map);
      },
      onError: (e) => print("Stream error: $e"),
    );
  }

  Future<String?> connect(String token) async {
    final result = await _methodChannel.invokeMethod('connect', {'token': token});
    return (result as Map)['displayName'] as String?;
  }

  Future<bool> disconnect() async {
    final result = await _methodChannel.invokeMethod('disconnect');
    return (result as Map)['disconnect'] as bool;
  }

  Future<String?> startCall(String phoneNumber, String hotline) async {
    final result = await _methodChannel.invokeMethod('startCall', {
      'phoneNumber': phoneNumber,
      'hotline': hotline,
    });
    return (result as Map)['phoneNumber'] as String?;
  }

  Future<void> answer() async => await _methodChannel.invokeMethod('answer');

  Future<void> hangup() async => await _methodChannel.invokeMethod('hangup');

  Future<void> mute() async => await _methodChannel.invokeMethod('mute');

  Future<void> speaker() async => await _methodChannel.invokeMethod('speaker');

  void dispose() {
    _eventSubscription?.cancel();
    _callStateController.close();
  }
}
```
