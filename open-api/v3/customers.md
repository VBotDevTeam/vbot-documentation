---
outline: deep
---

# Quản lý khách hàng

API quản lý khách hàng

## Các trường mặc định

Mỗi khách hàng luôn có các trường mặc định sau (không thể xóa):

| Trường        | Tên            | Mô tả                                                                                                          |
| ------------- | -------------- | -------------------------------------------------------------------------------------------------------------- |
| name          | Tên khách hàng | Bắt buộc                                                                                                       |
| customer_code | Mã khách hàng  | Bắt buộc, duy nhất, chỉ chứa chữ/số/`_`/`-`                                                                    |
| phone         | Số điện thoại  | —                                                                                                              |
| member_no     | Người quản lý  | Mã thành viên. <br/> Truy cập **Cài đặt nhóm** -> **Thành viên**, xem cột `Mã thành viên` để lấy mã thành viên |

Ngoài ra còn có các trường thông tin tùy chỉnh do người dùng tạo (xem [Trường dữ liệu](./customer-field.md)).

## Danh sách khách hàng

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/customer/get-all</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số      | Kiểu  | Bắt buộc | Mô tả                                       |
| ------------ | ----- | -------- | ------------------------------------------- |
| page         | Int   | Không    | Số trang                                    |
| size         | Int   | Không    | Số lượng trên 1 trang                       |
| field_search | Array | Không    | Danh sách filter theo từng trường thông tin |

**Cấu trúc mỗi phần tử `field_search`:**

| Tham số             | Kiểu   | Mô tả                                                                                              |
| ------------------- | ------ | -------------------------------------------------------------------------------------------------- |
| customer_field_code | String | Mã trường thông tin                                                                                |
| value               | String | Giá trị filter                                                                                     |
| type                | String | Kiểu so sánh: `EQUAL`, `CONTAIN`, `RANGER`                                                         |
| is_search           | Bool   | `true` = áp dụng filter, `false` = chỉ lấy data của trường thông tin đó vào response, không filter |

**Kiểu so sánh (`type`):**

| Giá trị   | Áp dụng cho type field | Mô tả                                  |
| --------- | ---------------------- | -------------------------------------- |
| `EQUAL`   | Tất cả                 | So sánh bằng                           |
| `CONTAIN` | `STRING`               | Tìm kiếm chứa chuỗi                    |
| `RANGER`  | `NUMBER`, `DATE`       | Khoảng giá trị, `value` = `min \| max` |

**Field đặc biệt `create_at`:** Lọc tìm khách hàng theo khoảng ngày tạo, `value` format `dd/MM/yyyy|dd/MM/yyyy` (from|to), `type` sử dụng phải là `RANGER`.

> **Lưu ý:** Trường thông tin có kiểu là `TEXT` không áp dụng tìm kiểm được

**Ví dụ request**

```json
{
  "page": 1,
  "size": 10,
  "field_search": [
    {
      "customer_field_code": "name",
      "value": "Nguyen",
      "type": "CONTAIN",
      "is_search": true
    },
    {
      "customer_field_code": "create_at",
      "value": "01/01/2026|31/12/2026",
      "type": "RANGER",
      "is_search": true
    },
    {
      "customer_field_code": "customer_code",
      "value": "",
      "type": "",
      "is_search": false
    }
  ]
}
```

**Response**

| Tham số | Kiểu         | Mô tả                                  |
| ------- | ------------ | -------------------------------------- |
| error   | Int          | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String       | Thông tin                              |
| data    | List[Object] | Danh sách khách hàng                   |

**Cấu trúc phần tử trong `data`**

| Trường                              | Kiểu   | Mô tả                                                       |
| ----------------------------------- | ------ | ----------------------------------------------------------- |
| create_at                           | Long   | Thời gian tạo (Unix timestamp - ms)                         |
| customer_field_items                | Array  | Danh sách trường thông tin và các giá trị                   |
| customer_field_items[].code         | String | Mã trường thông tin                                         |
| customer_field_items[].name         | String | Tên trường thông tin                                        |
| customer_field_items[].type         | String | Loại trường thông tin                                       |
| customer_field_items[].value        | String | Giá trị (dùng cho trường thông tin không phải option)       |
| customer_field_items[].number       | Long   | Thứ tự sắp xếp                                              |
| customer_field_items[].value_option | Array  | Danh sách option đang chọn (dùng cho SELECT/CHECKBOX/RADIO) |

