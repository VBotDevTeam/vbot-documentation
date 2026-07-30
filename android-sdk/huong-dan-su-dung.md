---
outline: deep
---

# Hướng dẫn sử dụng

Hướng dẫn tích hợp VBot SDK trên Android.

## Lắng nghe các sự kiện (Listener)

Kế thừa `ClientListener` (open class), override phương thức cần dùng rồi `addListener`:

```kotlin
private var listener = object : ClientListener() {
    // Kết nối tài khoản thành công
    override fun onUserConnected(displayName: String) {
    }

    // Lắng nghe trạng thái đăng ký tài khoản
    override fun onAccountRegistrationState(status: AccountRegistrationState, reason: String) {
        // status: None, Ok, Error, Progress
    }

    // Lắng nghe các trạng thái cuộc gọi thay đổi
    override fun onCallState(state: CallState) {
        // state: Null, Calling, Incoming, Early, Connecting, Confirmed, Disconnected
    }

    // Mã kết thúc cuộc gọi
    override fun onCallEnded(reason: VBotEndCallReason) {
        // reason.code / reason.description
    }

    // Fire khi có cuộc gọi ĐẾN — dùng để map cuộc gọi với hệ thống của bạn
    override fun onExternalCallId(externalCallId: String) {
    }

    // Trạng thái mic thay đổi
    override fun onCallMuteStateChanged(muted: Boolean) {
    }

    // Mất kết nối socket
    override fun onNetworkUnreachable() {
    }

    // Lắng nghe lỗi phát sinh
    override fun onErrorCode(erCode: Int, message: String) {
    }
}

// Đăng ký lắng nghe sự kiện
client.addListener(listener)

// Hủy đăng ký lắng nghe sự kiện khi giải phóng
client.removeListener(listener)
```

`addListener`/`removeListener` an toàn thread. Có thể đăng ký nhiều listener.

## Hotline

```kotlin
// Lấy danh sách hotline (Hàm suspend, cần chạy trong CoroutineScope)
val hotlines = client.getHotlines()   // null → xem onErrorCode

// Trả về danh sách Hotline bao gồm:
// - name: Tên hotline
// - phoneNumber: Số điện thoại hotline
```

## Gọi đi

Để thực hiện cuộc gọi đi, sử dụng hàm `startOutgoingCall`:

```kotlin
val externalCallId = generateId() // tuỳ chọn, tối đa 32 ký tự [a-z0-9], để map với hệ thống của bạn
client.startOutgoingCall(hotline = "1900xxxx", phone = "0901234567", externalCallId = externalCallId) { _, error ->
    if (error != null) {
        // thất bại trước khi đổ chuông (vd: anotherCallInProgress)
    }
}
```

Trong đó:

- **hotline**: Số hotline được sử dụng làm tổng đài gọi đi (có thể để rỗng nếu không dùng đầu số).
- **phone**: Số điện thoại cần gọi.
- **externalCallId**: id tuỳ chọn, gửi kèm header `X-exc-id`.
- Completion `VBotCompletion<Unit>` là **tuỳ chọn** — có overload không completion.

## Gọi đến

Khi nhận được payload cuộc gọi từ Firebase Cloud Messaging (FCM), bạn chuyển giao payload này cho SDK để hiển thị cuộc gọi đến (xem chi tiết ở mục Push Notification).

```kotlin
// Đẩy payload cuộc gọi đến cho SDK xử lý (payload cần chứa key "transId" và "offCall")
client.notificationCall(payloadHashMap)

// Chấp nhận / Trả lời cuộc gọi đến
client.answerCall()

// Từ chối cuộc gọi đến (true = báo bận / Busy Here)
client.declineIncomingCall(isBusy = true)
```

## Thao tác trong cuộc gọi

```kotlin
// Kết thúc cuộc gọi hiện tại
client.endCall()

// Bật/Tắt micro (Mute)
client.muteCall(enable = true)
client.isCallMute()              // trạng thái mic

// Bật/Tắt loa ngoài (Speaker)
client.onOffSpeaker(enable = true)
client.isSpeakerOn()             // trạng thái loa

// Gửi phím DTMF
client.sendDTMF("1")

// Thời lượng cuộc gọi (giây) hoặc null
client.getDuration()

// Lấy thông tin URI/Tên người gọi đến
val remoteName = client.callName()

// Kiểm tra đang có cuộc gọi hoạt động không
client.hasActiveCall()
```

