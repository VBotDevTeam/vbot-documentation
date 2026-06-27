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
| X-API-Key | `token-open-api` |

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
| X-API-Key | `token-open-api` |

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

## Tạo tài khoản & lấy Token SDK (One-Step Provisioning)

Đầu API này giúp Backend của đối tác tự động lấy JWT token cho tài khoản SDK. Nếu mã thành viên (`member_no`) chưa tồn tại trong hệ thống VBot, API sẽ tự động khởi tạo tài khoản mới và gán danh sách hotline tương ứng trong cùng một bước.

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/sdk/tokenSdk</span>
</div>

**Header**

| Tham số        | Kiểu   | Mô tả                                      |
| -------------- | ------ | ------------------------------------------ |
| Authorization  | String | `Bearer <token-open-api>` (API Key đối tác)|

**Body**

| Tham số        | Kiểu               | Bắt buộc | Mô tả                                                        |
| -------------- | ------------------ | -------- | ------------------------------------------------------------ |
| `member_no`    | String             | Có       | Mã định danh thành viên duy nhất trong hệ thống của bạn.      |
| `hotline_codes`| Collection (Array) | Không    | Danh sách mã hotline cho phép SDK sử dụng (chỉ cần thêm 1 lần).|

**Ví dụ request**

```json
{
  "member_no": "agent_001",
  "hotline_codes": [
    "hotline_main",
    "hotline_staging"
  ]
}
```

**Response**

| Tham số   | Kiểu   | Mô tả                                                   |
| --------- | ------ | ------------------------------------------------------- |
| `error`   | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi)                  |
| `message` | String | Thông tin mô tả kết quả                                 |
| `data`    | String | JWT Token của tài khoản SDK để truyền vào Widget Client |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "success",
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey..."
}
```
