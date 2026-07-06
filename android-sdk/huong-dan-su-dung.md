---
outline: deep
---

# Hướng dẫn sử dụng

Hướng dẫn tích hợp VBot SDK trên Android.

## Lắng nghe các sự kiện (Listener)

```kotlin
private var listener = object : ClientListener() {
    // Lắng nghe trạng thái đăng ký tài khoản (đăng nhập)
    override fun onAccountRegistrationState(status: AccountRegistrationState, reason: String) {
    }

    // Lắng nghe lỗi phát sinh
    override fun onErrorCode(erCode: Int, message: String) {
    }

    // Lắng nghe các trạng thái cuộc gọi thay đổi
    override fun onCallState(state: CallState) {
    }
}

// Đăng ký lắng nghe sự kiện
client.addListener(listener)

// Hủy đăng ký lắng nghe sự kiện khi giải phóng
client.removeListener(listener)
```
## Hotline

```kotlin
// Lấy danh sách hotline (Hàm suspend, cần chạy trong CoroutineScope)
val hotlines = client.getHotlines()

// Trả về danh sách Hotline bao gồm:
// - name: Tên hotline
// - phoneNumber: Số điện thoại hotline
```

## Gọi đến

Khi nhận được payload cuộc gọi từ Firebase Cloud Messaging (FCM), bạn chuyển giao payload này cho SDK để hiển thị cuộc gọi đến.

```kotlin
// Đẩy payload cuộc gọi đến cho SDK xử lý
client.notificationCall(payloadHashMap)

// Chấp nhận / Trả lời cuộc gọi đến
client.answerCall()

// Từ chối cuộc gọi đến
client.declineIncomingCall(isBusy = false)
```

## Gọi đi

Để thực hiện cuộc gọi đi, sử dụng hàm `startCall`:

```kotlin
client.startCall(hotline = "1900xxxx", phone = "0901234567")
```

Trong đó:
- **hotline**: Số hotline được sử dụng làm tổng đài gọi đi.
- **phone**: Số điện thoại cần gọi.

*Lưu ý: Bạn cần kiểm tra trạng thái kết nối tài khoản trước khi thực hiện cuộc gọi.*

## Thao tác trong cuộc gọi

```kotlin
// Bật/Tắt micro (Mute)
client.muteCall(enable = true)

// Bật/Tắt loa ngoài (Speaker)
client.onOffSpeaker(enable = true)

// Gửi phím DTMF
client.sendDTMF("1")

// Lấy thông tin URI/Tên người gọi đến
val remoteName = client.callName()

// Tắt/Kết thúc cuộc gọi hiện tại
client.endCall()
```
