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
    override fun onCallEnded(reason: EndCallReason) {
        // reason.code / reason.name
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
        // thất bại trước khi đổ chuông (vd: register timeout, AnotherCallInProgress)
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
