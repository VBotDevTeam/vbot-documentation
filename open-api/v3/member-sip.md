---
outline: deep
---

# Tài khoản SIP

API quản lý tài khoản thiết bị SIP của thành viên.

## Thêm tài khoản SIP

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/memeber/sip/create</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số           | Kiểu   | Mô tả                    |
| ----------------- | ------ | ------------------------ |
| member_name       | String | Tên thành viên           |
| member_username   | String | Tài khoản                |
| member_password   | String | Mật khẩu                 |
| member_phone      | String | Số điện thoại thành viên |
| member_email      | String | Email thành viên         |
| member_no         | String | Mã thành viên            |
| type_account      | String |                          |
| member_ext_number | Int    | Mã nhánh                 |

**Ví dụ request**

```json
{
  "member_name": "sample string 3",
  "member_username": "sample string 4",
  "member_password": "sample string 5",
  "member_phone": "sample string 6",
  "member_email": "sample string 7",
  "member_no": "sample string 8",
  "type_account": "sample string 9",
  "member_ext_number": 10
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

## Sửa tài khoản SIP

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/memeber/sip/update</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số             | Kiểu   | Mô tả         |
| ------------------- | ------ | ------------- |
| member_no           | String | Mã thành viên |
| member_password_old | String | Mật khẩu cũ   |
| member_password_new | String | Mật khẩu mới  |

**Ví dụ request**

```json
{
  "member_no": "sample string 3",
  "member_password_old": "sample string 4",
  "member_password_new": "sample string 5"
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

## Sửa mật khẩu tài khoản SIP

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/memeber/sip/updatePassword</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Response**

---

## Lấy thông tin đăng nhập SIP

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/memeber/sip/info</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số   | Kiểu   | Mô tả         |
| --------- | ------ | ------------- |
| member_no | String | Mã thành viên |

**Ví dụ request**

```json
{
  "member_no": "sample string 3"
}
```

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
    "username": "sample string 1",
    "domain": "sample string 2",
    "port": "sample string 3"
  }
}
```

---
