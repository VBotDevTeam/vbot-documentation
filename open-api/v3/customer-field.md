---
outline: deep
---

# Tuỳ chỉnh thông tin

Quản lý các trường thông tin tuỳ chỉnh ngoài các trường thông tin mặc định của khách hàng

## Phân loại trường thông tin

| Type       | Mô tả                                        |
| ---------- | -------------------------------------------- |
| `STRING`   | Kiểu text tối đa 255 ký tự                   |
| `TEXT`     | Kiểu văn bản dài                             |
| `NUMBER`   | Kiểu số tối đa 18 chữ số, 6 chữ số thập phân |
| `DATE`     | Ngày ngày tháng                              |
| `PHONE`    | Kiểu số điện thoại                           |
| `SELECT`   | Kiểu lựa chọn                                |
| `CHECKBOX` | Kiểu chọn nhiều ô tích                       |
| `RADIO`    | Kiểu chọn một ô tích                         |

> **Lưu ý:** Không thể thay đổi `type` sau khi đã tạo field.

## Trường thông tin

### Danh sách trường thông tin

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/customerfield/get-all</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số | Kiểu   | Mô tả                                                    |
| ------- | ------ | -------------------------------------------------------- |
| key     | String | Tìm theo code hoặc tên trường thông tin                  |
| from    | Long   | Lọc từ ngày (Unix timestamp - ms). `-1` = không áp dụng  |
| to      | Long   | Lọc đến ngày (Unix timestamp - ms). `-1` = không áp dụng |
| page    | Int    | Số trang                                                 |
| size    | Int    | Số lượng trên 1 trang                                    |

**Response**

| Tham số | Kiểu         | Mô tả                                  |
| ------- | ------------ | -------------------------------------- |
| error   | Int          | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String       | Thông tin                              |
| data    | List[Object] | Danh sách trường dữ liệu               |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": [
    {
      "create_at": 1718000000000,
      "number": 1,
      "code": "birth_date",
      "name": "Ngày sinh",
      "color": "#EEEEEE",
      "text_color": "#000000",
      "description": "Ngày sinh khách hàng",
      "type": "DATE",
      "is_required": false,
      "is_unique": false,
      "is_default": false
    }
  ]
}
```

**Cấu trúc phần tử trong `data`**

| Tham số     | Kiểu   | Mô tả                                                  |
| ----------- | ------ | ------------------------------------------------------ |
| create_at   | Long   | Thời gian tạo (Unix timestamp - ms)                    |
| number      | Long   | Thứ tự hiển thị                                        |
| code        | String | Mã trường thông tin (`customer_field_code`)            |
| name        | String | Tên hiển thị                                           |
| color       | String | Màu nền (hex). Mặc định là nền trắng                   |
| text_color  | String | Màu chữ (hex). Mặc định là chữ đen                     |
| description | String | Mô tả                                                  |
| type        | String | Loại trường thông tin                                  |
| is_required | Bool   | Bắt buộc nhập                                          |
| is_unique   | Bool   | Giá trị phải duy nhất                                  |
| is_default  | Bool   | Trường thông tin mặc định của hệ thống (không thể xóa) |

---

### Đếm số lượng trường thông tin

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/customerfield/count-all</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số | Kiểu   | Bắt buộc | Mô tả                                                    |
| ------- | ------ | -------- | -------------------------------------------------------- |
| key     | String | Không    | Tìm theo code hoặc tên trường thông tin                  |
| from    | Long   | Không    | Lọc từ ngày (Unix timestamp - ms). `-1` = không áp dụng  |
| to      | Long   | Không    | Lọc đến ngày (Unix timestamp - ms). `-1` = không áp dụng |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Int    | Số lượng                               |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": 8
}
```

---

### Chi tiết trường thông tin

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/customerfield/get-detail</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số             | Kiểu   | Bắt buộc | Mô tả               |
| ------------------- | ------ | -------- | ------------------- |
| customer_field_code | String | Có       | Mã trường thông tin |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Object | Thông tin chi tiết                     |

Trả về 1 object cùng cấu trúc với mỗi phần tử trong `get-all`.

---

