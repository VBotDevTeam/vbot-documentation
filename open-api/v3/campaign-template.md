---
outline: deep
---

# Kịch bản gọi tự động

API quản lý và truy xuất kịch bản gọi tự động cùng cấu trúc nhánh kịch bản (IVR/phím bấm/CallBot).

## Lấy danh sách kịch bản {#lay-danh-sach-kich-ban}

Lấy danh sách kịch bản gọi có phân trang và hỗ trợ nhiều bộ lọc (theo từ khóa, bot AI, trạng thái...).

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/m-auto-call/api/template-script/get-all?key_search={key_search}&bot_id={bot_id}&project_code={project_code}&is_bot={is_bot}&status={status}&page={page}&size={size}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số      | Kiểu   | Bắt buộc | Mô tả                                                                        |
| ------------ | ------ | -------- | ---------------------------------------------------------------------------- |
| key_search   | String |          | Từ khóa tìm kiếm theo tên kịch bản                                           |
| bot_id       | String |          | Lọc theo mã bot AI                                                           |
| project_code | String |          | Mã dự án. Tự lấy từ X-API-Key nếu không truyền                               |
| is_bot       | Int    |          | Lọc kịch bản có bot: `-1` = tất cả (mặc định), `1` = có bot, `0` = không bot |
| status       | Int    |          | Lọc theo trạng thái kịch bản                                                 |
| page         | Int    |          | Số trang (mặc định: 1)                                                       |
| size         | Int    |          | Số lượng trên 1 trang (mặc định: 10)                                         |

**Response**

| Tham số   | Kiểu         | Mô tả                                                   |
| --------- | ------------ | ------------------------------------------------------- |
| status    | Int          | Mã trạng thái HTTP (`200`, `500`)                       |
| msg       | String       | Thông báo phản hồi (`Success`, `error`)                 |
| errorCode | Int          | Mã lỗi nghiệp vụ (`0`: Thành công, `500`: Lỗi hệ thống) |
| data      | List[Object] | Danh sách kịch bản                                      |

**Cấu trúc phần tử trong `data` (Thông tin kịch bản):**

| Tham số         | Kiểu    | Mô tả                                                           |
| --------------- | ------- | --------------------------------------------------------------- |
| id              | Long    | ID kịch bản                                                     |
| name            | String  | Tên kịch bản                                                    |
| scriptType      | String  | Loại kịch bản (`CONFIRM`, `BOT`, `IVR`...)                      |
| description     | String  | Mô tả kịch bản                                                  |
| content         | String  | Nội dung kịch bản (chứa biến thay thế `{ten_bien}`)             |
| audioService    | String  | Dịch vụ âm thanh                                                |
| voiceFile       | String  | Đường dẫn file âm thanh/ghi âm                                  |
| ttxLanguage     | String  | Ngôn ngữ Text-To-Speech (ví dụ: `vi-VN`)                        |
| ttxName         | String  | Tên giọng đọc Text-To-Speech                                    |
| isTtx           | Boolean | Có sử dụng Text-To-Speech hay không                             |
| replay          | Int     | Số lần phát lại nội dung kịch bản                               |
| botId           | String  | Mã bot AI (sử dụng khi kịch bản có bot)                         |
| botName         | String  | Tên bot AI                                                      |
| hangUpBot       | String  | Mã bot xử lý khi gác máy                                        |
| hangUpBotName   | String  | Tên bot xử lý khi gác máy                                       |
| code            | String  | Mã kịch bản (dùng làm `template_code` khi gọi API tạo cuộc gọi) |
| createAt        | Long    | Thời điểm tạo kịch bản (Unix timestamp - ms)                    |
| status          | Int     | Trạng thái kịch bản (1 = active, 0 = inactive)                  |
| isCustomField   | Boolean | Có sử dụng trường tùy chỉnh (custom field) hay không            |
| campaignRunning | Int     | Số chiến dịch đang chạy với kịch bản này                        |

**Ví dụ response**

```json
{
  "status": 200,
  "msg": "Success",
  "errorCode": 0,
  "data": [
    {
      "id": 1,
      "name": "Kịch bản nhắc nợ",
      "scriptType": "CONFIRM",
      "description": "Kịch bản tự động nhắc nợ",
      "code": "SCRIPT_001",
      "botId": "BOT_001",
      "botName": "Bot nhắc nợ",
      "createAt": 1695254400000,
      "status": 1,
      "isCustomField": true,
      "campaignRunning": 2,
      "isTtx": true,
      "replay": 2
    }
  ]
}
```

**Bảng mã lỗi**

| errorCode | status | Mô tả        |
| --------- | ------ | ------------ |
| `0`       | `200`  | Thành công   |
| `500`     | `500`  | Lỗi hệ thống |

---

## Lấy số lượng kịch bản {#lay-so-luong-kich-ban}

