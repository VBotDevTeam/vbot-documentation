---
outline: deep
---

# Quản lý tài khoản

API quản lý tài khoản doanh nghiệp.

## Lấy số dư tài khoản

Lấy số dư tài khoản của doanh nghiệp/đối tác.

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/account/balance</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Tham số**

Không có tham số.

**Response**

| Tham số   | Kiểu    | Mô tả                                  |
| --------- | ------- | -------------------------------------- |
| error     | Int     | Mã lỗi (0: Thành công, khác 0: Có lỗi) |
| message   | String  | Thông tin                              |
| data      | Decimal | Số dư tài khoản                        |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "Success",
  "data": 1500000.0
}
```
