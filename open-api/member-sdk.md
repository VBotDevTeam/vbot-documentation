---
outline: deep
---

# Tài khoản SDK

API quản lý tài khoản SDK của thành viên.

## Thêm tài khoản SDK

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/member/sdk/create</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Body**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| vbot_id | String | VBotID khách hàng |
| project_code | String | Mã nhóm |
| member_name | String | Tên thành viên |
| member_phone | String | Số điện thoại thành viên |
| member_email | String | Email thành viên |
| member_no | String | Mã thành viên |
| member_ext_number | Int | Mã nhánh |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "member_name": "sample string 3",
  "member_phone": "sample string 4",
  "member_email": "sample string 5",
  "member_no": "sample string 6",
  "member_ext_number": 7
}
```

**Response**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| status | Int | Mã trạng thái (1: Thành công, 0: Thất bại) |
| error | Int | Mã lỗi |
| message | String | Thông tin |
| data | String | Dữ liệu trả về |

**Ví dụ response**

```json
{
  "status": 1,
  "error": 2,
  "message": "sample string 3",
  "data": "sample string 4"
}
```

---

## Sửa tài khoản SDK

<div class="api-container">
  <span class="api-method">POST</span>
  <span>[URL]/api/member/sdk/update</span>
</div>

**Header**

| Tham số | Giá trị |
|---|---|
| Authorization | Bearer `access_token` |

**Body**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| vbot_id | String | VBotID khách hàng |
| project_code | String | Mã nhóm |
| member_no | String | Mã thành viên |
| member_name | String | Tên thành viên |
| member_phone | String | Số điện thoại thành viên |
| member_email | String | Email thành viên |

**Ví dụ request**

```json
{
  "vbot_id": "sample string 1",
  "project_code": "sample string 2",
  "member_no": "sample string 3",
  "member_name": "sample string 4",
  "member_phone": "sample string 5",
  "member_email": "sample string 6"
}
```

**Response**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| status | Int | Mã trạng thái (1: Thành công, 0: Thất bại) |
| error | Int | Mã lỗi |
| message | String | Thông tin |
| data | String | Dữ liệu trả về |

**Ví dụ response**

```json
{
  "status": 1,
  "error": 2,
  "message": "sample string 3",
  "data": "sample string 4"
}
```

---
