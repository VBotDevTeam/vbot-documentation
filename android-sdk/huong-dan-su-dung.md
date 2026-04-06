---
outline: deep
---

# Hướng dẫn sử dụng

Hướng dẫn tích hợp VBot SDK trên Android.

## Lắng nghe các sự kiện

```KOTLIN
private var listener = object : VBotListener() {
	// Lắng nghe trạng thái Account register
	override fun onConnectState(state: ConnectState, reason: String) {
	}

	// Lắng nghe lỗi
	override fun onErrorCode(erCode: Int, message: String) {
	}

	// Lắng nghe trạng thái cuộc gọi
	override fun onCallState(state: VBotCallState) {
	}
}
```

## Hotline

```KOTLIN

// Lấy danh sách hotline
client.getHotlines()

// Trả về danh sách Hotline
// ⦁ listHotline: Dánh sách Hotline
// ⦁ Name
// ⦁ PhoneNumber
```

## Gọi đến

```KOTLIN
// Tạo cuộc gọi đến
client.startIncomingCall(hashMap)

// Tắt cuộc gọi
client.endcall()

// Trả lời cuộc gọi
client.answerCall()
```

## Gọi đi

```KOTLIN
// Tạo cuộc gọi đi
client.startOutgoingCall(name, hotline, phoneNumber, externalCallId)
```

Trong đó:

- **name**: Tên người nhận
- **hotline**: Số hotline sử dụng
- **phoneNumber**: Số điện thoại cần gọi
- **externalCallId** _(tùy chọn)_: Mã cuộc gọi từ hệ thống bên ngoài, dùng để liên kết dữ liệu cuộc gọi

## Thao tác trong cuộc gọi

```KOTLIN

// Bật/Tắt micro
client.muteCall(isMute)

// Bật/Tắt loa
client.speaker(isSpeaker)

// Gửi DTMF
client.senDTMF(string)

// Lấy tên người gọi đến
client.getRemoteAddressCall()

// Tắt cuộc gọi
client.endcall()
```
