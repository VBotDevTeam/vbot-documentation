---
outline: deep
---

# Changelog

Trang này ghi lại các thay đổi của VBot Android SDK. Vui lòng theo dõi để cập nhật tích hợp kịp thời.

## v1.1.1

_Ngày phát hành: 30/07/2026_

### Cập nhật

- **`EndCallReason` đổi tên thành `VBotEndCallReason`**, toàn bộ 23 case chuyển sang camelCase khớp iOS SDK: `Normal` → `normaly`, `Busy` → `busy`, `Unknown` → `unknownError`, `TimeOut` → `timeOut`… Sau bản này, tên case và mã số giống hệt iOS nên logic xử lý mã lỗi dùng chung được cho cả hai nền tảng.
- **`VBotEndCallReason` có thêm `description`** — mô tả lỗi dạng câu, dùng thay cho việc đọc `.name`.
- `onErrorCode(code, message)` và `VBotError.message` trả mô tả đọc được thay vì tên hằng số (ví dụ `"No response from server"` thay cho `"DataEmpty"`).
- `VBotError` có thêm factory `VBotError.from(reason)` và `VBotError.api(code, description)`.

::: warning Nâng cấp từ 1.1.0
App đang khai `onCallEnded(reason: EndCallReason)` hoặc match case theo tên cũ (`Normal`, `Busy`, `Unknown`…) cần đổi sang `VBotEndCallReason` và tên camelCase tương ứng. Nếu đang so sánh mã số, lưu ý `microphonePermissionDenied` đổi từ `999` thành `9999`.
:::

::: tip Cập nhật dependency

```groovy
implementation 'com.github.VBotDevTeam:VBotPhoneSDKAndroid-Public:1.1.1'
```

:::

## v1.1.0

_Ngày phát hành: 26/07/2026_

### Tính năng mới

- **Thin/Shaded AAR — tích hợp một dòng, hết xung đột thư viện:** Toàn bộ thư viện bên thứ ba (retrofit, okhttp, okio, gson, rxjava, Java-WebSocket, slf4j…) được đóng gói sẵn trong SDK dưới namespace riêng (`com.vpmedia.sdkvbot.shaded.*`). Bạn **chỉ khai một dòng** dependency, **không cần** khai lại thư viện nào và **không còn** lỗi "Duplicate class" hay bị ép hạ cấp okio/okhttp.
- **Callback `onCallEnded(reason: EndCallReason)`** trả mã kết thúc cuộc gọi, và **`onExternalCallId`** fire khi có cuộc gọi đến.

### Cập nhật

- **Chuyển repository sang `raw.githubusercontent.com`** (Maven tĩnh, không cần credential), thay cho `jitpack.io`.
- `disconnect()` dùng completion `VBotCompletion` thay cho `onSuccess`/`onFailure`.
- `startOutgoingCall(hotline, phone, externalCallId, completion)` là API gọi đi chính thức; `startCall(...)`, `connect(token, push)` không completion, `disconnect(): Boolean`, `isCall()` được đánh dấu `@Deprecated`.
- SDK **không** tự khai `FirebaseMessagingService` — app sở hữu service và route payload noticall vào `notificationCall(map)`, không tranh chấp `MESSAGING_EVENT` với `firebase_messaging` sẵn có.
- Code nội bộ của SDK được obfuscate; consumer ProGuard rules đã kèm sẵn — app **không cần** khai thêm rule nào kể cả khi bật minify.

::: warning Nâng cấp từ 1.0.x
Xoá toàn bộ các dòng khai báo rxjava / gson / retrofit / okhttp / reactive-streams / timber mà tài liệu cũ yêu cầu, cùng mọi `exclude group: 'com.squareup.okio'`. Đổi repository từ `jitpack.io` sang `raw.githubusercontent.com`.
:::

::: tip Cập nhật dependency

```groovy
implementation 'com.github.VBotDevTeam:VBotPhoneSDKAndroid-Public:1.1.0'
```

:::

## v1.0.12

_Ngày phát hành: 06/07/2026_

### Tính năng mới

- **Hỗ trợ cấu hình môi trường API & Custom Base URL:** Thêm lớp `VBotConfig` và enum `VBotEnvironment` hỗ trợ cấu hình nhanh môi trường kết nối (PRODUCTION, STAGING, SANDBOX) hoặc thiết lập API URL tùy chỉnh qua `customBaseUrl` khi gọi hàm `setup(config)`.

### Cập nhật

- Nâng cấp dependency: `VBotPhoneSDKAndroid-Public:1.0.12`

::: tip Cập nhật dependency

```groovy
implementation 'com.github.VBotDevTeam:VBotPhoneSDKAndroid-Public:1.0.12'
```

:::

## v1.0.11

_Ngày phát hành: 13/02/2026_

### Tính năng mới

- Hàm `startOutgoingCall` hỗ trợ tham số `externalCallId` (tùy chọn), cho phép truyền mã cuộc gọi từ hệ thống bên ngoài để liên kết dữ liệu

### Cập nhật

- Nâng cấp dependency: `VBotPhoneSDKAndroid-Public:1.0.11`

::: tip Cập nhật dependency

```groovy
implementation 'com.github.VBotDevTeam:VBotPhoneSDKAndroid-Public:1.0.11'
```

:::