Lấy tổng số kịch bản theo điều kiện lọc

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/m-auto-call/api/template-script/count?key_search={key_search}&bot_id={bot_id}&project_code={project_code}&is_bot={is_bot}&status={status}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số        | Kiểu   | Bắt buộc | Mô tả                                                                        |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------- |
| `key_search`   | String |          | Từ khóa tìm kiếm theo tên kịch bản                                           |
| `bot_id`       | String |          | Lọc theo mã bot AI                                                           |
| `project_code` | String |          | Mã dự án. Tự lấy từ X-API-Key nếu không truyền                               |
| `is_bot`       | Int    |          | Lọc kịch bản có bot: `-1` = tất cả (mặc định), `1` = có bot, `0` = không bot |
| `status`       | Int    |          | Lọc theo trạng thái                                                          |

**Response**

| Tham số   | Kiểu   | Mô tả                                 |
| --------- | ------ | ------------------------------------- |
| status    | Int    | HTTP Status code (`200` - Thành công) |
| msg       | String | Thông điệp phản hồi (`Success`)       |
| errorCode | Int    | Mã lỗi nghiệp vụ (`0` - Thành công)   |
| data      | Int    | Tổng số kịch bản thỏa điều kiện lọc   |

**Ví dụ response**

```json
{
  "status": 200,
  "msg": "Success",
  "errorCode": 0,
  "data": 15
}
```

**Bảng mã lỗi**

| errorCode | status | Mô tả        |
| --------- | ------ | ------------ |
| `0`       | `200`  | Thành công   |
| `500`     | `500`  | Lỗi hệ thống |

---

## Lấy danh sách nhánh kịch bản {#lay-danh-sach-nhanh-kich-ban}

Lấy danh sách nhánh kịch bản dạng **cấu trúc cây**, hỗ trợ phân nhánh lồng nhau nhiều cấp cho IVR và phím bấm.

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/m-auto-call/api/template-script-sub/get-all?template_script_code={template_script_code}&project_code={project_code}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số              | Kiểu   | Bắt buộc | Mô tả                                          |
| -------------------- | ------ | -------- | ---------------------------------------------- |
| template_script_code | String | Có       | Mã kịch bản hội thoại                          |
| project_code         | String |          | Mã dự án. Tự lấy từ X-API-Key nếu không truyền |

**Response**

| Tham số   | Kiểu         | Mô tả                                                   |
| --------- | ------------ | ------------------------------------------------------- |
| status    | Int          | Mã trạng thái HTTP (`200`, `500`)                       |
| msg       | String       | Thông báo phản hồi (`Success`, `error`)                 |
| errorCode | Int          | Mã lỗi nghiệp vụ (`0`: Thành công, `500`: Lỗi hệ thống) |
| data      | List[Object] | Danh sách nhánh kịch bản dạng cây                       |

**Cấu trúc phần tử trong `data` (Nhánh kịch bản):**

| Tham số               | Kiểu    | Mô tả                                                        |
| --------------------- | ------- | ------------------------------------------------------------ |
| id                    | Long    | ID nhánh kịch bản                                            |
| name                  | String  | Tên nhánh                                                    |
| description           | String  | Mô tả nhánh                                                  |
| content               | String  | Nội dung nhánh                                               |
| audioService          | String  | Dịch vụ âm thanh                                             |
| ttxLanguage           | String  | Ngôn ngữ Text-To-Speech                                      |
| ttxName               | String  | Tên giọng đọc Text-To-Speech                                 |
| voiceFile             | String  | File âm thanh                                                |
| isTtx                 | Boolean | Có sử dụng Text-To-Speech hay không                          |
| code                  | String  | Mã nhánh                                                     |
| NumberKey             | Int     | Số phím bấm tương ứng nhánh                                  |
| templateScriptSubId   | Long    | ID nhánh cha                                                 |
| templateScriptSubCode | String  | Mã nhánh cha                                                 |
| templateScriptId      | Long    | ID kịch bản gốc                                              |
| templateScriptCode    | String  | Mã kịch bản gốc                                              |
| createAt              | Long    | Thời điểm tạo (Unix timestamp - ms)                          |
| subItems              | Array   | Danh sách nhánh con (lồng nhiều cấp). Rỗng `[]` nếu không có |

**Ví dụ response**

```json
{
  "status": 200,
  "msg": "Success",
  "errorCode": 0,
  "data": [
    {
      "id": 1,
      "name": "Nhánh xác nhận",
      "code": "SUB_001",
      "NumberKey": 1,
      "templateScriptCode": "SCRIPT_001",
      "content": "Nhấn phím 1 để xác nhận",
      "isTtx": true,
      "createAt": 1695254400000,
      "subItems": []
    },
    {
      "id": 2,
      "name": "Nhánh từ chối",
      "code": "SUB_002",
      "NumberKey": 2,
      "templateScriptCode": "SCRIPT_001",
      "content": "Nhấn phím 2 để từ chối",
      "isTtx": true,
      "createAt": 1695254400000,
      "subItems": [
        {
          "id": 3,
          "name": "Nhánh lý do",
          "code": "SUB_003",
          "NumberKey": 1,
          "templateScriptCode": "SCRIPT_001",
          "content": "Vui lòng cho biết lý do",
          "subItems": []
        }
      ]
    }
  ]
}
```

