---
outline: deep
---

# Phiên cuộc gọi (Call Session)

API tạo phiên cuộc gọi (Call Session) — cho phép backend phía đối tác tạo một session ID tương ứng với số điện thoại khách hàng, để SDK user thực hiện cuộc gọi mà **không cần biết số điện thoại thực** của khách hàng.

## Tại sao cần Call Session?

Trước đây, khi sử dụng VBot SDK để gọi cho khách hàng, sẽ phải truyền trực tiếp số điện thoại khách hàng vào SDK:

```javascript
client.invite("0901234567", hotlineNumber);
```

Với **Call Session**, luồng hoạt động được đổi thành:

```javascript
client.invite(sessionId, hotlineNumber);
```

## Luồng tích hợp

```
┌──────────────────┐      ┌───────────────────┐      ┌──────────────┐
│  Backend đối tác │      │  VBot Open API    │      │  SDK (User)  │
└────────┬─────────┘      └────────┬──────────┘      └───────┬──────┘
         │                         │                         │
         │  1. POST /api/call-sessions                       │
         │    { phone_number: "0901234567" }                 │
         │ ───────────────────────►│                         │
         │                         │                         │
         │  2. Trả về session_id   │                         │
         │ ◄───────────────────────│                         │
         │                         │                         │
         │  3. Gửi session_id cho user (không gửi SĐT)       │
         │ ─────────────────────────────────────────────────►│
         │                         │                         │
         │                         │  4. client.invite(      │
         │                         │     sessionId,          │
         │                         │     hotlineNumber)      │
         │                         │ ◄───────────────────────│
         │                         │                         │
         │                         │  5. VBot tự map         │
         │                         │     session → SĐT       │
         │                         │    và thực hiện cuộc gọi│
         │                         │                         │
```

**Giải thích:**

1. **Backend đối tác** gọi API tạo call session, gửi số điện thoại khách hàng.
2. **VBot Open API** trả về `session_id` — một mã định danh tạm thời, không chứa thông tin SĐT.
3. Backend đối tác gửi `session_id` cho SDK user — user **không bao giờ thấy SĐT** thật.
4. SDK user gọi `client.invite(sessionId, hotlineNumber)` để thực hiện cuộc gọi.
5. VBot tự động map `session_id` → số điện thoại thực và xử lý cuộc gọi phía server.

::: tip Lợi ích

- **Bảo mật dữ liệu**: Số điện thoại khách hàng chỉ tồn tại ở server-to-server, không bao giờ lộ ra phía client.
- **Chống MITM**: Kể cả khi session ID bị chặn bắt, attacker cũng không thể biết số điện thoại thật.
- **Tuân thủ chính sách bảo vệ dữ liệu**: Phù hợp cho các doanh nghiệp có yêu cầu nghiêm ngặt về bảo mật thông tin khách hàng.
  :::

## Tạo Call Session

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/call-sessions</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số      | Kiểu   | Bắt buộc | Mô tả                                |
| ------------ | ------ | -------- | ------------------------------------ |
| phone_number | String | Có       | Số điện thoại khách hàng cần gọi tới |

**Ví dụ request**

```json
{
  "phone_number": "0901234567"
}
```

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin chi tiết                     |
| data    | Object | Dữ liệu phiên cuộc gọi                 |

**Cấu trúc `data`**

| Tham số    | Kiểu   | Mô tả                                           |
| ---------- | ------ | ----------------------------------------------- |
| session_id | String | ID phiên cuộc gọi — dùng để truyền cho SDK user |
| created_at | String | Thời gian tạo phiên                             |

**Ví dụ response**

```json
{
  "error": 1,
  "message": "sample string 2",
  "data": {
    "session_id": "sample string 1",
    "created_at": "2026-06-11T10:39:30.2893453+07:00"
  }
}
```

## Sử dụng với VBot SDK

Sau khi backend tạo call session và nhận được `session_id`, truyền `session_id` này cho phía client để thực hiện cuộc gọi qua SDK. Phía SDK sẽ truyền `session_id` vào tham số số điện thoại cần gọi (`phoneNumber` / `number`).

### Web SDK

Sử dụng hàm `client.invite` và truyền `sessionId` vào đối số đầu tiên:

```javascript
// Backend đã tạo call session và gửi sessionId cho client
const sessionId = "session_id_từ_backend";

// Sử dụng sessionId thay cho số điện thoại cần gọi
const session = await client
  .invite(sessionId, hotlineNumber)
  .catch(logger.error);
```

### Android SDK

Sử dụng hàm `client.startOutgoingCall` và truyền `sessionId` vào đối số `phoneNumber`:

```kotlin
val sessionId = "session_id_từ_backend"

// Sử dụng sessionId thay cho số điện thoại cần gọi (phoneNumber)
client.startOutgoingCall(name, hotline, sessionId, externalCallId)
```

### iOS SDK

Sử dụng hàm `VBotPhone.sharedInstance.startOutgoingCall` và truyền `sessionId` vào đối số `number`:

```swift
let sessionId = "session_id_từ_backend"

// Sử dụng sessionId thay cho số điện thoại cần gọi (number)
VBotPhone.sharedInstance.startOutgoingCall(
    name: name,
    number: sessionId,
    hotline: hotline,
    externalCallId: "your-external-id"
) { resultAPI in
    switch resultAPI {
    case .success():
        // Cuộc gọi đi bắt đầu thành công
    case .failure(let error):
        // Xử lý lỗi cuộc gọi đi
    }
}
```

::: warning Lưu ý quan trọng

- API này chỉ nên được gọi từ **backend** (server-to-server), không nên gọi từ phía client để tránh lộ token Open API.
  :::
