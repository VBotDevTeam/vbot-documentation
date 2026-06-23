---
outline: deep
---

# Trường tùy chỉnh Campaign

API quản lý trường tùy chỉnh trong chiến dịch gọi.

## Lấy tất cả trường (không phân trang)

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/customField/getAllNoPage?key_search={key_search}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số    | Kiểu   | Mô tả            |
| ---------- | ------ | ---------------- |
| key_search | String | Từ khóa tìm kiếm |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |

**Ví dụ response**

```json
{
  "error": 2,
  "message": "sample string 3",
  "data": [
    {
      "id": 1,
      "cfname": "sample string 2",
      "cfkey": "sample string 3",
      "description": "sample string 4",
      "cftype": "sample string 5",
      "is_required": true
    },
    {
      "id": 1,
      "cfname": "sample string 2",
      "cfkey": "sample string 3",
      "description": "sample string 4",
      "cftype": "sample string 5",
      "is_required": true
    }
  ]
}
```

---

## Lấy tất cả trường (không phân trang)

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/customField/getAll?key_search={key_search}&page={page}&size={size}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số    | Kiểu   | Mô tả                 |
| ---------- | ------ | --------------------- |
| key_search | String | Từ khóa tìm kiếm      |
| page       | Int    | Số trang              |
| size       | Int    | Số lượng trên 1 trang |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |

**Ví dụ response**

```json
{
  "error": 2,
  "message": "sample string 3",
  "data": [
    {
      "id": 1,
      "cfname": "sample string 2",
      "cfkey": "sample string 3",
      "description": "sample string 4",
      "cftype": "sample string 5",
      "is_required": true
    },
    {
      "id": 1,
      "cfname": "sample string 2",
      "cfkey": "sample string 3",
      "description": "sample string 4",
      "cftype": "sample string 5",
      "is_required": true
    }
  ]
}
```

---

## Lấy số lượng trường tùy chỉnh

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/customField/countAll?key_search={key_search}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số    | Kiểu   | Mô tả            |
| ---------- | ------ | ---------------- |
| key_search | String | Từ khóa tìm kiếm |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Int    | Dữ liệu trả về                         |

**Ví dụ response**

```json
{
  "error": 2,
  "message": "sample string 3",
  "data": 4
}
```

---

## Lấy chi tiết trường tùy chỉnh

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/customField/getDetail?id={id}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số | Kiểu | Mô tả |
| ------- | ---- | ----- |
| id      | Int  | ID    |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |

**Ví dụ response**

```json
{
  "error": 2,
  "message": "sample string 3",
  "data": {
    "id": 1,
    "cfname": "sample string 2",
    "cfkey": "sample string 3",
    "description": "sample string 4",
    "cftype": "sample string 5",
    "is_required": true
  }
}
```

---

## Kiểm tra tên trường

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/customField/checkName?name={name}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số | Kiểu   | Mô tả |
| ------- | ------ | ----- |
| name    | String | Tên   |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Bool   | Dữ liệu trả về                         |

**Ví dụ response**

```json
{
  "error": 2,
  "message": "sample string 3",
  "data": true
}
```

---

## Kiểm tra key trường

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/campaignCall/customField/checkKey?key={key}</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

| Tham số | Kiểu   | Mô tả            |
| ------- | ------ | ---------------- |
| key     | String | Từ khóa tìm kiếm |

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Bool   | Dữ liệu trả về                         |

**Ví dụ response**

```json
{
  "error": 2,
  "message": "sample string 3",
  "data": true
}
```

---

## Thêm trường tùy chỉnh

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/campaignCall/customField/insert</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số     | Kiểu   | Mô tả |
| ----------- | ------ | ----- |
| description | String | Mô tả |
| cfname      | String |       |
| cfkey       | String |       |
| cftype      | String |       |
| is_required | Bool   |       |

**Ví dụ request**

```json
{
  "description": "sample string 3",
  "cfname": "sample string 4",
  "cfkey": "sample string 5",
  "cftype": "sample string 6",
  "is_required": true
}
```

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Int    | Dữ liệu trả về                         |

**Ví dụ response**

```json
{
  "error": 2,
  "message": "sample string 3",
  "data": 4
}
```

---

## Xóa trường tùy chỉnh

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/campaignCall/customField/delete</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số | Kiểu | Mô tả |
| ------- | ---- | ----- |
| id      | Int  | ID    |

**Ví dụ request**

```json
{
  "id": 3
}
```

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | Bool   | Dữ liệu trả về                         |

**Ví dụ response**

```json
{
  "error": 2,
  "message": "sample string 3",
  "data": true
}
```

---
