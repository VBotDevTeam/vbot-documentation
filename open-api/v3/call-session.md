---
outline: deep
---

# Phiên cuộc gọi

API lấy session ID của cuộc gọi.

## Lấy Session ID

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/call-sessions</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Body**

| Tham số      | Kiểu   | Mô tả         |
| ------------ | ------ | ------------- |
| phone_number | String | Số điện thoại |

**Ví dụ request**

```json
{
  "phone_number": "sample string 1"
}
```

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin chi tiết                     |
| data    | Object | Dữ liệu phiên làm việc                 |

**Cấu trúc `data`**

| Tham số    | Kiểu   | Mô tả             |
| ---------- | ------ | ----------------- |
| session_id | String | ID phiên làm việc |
| created_at | String | Thời gian tạo     |

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
