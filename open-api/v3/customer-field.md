---
outline: deep
---

# Trường thông tin khách hàng

API quản lý trường thông tin tùy chỉnh của khách hàng.

## Thêm trường thông tin

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/crm/field/create</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số           | Kiểu   | Mô tả       |
| ----------------- | ------ | ----------- |
| field_name        | String | Tên trường  |
| field_no          | String | Mã trường   |
| field_type        | String | Loại trường |
| field_description | String |             |

**Ví dụ request**

```json
{
  "field_name": "sample string 3",
  "field_no": "sample string 4",
  "field_type": "sample string 5",
  "field_description": "sample string 6"
}
```

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | String | Dữ liệu trả về                         |

**Ví dụ response**

```json
{
  "error": 2,
  "message": "sample string 3",
  "data": "sample string 4"
}
```

---

## Sửa trường thông tin

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/crm/field/update</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số      | Kiểu   | Mô tả         |
| ------------ | ------ | ------------- |
| field_no_old | String | Mã trường cũ  |
| field_no_new | String | Mã trường mới |

**Ví dụ request**

```json
{
  "field_no_old": "sample string 3",
  "field_no_new": "sample string 4"
}
```

**Response**

| Tham số | Kiểu   | Mô tả                                  |
| ------- | ------ | -------------------------------------- |
| error   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message | String | Thông tin                              |
| data    | String | Dữ liệu trả về                         |

**Ví dụ response**

```json
{
  "error": 2,
  "message": "sample string 3",
  "data": "sample string 4"
}
```

---

## Xóa trường thông tin

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/crm/field/delete</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số  | Kiểu   | Mô tả     |
| -------- | ------ | --------- |
| field_no | String | Mã trường |

**Ví dụ request**

```json
{
  "field_no": "sample string 3"
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

## Sửa mã trường thông tin

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/crm/field/updateNo</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Response**

---
