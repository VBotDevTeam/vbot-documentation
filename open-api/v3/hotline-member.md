---
outline: deep
---

# Hotline thành viên

API gán và xóa hotline cho thành viên.

## Thêm hotline cho thành viên

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/hotline/member/add</span>
</div>

**Header**

| Tham số   | Giá trị          |
| --------- | ---------------- |
| X-API-Key | `token-open-api` |

**Body**

| Tham số        | Kiểu   | Mô tả              |
| -------------- | ------ | ------------------ |
| member_no      | String | Mã thành viên      |
| hotline_number | String | Số hotline         |
| allow_call     | Bool   | Cho phép gọi       |
| start_time     | String | Thời gian bắt đầu  |
| end_time       | String | Thời gian kết thúc |

**Ví dụ request**

```json
{
  "member_no": "sample string 3",
  "hotline_number": "sample string 4",
  "allow_call": true,
  "start_time": "sample string 6",
  "end_time": "sample string 7"
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

## Xóa hotline của thành viên

<div class="api-container">
  <span class="api-method method-post">POST</span>
  <span>[URL]/api/hotline/member/delete</span>
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
