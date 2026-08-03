---
outline: deep
---

# Changelog

Trang này ghi lại các thay đổi của VBot iOS SDK. Vui lòng theo dõi để cập nhật tích hợp kịp thời.

## v1.1.8

_Ngày phát hành: 03/08/2026_

### Tính năng mới

- Delegate `callEnded(reason: VBotEndCallReason, endedBy: VBotCallEndParty)` cho biết nguyên nhân và bên kết thúc cuộc gọi. Delegate cũ `callEnded(reason:)` vẫn tương thích ngược.
- SDK map SIP final response/BYE: ví dụ `486` → `busy` / `callee`, `487` → `callerCanceled` / `caller`, `500` → `connectionError` / `server`.
- `VBotEndCallReason` và `VBotCallEndParty` có `key` và `description` public để hiển thị và analytics.

::: tip Cập nhật Podfile

```ruby
pod 'VBotPhoneSDKiOS-Public', :git => 'https://github.com/VBotDevTeam/VBotPhoneSDKiOS-Public.git', :tag => '1.1.8'
```

:::

## v1.1.7

_Ngày phát hành: 06/07/2026_

### Tính năng mới

- **Hỗ trợ cấu hình môi trường API & Custom Base URL:** Thêm enum `VBotEnvironment` trong `VBotConfig` hỗ trợ cấu hình nhanh môi trường kết nối (Production, Staging, Sandbox) hoặc thiết lập API URL tùy chỉnh qua `customBaseUrl`.
- **Tương thích hoàn toàn với Objective-C:** Cập nhật các annotation `@objc`/`@objcMembers` và cung cấp bộ tài liệu tích hợp cho dự án sử dụng Objective-C.
- **Thêm Delegate mới:** Bổ sung các phương thức callback hỗ trợ tùy biến giao diện cuộc gọi (`showCallVC`, `returnToCallVC`, `hideCallVC`, `networkIsUnreachable`, `internetConnectionChanged`).

### Cập nhật

- Nâng cấp dependency: `VBotPhoneSDKiOS-Public 1.1.7`

::: tip Cập nhật Podfile

```swift
pod 'VBotPhoneSDKiOS-Public', '1.1.7'
```

:::

## v1.1.6

_Ngày phát hành: 13/02/2026_

### Tính năng mới

- **Hỗ trợ `externalCallId`:** Hàm `startOutgoingCall` hỗ trợ tham số `externalCallId` (tùy chọn), cho phép truyền mã cuộc gọi từ hệ thống bên ngoài để dễ dàng liên kết dữ liệu lịch sử cuộc gọi.
- **Thêm Delegate nhận dạng cuộc gọi:** Bổ sung delegate method `didReceiveExternalCallId` để nhận diện cuộc gọi thông qua mã externalCallId.

### Cập nhật

- Nâng cấp dependency: `VBotPhoneSDKiOS-Public 1.1.6`

::: tip Cập nhật Podfile

```swift
pod 'VBotPhoneSDKiOS-Public', '1.1.6'
```

:::