## Xem thêm

### VBotEndCallReason

Enum nguyên nhân kết thúc cuộc gọi, nhận qua `onCallEnded(reason)`. Truy cập giá trị số qua `reason.code` và mô tả qua `reason.description`.

| Case | code | Ý nghĩa |
|---|---|---|
| `normaly` | 1000 | Cuộc gọi kết thúc bình thường |
| `busy` | 1001 | Máy bận |
| `timeOut` | 1004 | Hết thời gian chờ kết nối |
| `noPushToken` | 1018 | Chưa đăng ký push notification |
| `notReadyForStartCall` | 2002 | Chưa sẵn sàng để gọi đi / khởi tạo không thành công |
| `invalidPhoneNumber` | 2004 | Số điện thoại không hợp lệ |
| `noDataFromServer` | 2005 | Không có dữ liệu từ máy chủ |
| `endCallBeforeServerStartCall` | 2006 | Cuộc gọi kết thúc khi chưa kết nối |
| `noSIPCallCreated` | 2007 | Lỗi khi khởi tạo cuộc gọi |
| `dataInvalid` | 2008 | Dữ liệu không hợp lệ |
| `noVBotSIPUser` | 2009 | Không tìm thấy thông tin tài khoản |
| `authenticatedFailed` | 2010 | Xác thực thất bại |
| `anotherCallInProgress` | 2011 | Đang có cuộc gọi khác |
| `decline` | 2013 | Từ chối cuộc gọi |
| `temporarilyUnavailable` | 2014 | Không liên lạc được |
| `reportNewIncomingCallFailed` | 2016 | Không thể tiếp nhận cuộc gọi đến |
| `alertDataNotFound` | 2017 | Dữ liệu thông báo không hợp lệ |
| `setupSIPEndpointFailed` | 2019 | Khởi tạo dịch vụ gọi thất bại |
| `requestCallKitActionFailed` | 2020 | Thực thi hành động cuộc gọi thất bại |
| `noSIPAccount` | 2022 | Tài khoản chưa được cấu hình |
| `incomingCallTimeout` | 2023 | Cuộc gọi đến hết thời gian chờ |
| `unknownError` | 9996 | Lỗi chưa xác định |
| `microphonePermissionDenied` | 9999 | Chưa cấp quyền microphone |

```kotlin
override fun onCallEnded(reason: VBotEndCallReason) {
    when (reason) {
        VBotEndCallReason.normaly -> {
            // Cuộc gọi kết thúc bình thường
        }
        VBotEndCallReason.busy,
        VBotEndCallReason.decline,
        VBotEndCallReason.temporarilyUnavailable -> {
            // Đầu bên kia không nhận cuộc gọi
        }
        else -> {
            Log.d("VBot", "Cuộc gọi kết thúc, mã: ${reason.code}")
        }
    }
}
```

### VBotError

Lỗi trả về qua completion của các hàm `connect`, `disconnect`, `startOutgoingCall`:

```kotlin
class VBotError(val code: Int, val message: String)
```

Với `startOutgoingCall`, `code` trùng giá trị `code` trong bảng `VBotEndCallReason` ở trên. Với các hàm gọi API máy chủ, `code` là mã lỗi API trả về.

```kotlin
client.startOutgoingCall(hotline = "1900xxxx", phone = "0901234567") { _, error ->
    if (error == null) return@startOutgoingCall

    if (error.code == VBotEndCallReason.anotherCallInProgress.code) {
        // Đang có cuộc gọi khác
    }
    Log.d("VBot", "Gọi đi thất bại: ${error.message}")
}
```

::: tip Đối chiếu với iOS SDK
`VBotEndCallReason` trên Android dùng **cùng tên case và cùng bộ mã số** với iOS SDK, nên logic xử lý mã lỗi dùng chung được cho cả hai nền tảng.
:::