**Bảng mã lỗi**

| errorCode | status | Mô tả        |
| --------- | ------ | ------------ |
| `0`       | `200`  | Thành công   |
| `500`     | `500`  | Lỗi hệ thống |

---

## Các API phiên bản cũ (Deprecated)

::: warning Khuyến nghị
Các API dưới đây thuộc phiên bản cũ (Deprecated). Hệ thống **vẫn đang tiếp tục hỗ trợ và duy trì hoạt động bình thường**. Tuy nhiên, VBot **khuyến nghị** quý khách hàng chuyển sang sử dụng các API phiên bản mới ở trên (`/m-auto-call/api/template-script/get-all`, `/m-auto-call/api/template-script/count`, `/m-auto-call/api/template-script-sub/get-all`) để tối ưu hiệu năng và được cập nhật các tính năng mới nhất trong tương lai.
:::

### Lấy danh sách kịch bản (Deprecated) {#lay-danh-sach-kich-ban-deprecated}

Lấy danh sách các kịch bản đang active trong nhóm (phiên bản cũ).

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/templateScript/getAll?key_search={key_search}&status={status}&page={page}&size={size}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số    | Kiểu   | Bắt buộc | Mô tả                       |
| ---------- | ------ | -------- | --------------------------- |
| key_search | String |          | Từ khóa tìm kiếm            |
| status     | Int    | Có       | Trạng thái (1 = active)     |
| page       | Int    |          | Số trang (default: 1)       |
| size       | Int    |          | Số item/trang (default: 20) |

**Response**

| Tham số | Kiểu         | Mô tả                                  |
| ------- | ------------ | -------------------------------------- |
| error   | Int          | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String       | Thông tin                              |
| data    | List[Object] | Danh sách kịch bản                     |

**Cấu trúc phần tử trong `data` (Thông tin kịch bản):**

| Tham số         | Kiểu    | Mô tả                                                                                                                                                                                                                                         |
| --------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`            | Long    | ID của kịch bản                                                                                                                                                                                                                               |
| `name`          | String  | Tên kịch bản                                                                                                                                                                                                                                  |
| `script_type`   | String  | Loại kịch bản:<br>- `CONFIRM`: Kịch bản chờ người dùng xác nhận sau khi nghe đọc (ví dụ: nhấn phím 1 để từ chối, phím 2 để đồng ý)<br>- `BOT`: Kịch bản có sử dụng CallBot (AI tương tác)<br>- `IVR`: Kịch bản đọc voice, phân nhánh phím bấm |
| `description`   | String  | Mô tả kịch bản                                                                                                                                                                                                                                |
| `content`       | String  | Nội dung kịch bản (có thể chứa các biến tùy chỉnh dạng `{ten_bien}`)                                                                                                                                                                          |
| `audio_service` | String  | Loại/dịch vụ âm thanh sử dụng (ví dụ: nếu `script_type` là `CONFIRM` thì `audio_service` là `CONFIRM`, hoặc loại audio được import lên hệ thống)                                                                                              |
| `voice_file`    | String  | Đường dẫn file âm thanh/ghi âm tải lên (nếu sử dụng file âm thanh có sẵn)                                                                                                                                                                     |
| `ttx_language`  | String  | Ngôn ngữ Text-To-Speech (chuyển văn bản thành giọng nói), ví dụ: `vi-VN`                                                                                                                                                                      |
| `ttx_name`      | String  | Tên giọng đọc Text-To-Speech                                                                                                                                                                                                                  |
| `is_ttx`        | Boolean | Có sử dụng Text-To-Speech hay không (`true`: Nhập văn bản để chuyển đổi sang giọng nói; `false`: Sử dụng file âm thanh có sẵn)                                                                                                                |
| `replay`        | Int     | Số lần phát lại nội dung kịch bản                                                                                                                                                                                                             |
| `bot_id`        | String  | ID của CallBot (sử dụng khi `script_type` là `BOT`)                                                                                                                                                                                           |
| `code`          | String  | Mã kịch bản (dùng để truyền vào tham số `template_code` khi gọi API tạo cuộc gọi)                                                                                                                                                             |
| `create_at`     | Long    | Thời điểm tạo kịch bản (Unix timestamp - ms)                                                                                                                                                                                                  |
| `status`        | Int     | Trạng thái kịch bản (`1`: active, `0`: inactive)                                                                                                                                                                                              |

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

### Lấy số lượng kịch bản (Deprecated) {#lay-so-luong-kich-ban-deprecated}

Lấy tổng số kịch bản theo điều kiện lọc (dùng cho phân trang ở phiên bản cũ).

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/templateScript/countAll?key_search={key_search}&status={status}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số    | Kiểu   | Bắt buộc | Mô tả            |
| ---------- | ------ | -------- | ---------------- |
| key_search | String |          | Từ khóa tìm kiếm |
| status     | Int    |          | Trạng thái       |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Int    | Tổng số template                       |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "Success",
  "data": 15
}
```