### Kiểm tra trùng mã trường thông tin

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/customerfield/check-exist-code</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số             | Kiểu   | Bắt buộc | Mô tả               |
| ------------------- | ------ | -------- | ------------------- |
| customer_field_code | String | Có       | Mã trường thông tin |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Bool   | Kết quả kiểm tra                       |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": false
}
```

| `data`  | Ý nghĩa                      |
| ------- | ---------------------------- |
| `true`  | Mã đã tồn tại                |
| `false` | Mã chưa tồn tại, có thể dùng |

---

### Thêm trường thông tin mới

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/customerfield/insert</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

**Ví dụ request**

```json
{
  "customer_field_code": "birth_date",
  "name": "Ngày sinh",
  "type": "DATE",
  "description": "Ngày sinh khách hàng",
  "color": "#EEEEEE",
  "text_color": "#000000",
  "is_required": false,
  "number": 5,
  "is_unique": false
}
```

| Tham số             | Kiểu   | Bắt buộc | Mô tả                                                     |
| ------------------- | ------ | -------- | --------------------------------------------------------- |
| customer_field_code | String | Có       | Mã trường thông tin. Chỉ chứa chữ/số/`_`/`-`, không trùng |
| name                | String | Có       | Tên hiển thị. Không chứa ký tự đặc biệt                   |
| type                | String | Có       | Loại trường thông tin (xem bảng Type ở trên)              |
| description         | String | Không    | Mô tả                                                     |
| color               | String | Có       | Màu nền (hex). Mặc định là nền trắng                      |
| text_color          | String | Có       | Màu chữ (hex). Mặc định là chữ đen                        |
| is_required         | Bool   | Không    | Mặc định `false`                                          |
| number              | Int    | Không    | Thứ tự hiển thị                                           |
| is_unique           | Bool   | Không    | Giá trị phải duy nhất. Mặc định `false`                   |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | String | Mã trường thông tin vừa tạo            |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": "birth_date"
}
```

`data` trả về `customer_field_code` vừa tạo.

### Cập nhật trường thông tin

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/customerfield/update</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

> Không thể thay đổi `customer_field_code` và `type` qua API này. Dùng `update-code` để đổi mã.  
> Không thể cập nhật field mặc định của hệ thống (`is_default = true`).

**Body**

**Ví dụ request**

```json
{
  "customer_field_code": "birth_date",
  "name": "Ngày sinh (cập nhật)",
  "type": "DATE",
  "description": "Mô tả mới",
  "color": "#FFFFFF",
  "text_color": "#333333",
  "is_required": true,
  "number": 3,
  "is_unique": false
}
```

| Tham số             | Kiểu   | Bắt buộc | Mô tả                                        |
| ------------------- | ------ | -------- | -------------------------------------------- |
| customer_field_code | String | Có       | Mã trường thông tin                          |
| name                | String | Có       | Tên mới                                      |
| type                | String | Có       | Bắt buộc truyền nhưng không đổi được giá trị |
| color               | String | Có       | Màu nền (hex). Mặc định là nền trắng         |
| text_color          | String | Có       | Màu chữ (hex). Mặc định là chữ đen           |
| Các trường còn lại  |        | Không    | Cập nhật nếu truyền                          |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | String | Mã trường thông tin vừa cập nhật       |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": "birth_date"
}
```

---

### Đổi mã trường thông tin

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/customerfield/update-code</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

> Chỉ cập nhật mã field, không thay đổi dữ liệu khác.  
> Không thể đổi mã field mặc định (`is_default = true`).

**Body**

**Ví dụ request**

```json
{
  "customer_field_code": "birth_date",
  "customer_field_code_new": "date_of_birth"
}
```

| Tham số                 | Kiểu   | Bắt buộc | Mô tả                                        |
| ----------------------- | ------ | -------- | -------------------------------------------- |
| customer_field_code     | String | Có       | Mã trường thông tin                          |
| customer_field_code_new | String | Có       | Mã mới. Chỉ chứa chữ/số/`_`/`-`, không trùng |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Bool   | Trạng thái thực hiện                   |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": true
}
```

---

### Xóa trường thông tin

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/customerfield/delete</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

> Không thể xóa field mặc định của hệ thống (`is_default = true`).

**Body**

**Ví dụ request**