---

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": [
    {
      "create_at": 1718000000000,
      "customer_field_items": [
        {
          "code": "name",
          "name": "Tên khách hàng",
          "type": "STRING",
          "value": "Nguyen Van A",
          "number": 1,
          "value_option": null
        },
        {
          "code": "status",
          "name": "Trạng thái",
          "type": "SELECT",
          "value": null,
          "number": 2,
          "value_option": [
            {
              "code": "active",
              "color": "#00FF00",
              "text_color": "#FFFFFF",
              "number": 1,
              "value": "Đang hoạt động"
            }
          ]
        }
      ]
    }
  ]
}
```

## Đếm số lượng khách hàng

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/customer/count-all</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số      | Kiểu  | Bắt buộc | Mô tả                                  |
| ------------ | ----- | -------- | -------------------------------------- |
| field_search | Array | Không    | Danh sách filter theo trường thông tin |

**Cấu trúc mỗi phần tử `field_search`:**

| Tham số             | Kiểu   | Mô tả                                      |
| ------------------- | ------ | ------------------------------------------ |
| customer_field_code | String | Mã trường thông tin                        |
| value               | String | Giá trị filter                             |
| type                | String | Kiểu so sánh: `EQUAL`, `CONTAIN`, `RANGER` |
| is_search           | Bool   | `true` = áp dụng filter, `false` = bỏ qua  |

**Ví dụ request**

```json
{
  "field_search": [
    {
      "customer_field_code": "name",
      "value": "Nguyen",
      "type": "CONTAIN",
      "is_search": true
    }
  ]
}
```

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Int    | Số lượng khách hàng                    |

---

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": 125
}
```

## Chi tiết khách hàng

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/customer/get-detail</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số       | Kiểu   | Bắt buộc | Mô tả                                                                                                                   |
| ------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| customer_code | String | Không    | Mã khách hàng. **Để trống** → trả về form mẫu (cấu trúc tất cả field, không có giá trị). Dùng để render form nhập liệu. |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Object | Thông tin chi tiết khách hàng          |

**Lưu ý trường thông tin `value_options` trong `data.fields`:**

- Với trường thông tin có option (SELECT/CHECKBOX/RADIO): trả danh sách tất cả option, `is_select: true` = option đang được chọn
- Với trường thông tin khác: mảng rỗng

---

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": {
    "customer_code": "KH001",
    "fields": [
      {
        "code": "name",
        "name": "Tên khách hàng",
        "type": "STRING",
        "color": "",
        "text_color": "",
        "is_required": true,
        "value": "Nguyen Van A",
        "number": 1,
        "is_unique": false,
        "value_options": []
      },
      {
        "code": "status",
        "name": "Trạng thái",
        "type": "SELECT",
        "color": "#EEEEEE",
        "text_color": "#000000",
        "is_required": false,
        "value": "",
        "number": 2,
        "is_unique": false,
        "value_options": [
          {
            "code": "active",
            "is_select": true,
            "name": "Đang hoạt động",
            "color": "#00FF00",
            "text_color": "#FFFFFF",
            "number": 1,
            "type": "OPTION",
            "customer_field_option_code": "active"
          },
          {
            "code": "inactive",
            "is_select": false,
            "name": "Ngừng hoạt động",
            "color": "#FF0000",
            "text_color": "#FFFFFF",
            "number": 2,
            "type": "OPTION",
            "customer_field_option_code": "inactive"
          }
        ]
      }
    ]
  }
}
```

## Kiểm tra trùng thông tin khách hàng

<div class="api-container">
  <span class="api-method">GET</span>
  <span>[URL]/api/customer/check-exist-field-value</span>
</div>

> Chỉ có tác dụng với trường thông tin có `is_unique = true`.

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số             | Kiểu   | Bắt buộc | Mô tả                                                                                                                           |
| ------------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| customer_field_code | String | Có       | Mã trường thông tin                                                                                                             |
| value               | String | Có       | Giá trị muốn kiểm tra                                                                                                           |
| customer_code       | String | Không    | Để trống khi kiểm tra thêm khách hàng mới. Truyền `customer_code` của khách hàng đang sửa để tránh báo lỗi trùng với chính mình |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Bool   | Kết quả kiểm tra                       |

**Ý nghĩa `data`**

| `data`  | Ý nghĩa                                                  |
| ------- | -------------------------------------------------------- |
| `true`  | Giá trị đã tồn tại (trùng)                               |
| `false` | Không trùng hoặc trường thông tin không phải là duy nhất |

---

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": false
}
```

