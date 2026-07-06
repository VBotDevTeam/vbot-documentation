---
outline: deep
---

# Khởi tạo SDK

Hướng dẫn khởi tạo VBot SDK trong project Android.

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

// Connect VBotClient
client.connect(token, tokenFirebase)
```

Các giá trị môi trường khả dụng của `VBotEnvironment`:
- `VBotEnvironment.PRODUCTION`: Kết nối môi trường Production (`https://open-api-h01.vbot.vn/v3.0/`).
- `VBotEnvironment.STAGING`: Kết nối môi trường Staging (`https://open-api-staging.vbot.vn/v3.0/`).
- `VBotEnvironment.SANDBOX`: Kết nối môi trường Sandbox/Test (`https://apivbottest.vpmedia.vn/open-api/`).

## Ngắt kết nối

```kotlin
client.disconnect(
    onSuccess = {
        // disconnect successful
    },
    onFailure = { code, message ->
        // disconnect failure
    }
)
```