```json
{
  "customer_field_code": "birth_date"
}
```

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Bool   | Trạng thái thực hiện                   |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": true
}
```

---

## Trường lựa chọn

### Phân loại trường lựa chọn

| Type       | Mô tả                                                    |
| ---------- | -------------------------------------------------------- |
| `OPTION`   | Lựa chọn thông thường                                    |
| `OPTGROUP` | Nhóm các lựa chọn (chỉ dùng cho trường dữ liệu `SELECT`) |

> Lựa chọn thuộc nhóm `OPTGROUP` sẽ có `customer_field_option_group_code` trỏ đến nhóm cha.

### Danh sác trường lựa chọn

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/customerfield/option/get-all</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số                          | Kiểu   | Bắt buộc | Mô tả                                                  |
| -------------------------------- | ------ | -------- | ------------------------------------------------------ |
| customer_field_code              | String | Có       | Mã trường thông tin                                    |
| customer_field_option_group_code | String | Không    | Lọc theo nhóm cha (OPTGROUP). Bỏ trống = lấy tất cả    |
| key                              | String | Không    | Tìm theo tên trường lựa chọn                           |
| type                             | String | Không    | Lọc theo loại: `OPTION`, `OPTGROUP`. Bỏ trống = tất cả |
| page                             | Int    | Không    | Số trang                                               |
| size                             | Int    | Không    | Số lượng trên 1 trang                                  |

**Response**

| Tham số | Kiểu         | Mô tả                                  |
| ------- | ------------ | -------------------------------------- |
| error   | Int          | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String       | Thông tin                              |
| data    | List[Object] | Danh sách lựa chọn                     |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": [
    {
      "create_at": 1718000000000,
      "code": "active",
      "customer_field_option_group_code": null,
      "number": 1,
      "name": "Đang hoạt động",
      "color": "#00AA00",
      "text_color": "#FFFFFF",
      "type": "OPTION"
    }
  ]
}
```

**Cấu trúc phần tử trong `data`**

| Tham số                          | Kiểu    | Mô tả                                             |
| -------------------------------- | ------- | ------------------------------------------------- |
| create_at                        | Long    | Thời gian tạo (Unix timestamp - ms)               |
| code                             | String  | Mã trường lựa chọn (`customer_field_option_code`) |
| customer_field_option_group_code | String? | Mã nhóm cha. `null` nếu là trường lựa chọn gốc    |
| number                           | Long    | Thứ tự hiển thị                                   |
| name                             | String  | Tên hiển thị                                      |
| color                            | String  | Màu nền (hex). Mặc định là nền trắng              |
| text_color                       | String  | Màu chữ (hex). Mặc định là chữ đen                |
| type                             | String  | `OPTION` hoặc `OPTGROUP`                          |

---

### Đếm số lượng trường lựa chọn

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/customerfield/option/count-all</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số                          | Kiểu   | Bắt buộc | Mô tả                                                  |
| -------------------------------- | ------ | -------- | ------------------------------------------------------ |
| customer_field_code              | String | Có       | Mã trường thông tin                                    |
| customer_field_option_group_code | String | Không    | Lọc theo nhóm cha (OPTGROUP). Bỏ trống = tất cả        |
| key                              | String | Không    | Tìm theo tên option                                    |
| type                             | String | Không    | Lọc theo loại: `OPTION`, `OPTGROUP`. Bỏ trống = tất cả |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Int    | Số lượng                               |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": 5
}
```

---

### Chi tiết trường lựa chọn

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/customerfield/option/get-detail</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số                    | Kiểu   | Bắt buộc | Mô tả               |
| -------------------------- | ------ | -------- | ------------------- |
| customer_field_code        | String | Có       | Mã trường thông tin |
| customer_field_option_code | String | Có       | Mã trường lựa chọn  |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Object | Thông tin chi tiết                     |

Trả về 1 object cùng cấu trúc với mỗi phần tử trong `option/get-all`.

---

### Kiểm tra trùng mã trường lựa chọn

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/customerfield/option/check-exist-code</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

> Mã trường lựa chọn là duy nhất trong phạm vi toàn bộ trường thông tin (không phân biệt OPTGROUP).

**Tham số**

| Tham số                    | Kiểu   | Bắt buộc | Mô tả               |
| -------------------------- | ------ | -------- | ------------------- |
| customer_field_code        | String | Có       | Mã trường thông tin |
| customer_field_option_code | String | Có       | Mã trường lựa chọn  |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Bool   | Kết quả kiểm tra                       |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": false
}
```

| `data`  | Ý nghĩa                      |
| ------- | ---------------------------- |
| `true`  | Mã đã tồn tại                |
| `false` | Mã chưa tồn tại, có thể dùng |

---

### Thêm trường lựa chọn mới

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/customerfield/option/insert</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body — Thêm OPTION thông thường**

**Ví dụ request**

```json
{
  "customer_field_option_code": "active",
  "customer_field_code": "status",
  "customer_field_option_group_code": null,
  "name": "Đang hoạt động",
  "color": "#00AA00",
  "text_color": "#FFFFFF",
  "type": "OPTION",
  "number": 1
}
```

