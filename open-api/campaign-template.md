---
outline: deep
---

# Template kịch bản Campaign

API quản lý template kịch bản cuộc gọi. Template script chứa nội dung kịch bản (text/audio) dùng cho chiến dịch gọi tự động.

## Lấy danh sách template kịch bản

Lấy danh sách các template script đang active trong dự án.

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/campaignCall/templateScript/getAll?vbot_id={vbot_id}&project_code={project_code}&key_search={key_search}&status={status}&page={page}&size={size}</span>
</div>

**Header**

| Tham số       | Giá trị               |
| ------------- | --------------------- |
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số      | Kiểu   | Bắt buộc | Mô tả                       |
| ------------ | ------ | -------- | --------------------------- |
| vbot_id      | String | Có       | VBot ID                     |
| project_code | String | Có       | Mã dự án                    |
| key_search   | String |        | Từ khóa tìm kiếm            |
| status       | Int    |        | Trạng thái (1 = active)     |
| page         | Int    |        | Số trang (default: 1)       |
| size         | Int    |        | Số item/trang (default: 20) |

**Response**

| Tham số        | Kiểu   | Mô tả                                      |
| -------------- | ------ | ------------------------------------------ |
| status         | Int    | Mã trạng thái (1: Thành công, 0: Thất bại) |
| message        | String | Thông tin                                  |
| data           | Array  | Danh sách templates                        |
| data[].id      | Int    | Template ID                                |
| data[].name    | String | Tên template                               |
| data[].code    | String | Mã template (dùng khi gọi API callConfirm) |
| data[].content | String | Nội dung script                            |
| data[].status  | Int    | 1 = active                                 |

**Ví dụ response**

```json
{
  "status": 1,
  "message": "Success",
  "data": [
    {
      "id": 1,
      "name": "Xác nhận đơn hàng",
      "code": "CONFIRM_ORDER",
      "script_type": "tts",
      "description": "Kịch bản xác nhận đơn hàng với khách",
      "content": "Xin chào {customer_name}, bạn có đơn hàng {order_id} cần xác nhận...",
      "audio_service": "google",
      "tts_language": "vi-VN",
      "tts_name": "vi-VN-Standard-A",
      "is_tts": true,
      "replay": 2,
      "bot_id": "BOT_001",
      "status": 1,
      "create_at": 1704873000
    },
    {
      "id": 2,
      "name": "Khảo sát hài lòng",
      "code": "SURVEY_SATISFACTION",
      "script_type": "tts",
      "description": "Khảo sát mức độ hài lòng khách hàng",
      "content": "Bạn có hài lòng với dịch vụ...",
      "audio_service": "google",
      "tts_language": "vi-VN",
      "tts_name": "vi-VN-Standard-A",
      "is_tts": true,
      "replay": 1,
      "bot_id": "BOT_002",
      "status": 1,
      "create_at": 1704876600
    }
  ]
}
```

---

## Lấy số lượng template kịch bản

Lấy tổng số template script theo điều kiện lọc (dùng cho phân trang).

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/campaignCall/templateScript/countAll?vbot_id={vbot_id}&project_code={project_code}&key_search={key_search}&status={status}</span>
</div>

**Header**

| Tham số       | Giá trị               |
| ------------- | --------------------- |
| Authorization | Bearer `access_token` |

**Tham số**

| Tham số      | Kiểu   | Bắt buộc | Mô tả            |
| ------------ | ------ | -------- | ---------------- |
| vbot_id      | String | Có       | VBot ID          |
| project_code | String | Có       | Mã dự án         |
| key_search   | String |        | Từ khóa tìm kiếm |
| status       | Int    |        | Trạng thái       |

**Response**

| Tham số | Kiểu   | Mô tả                                      |
| ------- | ------ | ------------------------------------------ |
| status  | Int    | Mã trạng thái (1: Thành công, 0: Thất bại) |
| error   | Int    | Mã lỗi                                     |
| message | String | Thông tin                                  |
| data    | Int    | Tổng số template                           |

**Ví dụ response**

```json
{
  "status": 1,
  "error": 0,
  "message": "Success",
  "data": 15
}
```

---
