---
outline: deep
---

# Kịch bản gọi tự động

API quản lý kịch bản gọi tự động.

## Lấy danh sách kịch bản

Lấy danh sách các kịch bản đang active trong nhóm.

<div class="api-container">
  <span class="api-method method-get">GET</span>
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
| key_search   | String |          | Từ khóa tìm kiếm            |
| status       | Int    |          | Trạng thái (1 = active)     |
| page         | Int    |          | Số trang (default: 1)       |
| size         | Int    |          | Số item/trang (default: 20) |

**Response**

| Tham số | Kiểu         | Mô tả                                  |
| ------- | ------------ | -------------------------------------- |
| error   | Int          | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String       | Thông tin                              |
| data    | List[Object] | Danh sách kịch bản                     |

**Cấu trúc phần tử trong `data` (Thông tin kịch bản)**

| Tham số         | Kiểu    | Mô tả                                                                                                                                                                                |
| --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`            | Long    | ID của kịch bản                                                                                                                                                                      |
| `name`          | String  | Tên kịch bản                                                                                                                                                                         |
| `script_type`   | String  | Loại kịch bản:<br>- `CONFIRM`: Kịch bản chờ người dùng xác nhận sau khi nghe đọc (ví dụ: nhấn phím 1 để từ chối, phím 2 để đồng ý)<br>- `BOT`: Kịch bản có sử dụng CallBot (AI tương tác)<br>- `IVR`: Kịch bản đọc voice, phân nhánh phím bấm |
| `description`   | String  | Mô tả kịch bản                                                                                                                                                                       |
| `content`       | String  | Nội dung kịch bản (có thể chứa các biến tùy chỉnh dạng `{ten_bien}`)                                                                                                                 |
| `audio_service` | String  | Loại/dịch vụ âm thanh sử dụng (ví dụ: nếu `script_type` là `CONFIRM` thì `audio_service` là `CONFIRM`, hoặc loại audio được import lên hệ thống)                                     |
| `voice_file`    | String  | Đường dẫn file âm thanh/ghi âm tải lên (nếu sử dụng file âm thanh có sẵn)                                                                                                            |
| `ttx_language`  | String  | Ngôn ngữ Text-To-Speech (chuyển văn bản thành giọng nói), ví dụ: `vi-VN`                                                                                                             |
| `ttx_name`      | String  | Tên giọng đọc Text-To-Speech                                                                                                                                                         |
| `is_ttx`        | Boolean | Có sử dụng Text-To-Speech hay không (`true`: Nhập văn bản để chuyển đổi sang giọng nói; `false`: Sử dụng file âm thanh có sẵn)                                                      |
| `replay`        | Int     | Số lần phát lại nội dung kịch bản                                                                                                                                                    |
| `bot_id`        | String  | ID của CallBot (sử dụng khi `script_type` là `BOT`)                                                                                                                                  |
| `code`          | String  | Mã kịch bản (dùng để truyền vào tham số `template_code` khi gọi API tạo cuộc gọi)                                                                                                    |
| `create_at`     | Long    | Thời điểm tạo kịch bản (Unix timestamp - ms)                                                                                                                                         |
| `status`        | Int     | Trạng thái kịch bản (`1`: Đang hoạt động, `0`: Ngừng hoạt động)                                                                                                                      |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": [
    {
      "id": 171052,
      "name": "kịch bản blgd",
      "script_type": "CONFIRM",
      "description": "",
      "content": "{ten_khach_hang}{dia_chi}{Phone}{ticket_title}{diem_danh_gia_kh}",
      "audio_service": "",
      "voice_file": "",
      "ttx_language": "vi-VN",
      "ttx_name": null,
      "is_ttx": true,
      "replay": 2,
      "bot_id": "",
      "code": "TMP_26082816195416743",
      "create_at": 1787883594968,
      "status": 1
    }
  ]
}
```

---

## Lấy số lượng kịch bản

Lấy tổng số kịch bản theo điều kiện lọc (dùng cho phân trang).

<div class="api-container">
  <span class="api-method method-get">GET</span>
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
| key_search   | String |          | Từ khóa tìm kiếm |
| status       | Int    |          | Trạng thái       |

**Response**

| Tham số | Kiểu   | Mô tả                                      |
| ------- | ------ | ------------------------------------------ |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi)       |
| message | String | Thông tin                                  |
| data    | Int    | Tổng số template                           |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "Success",
  "data": 15
}
```

---
