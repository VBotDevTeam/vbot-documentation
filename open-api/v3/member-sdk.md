---
outline: deep
---

# Tài khoản SDK

API quản lý tài khoản SDK của thành viên.

## Thêm tài khoản SDK

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/member/sdk/create</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Body**

| Tham số           | Kiểu   | Mô tả                    |
| ----------------- | ------ | ------------------------ |
| member_name       | String | Tên thành viên           |
| member_phone      | String | Số điện thoại thành viên |
| member_email      | String | Email thành viên         |
| member_no         | String | Mã thành viên            |
| member_ext_number | Int    | Mã nhánh                 |

**Ví dụ request**

```json
{
  "member_name": "sample string 3",
  "member_phone": "sample string 4",
  "member_email": "sample string 5",
  "member_no": "sample string 6",
  "member_ext_number": 7
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

## Sửa tài khoản SDK

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/member/sdk/update</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Body**

| Tham số      | Kiểu   | Mô tả                    |
| ------------ | ------ | ------------------------ |
| member_no    | String | Mã thành viên            |
| member_name  | String | Tên thành viên           |
| member_phone | String | Số điện thoại thành viên |
| member_email | String | Email thành viên         |

**Ví dụ request**

```json
{
  "member_no": "sample string 3",
  "member_name": "sample string 4",
  "member_phone": "sample string 5",
  "member_email": "sample string 6"
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