## Thêm khách hàng mới

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/customer/insert</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số | Kiểu   | Mô tả                                                                                         |
| ------- | ------ | --------------------------------------------------------------------------------------------- |
| fields  | Object | Object chứa các thông tin của khách hàng theo dạng key-value với key là `customer_field_code` |

**Các key đặc biệt trong `fields`:**

| Key           | Bắt buộc     | Mô tả                                                                 |
| ------------- | ------------ | --------------------------------------------------------------------- |
| customer_code | **Bắt buộc** | Mã khách hàng. Duy nhất trong project. Chỉ chứa chữ cái, số, `_`, `-` |
| member_no     | Không        | Mã thành viên quản lý                                                 |

**Format giá trị theo kiểu của các trường thông tin (Xem thêm [Phân loại trường dữ liệu](./customer-field.md#phan-loai-truong-du-lieu)):**

| Type                          | Format                                            |
| ----------------------------- | ------------------------------------------------- |
| `STRING`, `PHONE`, `TEXT`     | Chuỗi văn bản                                     |
| `NUMBER`                      | Số (ví dụ: `"1500000"`)                           |
| `DATE`                        | `dd/MM/yyyy`                                      |
| `SELECT`, `RADIO`, `CHECKBOX` | `customer_field_option_code` của option được chọn |

**Ví dụ request**

```json
{
  "fields": {
    "customer_code": "KH001",
    "name": "Nguyen Van A",
    "phone": "0901234567",
    "member_no": "MEM01",
    "birth_date": "15/06/1990",
    "status": "active"
  }
}
```

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Bool   | Trạng thái thực hiện                   |

---

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": true
}
```

## Cập nhật khách hàng

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/customer/update</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

> Chỉ cập nhật các trường dữ liệu có trong `fields`. Trường dữ liệu không truyền thì sẽ giữ nguyên giá trị cũ

**Body**

| Tham số       | Kiểu   | Bắt buộc | Mô tả                   |
| ------------- | ------ | -------- | ----------------------- |
| customer_code | String | Có       | Mã khách hàng           |
| fields        | Object | Có       | Các field muốn cập nhật |

**Các key đặc biệt trong `fields`:**

| Key           | Mô tả                                                         |
| ------------- | ------------------------------------------------------------- |
| customer_code | Mã khách hàng. Mã mới phải duy nhất, chỉ chứa chữ/số/`_`/`-`  |
| member_no     | Mã người quản lý. Truyền chuỗi rỗng `""` để xóa người quản lý |

**Ví dụ request**

```json
{
  "customer_code": "KH001",
  "fields": {
    "name": "Nguyen Van B",
    "customer_code": "KH001_NEW",
    "member_no": "MEM02"
  }
}
```

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Bool   | Trạng thái thực hiện                   |

---

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": true
}
```

## Xóa khách hàng

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/customer/delete</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số       | Kiểu   | Bắt buộc | Mô tả                 |
| ------------- | ------ | -------- | --------------------- |
| customer_code | String | Có       | Mã khách hàng cần xóa |

**Ví dụ request**

```json
{
  "customer_code": "KH001"
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