**Body — Thêm OPTGROUP (nhóm cha)**

**Ví dụ request**

```json
{
  "customer_field_option_code": "group_vip",
  "customer_field_code": "customer_tier",
  "customer_field_option_group_code": null,
  "name": "Nhóm VIP",
  "color": "#FFD700",
  "text_color": "#000000",
  "type": "OPTGROUP",
  "number": 1
}
```

**Body — Thêm OPTION thuộc OPTGROUP**

**Ví dụ request**

```json
{
  "customer_field_option_code": "vip_gold",
  "customer_field_code": "customer_tier",
  "customer_field_option_group_code": "group_vip",
  "name": "Vàng",
  "color": "#FFD700",
  "text_color": "#000000",
  "type": "OPTION",
  "number": 1
}
```

| Tham số                          | Kiểu    | Bắt buộc | Mô tả                                                                |
| -------------------------------- | ------- | -------- | -------------------------------------------------------------------- |
| customer_field_option_code       | String  | Có       | Mã trường lựa chọn. Chỉ chứa chữ/số/`_`/`-`, không trùng trong field |
| customer_field_code              | String  | Có       | Mã trường thông tin                                                  |
| customer_field_option_group_code | String? | Không    | Mã nhóm cha (OPTGROUP). `null` nếu là option gốc                     |
| name                             | String  | Có       | Tên hiển thị                                                         |
| color                            | String  | Có       | Màu nền (hex). Mặc định là nền trắng                                 |
| text_color                       | String  | Có       | Màu chữ (hex). Mặc định là chữ đen                                   |
| type                             | String  | Có       | `OPTION` hoặc `OPTGROUP`                                             |
| number                           | Int     | Không    | Thứ tự hiển thị                                                      |

> **Lưu ý:** `OPTGROUP` chỉ dùng được với field type `SELECT`.

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | String | Mã trường thông tin vừa tạo            |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": "active"
}
```

`data` trả về `customer_field_option_code` vừa tạo.

---

### Cập nhật trường lựa chọn

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/customerfield/option/update</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

> Không thể thay đổi `type` và `customer_field_option_code` qua API này. Dùng `option/update-code` để đổi mã.

**Body**

**Ví dụ request**

```json
{
  "customer_field_option_code": "active",
  "customer_field_code": "status",
  "name": "Hoạt động",
  "color": "#00CC00",
  "text_color": "#FFFFFF",
  "number": 1
}
```

| Tham số                    | Kiểu   | Bắt buộc | Mô tả                                        |
| -------------------------- | ------ | -------- | -------------------------------------------- |
| customer_field_option_code | String | Có       | Mã trường lựa chọn                           |
| customer_field_code        | String | Có       | Mã trường thông tin                          |
| name                       | String | Có       | Tên mới                                      |
| color                      | String | Có       | Màu nền mới (hex). Mặc định là màu nền trắng |
| text_color                 | String |          | Màu chữ mới (hex). Mặc định là màu chữ đen   |
| number                     | Int    | Không    | Thứ tự mới                                   |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | String | Mã trường thông tin vừa cập nhật       |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": "active"
}
```

### Đổi mã trường lựa chọn

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/customerfield/option/update-code</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

**Ví dụ request**

```json
{
  "customer_field_code": "status",
  "customer_field_option_code": "active",
  "customer_field_option_code_new": "status_active"
}
```

| Tham số                        | Kiểu   | Bắt buộc | Mô tả                                                                               |
| ------------------------------ | ------ | -------- | ----------------------------------------------------------------------------------- |
| customer_field_code            | String | Có       | Mã trường thông tin                                                                 |
| customer_field_option_code     | String | Có       | Mã trường lựa chọn                                                                  |
| customer_field_option_code_new | String | Có       | Mã trường lựa chọn mới. Chỉ chứa chữ/số/`_`/`-`, không trùng trong trường thông tin |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Bool   | Trạng thái thực hiện                   |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": true
}
```

---

### Xóa trường lựa chọn

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/customerfield/option/delete</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

**Ví dụ request**

```json
{
  "customer_field_code": "status",
  "customer_field_option_code": "active"
}
```

| Tham số                    | Kiểu   | Bắt buộc | Mô tả               |
| -------------------------- | ------ | -------- | ------------------- |
| customer_field_code        | String | Có       | Mã trường thông tin |
| customer_field_option_code | String | Có       | Mã trường lựa chọn  |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Bool   | Trạng thái thực hiện                   |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": true
}
```
