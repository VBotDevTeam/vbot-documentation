---
outline: deep
---

# Kiểu khách hàng

API quản lý kiểu (loại) khách hàng.

## Thêm kiểu khách hàng

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/crm/type/create</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số   | Kiểu   | Mô tả    |
| --------- | ------ | -------- |
| type_name | String | Tên kiểu |
| type_no   | String | Mã kiểu  |

**Ví dụ request**

```json
{
  "type_name": "sample string 3",
  "type_no": "sample string 4"
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

## Sửa kiểu khách hàng

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/crm/type/update</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số   | Kiểu   | Mô tả    |
| --------- | ------ | -------- |
| type_name | String | Tên kiểu |
| type_no   | String | Mã kiểu  |

**Ví dụ request**

```json
{
  "type_name": "sample string 3",
  "type_no": "sample string 4"
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

## Xóa kiểu khách hàng

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/crm/type/delete</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số | Kiểu   | Mô tả   |
| ------- | ------ | ------- |
| type_no | String | Mã kiểu |

**Ví dụ request**

```json
{
  "type_no": "sample string 3"
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

## Sửa mã kiểu khách hàng

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/crm/type/updateNo</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Response**

---
