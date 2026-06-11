---
outline: deep
---

# Quản lý hotline

API quản lý hotline (số tổng đài). Sử dụng `hotline_code` từ API này khi gọi các API Call Confirmation.

## Lấy danh sách hotline

Lấy danh sách tất cả hotline (số tổng đài) của dự án.

<div class="api-container">
  <span class="api-method method-get">GET</span>
  <span>[URL]/api/hotline/getAll</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-KEY | `token-open-api` |

**Tham số**

| Tham số | Kiểu | Bắt buộc | Mô tả |
| ------- | ---- | -------- | ----- |

**Response**

| Tham số               | Kiểu   | Mô tả                                     |
| --------------------- | ------ | ----------------------------------------- |
| error                 | Int    | Mã lỗi (0: Thành công, khác 0: Có lỗi)    |
| message               | String | Thông tin                                 |
| data                  | Array  | Danh sách hotlines                        |
| data[].hotline_name   | String | Tên hotline                               |
| data[].hotline_number | String | Số hotline                                |
| data[].hotline_code   | String | Mã hotline (dùng khi gọi API callConfirm) |

**Ví dụ response**

```json
{
  "error": 0,
  "message": "Success",
  "data": [
    {
      "hotline_name": "Hotline Bán Hàng",
      "hotline_number": "0812345678",
      "hotline_code": "HL_SALES"
    },
    {
      "hotline_name": "Hotline Hỗ Trợ",
      "hotline_number": "0887654321",
      "hotline_code": "HL_SUPPORT"
    }
  ]
}
```

---
