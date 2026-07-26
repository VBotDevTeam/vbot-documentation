---
outline: deep
---

# Khởi tạo SDK

Hướng dẫn khởi tạo VBot SDK trong project Android.

## Quyền (permissions)

SDK khai sẵn 3 quyền trong manifest của nó: `DISABLE_KEYGUARD`, `POST_NOTIFICATIONS`, `USE_FULL_SCREEN_INTENT`. **App của bạn PHẢI tự khai** trong `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

Và xin **runtime permission** cho `RECORD_AUDIO` (bắt buộc để gọi/nghe) và `POST_NOTIFICATIONS` (Android 13+):

```kotlin
private val permissionLauncher = registerForActivityResult(
    ActivityResultContracts.RequestMultiplePermissions()
) { result ->
    val micGranted = result[Manifest.permission.RECORD_AUDIO] == true
    // micGranted == false → chặn luồng gọi, hướng dẫn user vào Settings bật lại
}

private fun requestCallPermissions() {
    val needed = mutableListOf(Manifest.permission.RECORD_AUDIO)
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        needed.add(Manifest.permission.POST_NOTIFICATIONS)
    }
    permissionLauncher.launch(needed.toTypedArray())
}
```

## Kết nối

```kotlin
// Khởi tạo VBotConfig (Tùy chọn)
val config = VBotConfig(
    environment = VBotEnvironment.PRODUCTION, // Môi trường kết nối: PRODUCTION (mặc định), STAGING, hoặc SANDBOX
    customBaseUrl = null                      // URL API tùy chỉnh nếu muốn ghi đè cấu hình môi trường
)

// Khởi tạo VBotClient
lateinit var client: VBotClient
client = VBotClient(context)
client.setup(config) // Hoặc gọi client.setup() nếu dùng cấu hình mặc định

// Connect VBotClient — trả kết quả một lần qua completion
client.connect(token = "vbot-token", tokenFirebase = "fcm-token") { displayName, error ->
    if (error == null) {
        // Kết nối thành công — displayName là tên hiển thị của tài khoản
    } else {
        // Thất bại — error.code / error.message
    }
}
```

Trong đó:

- **token**: token định danh tài khoản do backend của bạn cấp.
- **tokenFirebase**: FCM push token của thiết bị (để server gửi noticall cuộc gọi đến).

## Ngắt kết nối

`disconnect()` dọn cuộc gọi + SIP, logout trên server, và xoá credential cục bộ. Kết quả trả qua completion `VBotCompletion`:

```kotlin
client.disconnect { _, error ->
    if (error != null) {
        // logout trên server thất bại (offline, timeout...) — nhưng session cục bộ đã xoá
    }
}
```

> Phân biệt: `endCall()` chỉ kết thúc cuộc gọi hiện tại; `disconnect()` đăng xuất hẳn tài khoản.
